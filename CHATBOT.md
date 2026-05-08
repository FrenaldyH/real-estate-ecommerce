# Dokumentasi Sistem Chatbot RumahKu AI Assistant

Dokumen ini menjelaskan cara kerja fitur chatbot di aplikasi RumahKu, mulai dari tampilan hingga logika di baliknya. Ditulis khusus untuk pemula agar mudah dipahami.

---

## Gambaran Umum

Chatbot di RumahKu terdiri dari **dua bagian** yang saling terhubung:

| Bagian | File | Keterangan |
|---|---|---|
| **Tombol mengambang** (floating button) | `src/app/components/common/AIChatWidget.tsx` | Tombol bulat di pojok kanan bawah yang selalu mengikuti pengguna |
| **Seksi AI di halaman utama** | `src/app/components/home/PriceEstimation.tsx` | Tampilan chat ukuran penuh di halaman beranda (`/`) |

Keduanya menampilkan chat yang sama, tapi di tempat berbeda. Tombol mengambang hanya muncul **saat pengguna tidak sedang melihat** seksi AI di beranda.

---

## Bagian 1 — Tombol Mengambang (`AIChatWidget.tsx`)

### Letaknya di mana?

Komponen ini dipasang di `src/app/routes.tsx` di dalam `RootLayout`, sehingga **tampil di semua halaman** secara otomatis:

```tsx
// src/app/routes.tsx
function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <AIChatWidget />  {/* <-- selalu ada di setiap halaman */}
    </>
  );
}
```

---

### State (data yang diingat komponen)

```tsx
const [sectionVisible, setSectionVisible] = useState(false);
// true  = seksi AI sedang terlihat di layar → sembunyikan tombol
// false = seksi AI tidak terlihat → tampilkan tombol

const [open, setOpen] = useState(false);
// true  = popup chat terbuka
// false = popup chat tertutup

const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
// Array berisi semua pesan (dari bot maupun pengguna)

const [input, setInput] = useState('');
// Isi kotak teks input yang sedang diketik pengguna

const [typing, setTyping] = useState(false);
// true = bot sedang "mengetik" (animasi tiga titik berjalan)
```

---

### Cara Kerja: Tombol Muncul & Menghilang

Ini bagian yang paling menarik. Tombol mengambang tidak selalu terlihat — ia **muncul dan menghilang** tergantung apakah seksi AI di beranda sedang terlihat di layar atau tidak.

Teknologi yang dipakai adalah **`IntersectionObserver`**, yaitu API bawaan browser yang dapat mendeteksi apakah sebuah elemen HTML sedang masuk atau keluar dari area pandang (viewport).

```tsx
useEffect(() => {
  const section = document.getElementById('ai-assistant');
  //                                       ^^^^^^^^^^^^^^
  //         ID ini ada di PriceEstimation.tsx: <section id="ai-assistant">

  if (!section) {
    // Elemen tidak ditemukan = kita sedang di halaman selain beranda
    // → langsung tampilkan tombol mengambang
    setSectionVisible(false);
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      setSectionVisible(entry.isIntersecting);
      //                      ^^^^^^^^^^^^^^^^
      //   true  = seksi sedang terlihat ≥ 20% → sembunyikan tombol
      //   false = seksi tidak terlihat    → tampilkan tombol

      if (entry.isIntersecting) setOpen(false); // tutup popup otomatis
    },
    { threshold: 0.2 }
    //            ^^^
    //   Observer aktif ketika 20% elemen sudah masuk/keluar viewport
  );

  observer.observe(section);
  return () => observer.disconnect(); // bersihkan saat komponen berpindah halaman
}, [location.pathname]);
//  ^^^^^^^^^^^^^^^^^
//  Efek ini dijalankan ulang setiap kali URL berubah
//  Penting! Tanpa ini, observer tidak akan reset saat navigasi antar halaman
```

**Alur sederhana:**
```
Pengguna scroll ke seksi AI
    → IntersectionObserver mendeteksi elemen masuk layar
    → sectionVisible = true
    → Tombol mengambang hilang (opacity-0)

Pengguna scroll ke atas / pindah halaman
    → sectionVisible = false
    → Tombol mengambang muncul (opacity-100)
```

