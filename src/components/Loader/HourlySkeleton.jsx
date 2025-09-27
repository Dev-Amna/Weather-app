import React from "react";
import "../../styles/LoadingUI.css";
import dropDownIcon from "../../assets/images/icon-dropdown.svg";

export default function HourlySkeleton() {
  return (
    <section className="hourly-forecast">   {/* same as HourlyForecast */}
  <div className="hourly-forecast-top">
    <h3>Hourly Forecast</h3>
    <div className="day-dropdown">
      <button className="day-btn">
        —
        <img src={dropDownIcon} alt="dropdown" className="dropdown-icon" />
      </button>
    </div>
  </div>

  <div className="hourly-list">
    {Array.from({ length: 12 }).map((_, i) => (
      <div className="hour-card skeleton-hourly" key={i} >

      </div>
    ))}
  </div>
</section>

  );
}
