import React from "react";
import "../styles/DailyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits";

function DailyForecast({ daily, units = {} }) {
  if (!daily) return null;

  return (
    <section className="daily-forecast">
      <h3>Daily forecast</h3>

      <ul className="forecast-list">
        {daily.time.map((date, idx) => {
          const code = daily.weathercode[idx];
          const icon = getWeatherIcon(code);

          const maxTemp = convertTemperature(
            daily.temperature_2m_max[idx],
            units.temperature || "C"
          );
          const minTemp = convertTemperature(
            daily.temperature_2m_min[idx],
            units.temperature || "C"
          );

          return (
            <li key={date} className="forecast-card">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
              </time>

              <figure>
                <img
                  src={icon}
                  alt={`Weather icon code ${code}`}
                  className="weather-icon"
                  style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
                />
                <figcaption className="daily-temp">
                  <span>{maxTemp}°</span>
                  <span>{minTemp}°</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default DailyForecast;
