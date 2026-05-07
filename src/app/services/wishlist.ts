import { apiFetch } from './config';
import type { ApiProperty } from './properties';

// interface ini akan disesuaikan kembali setelah backend mendokumentasikan
// response body untuk GET /api/user/wishlists
export interface ApiWishlist {
  id: number;
  property_id: number;
  property?: ApiProperty;
}

export function getWishlists() {
  return apiFetch<ApiWishlist[]>('/api/user/wishlists');
}

export function addToWishlist(propertyId: number) {
  return apiFetch<ApiWishlist>('/api/user/wishlists', {
    method: 'POST',
    body: JSON.stringify({ property_id: propertyId }),
  });
}

export function removeFromWishlist(wishlistId: number) {
  return apiFetch<void>(`/api/user/wishlists/${wishlistId}`, { method: 'DELETE' });
}
