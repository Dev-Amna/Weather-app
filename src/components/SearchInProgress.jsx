import { useContext } from "react";
import "../styles/SearchInProgress.css";
import loadingIcon from "../assets/images/icon-loading.svg";
import loadingIconLight from "../assets/light-theme-images/icon-loading.svg";
import { ThemeContext } from "../ThemeContext/ThemeContext";



export default function SearchInProgress() {

  const { theme } = useContext(ThemeContext);

  return (
    <section className="search-in-progress" role="status" aria-live="polite">
 

      {/* Theme-aware search icon */}
      {theme === "dark" ? (
        <img src={loadingIcon} alt="Loading..." className="loading-icon" />
      ) : (
        <img src={loadingIconLight} alt="Loading..." className="loading-icon" />
      )}


      <p className="message">Search in progress</p>
    </section>
  );
}
