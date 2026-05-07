# API Reference — RumahKu Backend

Dokumen ini berisi semua endpoint API dari backend teman, lengkap dengan contoh request dan response.  
Tujuannya agar siapapun — termasuk pemula — bisa langsung paham cara pakai API ini.

---

## Konsep Dasar

### Base URL
Semua endpoint dimulai dari:
```
http://localhost:8080
```
Saat deployment, simpan URL ini di file `.env`:
```
VITE_API_URL=https://url-backend-produksi.com
```

### Format Response
Semua response mengikuti format yang sama:
```json
{
  "success": true,
  "message": "Pesan dari server",
  "data": { ... }
}
```
- `success: true` → request berhasil, ambil datanya dari field `data`
- `success: false` → request gagal, baca field `message` untuk tahu alasannya

### Endpoint yang Butuh Login (Auth: ✓)
Beberapa endpoint hanya bisa diakses setelah login. Caranya: tambahkan header berikut di setiap request:
```
Authorization: Bearer <token_dari_login>
```
Token didapat dari `POST /api/auth/login`.

---

## Auth

### Login
**`POST /api/auth/login`** | Auth: —

Digunakan untuk masuk ke akun. Hasilnya berupa token yang dipakai untuk endpoint yang butuh login.

> ⚠️ Contoh request/response belum didokumentasikan backend. Perkiraan format:

```json
// Request Body
{
  "username": "budi_santoso",
  "password": "passwordKamu"
}

// Response (perkiraan)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "budi_santoso",
      "full_name": "Budi Santoso",
      "role": "user"
    }
  }
}
```

**Frontend:** `LoginModal.tsx` → `src/app/services/auth.ts`

---

## User

### Registrasi User Baru
**`POST /api/user`** | Auth: —

```
URL: http://localhost:8080/api/user
```

```json
// Request Body
{
  "nik": "3515012345678901",
  "full_name": "Frenaldy",
  "email": "frenaldy@example.com",
  "phone_number": "081234567890",
  "password": "rahasiaPassword123!",
  "username": "username"
}
```

```json
// Response
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 6,
    "nik": "3515012345678901",
    "username": "username",
    "full_name": "Frenaldy",
    "email": "frenaldy@example.com",
    "phone_number": "081234567890",
    "role": "user",
    "created_at": "2026-05-07T01:43:04.455610393+07:00"
  }
}
```

**Frontend:** `RegisterModal.tsx` → `src/app/services/users.ts → register()`

---

### Lihat Semua User
**`GET /api/user`** | Auth: —

```
URL: http://localhost:8080/api/user
```

```json
// Response
{
  "success": true,
  "message": "OK",
  "data": [
    {
      "id": 1,
      "nik": "3578123456789001",
      "username": "budi_santoso",
      "full_name": "Budi Santoso",
      "email": "budi@gmail.com",
      "phone_number": "081234567890",
      "role": "user",
      "created_at": "2026-05-07T00:36:25.470441+07:00"
    },
    {
      "id": 2,
      "nik": "3578123456789002",
      "username": "siti_rahma",
      "full_name": "Siti Rahmawati",
      "email": "siti@gmail.com",
      "phone_number": "081234567891",
      "role": "user",
      "created_at": "2026-05-07T00:36:25.475763+07:00"
    }
  ]
}
```

**Frontend:** `src/app/services/users.ts → getAllUsers()`

---

### Lihat Data User
**`GET /api/user/:username`** | Auth: —

```
URL: http://localhost:8080/api/user/budi_santoso
```

```json
// Response
{
  "success": true,
  "message": "OK",
  "data": {
    "id": 1,
    "nik": "3578123456789001",
    "username": "budi_santoso",
    "full_name": "Budi Santoso",
    "email": "budi@gmail.com",
    "phone_number": "081234567890",
    "role": "user",
    "created_at": "2026-05-07T00:36:25.470441+07:00"
  }
}
```

**Frontend:** `src/app/services/users.ts → getUser(username)`

---

### Update Profil User
**`PUT /api/user/:username`** | Auth: ✓

```
URL: http://localhost:8080/api/user/dewi_kusuma
```

```json
// Request Body (semua field opsional)
{
  "nik": "3201020304050607",
  "full_name": "Frenaldy H",
  "email": "frenaldy@example.com",
  "phone_number": "081234567890",
  "password": "securePassword123"
}
```

```json
// Response
{
  "success": true,
  "message": "Update OK",
  "data": {
    "id": 4,
    "nik": "3201020304050607",
    "username": "dewi_kusuma",
    "full_name": "Frenaldy H",
    "email": "frenaldy@example.com",
    "phone_number": "081234567890",
    "role": "agent",
    "created_at": "2026-05-07T02:31:06.734293+07:00"
  }
}
```

**Frontend:** `src/app/services/users.ts → updateUser(username, data)`

---

### Switch Role ke Agent
**`PUT /api/user/role?role-name=`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

