import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  const glassClasses = glass 
    ? 'bg-white/20 backdrop-blur-lg border border-white/30' 
    : 'bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

  return (
    <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};