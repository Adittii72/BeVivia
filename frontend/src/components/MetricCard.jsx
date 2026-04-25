import React from 'react';

const MetricCard = ({ icon: Icon, label, value, subtext, color = 'blue' }) => {
  const colorVariants = {
    blue: { 
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-100 text-blue-600'
    },
    green: { 
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'bg-emerald-100 text-emerald-600'
    },
    orange: { 
      gradient: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'bg-amber-100 text-amber-600'
    },
    red: { 
      gradient: 'from-red-500 to-rose-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'bg-red-100 text-red-600'
    },
    purple: { 
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'bg-purple-100 text-purple-600'
    },
  };

  const style = colorVariants[color];

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${style.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group`}>
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold opacity-90 mb-2 tracking-wide">{label}</p>
          <p className="text-4xl font-bold mb-2">{value}</p>
          {subtext && <p className="text-xs opacity-80 font-medium">{subtext}</p>}
        </div>
        <div className={`p-4 ${style.icon} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

