import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, TrendingUp, BarChart3, Brain, Lightbulb, Info, Zap } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { path: '/', icon: TrendingUp, label: 'Prediction', color: 'from-blue-500 to-cyan-500' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', color: 'from-indigo-500 to-blue-500' },
    { path: '/models', icon: Brain, label: 'Models', color: 'from-purple-500 to-pink-500' },
    { path: '/insights', icon: Lightbulb, label: 'Insights', color: 'from-amber-500 to-orange-500' },
    { path: '/about', icon: Info, label: 'About', color: 'from-slate-500 to-gray-500' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap size={22} />
            </div>
            <span className="font-bold text-lg text-white">BeVivia</span>
          </div>
          <button onClick={onToggle} className="lg:hidden text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <item.icon size={20} className="transition-transform group-hover:scale-110" />
              <span className="font-semibold text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="rounded-lg bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/20 p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                <p>v1.0.0 • Production</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
