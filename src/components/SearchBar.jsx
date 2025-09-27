
import { useState, useEffect, useRef, useContext } from "react";
import SearchInProgress from "./SearchInProgress";
import SearchSuggestion from "./SearchSuggestion";
import "../styles/SearchBar.css";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { toast } from "react-toastify";

import useDebounce from "../hooks/useDebounce";
import useVoiceSearch from "../hooks/useVoiceSearch";

// Icons
import searchIcon from "../assets/images/icon-search.svg";
import searchIconLight from "../assets/light-theme-images/icon-search.svg";

import microPhoneIcon from "../assets/images/microphone.svg";
import microPhoneIconLight from "../assets/light-theme-images/microphone.svg";

import offPhoneIcon from "../assets/images/icon-microphone-sound-off.svg"
import offPhoneLightIcon from "../assets/light-theme-images/icon-microphone-sound-off.svg"

import stopListeningIcon from "../assets/images/red-radio-microphone-icon.svg";


export default function SearchBar({ onSearch, searching }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedCity = useDebounce(city, 500);
  const wrapperRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  //  use voice search hook
  const { listening, micPermission, startVoiceSearch } = useVoiceSearch(setCity);

  // --- normalize input ---
  const normalizeInput = (str) => str.replace(/\s+/g, "").trim();

  // --- fetch suggestions ---
  useEffect(() => {
    const normalized = normalizeInput(debouncedCity);
    if (!normalized) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    async function fetchSuggestions() {
      try {
        const q = encodeURIComponent(normalized);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=5&language=en&format=json`
        );
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        if (cancelled) return;

        const results = (data.results || []).map((r) => ({
          name: normalizeInput(r.name),
          country: r.country,
          admin1: r.admin1,
          display: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}${r.country ? ", " + r.country : ""}`,
        }));

        setSuggestions(results);
        setActiveIndex(-1);
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }

    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedCity]);

  //  click outside 
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizeInput(city);
    if (!normalized) return;
    onSearch(normalized);
    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  //  handle select
  const handleSelect = (s) => {
    const normalized = normalizeInput(s.name);
    onSearch(normalized);
    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };
  // handle voiceSearch
  // --- handle voice button click ---
  const handleVoiceClick = () => {
    if (micPermission === "denied") {
      toast.error("Microphone blocked! Please enable it in your browser settings.");
      return;
    }

    startVoiceSearch();
  };

  // --- keyboard navigation (same as before) ---
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <section className="search-bar" ref={wrapperRef}>
      <h1 data-aos="fade-down">How&apos;s the sky looking today?</h1>
      <form className="search-bar-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="inputs">

          <div className="input-box" data-aos="fade-right">
            <img
              src={theme === "dark" ? searchIcon : searchIconLight}
              alt="search-icon"

              className="search-icon"
            />

            <input
              type="text"
              placeholder="Search for a place..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}

            />

            {/* mic button */}

            <button
              type="button"
              className={`mic-btn tooltip ${listening ? "active" : ""}`}
              onClick={handleVoiceClick}
            >
              <img
                src={
                  micPermission === "denied"
                    ? theme === "dark"
                      ? offPhoneIcon
                      : offPhoneLightIcon
                    : listening
                      ? stopListeningIcon
                      : theme === "dark"
                        ? microPhoneIcon
                        : microPhoneIconLight
                }
                alt="mic-status"
              />
              {/* tooltip on mic */}
              <span className="tooltip-text">
                {micPermission === "denied"
                  ? "Microphone blocked"
                  : listening
                    ? "Stop voice search"
                    : "Start voice search"}
              </span>
            </button>
          </div>

          {searching && <SearchInProgress />}
          <SearchSuggestion
            suggestions={suggestions}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>

        <button type="submit" data-aos="fade-left" className="custom-btn">
          Search
        </button>
      </form>
    </section>
  );
}
