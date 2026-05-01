import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', className = '', variant = 'rectangular' }) => {
  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded'
  };

  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer ${variantClasses[variant]} ${className}`}
      style={{ 
        width, 
        height,
        backgroundSize: '200% 100%'
      }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <Skeleton width="60%" height="16px" className="mb-2" />
        <Skeleton width="40%" height="32px" />
      </div>
      <Skeleton variant="circular" width="48px" height="48px" />
    </div>
    <Skeleton width="80%" height="12px" />
  </div>
);

export default Skeleton;
