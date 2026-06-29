import React, { useState, useRef, useCallback, useEffect } from 'react';
import { getGoogleMapsLoader } from '../utils/mapsLoader';

interface SearchBarProps {
  onLocationSearch: (lat: number, lng: number, placeName: string) => void;
  isLoading?: boolean;
}

const sanitizeInput = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str.replace(/[${}]/g, '').trim();
};

let autocompleteService: google.maps.places.AutocompleteService | null = null;

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = getGoogleMapsLoader();

    (loader as any).importLibrary('places').then(() => {
      autocompleteService = new google.maps.places.AutocompleteService();
    }).catch((err: any) => {
      console.error('Failed to load Places library:', err);
    });
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchSuggestions = useCallback((input: string) => {
    if (!autocompleteService || input.length < 2) {
      setSuggestions([]);
      return;
    }

    autocompleteService.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'in' },
        types: ['geocode'],
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions.slice(0, 5));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const geocodeAndSearch = useCallback((address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address, componentRestrictions: { country: 'IN' } },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          onLocationSearch(loc.lat(), loc.lng(), address);
        }
      }
    );
  }, [onLocationSearch]);

  const handleSuggestionClick = (prediction: google.maps.places.AutocompletePrediction) => {
    setQuery(prediction.description);
    setShowSuggestions(false);
    geocodeAndSearch(prediction.description);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeInput(query);
    if (!sanitized) return;
    setShowSuggestions(false);
    geocodeAndSearch(sanitized);
  };

  return (
    <div className="search-bar" ref={containerRef} id="search-bar">
      <form onSubmit={handleSubmit} className="search-bar__form">
        <div className="search-bar__input-wrap">
          <span className="material-symbols-outlined search-bar__icon">search</span>
          <input
            type="text"
            className="search-bar__input"
            id="search-input"
            placeholder="Search city, area, or station..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={() => { setQuery(''); setSuggestions([]); }}
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
            </button>
          )}
        </div>
        <button
          type="submit"
          className="search-bar__btn"
          id="btn-search"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="search-bar__spinner" />
          ) : (
            'Search'
          )}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-bar__suggestions" id="search-suggestions">
          {suggestions.map(prediction => (
            <li
              key={prediction.place_id}
              className="search-bar__suggestion"
              onClick={() => handleSuggestionClick(prediction)}
            >
              <span className="material-symbols-outlined search-bar__suggestion-icon">
                location_on
              </span>
              <span className="search-bar__suggestion-text">
                {prediction.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
