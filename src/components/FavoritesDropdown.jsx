import React, { useState, useRef, useEffect } from "react";
import "../styles/Favorites.css";
import "../styles/Tooltip.css"; 

import likeIcon from "../assets/images/all-like-icon.svg";
import removeIcon from "../assets/images/remove.svg";
import { toast } from "react-toastify";

function FavoritesDropdown({ favorites, onFavoriteSelect, onRemoveFavorite }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //  Wrapper with toast
  const handleRemove = (city) => {
    onRemoveFavorite(city);
    toast.info(`${city} removed from favorites `);
  };
  return (
    <div className="favorites" ref={dropdownRef}>
    <div className="tooltip">
        <button
          className="favorites-btn"
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <img src={likeIcon} alt="like icons" />
           Favorites
        </button>
   
       
        {/* Tooltip text is hidden if dropdown is open */}
        {!open && (
          <span className="tooltip-text">
            saved locations
          </span>
        )}
      </div>
      {open && (
        <div className="favorites-dropdown">
          {favorites.length === 0 ? (
            <p className="no-favorites">No favorites yet</p>
          ) : (
            <ul className="favorites-list">
              {favorites.map((fav) => (
                <li key={fav.city} className="favorite-item">
                  <button
                    className="favorite-city"
                    onClick={() => onFavoriteSelect(fav.city)}
                  >
                    {fav.city}, {fav.country}
                  </button>
                  <button
                    className="remove-btn"
                  onClick={() => handleRemove(fav.city)}
                  >
                    <img src={removeIcon} alt="remove-icon" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesDropdown;