---

### Cara Kerja: Tombol Perluas ke Seksi Penuh

Di dalam popup chat ada tombol **expand** (ikon kotak panah). Tombol ini membawa pengguna kembali ke seksi AI di beranda.

Masalahnya: bagaimana jika pengguna sedang di halaman lain (misalnya `/properties`)? Kita tidak bisa langsung scroll ke seksi yang belum ada di DOM.

Solusinya menggunakan **`pendingScroll` ref** — semacam "catatan tempel" yang bertahan saat navigasi halaman:

```tsx
const pendingScroll = useRef(false);
//                           ^^^^^
//   useRef menyimpan nilai tanpa menyebabkan render ulang
//   Berbeda dengan useState yang memicu render saat nilainya berubah

const goToSection = () => {
  setOpen(false);

  if (location.pathname === '/') {
    // Sudah di beranda → langsung scroll
    document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Di halaman lain → tandai "minta scroll nanti", lalu pindah ke beranda
    pendingScroll.current = true;
    navigate('/');
  }
};
```

Lalu di dalam `useEffect` yang berjalan saat URL berubah:

```tsx
useEffect(() => {
  // Cek apakah ada permintaan scroll yang tertunda
  if (pendingScroll.current && location.pathname === '/') {
    pendingScroll.current = false; // hapus catatan
    setTimeout(() => {
      document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    // setTimeout 100ms dipakai agar DOM (isi halaman) sempat ter-render
    // sebelum kita mencoba scroll ke elemen di dalamnya
  }

  // ... setup IntersectionObserver di sini
}, [location.pathname]);
```

**Alur sederhana:**
```
Pengguna di halaman /properties → klik expand
    → pendingScroll.current = true
    → navigate('/')
    → URL berubah ke '/'
    → useEffect jalan ulang
    → pendingScroll.current = true? → Ya → scroll ke #ai-assistant
```

---

### Cara Kerja: Kirim & Terima Pesan

```tsx
const sendMessage = () => {
  const text = input.trim();
  if (!text || typing) return; // jangan kirim kalau kosong atau bot masih mengetik

  const id = Date.now(); // ID unik berdasarkan waktu

  // 1. Tambahkan pesan pengguna ke array messages
  setMessages((prev) => [...prev, { id, type: 'user', text }]);
  setInput('');    // kosongkan kotak input
  setTyping(true); // tampilkan animasi tiga titik

  // 2. Simulasi balasan bot setelah 1 detik
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: id + 1,
        type: 'bot',
        text: 'Terima kasih atas pertanyaannya! ...', // ← INI YANG AKAN DIGANTI DENGAN AI ASLI
      },
    ]);
    setTyping(false); // sembunyikan animasi tiga titik
  }, 1000);
};
```

> **Catatan untuk pengembangan selanjutnya:** Bagian `setTimeout` dengan teks hardcoded itulah yang nantinya diganti dengan pemanggilan API ke backend AI (misalnya Claude, GPT, Gemini, dll). Lebih detail di bagian bawah dokumen ini.

---

### Animasi Tampil/Sembunyi

Tombol dan popup tidak dihapus dari DOM saat disembunyikan, melainkan dibuat **transparan dan tidak bisa diklik** menggunakan kelas Tailwind CSS:

```tsx
// Popup chat
className={`... transition-all duration-300 ${
  open && !sectionVisible
    ? 'opacity-100 scale-100 pointer-events-auto'   // tampil
    : 'opacity-0 scale-90 pointer-events-none'      // sembunyi
}`}

// Tombol mengambang
className={`... transition-all duration-300 ${
  sectionVisible
    ? 'opacity-0 scale-75 pointer-events-none translate-y-4'  // sembunyi
    : 'opacity-100 scale-100 pointer-events-auto translate-y-0' // tampil
}`}
```

Teknik ini disebut **CSS-only visibility** — lebih halus daripada langsung menghapus elemen dari DOM, karena transisi `opacity` dan `scale` bisa dianimasikan.

---

## Bagian 2 — Seksi AI di Beranda (`PriceEstimation.tsx`)

