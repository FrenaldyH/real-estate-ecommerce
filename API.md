# API Reference

Backend API dari sisi backend-engineer. Base URL belum ditentukan, llalu simpan di environment variable saat backend siap.

```ts
// src/app/services/config.ts (buat nanti)
export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
```

> **Auth** — endpoint yang butuh login kirim token di header: `Authorization: Bearer <token>`

---

## Auth

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/auth/login` | — | Login, dapat token | `LoginModal` |

---

## User

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/user` | — | Registrasi user baru | `RegisterModal` |
| GET | `/api/user` | — | Semua users | (admin, belum ada halamannya) |
| GET | `/api/user/:username` | — | Detail user | profile page (belum ada) |
| PUT | `/api/user/:username` | ✓ | Update profil | profile page (belum ada) |
| PUT | `/api/user/role?role-name=` | ✓ | Switch ke role agent | `AdvertiserPage` / flow upgrade akun |
| DELETE | `/api/user/:username` | ✓ | Hapus akun | profile page (belum ada) |

---

## Agent

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/agent` | — | Buat profil agent | `ListingFormPage` (role agent) |
| GET | `/api/agent` | — | Semua agent | `AgentListPage` |
| GET | `/api/agent/:username` | — | Detail agent | halaman detail agent (belum ada) |
| GET | `/api/agent/top?limit=` | — | Top agent by sold | bisa ditampilkan di `HomePage` |
| PUT | `/api/agent/:username` | ✓ | Update profil agent | halaman edit agent (belum ada) |
| PUT | `/api/agent/role?role-name=` | ✓ | Switch role | (admin/internal) |
| DELETE | `/api/agent/:username` | ✓ | Hapus agent | (admin) |

---

## Agency

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/agency` | — | Buat agency | (belum ada halamannya) |
| GET | `/api/agency` | — | Semua agency | (belum ada halamannya) |
| GET | `/api/agency/:agency-name` | — | Detail agency | (belum ada halamannya) |
| PUT | `/api/agency/:agency-name` | — | Update agency | (belum ada halamannya) |
| DELETE | `/api/agency/:agency-name` | ✓ | Hapus agency | (admin) |

---

## Property

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| GET | `/api/property` | — | Semua properti | `PropertiesPage`, `BuyPropertiesPage`, `RentPropertiesPage` |
| GET | `/api/property/:property-id` | — | Detail properti | `PropertyDetailPage` |
| GET | `/api/property/:id/images` | — | Semua gambar properti | `PropertyDetailPage` |
| GET | `/api/property/:id/facility` | — | Semua fasilitas properti | `PropertyDetailPage` |
| GET | `/api/property?city=` | — | Filter by kota | `PropertyFilters` |
| GET | `/api/property?province=` | — | Filter by provinsi | `PropertyFilters` |
| GET | `/api/property?type=` | — | Filter by tipe (rumah, apartemen, dll) | `PropertyFilters` |
| GET | `/api/property?status=` | — | Filter by status | `PropertyFilters` |
| GET | `/api/property?listing-type=` | — | Filter by jual/sewa | `BuyPropertiesPage`, `RentPropertiesPage` |
| GET | `/api/property?min=&max=` | — | Filter by range harga | `PropertyFilters` |
| DELETE | `/api/property/:property-id` | ✓ | Hapus properti | (admin) |

### Property — Agent Actions (butuh login sebagai agent)

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/agent/property` | ✓ | Agent post properti baru | `ListingFormPage` |
| PUT | `/api/agent/property/:property-id` | ✓ | Agent update properti | (halaman edit properti, belum ada) |
| DELETE | `/api/agent/property/:property-id` | ✓ | Agent hapus properti | (halaman dashboard agent, belum ada) |
| POST | `/api/agent/property/:property-id/image?prime=` | ✓ | Upload gambar properti | `ListingFormPage` (upload foto) |
| DELETE | `/api/agent/property/:property-id/image/:image-id` | ✓ | Hapus gambar properti | (halaman edit properti, belum ada) |

> `?prime=true` pada upload gambar artinya gambar utama/thumbnail.

---

## Wishlist

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| GET | `/api/user/wishlists` | ✓ | Lihat semua wishlist user | `WishlistPage` |
| POST | `/api/user/wishlists` | ✓ | Tambah ke wishlist | `PropertyCard` (tombol hati) |
| DELETE | `/api/user/wishlists/:wishlist-id` | — | Hapus dari wishlist | `WishlistPage`, `PropertyCard` |

> Saat ini wishlist disimpan di `localStorage` (`WishlistContext`). Saat backend siap, ganti dengan ketiga endpoint di atas.

---

## Review

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| GET | `/api/property/:id/review` | — | Semua review pada properti | `PropertyDetailPage` |
| POST | `/api/property/:id/review` | — | Posting review | `PropertyDetailPage` (form review) |
| PUT | `/api/user/review/:review-id` | ✓ | Edit review | `PropertyDetailPage` (belum ada tombolnya) |
| DELETE | `/api/user/review/:review-id` | ✓ | Hapus review | `PropertyDetailPage` (belum ada tombolnya) |

---

## Catatan Migrasi

Saat backend siap, langkah migrasinya:

1. Buat file `.env` di root project:
   ```
   VITE_API_URL=https://url-backend-teman.com
   ```

2. Buat `src/app/services/` — satu file per resource (`auth.ts`, `properties.ts`, `agents.ts`, dst).

3. Ganti import dari `src/app/data/*.ts` (mock data) ke fungsi fetch di `services/`.

4. Wishlist: hapus `WishlistContext` berbasis localStorage, ganti dengan fetch ke `/api/user/wishlists`.

5. Auth: simpan token dari `/api/auth/login` ke `localStorage`, kirim via header di semua request yang butuh login.
