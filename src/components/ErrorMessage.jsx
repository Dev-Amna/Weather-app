import React, { useContext } from "react";

import { ThemeContext } from "../ThemeContext/ThemeContext";
import "../styles/ErrorMessage.css";

import errorImg from "../assets/images/icon-error.svg";
import errorImgLight from "../assets/light-theme-images/icon-error.svg";

import retryIcon from "../assets/images/icon-retry.svg";
import retryIconLight from "../assets/light-theme-images/icon-retry.svg";



function ErrorMessage({ message, onRetry }) {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="error-container" role="alert" data-aos="zoom-in">
      <article className="error-message">
        <figure className="error-icon">

          {theme === "dark" ? (
            <img src={errorImg} alt="error-icon" />
          ) : (
            <img src={errorImgLight} alt="error-icon" />
          )}

        </figure>

        <header>
          <h2>Something went wrong</h2>
        </header>

        <p>
          {message ||
            "We couldn’t connect to the server (API error). Please try again in a few moments."}
        </p>

        <button className="retry-btn" onClick={onRetry}>
          {theme === "dark" ? (
            <img src={retryIcon} alt="retry-icon" />
          ) : (
            <img src={retryIconLight} alt="retry-icon" />
          )}
          Retry
        </button>
      </article>
    </section>
  );
}

export default ErrorMessage;