**Frontend:** `AdvertiserPage.tsx`

---

### Hapus User
**`DELETE /api/user/:username`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

**Frontend:** halaman profil (belum dibuat)

---

## Agent

### Lihat Semua Agent
**`GET /api/agent`** | Auth: —

```
URL: http://localhost:8080/api/agent
```

```json
// Response
{
  "success": true,
  "message": "All agents retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 3,
      "agency_id": 1,
      "bio_description": "Agen properti berpengalaman 5 tahun di Jakarta",
      "total_properties_sold": 0,
      "siup4": "SIUP4-001-JKT-2024",
      "created_at": "0001-01-01T00:00:00Z",
      "user": {
        "id": 3,
        "nik": "3578123456789003",
        "username": "andi_wijaya",
        "full_name": "Andi Wijaya",
        "email": "andi@gmail.com",
        "phone_number": "081234567892",
        "role": "",
        "created_at": "2026-05-07T01:04:53.048225+07:00"
      }
    }
  ]
}
```

**Frontend:** `AgentListPage.tsx` → `src/app/services/agents.ts → getAllAgents()`

---

### Lihat Data Agent
**`GET /api/agent/:username`** | Auth: —

```
URL: http://localhost:8080/api/agent/andi_wijaya
```

> ⚠️ Perhatikan: saat mengambil satu agent (`GET /api/agent/:username`), field `user` di dalam response **kosong**. Field `user` hanya terisi saat mengambil semua agent atau top agent.

```json
// Response
{
  "success": true,
  "message": "Agent profile retrieved successfully",
  "data": {
    "id": 1,
    "user_id": 3,
    "agency_id": 1,
    "bio_description": "Agen properti berpengalaman 5 tahun di Jakarta",
    "total_properties_sold": 0,
    "siup4": "SIUP4-001-JKT-2024",
    "created_at": "0001-01-01T00:00:00Z",
    "user": {
      "id": 0,
      "nik": "",
      "username": "",
      "full_name": "",
      "email": "",
      "phone_number": "",
      "role": "",
      "created_at": "0001-01-01T00:00:00Z"
    }
  }
}
```

**Frontend:** `src/app/services/agents.ts → getAgent(username)`

---

### Top Agent by Properti Terjual
**`GET /api/agent/top?limit=`** | Auth: —

```
URL: http://localhost:8080/api/agent/top?limit=2
```

```json
// Response
{
  "success": true,
  "message": "Top agents retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 3,
      "agency_id": 1,
      "bio_description": "Agen properti berpengalaman 5 tahun di Jakarta",
      "total_properties_sold": 10,
      "siup4": "SIUP4-001-JKT-2024",
      "created_at": "0001-01-01T00:00:00Z",
      "user": {
        "id": 3,
        "nik": "3578123456789003",
        "username": "andi_wijaya",
        "full_name": "Andi Wijaya",
        "email": "andi@gmail.com",
        "phone_number": "081234567892",
        "role": "",
        "created_at": "2026-05-07T01:40:44.042866+07:00"
      }
    }
  ]
}
```

**Frontend:** bisa ditampilkan di `HomePage.tsx` → `src/app/services/agents.ts → getTopAgents(limit)`

---

### Buat Profil Agent
**`POST /api/agent`** | Auth: —

> Contoh request/response belum didokumentasikan.

**Frontend:** `ListingFormPage.tsx`

---

### Update Agent
**`PUT /api/agent/:username`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

**Frontend:** halaman dashboard agent (belum dibuat)

---

### Switch Role Agent
**`PUT /api/agent/role?role-name=`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

---

### Hapus Agent
**`DELETE /api/agent/:username`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

---

## Agency

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| POST | `/api/agency` | — | Buat agency | belum ada halamannya |
| GET | `/api/agency` | — | Semua agency | belum ada halamannya |
| GET | `/api/agency/:agency-name` | — | Detail agency | belum ada halamannya |
| PUT | `/api/agency/:agency-name` | — | Update agency | belum ada halamannya |
| DELETE | `/api/agency/:agency-name` | ✓ | Hapus agency | admin |

> Semua endpoint agency belum didokumentasikan contoh request/response-nya.

---

## Property

### Lihat Semua Properti
**`GET /api/property`** | Auth: —

> Contoh response belum didokumentasikan. Tersedia filter lewat query parameter:

| Query Param | Contoh | Keterangan |
|-------------|--------|------------|
| `city` | `?city=Jakarta` | Filter by kota |
| `province` | `?province=DKI Jakarta` | Filter by provinsi |
| `type` | `?type=rumah` | Filter by tipe properti |
| `status` | `?status=available` | Filter by status |
| `listing-type` | `?listing-type=sale` | `sale` = dijual, `rent` = disewakan |
| `min` | `?min=500000000` | Harga minimum (dalam Rupiah) |
| `max` | `?max=2000000000` | Harga maksimum (dalam Rupiah) |

Kombinasi filter bisa digabung: `?listing-type=sale&city=Jakarta&min=500000000`

