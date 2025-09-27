import { useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext/ThemeContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundMessage from "./components/NotFoundMessage";

// Skeleton loaders
import HeroSkeleton from "./components/Loader/HeroSkeleton";
import VarsSkeleton from "./components/Loader/VarsSkeleton";
import DailySkeleton from "./components/Loader/DailySkeleton";
import HourlySkeleton from "./components/Loader/HourlySkeleton";

import { useWeather } from "./hooks/useWeather";

import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import "./responsive/responsive.css";

export default function App() {
  const {
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
    favorites,
    addFavorite,
    removeFavorite,
  } = useWeather("Berlin");
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, mirror: false });
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-section">
        <Header
          units={units}
          setUnits={setUnits}
          favorites={favorites}
          onFavoriteSelect={handleSearch}
          onRemoveFavorite={removeFavorite}
        />
      </header>

      {/* Search Bar */}
      {!error && (
        <section className="search-bar-section">
          <SearchBar onSearch={handleSearch} searching={searching} />
        </section>
      )}

      {/* Error / Not Found States */}
      {error ? (

        <ErrorMessage message={error} onRetry={handleRetry} role="alert" />

      ) : notFound ? (

        <NotFoundMessage onRetry={handleRetry} role="alert" />

      ) : (
        <>


          {loading && !weather ? (
            <>
              <article className={`current-weather-section ${theme}`}><HeroSkeleton /></article>
              <article className="weather-stats-section"><VarsSkeleton /></article>
              <article className="daily-forecast-section"><DailySkeleton /></article>
              <article className="hourly-forecast-section"><HourlySkeleton /></article>
            </>
          ) : weather ? (
            <>
              <article className={`current-weather-section ${theme}`}>
                <CurrentWeather data={weather}
                  units={units}
                  onRemoveFavorite={removeFavorite}
                  onAddFavorite={() => addFavorite(weather.city, weather.country)}
                  favorites={favorites} />
              </article>
              <article className="weather-stats-section">
                <WeatherStats data={weather.current} units={units} />
              </article>
              <article className="daily-forecast-section">
                <DailyForecast daily={weather.daily} units={units} />
              </article>
              <article className="hourly-forecast-section">
                <HourlyForecast
                  hourly={weather.hourly}
                  daily={weather.daily}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  units={units}
                />
              </article>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
