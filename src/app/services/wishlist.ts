import { apiFetch } from './config';
import type { ApiProperty } from './properties';

export interface ApiWishlist {
  id: number;
  property_id: number;
  property?: ApiProperty; // embedded when backend joins the data
}

// GET /api/user/wishlists
export function getWishlists() {
  return apiFetch<ApiWishlist[]>('/api/user/wishlists');
}

// POST /api/user/wishlists
export function addToWishlist(propertyId: number) {
  return apiFetch<ApiWishlist>('/api/user/wishlists', {
    method: 'POST',
    body: JSON.stringify({ property_id: propertyId }),
  });
}

// DELETE /api/user/wishlists/:id
export function removeFromWishlist(wishlistId: number) {
  return apiFetch<void>(`/api/user/wishlists/${wishlistId}`, { method: 'DELETE' });
}
