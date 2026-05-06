import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Property {
  id: number;
  image: string;
  price: string;
  title: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  featured?: boolean;
}

interface WishlistContextType {
  wishlist: Property[];
  addToWishlist: (property: Property) => void;
  removeFromWishlist: (propertyId: number) => void;
  isInWishlist: (propertyId: number) => boolean;
  toggleWishlist: (property: Property) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useLocalStorage<Property[]>('rumahku-wishlist', []);

  const addToWishlist = (property: Property) => {
    setWishlist(prev => {
      if (!prev.find(p => p.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromWishlist = (propertyId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== propertyId));
  };

  const isInWishlist = (propertyId: number) => {
    return wishlist.some(p => p.id === propertyId);
  };

  const toggleWishlist = (property: Property) => {
    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}