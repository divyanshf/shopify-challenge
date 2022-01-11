import { createContext, useEffect, useState } from "react";

export const FilterOptions = createContext();

const getYears = (start) => {
  const years = [];
  const curYear = new Date().getFullYear();
  while (start <= curYear) {
    years.push(start);
    start++;
  }
  return years;
};

export const FilterOptionsProvider = ({ children }) => {
  const years = getYears(1995);
  const [filters, setFilters] = useState([
    {
      title: "Media",
      key: "media_type",
      value: "image",
      options: ["image", "audio"],
    },
    {
      title: "Start Year",
      key: "year_start",
      value: 1995,
      options: years,
    },
    {
      title: "End Year",
      key: "year_end",
      value: new Date().getFullYear(),
      options: years,
    },
  ]);

  const changeFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <FilterOptions.Provider value={[filters, changeFilters]}>
      {children}
    </FilterOptions.Provider>
  );
};
