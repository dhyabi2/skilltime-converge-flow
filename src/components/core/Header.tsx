
import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            SkillTime
          </h1>
          <p className="text-xs text-gray-600">Where Skills Converge</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
