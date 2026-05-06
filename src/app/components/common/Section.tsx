// ============================================================================
// Section Component
// Consistent section wrapper for page content
// ============================================================================

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Section({ 
  children, 
  className = '',
  background = 'transparent',
  padding = 'lg',
  maxWidth = 'xl'
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent',
  };

  const paddings = {
    none: '',
    sm: 'py-6',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
      <div className={`${maxWidths[maxWidth]} mx-auto px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
