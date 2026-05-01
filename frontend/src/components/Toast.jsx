import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle2,
      bgColor: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-900'
    },
    error: {
      icon: XCircle,
      bgColor: 'from-red-500 to-rose-600',
      borderColor: 'border-red-200',
      textColor: 'text-red-900'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900'
    },
    info: {
      icon: Info,
      bgColor: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-900'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor } = config[type];

  return (
    <div className={`fixed top-6 right-6 z-50 animate-slideInLeft max-w-md`}>
      <div className={`rounded-xl bg-white/90 backdrop-blur-xl border ${borderColor} shadow-2xl p-4 flex items-start gap-3`}>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className="text-white" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${textColor} font-medium text-sm`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
