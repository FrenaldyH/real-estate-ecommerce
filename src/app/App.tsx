import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  );
}