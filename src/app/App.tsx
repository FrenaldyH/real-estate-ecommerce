import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </AuthProvider>
  );
}
