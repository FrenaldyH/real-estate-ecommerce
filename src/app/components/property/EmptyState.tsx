// ============================================================================
// Empty State Component
// Display when no items found
// ============================================================================

import { Home, Search } from 'lucide-react';
import { Button } from '../common';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'home' | 'search';
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'Tidak Ada Properti',
  description = 'Belum ada properti yang sesuai dengan pencarian Anda.',
  icon = 'search',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Icon = icon === 'home' ? Home : Search;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
