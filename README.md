# RumahKu — Platform Properti Online

RumahKu adalah aplikasi web untuk jual beli dan sewa properti di Indonesia. Pengguna bisa mencari properti berdasarkan berbagai filter, agen bisa memposting listing, dan tersedia chatbot berbasis AI untuk membantu pertanyaan seputar properti.

Project ini terdiri dari dua bagian:

- **Backend** => REST API menggunakan Go + Gin, data disimpan di PostgreSQL
- **Frontend** => Antarmuka web menggunakan React + TypeScript + Vite

---

## Fitur

- Pencarian dan filter properti (kota, provinsi, tipe, harga, status, jenis listing)
- Autentikasi berbasis JWT dengan tiga role: User, Agent, Owner
- Agent dapat membuat, mengedit, dan menghapus listing properti beserta foto dan fasilitas
- Pengguna dapat menyimpan properti ke wishlist dan memberikan ulasan beserta rating
- Chatbot AI yang bisa menjawab pertanyaan seputar properti dan layanan platform
- Upload gambar properti via Cloudinary

---

## Teknologi

**Backend**

| Komponen | Teknologi |
|---|---|
| Bahasa | Go |
| Framework | Gin |
| ORM | GORM |
| Database | PostgreSQL + pgvector |
| Auth | JWT |
| AI | Google Gemini API |
| Deploy | Railway |

**Frontend**

| Komponen | Teknologi |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router 7 |
| Storage gambar | Cloudinary |
| Deploy | Vercel |

---

## Struktur Project

```
real-estate-ecommerce/       => Backend (repo ini)
  cmd/                       => Entry point aplikasi
  config/                    => Koneksi DB, migrasi, seeder
  internal/
    handler/                 => HTTP handler (controller)
    service/                 => Business logic
    repository/              => Query ke database
    model/                   => Struct model GORM
    dto/                     => Request & response struct
    middleware/               => Auth, role check
  routes/                    => Definisi semua route
  pkg/                       => Utilitas (JWT, logger, response, dsb)

real-estate-ecommerce_fe/    => Frontend (repo terpisah)
  src/app/
    pages/                   => Halaman-halaman utama
    components/              => Komponen UI yang reusable
    services/                => Fungsi fetch ke API backend
    context/                 => React context (auth, wishlist, toast)
```

---

## Menjalankan Secara Lokal

**Prasyarat:** Go 1.21+, Node.js 18+, PostgreSQL

**Backend**

```bash
# Clone dan masuk ke folder backend
cd real-estate-ecommerce

# Salin file environment dan isi variabelnya
cp .env.example .env

# Jalankan
go run cmd/main.go
```

Isi `.env` minimal:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=realestate
JWT_KEY=your-secret-key
JWT_EXP=1440
GEMINI_API_KEY=your-gemini-key
APP_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend**

```bash
cd real-estate-ecommerce_fe
npm install

# Salin dan isi env
cp .env.example .env
# isi VITE_API_URL=http://localhost:8080

npm run dev
```

---

## Endpoint API Utama

| Method | Path | Keterangan | Auth |
|---|---|---|---|
| POST | /api/login | Login | - |
| GET | /api/user | Daftar semua user | - |
| POST | /api/user | Registrasi | - |
| GET | /api/property | Daftar properti (support filter query) | - |
| GET | /api/property/:id | Detail properti | - |
| POST | /api/property | Buat listing baru | Agent |
| PUT | /api/property/:id | Update listing | Agent (pemilik) |
| DELETE | /api/property/:id | Hapus listing | Agent (pemilik) |
| POST | /api/property/:id/image | Upload gambar | Agent (pemilik) |
| POST | /api/property/:id/facility | Tambah fasilitas | Agent (pemilik) |
| GET | /api/agent | Daftar agen | - |
| POST | /api/agent | Daftar sebagai agen | User |
| GET | /api/wishlist | Wishlist pengguna | User |
| POST | /api/wishlist | Tambah ke wishlist | User |
| POST | /api/property/:id/review | Buat ulasan | User |
| POST | /api/ai/chat | Chat dengan asisten AI | - |

Filter yang didukung di `GET /api/property`:

```
?city=Jakarta
?province=Bali
?type=Rumah
?status=available
?listing-type=dijual
?min=500000000&max=2000000000
```

---

## Deployment

| Layanan | Platform | Branch |
|---|---|---|
| Backend (Go) | Railway | main |
| Frontend (React) | Vercel | main |
| Database | Railway PostgreSQL | - |

Environment variable penting di Railway:

```
APP_ENV=production
FRONTEND_URL=https://your-vercel-url.vercel.app
JWT_KEY=your-secret-key
JWT_EXP=1440
GEMINI_API_KEY=your-key
```

Environment variable penting di Vercel:

```
VITE_API_URL=https://your-railway-url.up.railway.app
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset
```

---

## Kontributor

1. Dimas Setiaji
2. Frenaldy Bestabba Hasugian

## Tantangan Selama Pengembangan
- Bug saat deploy
- Ketinggalan endpoint
- Penyimpanan dan pengkonversian image
