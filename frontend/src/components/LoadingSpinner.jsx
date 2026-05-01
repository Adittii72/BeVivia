import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin`}></div>
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-blue-400 animate-spin absolute top-0 left-0`} style={{ animationDuration: '1.5s' }}></div>
      </div>
      {text && <p className="text-gray-600 font-medium animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
