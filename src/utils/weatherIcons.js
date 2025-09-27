import sunnyIcon from "../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconCloudy from "../assets/images/icon-overcast.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";

export const getWeatherIcon = (code) => {
  if (code === 0 || code === 1) {
    return sunnyIcon; // Clear / Mainly clear
  } else if (code === 2) {
    return iconPartlyCloudy; // Partly cloudy
  } else if (code === 3) {
    return iconCloudy; // Overcast
  } else if (code === 45 || code === 48) {
    return iconFog; // Fog
  } else if (code >= 51 && code <= 57) {
    return iconDrizzle; // Drizzle
  } else if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return iconRain; // Rain
  } else if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return iconSnow; // Snow
  } else if (code >= 95 && code <= 99) {
    return iconStorm; // Thunderstorm
  } else {
    return sunnyIcon; // Default fallback
  }
};
