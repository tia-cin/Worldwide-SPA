import React from "react";
import { InputsProps, SelectProps } from "../types";

export const Input: React.FC<InputsProps> = ({
  name,
  type,
  value,
  onChange,
  props,
}) => {
  return (
    <div className="mb-5">
      <label className="mx-2 font-medium text-lg capitalize">{name}</label>
      <input
        type={type ? type : "text"}
        className="bg-gray-200 p-2 rounded-lg w-full"
        onChange={onChange}
        value={value}
        name={name}
        {...props}
      />
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({ onChange, name, values }) => (
  <div className="mb-5">
    <label className="mx-2 font-medium text-lg capitalize">{name}</label>
    <select
      className="w-full bg-gray-200 p-2 rounded-lg cursor-pointer"
      name={name}
      onChange={onChange}
    >
      <option selected>Choose an Option</option>
      {values.map((item, i) => (
        <option key={i} className="capitalize">
          {item}
        </option>
      ))}
    </select>
  </div>
);
