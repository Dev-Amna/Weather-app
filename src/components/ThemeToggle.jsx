import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext.jsx"; 
import sunIcon from "../assets/images/sun.svg";
import moonIcon from "../assets/light-theme-images/moon.svg";
import "../styles/ThemeToggle.css";
import "../styles/Tooltip.css";
function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="tooltip">
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <img
          src={theme === "dark" ? sunIcon : moonIcon}
          alt={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        />

      </button>
      <span className="tooltip-text">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>

    </div>

  );
}

export default ThemeToggle;
