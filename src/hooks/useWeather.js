// import { useState, useEffect } from "react";
// import { fetchCoordinates, fetchWeather } from "../api/openMeteo";
// import { reverseGeocode } from "../api/reverseGeocode";

// export function useWeather(defaultCity = "Berlin") {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");
//   const [notFound, setNotFound] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [searching, setSearching] = useState(false);
//   const [initialLoad, setInitialLoad] = useState(true);

//   const [units, setUnits] = useState({
//     temperature: "C",
//     windspeed: "km/h",
//     precipitation: "mm",
//   });

//   const [selectedDay, setSelectedDay] = useState(0);
//   const [lastCity, setLastCity] = useState(defaultCity);

//   // DRY helper
//   const loadWeather = async (lat, lon, cityName, countryName = "") => {
//     try {
//       const data = await fetchWeather(lat, lon, "metric");
//       setWeather({
//         city: cityName,
//         country: countryName,
//         current: data.current_weather,
//         daily: data.daily,
//         hourly: data.hourly,
//       });
//       setLastCity(cityName);
//       setError("");
//       setNotFound(false);
//     } catch (err) {
//       if (err.message.includes("Location not found")) {
//         setNotFound(true);
//       } else {
//         setError("API error: Could not fetch weather data");
//       }
//       setWeather(null);
//     } finally {
//       setLoading(false);
//       setSearching(false);
//       setInitialLoad(false);
//     }
//   };

//   // Handle search
//   const handleSearch = async (city) => {
//     if (!city) return;
//     setLastCity(city);
//     setError("");
//     setNotFound(false);

//     if (initialLoad) setLoading(true);
//     else setSearching(true);

//     try {
//       const location = await fetchCoordinates(city);
//       if (!location) {
//         setNotFound(true);
//         setWeather(null);
//       } else {
//         await loadWeather(location.lat, location.lon, location.name, location.country);
//         return;
//       }
//     } catch (err) {
//       if (err.message.includes("Location not found")) {
//         setNotFound(true);
//       } else {
//         setError("API error: Could not fetch weather data");
//       }
//       setWeather(null);
//     } finally {
//       setLoading(false);
//       setSearching(false);
//       setInitialLoad(false);
//     }
//   };

//   // Auto-detect on first load
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async ({ coords }) => {
//           try {
//             const location = await reverseGeocode(coords.latitude, coords.longitude);
//             if (!location) {
//               handleSearch(defaultCity);
//               return;
//             }
//             await loadWeather(coords.latitude, coords.longitude, location.name, location.country);
//           } catch {
//             handleSearch(defaultCity);
//           }
//         },
//         () => handleSearch(defaultCity)
//       );
//     } else {
//       handleSearch(defaultCity);
//     }
//   }, []);

//   // Retry
//   const handleRetry = () => {
//     setError("");
//     setNotFound(false);
//     handleSearch(lastCity || defaultCity);
//   };

//   return {
//     weather,
//     error,
//     notFound,
//     loading,
//     searching,
//     units,
//     setUnits,
//     selectedDay,
//     setSelectedDay,
//     handleSearch,
//     handleRetry,
//   };
// }



import { useState, useEffect } from "react";
import { fetchCoordinates, fetchWeather } from "../api/openMeteo";
import { reverseGeocode } from "../api/reverseGeocode";

const FAVORITES_KEY = "weather-favorites";

export function useWeather(defaultCity = "Berlin") {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [units, setUnits] = useState({
    temperature: "C",
    windspeed: "km/h",
    precipitation: "mm",
  });

  const [selectedDay, setSelectedDay] = useState(0);
  const [lastCity, setLastCity] = useState(defaultCity);

  // ⭐ Favorites state (load from localStorage initially)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // ⭐ Add favorite
  const addFavorite = (city, country = "") => {
    if (!city) return;
    const exists = favorites.find(
      (f) => f.city.toLowerCase() === city.toLowerCase()
    );
    if (!exists) {
      setFavorites([...favorites, { city, country }]);
    }
  };

  // ⭐ Remove favorite
  const removeFavorite = (city) => {
    setFavorites(
      favorites.filter((f) => f.city.toLowerCase() !== city.toLowerCase())
    );
  };

  // DRY helper
  const loadWeather = async (lat, lon, cityName, countryName = "") => {
    try {
      const data = await fetchWeather(lat, lon, "metric");
      setWeather({
        city: cityName,
        country: countryName,
        current: data.current_weather,
        daily: data.daily,
        hourly: data.hourly,
      });
      setLastCity(cityName);
      setError("");
      setNotFound(false);
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true);
      } else {
        setError("API error: Could not fetch weather data");
      }
      setWeather(null);
    } finally {
      setLoading(false);
      setSearching(false);
      setInitialLoad(false);
    }
  };

  // Handle search
  const handleSearch = async (city) => {
    if (!city) return;
    setLastCity(city);
    setError("");
    setNotFound(false);

    if (initialLoad) setLoading(true);
    else setSearching(true);

    try {
      const location = await fetchCoordinates(city);
      if (!location) {
        setNotFound(true);
        setWeather(null);
      } else {
        await loadWeather(
          location.lat,
          location.lon,
          location.name,
          location.country
        );
        return;
      }
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true);
      } else {
        setError("API error: Could not fetch weather data");
      }
      setWeather(null);
    } finally {
      setLoading(false);
      setSearching(false);
      setInitialLoad(false);
    }
  };

  // Auto-detect on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const location = await reverseGeocode(
              coords.latitude,
              coords.longitude
            );
            if (!location) {
              handleSearch(defaultCity);
              return;
            }
            await loadWeather(
              coords.latitude,
              coords.longitude,
              location.name,
              location.country
            );
          } catch {
            handleSearch(defaultCity);
          }
        },
        () => handleSearch(defaultCity)
      );
    } else {
      handleSearch(defaultCity);
    }
  }, []);

  // Retry
  const handleRetry = () => {
    setError("");
    setNotFound(false);
    handleSearch(lastCity || defaultCity);
  };

 return {
    weather,
    error,
    notFound,
    loading,
    searching,
    units,
    setUnits,
    selectedDay,
    setSelectedDay,
    handleSearch,
    handleRetry,
    //new exports
    favorites,
    addFavorite,
    removeFavorite,
  };
}
