# Backend

## Tech Stack



## My Notes

### How To Make Database Schemas

To generate image and make database logic i use 

### How To Commits

For this project i set a rules for commit base on this [Link](https://www.conventionalcommits.org/en/v1.0.0/)

### How To Use Docker

To be honest, this is the first time I’ve used Docker. So, I’m starting by learning from this playlist: [Link](https://youtube.com/playlist?list=PL-CtdCApEFH-A7jBmdertzbeACuQWvQao&si=MdNuBE6hGYG2iAeA)

### How To Use Postgresql

```
  # Status check
  sudo systemctl status postgresql

  # Start
  sudo systemctl start postgresql

  # Off
  sudo systemctl stop postgresql

  # Restart 
  sudo systemctl restart postgresql

  # Auto booting
  sudo systemctl enable postgresql

  # Masuk ke user
  sudo -u postgres pqsl

  # See all database
  \l

  # See all role
  \du

  # Exit postgresql 
  \q

```

### API
```
POST /api/auth/register
POST /api/auth/login

GET    /api/users/profile          → profil sendiri (dari JWT)
PUT    /api/users/profile          → update profil sendiri
PUT    /api/users/upgrade-agent    → upgrade jadi agent

GET  /api/agents               → list semua agent
GET  /api/agents/top/limit     → top agent by total sold
GET  /api/agents/:username           → detail agent
GET  /api/agents/profile       → profil agent sendiri (dari JWT)
PUT  /api/agents/profile       → update profil agent sendiri

GET  /api/agencies             → list semua agency
GET  /api/agencies/:id         → detail agency  
POST /api/agencies             → buat agency (agent only)
PUT  /api/agencies/:id         → update agency (agent only)

GET    /api/properties              → list semua properti
GET    /api/properties/:id          → detail properti
GET    /api/properties?city=...     → filter by kota
GET    /api/properties?province=... → filter by provinsi
GET    /api/properties?type=...     → filter by tipe properti
GET    /api/properties?status=...   → filter by status
GET    /api/properties?listing_type=... → filter by tipe listing
GET    /api/properties?min=...&max=...  → filter by harga
POST   /api/agent/properties        → buat properti (agent only)
PUT    /api/agent/properties/:id    → update properti (agent only)
DELETE /api/agent/properties/:id    → hapus properti (agent only)

GET    /api/properties/:id/images                      → list gambar
POST   /api/agent/properties/:id/images                → tambah gambar
DELETE /api/agent/properties/:id/images/:image_id      → hapus gambar

GET    /api/properties/:id/facilities                  → list fasilitas
POST   /api/agent/properties/:id/facilities            → tambah fasilitas
DELETE /api/agent/properties/:id/facilities/:facility_id → hapus fasilitas
```