import React from 'react';
import { Menu, Bell, Zap } from 'lucide-react';

const Header = ({ onMenuClick, isHealthy, isHealthLoading }) => {
  return (
    <header className="h-20 bg-gradient-to-r from-white/90 via-blue-50/70 to-indigo-50/70 backdrop-blur-xl border-b border-white/40 shadow-sm sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100/60 rounded-lg transition-colors text-gray-600"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                BeVivia
              </h1>
              <p className="text-xs text-gray-500 font-medium">v1.0</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Health Status */}
          <div className="flex items-center gap-2">
            {!isHealthLoading && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/60">
                <div className={`w-2.5 h-2.5 rounded-full ${isHealthy ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-xs text-gray-600 font-medium">
                  {isHealthy ? 'System Healthy' : 'Offline'}
                </span>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2.5 hover:bg-slate-100/60 rounded-lg transition-all text-gray-600 hover:text-indigo-600 relative group">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-lg"></span>
            <span className="absolute -top-8 right-0 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              No notifications
            </span>
          </button>

          {/* User Profile */}
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:scale-105 transition-all">
            AB
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
