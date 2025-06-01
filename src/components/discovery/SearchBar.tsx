
import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterClick, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const { t } = useTranslation('common');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(searchRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    
    // Add search animation
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleFilterClick = () => {
    onFilterClick();
    
    // Add filter button animation
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
      gsap.to(filterBtn, {
        rotate: 180,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div ref={searchRef} className="bg-white border-b border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex space-x-3 rtl:space-x-reverse">
        <div className="flex-1 relative">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('labels.search_placeholder')}
            className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          />
        </div>
        
        <button
          type="button"
          onClick={handleFilterClick}
          className="filter-btn p-3 bg-gray-100 border border-gray-200 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors font-medium"
        >
          {t('buttons.search')}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
