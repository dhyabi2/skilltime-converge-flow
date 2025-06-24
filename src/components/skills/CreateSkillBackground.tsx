
import React from 'react';

const CreateSkillBackground = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-20 h-20 bg-mint-400 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-soft-blue-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-pink-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default CreateSkillBackground;
