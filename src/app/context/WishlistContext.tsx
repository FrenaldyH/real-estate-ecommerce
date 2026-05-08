import { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { getWishlists, addToWishlist as apiAdd, removeFromWishlist as apiRemove } from '../services/wishlist';

interface Property {
  id: number;
  image: string;
  price: number;
  title: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  landSize?: number;
  buildingSize?: number;
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
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useLocalStorage<Property[]>('rumahku-wishlist', []);
  // Maps propertyId → API wishlist record id (needed for DELETE)
  const apiIdMap = useRef<Map<number, number>>(new Map());

  // When user logs in, fetch API wishlist and sync property IDs into local state
  useEffect(() => {
    if (!isAuthenticated) return;
    getWishlists()
      .then((items) => {
        items.forEach((item) => {
          // Store API record id for later deletion
          apiIdMap.current.set(item.property_id, item.id);
          // If the API embeds full property data, add it to local wishlist
          if (item.property) {
            setWishlist((prev) => {
              const alreadyIn = prev.some((p) => p.id === item.property_id);
              if (alreadyIn) return prev;
              const p = item.property!;
              return [...prev, {
                id: p.id,
                image: p.primary_image?.image_url ?? p.images?.[0]?.image_url ?? '',
                price: p.price,
                title: p.title,
                location: [p.city, p.province].filter(Boolean).join(', ') || p.address || '',
                landSize: p.land_size,
                buildingSize: p.building_size,
                featured: p.is_featured,
              }];
            });
          }
        });
        // Remove local items that are no longer in API wishlist
        const apiPropertyIds = new Set(items.map((i) => i.property_id));
        setWishlist((prev) => prev.filter((p) => {
          // Keep items not yet in API (will be added) or confirmed in API
          return !isAuthenticated || apiPropertyIds.has(p.id) || !apiIdMap.current.has(p.id);
        }));
      })
      .catch(() => {
        // silently ignore — keep localStorage wishlist as-is
      });
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToWishlist = (property: Property) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
    showToast('Properti ditambahkan ke wishlist', 'success');
    if (isAuthenticated) {
      apiAdd(property.id)
        .then((item) => { apiIdMap.current.set(property.id, item.id); })
        .catch(() => {});
    }
  };

  const removeFromWishlist = (propertyId: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== propertyId));
    showToast('Properti dihapus dari wishlist', 'info');
    if (isAuthenticated) {
      const wishlistId = apiIdMap.current.get(propertyId);
      if (wishlistId) {
        apiRemove(wishlistId).catch(() => {});
        apiIdMap.current.delete(propertyId);
      }
    }
  };

  const isInWishlist = (propertyId: number) => wishlist.some((p) => p.id === propertyId);

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
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
