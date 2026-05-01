import React from 'react';

const ProgressBar = ({ value, max = 100, label, color = 'indigo', showPercentage = true, size = 'md' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    indigo: 'from-indigo-500 to-blue-600',
    emerald: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-500 to-orange-600',
    red: 'from-red-500 to-rose-600',
    purple: 'from-purple-500 to-pink-600'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className={`text-sm font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full bg-white/20 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