Ini adalah tampilan chat **ukuran penuh** yang hanya ada di halaman utama (`/`). Prinsipnya sama dengan `AIChatWidget`, bedanya:

- Tidak ada tombol mengambang
- Ukurannya besar dan menjadi bagian dari konten halaman
- Memiliki state pesan sendiri (terpisah dari widget)
- ID elemen: `<section id="ai-assistant">` — ini yang dideteksi oleh `IntersectionObserver`

```tsx
// PriceEstimation.tsx
return (
  <section id="ai-assistant" className="py-20 bg-slate-50">
  {/*        ^^^^^^^^^^^^^^^^
      ID ini wajib ada agar AIChatWidget bisa mendeteksinya */}
    ...
  </section>
);
```

---

## Struktur Pesan (Interface TypeScript)

```tsx
interface Message {
  id: number;    // ID unik, biasanya pakai Date.now()
  type: 'bot' | 'user'; // siapa yang mengirim
  text: string;  // isi pesan
}
```

Semua pesan disimpan dalam satu array `messages`. Saat render, setiap pesan ditampilkan dengan gaya berbeda berdasarkan `type`:

- `type: 'user'` → gelembung biru di kanan
- `type: 'bot'`  → gelembung putih di kiri + ikon avatar bot

---

## Cara Mengganti Mock dengan AI Asli

Saat ini balasan bot hanya teks statis (hardcoded). Untuk menghubungkan ke AI asli, ganti bagian `setTimeout` di fungsi `sendMessage` dengan pemanggilan API:

### Langkah 1 — Buat service baru

Buat file `src/app/services/chat.ts`:

```ts
import { apiFetch } from './config';

export async function sendChatMessage(message: string): Promise<string> {
  const data = await apiFetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  return data.reply; // sesuaikan dengan format respons backend
}
```

### Langkah 2 — Ganti `setTimeout` di `sendMessage`

Di `AIChatWidget.tsx`, ubah bagian ini:

```tsx
// SEBELUM (mock statis)
setTimeout(() => {
  setMessages((prev) => [...prev, { id: id + 1, type: 'bot', text: 'Terima kasih...' }]);
  setTyping(false);
}, 1000);
```

```tsx
// SESUDAH (panggil API asli)
sendChatMessage(text)
  .then((reply) => {
    setMessages((prev) => [...prev, { id: id + 1, type: 'bot', text: reply }]);
  })
  .catch(() => {
    setMessages((prev) => [...prev, { id: id + 1, type: 'bot', text: 'Maaf, terjadi kesalahan. Coba lagi.' }]);
  })
  .finally(() => {
    setTyping(false);
  });
```

Lakukan hal yang sama di `PriceEstimation.tsx`.

---

## Ringkasan Alur Keseluruhan

```
Pengguna buka aplikasi
    ↓
RootLayout render → AIChatWidget dipasang di semua halaman

Di halaman beranda (/)
    ↓
IntersectionObserver memantau <section id="ai-assistant">
    ↓
Seksi terlihat → tombol mengambang menghilang
Seksi tidak terlihat → tombol mengambang muncul

Pengguna klik tombol mengambang
    ↓
Popup chat terbuka

Pengguna klik tombol expand di popup
    ↓
Jika di beranda → scroll ke seksi
Jika di halaman lain → navigate('/') + scroll setelah halaman render

Pengguna ketik pesan → tekan Enter / klik kirim
    ↓
sendMessage() dipanggil
    ↓
Pesan user masuk ke array → animasi mengetik muncul
    ↓
Setelah 1 detik (mock) / setelah API merespons (AI asli)
    ↓
Balasan bot masuk ke array → animasi mengetik hilang
```

---

## File yang Relevan

| File | Fungsi |
|---|---|
| `src/app/components/common/AIChatWidget.tsx` | Tombol mengambang + popup chat mini |
| `src/app/components/home/PriceEstimation.tsx` | Seksi chat ukuran penuh di beranda |
| `src/app/routes.tsx` | Tempat `AIChatWidget` dipasang ke semua halaman |
| `src/app/services/chat.ts` | (Belum ada) — Tempat koneksi ke API AI nantinya |
