import React, { useState } from "react";
import "./Main.scss";
import data from "../data/data.json";
import { useTheme } from "./ThemeContext";
import { HiSearch } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Main() {
  const { darkTheme } = useTheme();
  const [countries, setCountries] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    return (
      country.region.includes(selectedRegion) &&
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className={`main`}>
      <div className={`filters ${ darkTheme ? 'darkThemeBody' : '' }`}>
        <HiSearch className="search" />
        <IoIosArrowDown className="arrow_bottom" />
        <input
          className={`input_filter ${ darkTheme ? 'darkTheme darkThemeText' : '' }`}
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedRegion} onChange={handleRegionChange} className={`selector_filter ${ darkTheme ? 'darkTheme' : '' }`}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="country_wrap">
        {filteredCountries.map((country) => (
          <Link to={country.alpha3Code} className={`element ${darkTheme ? 'darkTheme darkThemeText' : ''}`} key={country.alpha3Code}>
            <img src={country.flags.png} alt="Flag" height="160" width="263" />
            <h5>{country.name}</h5>
            <p>
              <span>Population: </span>
              {country.population.toLocaleString("es-US")}
            </p>
            <p>
              <span>Region: </span>
              {country.region}
            </p>
            <p>
              <span>Capital: </span>
              {country.capital}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
