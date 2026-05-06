// ============================================================================
// Loading State Component
// Full page or section loading state
// ============================================================================

import { Spinner } from './Spinner';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingState({ message = 'Memuat...', fullPage = false }: LoadingStateProps) {
  const containerClass = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center py-16';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}
