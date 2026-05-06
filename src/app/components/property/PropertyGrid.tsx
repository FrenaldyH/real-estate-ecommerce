// ============================================================================
// Property Grid Component
// Grid layout for displaying properties
// ============================================================================

import { ReactNode } from 'react';

interface PropertyGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function PropertyGrid({ children, columns = 3 }: PropertyGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {children}
    </div>
  );
}
