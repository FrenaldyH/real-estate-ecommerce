import { apiFetch } from "./config";

// TODO: Interface ini masih perkiraan, akan diperbarui setelah backend mendokumentasikan
// response body untuk endpoint GET /api/property
export interface ApiProperty {
  id: number;
  title: string;
  description?: string;
  price: number;
  listing_type: "sale" | "rent"; // jual atau sewa (dari ?listing-type=)
  type: string; // rumah, apartemen, villa, tanah, komersial
  status?: string;
  city?: string;
  province?: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  land_size?: number;
  building_size?: number;
  floors?: number;
  carport?: number;
  garage?: number;
  electricity?: number;
  certificate?: string;
  furnishing?: string;
  year_built?: number;
  is_featured?: boolean;
  primary_image?: string;
  agent?: {
    id: number;
    user?: {
      full_name: string;
      phone_number?: string;
    };
  };
}

export interface ApiPropertyImage {
  id: number;
  url: string;
  is_primary: boolean;
}

export interface ApiPropertyFacility {
  id: number;
  name: string;
}

export interface PropertyFilters {
  city?: string;
  province?: string;
  type?: string;
  status?: string;
  "listing-type"?: string;
  min?: number;
  max?: number;
}

export function getProperties(filters?: PropertyFilters) {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== "") params.set(key, String(val));
    });
  }
  const query = params.toString() ? `?${params}` : "";
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

export function deleteProperty(id: string | number) {
  return apiFetch<void>(`/api/property/${id}`, { method: "DELETE" });
}

// Agent property actions (butuh token)
export function agentPostProperty(data: Partial<ApiProperty>) {
  return apiFetch<ApiProperty>("/api/agent/property", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function agentUpdateProperty(
  id: string | number,
  data: Partial<ApiProperty>,
) {
  return apiFetch<ApiProperty>(`/api/agent/property/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function agentDeleteProperty(id: string | number) {
  return apiFetch<void>(`/api/agent/property/${id}`, { method: "DELETE" });
}

export function agentUploadPropertyImage(
  propertyId: string | number,
  formData: FormData,
  isPrimary = false,
) {
  // Upload gambar tidak menggunakan JSON, jadi tidak melalui apiFetch
  const token = localStorage.getItem("rumahku-token");
  return fetch(
    `${import.meta.env.VITE_API_URL ?? "http://localhost:8080"}/api/agent/property/${propertyId}/image?prime=${isPrimary}`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    },
  ).then((r) => r.json());
}

export function agentDeletePropertyImage(
  propertyId: string | number,
  imageId: string | number,
) {
  return apiFetch<void>(`/api/agent/property/${propertyId}/image/${imageId}`, {
    method: "DELETE",
  });
}

/**
 * Mengubah ApiProperty => format yang dibutuhkan PropertyCard.
 * Fungsi ini menjadi jembatan antara data backend dan komponen UI.
 */
export function mapToPropertyCard(p: ApiProperty) {
  return {
    id: p.id,
    image: p.primary_image ?? "",
    price: p.price,
    priceType: p.listing_type,
    title: p.title,
    location:
      [p.city, p.province].filter(Boolean).join(", ") || p.address || "",
    bedrooms: p.bedrooms ?? 0,
    bathrooms: p.bathrooms ?? 0,
    landSize: p.land_size ?? 0,
    buildingSize: p.building_size ?? 0,
    certificate: p.certificate,
    yearBuilt: p.year_built,
    furnishing: p.furnishing,
    floors: p.floors,
    type: p.type,
    featured: p.is_featured,
    agent: p.agent?.user
      ? { name: p.agent.user.full_name, image: "" }
      : undefined,
  };
}
