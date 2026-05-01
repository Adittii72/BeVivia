import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  gradient = 'from-indigo-500 to-blue-600',
  subtitle
}) => {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="text-white" size={24} />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center gap-2">
          {changeType === 'positive' ? (
            <TrendingUp className="text-emerald-600" size={16} />
          ) : (
            <TrendingDown className="text-red-600" size={16} />
          )}
          <span className={`text-sm font-semibold ${
            changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
