
import React, { useRef, useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { gsap } from 'gsap';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterClick }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(searchRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (searchRef.current) {
      gsap.to(searchRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (searchRef.current) {
      gsap.to(searchRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 mb-4">
      <div
        ref={searchRef}
        className={`flex items-center bg-white rounded-2xl shadow-md transition-all duration-300 ${
          isFocused ? 'shadow-lg ring-2 ring-purple-200' : ''
        }`}
      >
        <div className="flex-1 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search skills, services..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <button
          type="button"
          onClick={onFilterClick}
          className="p-3 border-l border-gray-200 text-gray-400 hover:text-purple-600 transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
