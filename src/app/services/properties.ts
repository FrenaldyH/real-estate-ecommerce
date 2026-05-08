import { apiFetch } from './config';

export interface ApiPropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ApiPropertyFacility {
  id: number;
  facility_type: {
    id: number;
    name: string; // "Kamar Tidur", "Kamar Mandi", "Garasi", "Kolam Renang", dll
  };
  amount: number;
}

// Dipakai untuk list response (GET /api/property, GET /api/property?filter=...)
// dan detail response (GET /api/property/:id)
export interface ApiProperty {
  id: number;
  title: string;
  description?: string;
  price: number;
  address?: string;
  city?: string;
  province?: string;
  listing_type: 'dijual' | 'disewa'; // bukan 'sale'/'rent' — pakai bahasa Indonesia
  status?: string;
  payment_method?: string;
  is_negotiable?: boolean;
  facing_direction?: string;
  has_car_access?: boolean;
  electrical_power?: number;
  land_size?: number;
  building_size?: number;
  floors?: number;
  certificate?: string;
  furnishing?: string;
  year_built?: number;
  is_featured?: boolean;
  rent_period?: string;
  imb_pbb?: boolean;
  // Tipe properti (dari join ke property_types)
  property_type?: {
    id: number;
    name: string; // "Rumah", "Apartemen", "Villa", "Tanah", "Ruko"
  };
  // List response: hanya satu gambar utama (object, bukan string)
  primary_image?: ApiPropertyImage;
  // Detail response: semua gambar dan fasilitas embedded
  images?: ApiPropertyImage[];
  facilities?: ApiPropertyFacility[];
}

export interface PropertyFilters {
  city?: string;
  province?: string;
  type?: string;          // Nama tipe: "Rumah", "Apartemen", "Villa", dll
  status?: string;        // "available", "sold", dll
  'listing-type'?: string; // "dijual" atau "disewa"
  min?: number;
  max?: number;
}

export function getProperties(filters?: PropertyFilters) {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== '') params.set(key, String(val));
    });
  }
  const query = params.toString() ? `?${params}` : '';
  return apiFetch<ApiProperty[]>(`/api/property${query}`);
}

export function getProperty(id: string | number) {
  return apiFetch<ApiProperty>(`/api/property/${id}`);
}

export function getPropertyImages(id: string | number) {
  return apiFetch<ApiPropertyImage[]>(`/api/property/${id}/images`);
}

export function getPropertyFacilities(id: string | number) {
  return apiFetch<ApiPropertyFacility[]>(`/api/property/${id}/facility`);
}

// POST /api/property (auth required)
export function postProperty(data: Partial<ApiProperty>) {
  return apiFetch<ApiProperty>('/api/property', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /api/property/:id (auth required)
export function updateProperty(id: string | number, data: Partial<ApiProperty>) {
  return apiFetch<ApiProperty>(`/api/property/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /api/property/:id (auth required)
export function deleteProperty(id: string | number) {
  return apiFetch<void>(`/api/property/${id}`, { method: 'DELETE' });
}

// POST /api/property/:id/image?prime=true|false (auth required, multipart/form-data)
export async function uploadPropertyImage(propertyId: string | number, formData: FormData, isPrimary = false) {
  const token = localStorage.getItem('rumahku-token');
  const res = await fetch(
    `${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/api/property/${propertyId}/image?prime=${isPrimary}`,
    {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  );
  return res.json();
}

// DELETE /api/property/:propertyId/image/:imageId (auth required)
export function deletePropertyImage(propertyId: string | number, imageId: string | number) {
  return apiFetch<void>(`/api/property/${propertyId}/image/${imageId}`, { method: 'DELETE' });
}

// Helper: ambil jumlah fasilitas berdasarkan nama (case-insensitive)
export function getFacilityAmount(facilities: ApiPropertyFacility[] | undefined, name: string): number {
  return facilities?.find(f =>
    f.facility_type.name.toLowerCase() === name.toLowerCase()
  )?.amount ?? 0;
}

/**
 * Mengubah ApiProperty (dari list endpoint) → format yang dibutuhkan PropertyCard.
 *
 * Catatan: list endpoint tidak mengembalikan bedrooms/bathrooms/land_size dll.
 * Field-field tersebut hanya tersedia di GET /api/property/:id (detail).
 * Saat ditampilkan di kartu, nilai 0 akan terlihat — ini normal untuk list view.
 */
export function mapToPropertyCard(p: ApiProperty) {
  const primaryImage =
    p.primary_image?.image_url ??
    p.images?.find(img => img.is_primary)?.image_url ??
    '';

  return {
    id: p.id,
    image: primaryImage,
    price: p.price,
    priceType: p.listing_type === 'dijual' ? 'sale' : 'rent' as 'sale' | 'rent',
    title: p.title,
    location: [p.city, p.province].filter(Boolean).join(', ') || p.address || '',
    bedrooms: getFacilityAmount(p.facilities, 'Kamar Tidur'),
    bathrooms: getFacilityAmount(p.facilities, 'Kamar Mandi'),
    landSize: p.land_size ?? 0,
    buildingSize: p.building_size ?? 0,
    certificate: p.certificate,
    yearBuilt: p.year_built,
    furnishing: p.furnishing,
    floors: p.floors,
    type: p.property_type?.name.toLowerCase() ?? '',
    featured: p.is_featured,
    agent: undefined,
  };
}
