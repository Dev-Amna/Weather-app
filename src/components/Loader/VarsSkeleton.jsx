

import React from "react";
import "../../styles/LoadingUI.css";

export default function VarsSkeleton() {
  return (
    <section className="weather-stats">   {/* use same class as WeatherStats */}
      {["Feels Like", "Humidity", "Wind Speed", "Precipitation"].map((label, idx) => (
        <div className="stat-card seleton-stat-card" key={idx}>
          <h4>{label}</h4>
          <span className="skeleton-line"></span>
        </div>
      ))}
    </section>
  );
}