**Frontend:** `PropertiesPage.tsx`, `BuyPropertiesPage.tsx`, `RentPropertiesPage.tsx` → `src/app/services/properties.ts → getProperties(filters)`

---

### Lihat Detail Properti
**`GET /api/property/:property-id`** | Auth: —

> Contoh response belum didokumentasikan.

**Frontend:** `PropertyDetailPage.tsx` → `src/app/services/properties.ts → getProperty(id)`

---

### Lihat Gambar Properti
**`GET /api/property/:id/images`** | Auth: —

> Contoh response belum didokumentasikan.

**Frontend:** `PropertyDetailPage.tsx` → `src/app/services/properties.ts → getPropertyImages(id)`

---

### Lihat Fasilitas Properti
**`GET /api/property/:id/facility`** | Auth: —

> Contoh response belum didokumentasikan.

**Frontend:** `PropertyDetailPage.tsx` → `src/app/services/properties.ts → getPropertyFacilities(id)`

---

### Hapus Properti (Admin)
**`DELETE /api/property/:property-id`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

---

### Agent — Post Properti Baru
**`POST /api/agent/property`** | Auth: ✓ (harus login sebagai agent)

> Contoh request/response belum didokumentasikan.

**Frontend:** `ListingFormPage.tsx` → `src/app/services/properties.ts → agentPostProperty(data)`

---

### Agent — Update Properti
**`PUT /api/agent/property/:property-id`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

**Frontend:** halaman edit properti (belum dibuat)

---

### Agent — Hapus Properti
**`DELETE /api/agent/property/:property-id`** | Auth: ✓

> Contoh request/response belum didokumentasikan.

**Frontend:** halaman dashboard agent (belum dibuat)

---

### Agent — Upload Gambar Properti
**`POST /api/agent/property/:property-id/image?prime=`** | Auth: ✓

`?prime=true` artinya gambar ini ditetapkan sebagai foto utama/thumbnail.

> Catatan: endpoint ini menggunakan `multipart/form-data` (bukan JSON).

**Frontend:** `src/app/services/properties.ts → agentUploadPropertyImage(propertyId, formData, isPrimary)`

---

### Agent — Hapus Gambar Properti
**`DELETE /api/agent/property/:property-id/image/:image-id`** | Auth: ✓

**Frontend:** `src/app/services/properties.ts → agentDeletePropertyImage(propertyId, imageId)`

---

## Wishlist

> ⚠️ Saat ini wishlist masih disimpan di `localStorage` (`WishlistContext.tsx`).  
> Pindahkan ke API berikut setelah backend mendokumentasikan response-nya.

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| GET | `/api/user/wishlists` | ✓ | Lihat semua wishlist user | `WishlistPage.tsx` |
| POST | `/api/user/wishlists` | ✓ | Tambah ke wishlist | `PropertyCard.tsx` |
| DELETE | `/api/user/wishlists/:wishlist-id` | — | Hapus dari wishlist | `WishlistPage.tsx` |

**Service:** `src/app/services/wishlist.ts`

---

## Review

| Method | Endpoint | Auth | Keterangan | Frontend |
|--------|----------|------|------------|----------|
| GET | `/api/property/:id/review` | — | Semua review pada properti | `PropertyDetailPage.tsx` |
| POST | `/api/property/:id/review` | — | Posting review | `PropertyDetailPage.tsx` |
| PUT | `/api/user/review/:review-id` | ✓ | Edit review | `PropertyDetailPage.tsx` (tombol belum ada) |
| DELETE | `/api/user/review/:review-id` | ✓ | Hapus review | `PropertyDetailPage.tsx` (tombol belum ada) |

> Semua endpoint review belum didokumentasikan contoh request/response-nya.

**Service:** `src/app/services/reviews.ts`

---

## Halaman yang Belum Ada di Frontend

Berdasarkan API yang tersedia, halaman-halaman ini belum dibuat:

| Halaman | Endpoint yang dibutuhkan |
|---------|--------------------------|
| Profil user | `GET/PUT /api/user/:username` |
| Dashboard agent | `GET/PUT /api/agent/:username`, `GET/PUT/DELETE /api/agent/property/:id` |
| Manajemen agency | semua `/api/agency` |
| Detail agent | `GET /api/agent/:username` |

---

## Catatan Migrasi

Saat backend siap sepenuhnya:

1. Buat file `.env` di root project:
   ```
   VITE_API_URL=https://url-backend-produksi.com
   ```

2. Semua service sudah siap di `src/app/services/`. Perbarui interface `ApiProperty` di `properties.ts` sesuai response nyata dari backend.

3. Wishlist: ganti `WishlistContext.tsx` dari localStorage ke `src/app/services/wishlist.ts`.

4. Auth token sudah tersimpan di localStorage oleh `AuthContext.tsx`. Semua request yang butuh login otomatis mengirim token via `apiFetch()` di `services/config.ts`.
