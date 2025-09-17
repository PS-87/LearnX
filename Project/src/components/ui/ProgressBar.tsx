import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  className = '',
  color = 'primary'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600',
    secondary: 'bg-gradient-to-r from-orange-500 to-pink-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color]} relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};