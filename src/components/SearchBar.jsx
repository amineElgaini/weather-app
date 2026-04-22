import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { searchCity } from '../services/weatherService';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function SearchBar({ onCitySelect }) {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {

        setLoading(true);
        const results = await searchCity(query);
        setSuggestions(results);
        setIsOpen(true);
        setLoading(false);

      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city) => {
    onCitySelect(city);
    setQuery(city.name);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="z-100 h-5 w-5 text-blue-400 animate-spin" />
          ) : (
            <Search className="z-100 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          )}
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-12 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-2xl"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-3xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          {suggestions.map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-4 flex items-center gap-3 hover:bg-slate-700/50 transition-colors text-left border-b border-slate-700/50 last:border-0"
            >
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">{city.name}</div>
                <div className="text-xs text-slate-400">{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
