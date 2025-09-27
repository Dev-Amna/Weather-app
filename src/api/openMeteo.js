// src/api/openMeteo.js

// Get latitude & longitude for a city
export async function fetchCoordinates(city) {
  if (!city) return null;

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );

  if (!geoRes.ok) {
    throw new Error("Failed to fetch location"); // API/network issue
  }

  const geoData = await geoRes.json();

  // If no results, return null, don't throw
  if (!geoData.results || geoData.results.length === 0) {
    return null;
  }

  return {
    lat: geoData.results[0].latitude,
    lon: geoData.results[0].longitude,
    name: geoData.results[0].name,
    country: geoData.results[0].country,
  };
}

// Get weather data by coordinates
export async function fetchWeather(lat, lon, units = "metric") {
  const params =
    units === "metric"
      ? "&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm"
      : "&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch";

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto${params}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return await res.json();
}
