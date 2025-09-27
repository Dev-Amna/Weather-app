import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import "../styles/Header.css";
import "../styles/Favorites.css";

// Logos
import darkThemelogo from "../assets/images/logo.svg";
import lightThemeLogo from "../assets/light-theme-images/logo.svg";

// Check icons
import CheckIcon from "../assets/images/icon-checkmark.svg";
import CheckIconLight from "../assets/light-theme-images/icon-checkmark.svg";

// Unit icons
import unitIcon from "../assets/images/icon-units.svg";
import unitIconLight from "../assets/light-theme-images/icon-units.svg";

// Dropdown icons
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import dropDownIconLight from "../assets/light-theme-images/icon-dropdown.svg";

import FavoritesDropdown from "./FavoritesDropdown";
import ThemeToggle from "./ThemeToggle";

// photo / no photo icons
import Image from "../assets/images/image.svg";
import LightPhoto from "../assets/light-theme-images/image.svg";
import noImage from "../assets/images/no-image.svg";
import LightnoPhoto from "../assets/light-theme-images/no-image.svg";

function Header({ units, setUnits, favorites, onFavoriteSelect, onRemoveFavorite }) {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // state for body background toggle
  const [bgActive, setBgActive] = useState(false);

  // toggle body class for background
  useEffect(() => {
    if (bgActive) {
      document.body.classList.add("bg-image");
    } else {
      document.body.classList.remove("bg-image");
    }
  }, [bgActive]);

  // add/remove .light on body for theme-based bg
  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const handleChange = (category, value) => {
    setUnits((prev) => ({ ...prev, [category]: value }));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // decide which icon to show
  const currentIcon = bgActive
    ? theme === "dark" ? noImage : LightnoPhoto
    : theme === "dark" ? Image : LightPhoto;

  const currentAlt = bgActive ? "Remove background" : "Add background";

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" data-aos="zoom-in">
        <a href="/" aria-label="Weather App Home">
          <img
            src={theme === "dark" ? darkThemelogo : lightThemeLogo}
            alt={theme === "dark" ? "Dark logo" : "Light logo"}
          />
        </a>
      </div>

      {/* photo / no photo toggle outside dropdown */}
      <div className="photo-toggle">
        <img
          className="photo-icon"
          src={currentIcon}
          alt={currentAlt}
          onPointerDown={() => setBgActive((prev) => !prev)}
        />
      </div>

      {/* Units Dropdown */}
      <nav
        className="units-dropdown"
        data-aos="zoom-in"
        ref={dropdownRef}
        aria-label="Units selection menu"
      >
        <div className="box-icons">
          {/* Theme Switcher */}
          <ThemeToggle />
          {/* Favorites Dropdown */}
          <FavoritesDropdown
            favorites={favorites}
            onFavoriteSelect={onFavoriteSelect}
            onRemoveFavorite={onRemoveFavorite}
          />
        </div>

        <button
          className="units-btn"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {/* Unit Icon */}
          <img
            src={theme === "dark" ? unitIcon : unitIconLight}
            alt="Units icon"
            className="unit-icon"
          />
          <span>Units</span>
          {/* Dropdown Arrow */}
          <img
            src={theme === "dark" ? dropDownIcon : dropDownIconLight}
            alt="Dropdown arrow"
            className={`dropdown-icon ${open ? "open" : ""}`}
          />
        </button>

        {open && (
          <ul className="dropdown-menu" role="menu">
            {/* Temperature */}
            <li className="dropdown-section">
              <h5>Switch to Imperial</h5>
              <p className="dropdown-label">Temperature</p>
              <button
                className={units.temperature === "C" ? "active" : ""}
                onClick={() => handleChange("temperature", "C")}
              >
                Celsius (°C)
                {units.temperature === "C" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
              <button
                className={units.temperature === "F" ? "active" : ""}
                onClick={() => handleChange("temperature", "F")}
              >
                Fahrenheit (°F)
                {units.temperature === "F" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
            </li>

            {/* Wind Speed */}
            <li className="dropdown-section">
              <p className="dropdown-label">Wind Speed</p>
              <button
                className={units.windspeed === "km/h" ? "active" : ""}
                onClick={() => handleChange("windspeed", "km/h")}
              >
                km/h
                {units.windspeed === "km/h" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
              <button
                className={units.windspeed === "mph" ? "active" : ""}
                onClick={() => handleChange("windspeed", "mph")}
              >
                mph
                {units.windspeed === "mph" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
            </li>

            {/* Precipitation */}
            <li className="dropdown-section">
              <p className="dropdown-label">Precipitation</p>
              <button
                className={units.precipitation === "mm" ? "active" : ""}
                onClick={() => handleChange("precipitation", "mm")}
              >
                Millimeters (mm)
                {units.precipitation === "mm" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
              <button
                className={units.precipitation === "in" ? "active" : ""}
                onClick={() => handleChange("precipitation", "in")}
              >
                Inches (in)
                {units.precipitation === "in" && (
                  <img
                    src={theme === "dark" ? CheckIcon : CheckIconLight}
                    alt="Selected"
                    className="check-icon"
                  />
                )}
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
