export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_INFO = "GET_COUNTRY_INFO";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const ORDER_COUNTRIES_POPULATION = "ORDER_COUNTRIES";
export const ORDER_COUNTRIES_NAME = "ORDER_COUNTRIES_NAME";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_CONTINENTS = "GET_CONTINENTS";

export interface TitlesProps {
  title: string;
  subtitle: string;
}

export interface PaginationProps {
  current: number;
  pages: number;
  total: number;
  handlePag: (pageNum: number) => void;
}

export interface CardProps {
  name: string;
  activities: ActivityType[];
  flag: string;
  id: string;
}

export interface ButtonProps {
  style?: string;
  text?: string;
  handle?: any;
}

export interface InputsProps {
  type?: string;
  value: any;
  onChange: any;
  name: string;
  props?: any;
}

export interface SelectProps {
  values: Array<string>;
  onChange: any;
  name: string;
}

export interface CountryType {
  id: string;
  name: string;
  official: string;
  flag: string;
  continent: string;
  capital: string;
  region: string;
  subregion: string;
  area: string;
  status: string;
  population: string | number;
  activities: ActivityType[];
  independent: boolean;
  latitude: string;
  longitude: string;
  map: string;
  timezone: string;
  unMember: boolean;
  landlocked: boolean;
}

export interface ActivityType {
  id?: number;
  name: string;
  difficulty: number;
  duration: number;
  season: string;
  countries: CountryType[] | Array<string>;
}

export interface AlertType {
  text: string;
  type: string;
}

export interface StateType {
  countries: CountryType[];
  activities: ActivityType[];
  detail: CountryType | null;
  continents: Array<string>;
}

interface GetCountriesAction {
  type: typeof GET_COUNTRIES;
  payload: CountryType[];
}

interface GetActivitiesAction {
  type: typeof GET_ACTIVITIES;
  payload: ActivityType[];
}

interface GetCountryInfoAction {
  type: typeof GET_COUNTRY_INFO;
  payload: CountryType;
}

interface CreateActivityAction {
  type: typeof CREATE_ACTIVITY;
  payload: ActivityType;
}

interface OrderCountriesPopulationAction {
  type: typeof ORDER_COUNTRIES_POPULATION;
  payload: string;
}

interface OrderCountriesNameAction {
  type: typeof ORDER_COUNTRIES_NAME;
  payload: string;
}

interface FilterContinentAction {
  type: typeof FILTER_CONTINENT;
  payload: CountryType[];
}

interface FilterActivityAction {
  type: typeof FILTER_ACTIVITY;
  payload: CountryType[];
}

interface SearchCountryAction {
  type: typeof SEARCH_COUNTRY;
  payload: CountryType[];
}

interface GetContinents {
  type: typeof GET_CONTINENTS;
  payload: Array<string>;
}

export type ActionTypes =
  | GetCountriesAction
  | GetActivitiesAction
  | GetCountryInfoAction
  | CreateActivityAction
  | OrderCountriesPopulationAction
  | OrderCountriesNameAction
  | FilterContinentAction
  | FilterActivityAction
  | SearchCountryAction
  | GetContinents;
