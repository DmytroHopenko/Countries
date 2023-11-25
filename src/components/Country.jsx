import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data/data.json";
import "./Country.scss";
import { useTheme } from "./ThemeContext";
import { GoArrowLeft } from "react-icons/go";

export default function Country() {
  const { darkTheme } = useTheme();
  const { alpha3Code } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    const countryData = data.find(
      (country) => country.alpha3Code === alpha3Code
    );
    const neighborNames =
      countryData?.borders?.map((borderCode) => {
        const neighborCountry = data.find(
          (country) => country.alpha3Code === borderCode
        );
        return neighborCountry?.name || borderCode;
      }) || [];
    setNeighbors(neighborNames);
    setCountry(countryData);
  }, [alpha3Code]);

  if (!country) {
    return (
      <div className={`not_found ${darkTheme ? "darkThemeText" : ""}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className="country_detail">
      <Link to="/" className={`back_btn ${darkTheme ? "darkThemeText" : ""}`}>
        <GoArrowLeft className={`${darkTheme ? "darkThemeSvg" : ""}`} /> Back
      </Link>
      <div className="detail_wrap">
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width="560"
          height="400"
        />
        <div className={`information ${darkTheme ? "darkThemeText" : ""}`}>
          <h1>{country.name}</h1>
          <div className="row_column">
            <div className="left_side">
              <p>
                <span>Native Name: </span>
                {country.nativeName}
              </p>
              <p>
                <span>Population: </span>
                {country.population}
              </p>
              <p>
                <span>Region: </span>
                {country.region}
              </p>
              <p>
                <span>Sub Region: </span>
                {country.subregion}
              </p>
              <p>
                <span>Capital: </span>
                {country.capital}
              </p>
            </div>
            <div className="right_side">
              <p>
                <span>Top Level Domain: </span>
                {country.topLevelDomain}
              </p>
              <div className="loop_wrap">
                <span>Currencies: </span>
                <ul>
                  {country.currencies.map((currency, index) => (
                    <li key={index}>{currency.name}</li>
                  ))}
                </ul>
              </div>
              <div className="loop_wrap">
                <span>Languages: </span>
                <ul>
                  {country.languages.map((language, index) => (
                    <li key={index}>{language.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={`borders`}>
            <span>Border Countries: </span>
            <ul>
              {neighbors && neighbors.length > 0 ? (
                neighbors.map((neighbor, index) => (
                  <li key={index}>
                    <Link to={`/${country.borders[index]}`} className={`${darkTheme ? 'darkThemeText' : ''}`}>{neighbor}</Link>
                  </li>
                ))
              ) : (
                <li>No border countries</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
