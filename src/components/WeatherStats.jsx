import React from "react";
import "../styles/WeatherStats.css";
import {
  convertTemperature,
  convertSpeed,
  convertPrecipitation,
} from "../utils/convertUnits";

function WeatherStats({ data, units = {} }) {
  if (!data) return null;

  const stats = [
    {
      title: "Feels Like",
      value: convertTemperature(
        data.apparent_temperature ?? data.temperature,
        units.temperature || "C"
      ),
      unit: "°",
    },
    {
      title: "Humidity",
      value: data.relativehumidity_2m ?? "-",
      unit: "%",
    },
    {
      title: "Wind Speed",
      value: convertSpeed(data.windspeed, units.windspeed || "km/h"),
      unit: units.windspeed || "km/h",
    },
    {
      title: "Precipitation",
      value: convertPrecipitation(
        data.precipitation ?? 0,
        units.precipitation || "mm"
      ),
      unit: units.precipitation || "mm",
    },
  ];

  return (
    <section className="weather-stats" aria-label="Weather statistics">
      {stats.map((stat, index) => (
        <article key={index} className="stat-card">
          <h4 data-aos="zoom-in">{stat.title}</h4>
          <p data-aos="zoom-in">
            {stat.value} {stat.unit}
          </p>
        </article>
      ))}
    </section>
  );
}

export default WeatherStats;
