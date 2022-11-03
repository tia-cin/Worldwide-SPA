const axios = require("axios");
const { Country, Activity } = require("../db");
const { Sequelize } = require("sequelize");

const api = async () => {
  try {
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    const allCountries =
      (await apiUrl.data) &&
      apiUrl.data.map((c) => {
        return {
          name: c.name.common ? c.name.common : "No name",
          id: c.cca3,
          flag: c.flags[0] ? c.flags[0] : "No flag",
          continent: c.continents ? c.continents[0] : "No continent",
          capital: c.capital ? c.capital[0] : "No capital",
          region: c.region ? c.region : "No region",
          subregion: c.subregion ? c.subregion : "No subregion",
          area: c.area ? c.area : "No area",
          population: c.population,
          status: c.status ? c.status : "No status",
        };
      });
    return allCountries ? allCountries : new Error("Wrong api call");
  } catch (error) {
    console.log(error);
  }
};

const getContinents = async (req, res) => {
  const data = await Country.findAll();
  const continents = await data
    .map((d) => d.continent)
    .filter((val, i, curr) => curr.indexOf(val) === i);
  res.send(continents);
  return continents;
};

const getCountries = async (req, res) => {
  const { name, filter, order } = req.query;
  const countries = await api();

  try {
    const full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (!full.length) {
      await Country.bulkCreate(countries);
    }
  } catch (error) {
    console.log(error);
  }

  if (name) {
    const countryName = await Country.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name.toLowerCase()}%`,
        },
      },
    });
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("No country");
  } else if (filter) {
    const countries = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (filter !== "All") {
      const val = filter.split("-");
      const filtered =
        val[0] === "continent"
          ? countries.filter((c) => c.continent.includes(val[1]))
          : countries.filter(
              (c) =>
                c.activities && c.activities.map((a) => a.name).includes(val[1])
            );
      res.send(filtered);
    } else res.send(countries);
  } else if (order) {
    const countries = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    switch (order) {
      case "min":
        return res.send(
          countries.sort((a, b) => {
            if (a.population > b.population) return 1;
            if (b.population > a.population) return -1;
            else return 0;
          })
        );
      case "max":
        return res.send(
          countries.sort((a, b) => {
            if (a.population < b.population) return 1;
            if (b.population < a.population) return -1;
            else return 0;
          })
        );
      case "asc":
        return res.send(
          countries.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;
            else return 0;
          })
        );
      default:
        return res.send(
          countries.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (b.name < a.name) return -1;
            else return 0;
          })
        );
    }
  } else {
    const full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).send(full);
  }
};

const getCountry = async (req, res) => {
  const { id } = req.params;
  const country = await Country.findByPk(id, {
    include: {
      model: Activity,
    },
  });
  if (country) return res.status(200).send(country);
  else return res.send("No country");
};

module.exports = {
  getCountries,
  getCountry,
  getContinents,
};
