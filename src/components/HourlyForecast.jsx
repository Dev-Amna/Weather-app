
import React, { useState, useEffect, useRef, useContext } from "react";
import "../styles/HourlyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits";
import { ThemeContext } from "../ThemeContext/ThemeContext";

// Dropdown icons
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import dropDownIconLight from "../assets/light-theme-images/icon-dropdown.svg";

function HourlyForecast({ hourly, daily, selectedDay, setSelectedDay, units = {} }) {
  if (!hourly || !daily) return null;

  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Show only hours of the chosen day
  const start = selectedDay * 24;
  const end = start + 24;

  return (
    <section className="hourly-forecast">
      <header className="hourly-forecast-top">
        <h3>Hourly forecast</h3>

        {/* Custom dropdown */}
        <nav className="day-dropdown" ref={dropdownRef} aria-label="Select forecast day">
          <button
            className="day-btn"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {new Date(daily.time[selectedDay]).toLocaleDateString("en-US", {
              weekday: "long",
            })}

            {/* Dropdown icon with theme condition */}
            <img
              src={theme === "dark" ? dropDownIcon : dropDownIconLight}
              alt="toggle dropdown"
              className={`dropdown-icon ${open ? "open" : ""}`}
            />

          </button>

          {open && (
            <ul className="day-menu" role="listbox">
              {daily.time.map((date, idx) => (
                <li key={date}>
                  <button
                    className={`day-option ${selectedDay === idx ? "active" : ""}`}
                    role="option"
                    aria-selected={selectedDay === idx}
                    onClick={() => {
                      setSelectedDay(idx);
                      setOpen(false);
                    }}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      {/* Hourly cards */}
      <ul className="hourly-list">
        {hourly.time.slice(start, end).map((time, idx) => {
          const code = hourly.weathercode[start + idx];
          const icon = getWeatherIcon(code); 

          const temp = convertTemperature(
            hourly.temperature_2m[start + idx],
            units.temperature || "C"
          );

          return (
            <li key={time} className="hour-card">
              <div className="hourly-icons">
                <img
                  src={icon}
                  alt={`Weather condition code ${code}`}
                  className="weather-icon"
                />
                <time dateTime={time}>
                  {new Date(time).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </time>
              </div>
              <p>{temp}°</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default HourlyForecast;

