import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
