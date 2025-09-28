import "../styles/CurrentWeather.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits";
import clickLikeIcon from "../assets/images/click-like-icon.svg"
import heartIcon from "../assets/images/heart-icon.svg"
import { toast } from "react-toastify";



const CurrentWeather = ({ data, units = {}, onAddFavorite, onRemoveFavorite, favorites = [] }) => {
  if (!data || !data.current) return null;

  const { city, country, current } = data;
  const { temperature, weathercode } = current;

  // use convertUnits
  const displayTemp = convertTemperature(temperature, units.temperature || "C");
  const icon = getWeatherIcon(weathercode);

  // current date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  //  check if already favorite
  const isFavorite = favorites.some(
    (f) => f.city.toLowerCase() === city.toLowerCase()
  );
  //  //  toggle add/remove
  const handleToggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite(city);
      toast.info(`${city}, ${country} removed from favorites`);
    } else {
      onAddFavorite();
      toast.success(`${city}, ${country} saved to favorites`);
    }
  };
  return (
    <section className="current-weather" data-aos="zoom-in">
      <header className="current-weather-content">
        <h2>
          {city}, {country}
        </h2>
        <time className="current-date" dateTime={now.toISOString()}>
          {formattedDate}
        </time>
        
      </header>

      <figure className="current-weather-icon">
        {onAddFavorite && (
          <button className="favorite-btn"
            onClick={handleToggleFavorite}

          >

            <img
              src={isFavorite ? heartIcon : clickLikeIcon}
              alt={isFavorite ? "Added to favorites" : "Add to favorites"}
            />
          </button>
        )} 
        <img src={icon} alt="Weather Icon" />
        <figcaption className="current-temp">{displayTemp}°</figcaption>
      </figure>
    </section>
  );
};

export default CurrentWeather;
