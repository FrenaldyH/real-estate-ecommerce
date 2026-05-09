import { apiFetch } from './config';
import type { ApiProperty } from './properties';

export interface ApiWishlist {
  id: number;
  property: ApiProperty;
}

// GET /api/wishlist (auth required)
export function getWishlists() {
  return apiFetch<ApiWishlist[]>('/api/wishlist');
}

// POST /api/wishlist (auth required)
export function addToWishlist(propertyId: number, userId: number) {
  return apiFetch<ApiWishlist>('/api/wishlist', {
    method: 'POST',
    body: JSON.stringify({ property_id: propertyId, user_id: userId }),
  });
}

// DELETE /api/wishlist/:id (auth required)
export function removeFromWishlist(wishlistId: number) {
  return apiFetch<void>(`/api/wishlist/${wishlistId}`, { method: 'DELETE' });
}
