 import { apiFetch } from './config';

// interface ini akan disesuaikan setelah backend mendokumentasikan
// response body untuk GET /api/property/:id/review
export interface ApiReview {
  id: number;
  property_id: number;
  user_id: number;
  content: string;
  rating: number;
  created_at: string;
  user?: {
    username: string;
    full_name: string;
  };
}

export function getPropertyReviews(propertyId: string | number) {
  return apiFetch<ApiReview[]>(`/api/property/${propertyId}/review`);
}

export function postReview(propertyId: string | number, data: { content: string; rating: number }) {
  return apiFetch<ApiReview>(`/api/property/${propertyId}/review`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateReview(reviewId: number, data: { content?: string; rating?: number }) {
  return apiFetch<ApiReview>(`/api/user/review/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteReview(reviewId: number) {
  return apiFetch<void>(`/api/user/review/${reviewId}`, { method: 'DELETE' });
}
