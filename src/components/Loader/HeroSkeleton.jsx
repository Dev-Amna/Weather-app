import React from "react";
import "../../styles/LoadingUI.css";

export default function HeroSkeleton() {
  return (
    <section className="hero-skeleton ">

       <div className="hero-box">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading...</p>
    </div>
    </section>
  );
}
