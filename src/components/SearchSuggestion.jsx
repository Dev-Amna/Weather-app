import "../styles/SearchSuggestion.css";

export default function SearchSuggestion({ suggestions, activeIndex, onSelect }) {
  if (suggestions.length === 0) return null;

  return (
    <aside className="suggestions-dropdown" aria-label="Search suggestions">
      <ul role="listbox">
        {suggestions.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            role="option"
            aria-selected={i === activeIndex}
            className={i === activeIndex ? "active" : ""}
            onClick={() => onSelect(s)}
            tabIndex={0}
          >
            {s.display}
          </li>
        ))}
      </ul>
    </aside>
  );
}
