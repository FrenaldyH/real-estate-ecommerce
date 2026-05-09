import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ChatProvider } from './context/ChatContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <ChatProvider>
            <RouterProvider router={router} />
          </ChatProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
