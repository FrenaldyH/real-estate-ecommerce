// ============================================================================
// Card Component
// Reusable card container
// ============================================================================

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick 
}: CardProps) {
  const baseStyles = 'bg-white rounded-xl border border-gray-200';
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverStyle = hover ? 'transition-all hover:shadow-lg hover:border-blue-200 cursor-pointer' : '';
  const clickableStyle = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyle} ${clickableStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
