
import React from "react";
import "../../styles/LoadingUI.css";

export default function DailySkeleton() {
  return (
    <section className="daily-forecast">  
      <h3>Daily Forecast</h3>

      <div className="forecast-list"> 
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="forecast-card forecast-card-skeleton" key={i}>

          </div>
        ))}
      </div>
    </section>
  );
}
