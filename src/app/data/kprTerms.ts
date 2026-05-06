// KPR Dictionary Terms Data

export interface KPRTerm {
  letter: string;
  term: string;
  category: 'Dasar KPR' | 'Bunga & Cicilan' | 'Biaya & Pajak' | 'Syariah' | 'Legal & Dokumen';
  description: string;
  isPopular?: boolean;
}

export const kprTerms: KPRTerm[] = [
  // A
  {
    letter: 'A',
    term: 'Akad',
    category: 'Syariah',
    description: 'Perjanjian dalam KPR Syariah yang sesuai dengan prinsip Islam. Ada beberapa jenis akad seperti Murabahah (jual-beli dengan margin keuntungan) dan Musyarakah Mutanaqisah (kepemilikan bersama yang menurun). Akad ini yang membedakan KPR Syariah dengan KPR konvensional.',
    isPopular: true
  },
  {
    letter: 'A',
    term: 'Appraisal',
    category: 'Legal & Dokumen',
    description: 'Proses penilaian properti oleh tim independen bank untuk menentukan nilai pasar yang sebenarnya. Bank butuh ini untuk memastikan properti layak dijadikan jaminan. Nilai appraisal akan mempengaruhi berapa maksimal pinjaman yang bisa Anda dapat.',
    isPopular: false
  },
  {
    letter: 'A',
    term: 'Angsuran',
    category: 'Bunga & Cicilan',
    description: 'Cicilan bulanan yang harus dibayar untuk melunasi KPR. Terdiri dari pokok pinjaman ditambah bunga (konvensional) atau margin (syariah). Semakin lama tenor, angsuran bulanan semakin kecil tapi total bunga yang dibayar lebih besar.',
    isPopular: true
  },
  
  // B
  {
    letter: 'B',
    term: 'Bunga Floating',
    category: 'Bunga & Cicilan',
    description: 'Suku bunga yang bisa berubah-ubah mengikuti kondisi pasar dan kebijakan bank. Biasanya diterapkan setelah masa bunga fixed berakhir. Risikonya cicilan bisa naik kapan saja, tapi bisa juga turun kalau kondisi ekonomi membaik.',
    isPopular: true
  },
  {
    letter: 'B',
    term: 'Bunga Fixed',
    category: 'Bunga & Cicilan',
    description: 'Suku bunga tetap untuk periode tertentu (biasanya 1-5 tahun pertama). Cicilan pasti stabil selama periode ini. Setelah habis, bunga akan berubah ke floating rate atau fixed rate baru sesuai perjanjian.',
    isPopular: true
  },
  {
    letter: 'B',
    term: 'BPHTB',
    category: 'Biaya & Pajak',
    description: 'Bea Perolehan Hak atas Tanah dan Bangunan. Pajak yang harus dibayar pembeli saat transaksi jual-beli properti. Besarnya 5% dari Nilai Perolehan Objek Pajak (NPOP) setelah dikurangi Nilai Perolehan Objek Pajak Tidak Kena Pajak (NPOPTKP).',
    isPopular: false
  },
  {
    letter: 'B',
    term: 'BI Checking',
    category: 'Legal & Dokumen',
    description: 'Sekarang disebut SLIK OJK (Sistem Layanan Informasi Keuangan). Catatan riwayat kredit Anda di semua bank dan lembaga keuangan. Bank akan cek ini untuk memastikan Anda tidak punya masalah kredit macet sebelumnya.',
    isPopular: false
  },

  // C
  {
    letter: 'C',
    term: 'Cicilan',
    category: 'Bunga & Cicilan',
    description: 'Pembayaran rutin setiap bulan untuk melunasi KPR. Jumlahnya tergantung besar pinjaman, suku bunga, dan tenor. Usahakan cicilan tidak lebih dari 30-40% penghasilan bulanan agar keuangan tetap sehat.',
    isPopular: false
  },
  {
    letter: 'C',
    term: 'Certificate Laik Fungsi (CLF)',
    category: 'Legal & Dokumen',
    description: 'Sertifikat yang menyatakan bangunan layak untuk ditempati dan memenuhi standar keselamatan. Biasanya diminta bank untuk properti baru sebagai syarat pencairan KPR.',
    isPopular: false
  },

  // D
  {
    letter: 'D',
    term: 'Down Payment (DP)',
    category: 'Dasar KPR',
    description: 'Uang muka yang harus dibayar di awal saat beli properti dengan KPR. Umumnya 10-20% dari harga properti. Semakin besar DP, cicilan bulanan semakin ringan dan peluang disetujui bank lebih tinggi.',
    isPopular: true
  },
  {
    letter: 'D',
    term: 'Debt Service Ratio (DSR)',
    category: 'Dasar KPR',
    description: 'Perbandingan total cicilan dengan penghasilan bulanan. Bank biasanya set maksimal 30-40%. Contoh: gaji 10 juta, maksimal cicilan semua pinjaman 3-4 juta. Ini untuk memastikan Anda mampu bayar cicilan tanpa kesulitan.',
    isPopular: false
  },
  {
    letter: 'D',
    term: 'Developer',
    category: 'Legal & Dokumen',
    description: 'Perusahaan pengembang yang membangun dan menjual properti. Kalau beli rumah indent atau dari proyek baru, Anda berurusan dengan developer. Pastikan developer punya rekam jejak bagus dan legalitas lengkap.',
    isPopular: false
  },

  // E
  {
    letter: 'E',
    term: 'Efektif Rate',
    category: 'Bunga & Cicilan',
    description: 'Suku bunga sesungguhnya yang harus Anda bayar setelah termasuk semua biaya admin, provisi, asuransi, dll. Lebih tinggi dari suku bunga yang diiklankan. Ini angka yang lebih jujur untuk bandingkan antar bank.',
    isPopular: false
  },

  // F
  {
    letter: 'F',
    term: 'Flat Rate',
    category: 'Bunga & Cicilan',
    description: 'Sistem bunga dihitung dari pokok pinjaman awal terus-menerus sampai lunas. Jarang dipakai untuk KPR karena cicilan jadi lebih mahal. Umumnya dipakai untuk kredit jangka pendek seperti KTA.',
    isPopular: false
  },

  // G
  {
    letter: 'G',
    term: 'Grace Period',
    category: 'Dasar KPR',
    description: 'Masa tenggang sebelum cicilan KPR dimulai. Biasanya diberikan untuk properti indent yang masih dibangun. Anda bisa bayar bunga dulu atau tidak bayar sama sekali sampai rumah serah terima.',
    isPopular: false
  },

  // H
  {
    letter: 'H',
    term: 'HGB (Hak Guna Bangunan)',
    category: 'Legal & Dokumen',
    description: 'Jenis sertifikat tanah dengan masa berlaku terbatas (20-30 tahun, bisa diperpanjang). Biasanya untuk apartemen atau tanah negara. Beda dengan SHM yang berlaku selamanya.',
    isPopular: false
  },

  // I
  {
    letter: 'I',
    term: 'IMB (Izin Mendirikan Bangunan)',
    category: 'Legal & Dokumen',
    description: 'Izin resmi dari pemerintah untuk membangun di tanah tertentu. Wajib ada sebelum bangun rumah. Sekarang diganti dengan PBG (Persetujuan Bangunan Gedung) dalam sistem OSS.',
    isPopular: false
  },
  {
    letter: 'I',
    term: 'Indent',
    category: 'Dasar KPR',
    description: 'Beli rumah yang belum jadi atau masih dalam tahap pembangunan. Harga biasanya lebih murah dari ready stock. Risikonya: developer bisa delay atau bahkan gagal bangun.',
    isPopular: false
  },

  // J
  {
    letter: 'J',
    term: 'Jaminan',
    category: 'Legal & Dokumen',
    description: 'Agunan atau aset yang dijaminkan ke bank untuk dapat pinjaman. Untuk KPR, jaminannya ya properti yang dibeli itu sendiri. Kalau gagal bayar, bank bisa ambil alih properti.',
    isPopular: false
  },

  // K
  {
    letter: 'K',
    term: 'KPR (Kredit Pemilikan Rumah)',
    category: 'Dasar KPR',
    description: 'Pinjaman dari bank untuk beli rumah atau properti. Anda bayar uang muka dulu, sisanya dibiayai bank dan dicicil bulanan. KPR bikin punya rumah jadi lebih terjangkau tanpa harus nabung bertahun-tahun.',
    isPopular: true
  },
  {
    letter: 'K',
    term: 'KPR Subsidi',
    category: 'Dasar KPR',
    description: 'KPR dengan bunga rendah yang disubsidi pemerintah untuk masyarakat berpenghasilan rendah (MBR). Ada syarat ketat: harga rumah maksimal, penghasilan maksimal, belum punya rumah, dll.',
    isPopular: false
  },

  // L
  {
    letter: 'L',
    term: 'LTV (Loan to Value)',
    category: 'Dasar KPR',
    description: 'Perbandingan nilai pinjaman dengan nilai properti. Contoh: LTV 80% artinya bank kasih pinjaman maksimal 80% harga properti, sisanya 20% jadi DP Anda. Semakin rendah LTV, semakin aman buat bank.',
    isPopular: false
  },
  {
    letter: 'L',
    term: 'Lunas Dipercepat',
    category: 'Bunga & Cicilan',
    description: 'Melunasi KPR lebih cepat dari tenor yang dijanjikan. Bisa hemat bunga banyak! Tapi cek dulu apakah bank kenakan penalti atau tidak. Beberapa bank bebas penalti setelah tahun ke-X.',
    isPopular: false
  },

  // M
  {
    letter: 'M',
    term: 'Margin (Syariah)',
    category: 'Syariah',
    description: 'Keuntungan bank syariah dalam akad jual-beli properti. Beda dengan bunga, margin sudah ditetapkan dari awal dan tidak berubah selama tenor. Lebih transparan dan pasti.',
    isPopular: false
  },
  {
    letter: 'M',
    term: 'Murabahah',
    category: 'Syariah',
    description: 'Akad jual-beli dalam KPR Syariah. Bank beli rumah dulu, lalu jual ke Anda dengan harga rumah + margin keuntungan. Anda cicil sesuai kesepakatan. Prinsipnya bukan pinjam uang tapi beli rumah dari bank.',
    isPopular: false
  },

  // N
  {
    letter: 'N',
    term: 'Notaris',
    category: 'Legal & Dokumen',
    description: 'Pejabat umum yang mengesahkan akta jual-beli properti dan balik nama sertifikat. Biaya notaris biasanya 1-2% dari harga properti. Pilih notaris yang sudah dipercaya dan berpengalaman.',
    isPopular: false
  },
  {
    letter: 'N',
    term: 'NPWP',
    category: 'Legal & Dokumen',
    description: 'Nomor Pokok Wajib Pajak. Wajib dilampirkan saat pengajuan KPR untuk pinjaman di atas jumlah tertentu (biasanya >100 juta). Kalau belum punya, bikin dulu karena prosesnya cepat dan gratis.',
    isPopular: false
  },

  // O
  {
    letter: 'O',
    term: 'Over Kredit',
    category: 'Dasar KPR',
    description: 'Beli rumah KPR dari orang lain dengan melanjutkan cicilan yang tersisa. Biasanya lebih murah dari harga pasar. Tapi harus hati-hati, pastikan prosesnya legal lewat bank dan dokumen lengkap.',
    isPopular: false
  },

  // P
  {
    letter: 'P',
    term: 'Pelunasan Dipercepat',
    category: 'Bunga & Cicilan',
    description: 'Bayar lunas sisa KPR sebelum jatuh tempo. Bisa menghemat bunga sangat banyak. Sebagian bank kenakan denda 2-5%, sebagian gratis. Cek perjanjian kredit Anda.',
    isPopular: false
  },
  {
    letter: 'P',
    term: 'PBB (Pajak Bumi dan Bangunan)',
    category: 'Biaya & Pajak',
    description: 'Pajak tahunan yang wajib dibayar pemilik properti. Besarnya tergantung NJOP (Nilai Jual Objek Pajak) dari pemerintah. Biasanya 0.1-0.3% dari NJOP. Harus dibayar setiap tahun.',
    isPopular: false
  },
  {
    letter: 'P',
    term: 'Provisi',
    category: 'Biaya & Pajak',
    description: 'Biaya administrasi bank saat KPR dicairkan. Biasanya 0.5-1% dari nilai pinjaman. Dibayar di awal dan langsung dipotong dari pinjaman yang cair. Ini salah satu biaya tersembunyi yang sering dilupakan.',
    isPopular: false
  },

  // R
  {
    letter: 'R',
    term: 'Refinancing',
    category: 'Dasar KPR',
    description: 'Pindah KPR dari bank lama ke bank baru yang menawarkan bunga lebih rendah. Bisa hemat cicilan tapi ada biaya balik nama dan administrasi. Hitung dulu untung-ruginya sebelum pindah.',
    isPopular: false
  },
  {
    letter: 'R',
    term: 'Restructuring',
    category: 'Bunga & Cicilan',
    description: 'Negosiasi ulang dengan bank untuk ubah skema cicilan karena kesulitan finansial. Bisa perpanjang tenor, turunkan bunga, atau jadwal ulang. Bank biasanya lebih pilih ini daripada kredit macet.',
    isPopular: false
  },

  // S
  {
    letter: 'S',
    term: 'SHM (Sertifikat Hak Milik)',
    category: 'Legal & Dokumen',
    description: 'Sertifikat tanah dengan hak kepemilikan penuh dan berlaku selamanya. Ini yang paling kuat dan aman. Bisa diwariskan turun-temurun. Lebih disukai bank dibanding HGB.',
    isPopular: false
  },
  {
    letter: 'S',
    term: 'SHGB (Sertifikat Hak Guna Bangunan)',
    category: 'Legal & Dokumen',
    description: 'Sertifikat untuk apartemen atau properti vertikal. Punya masa berlaku terbatas (biasanya 20-30 tahun) dan bisa diperpanjang. Lebih terbatas dibanding SHM.',
    isPopular: false
  },
  {
    letter: 'S',
    term: 'Suku Bunga Acuan (BI Rate)',
    category: 'Bunga & Cicilan',
    description: 'Suku bunga yang ditetapkan Bank Indonesia sebagai patokan bank-bank di Indonesia. Kalau BI Rate naik, biasanya bunga KPR ikut naik (untuk floating rate).',
    isPopular: false
  },

  // T
  {
    letter: 'T',
    term: 'Tenor',
    category: 'Dasar KPR',
    description: 'Jangka waktu cicilan KPR, biasanya 5-25 tahun. Semakin panjang tenor, cicilan bulanan lebih ringan tapi total bunga yang dibayar lebih besar. Pilih tenor sesuai kemampuan finansial jangka panjang Anda.',
    isPopular: true
  },
  {
    letter: 'T',
    term: 'Take Over KPR',
    category: 'Dasar KPR',
    description: 'Pindah KPR dari bank lama ke bank baru yang kasih penawaran lebih menarik (bunga lebih rendah, tenor lebih panjang, dll). Mirip refinancing. Pastikan hitung dulu biaya-biayanya.',
    isPopular: false
  },

  // U
  {
    letter: 'U',
    term: 'Uang Muka',
    category: 'Dasar KPR',
    description: 'Sama dengan DP (Down Payment). Pembayaran pertama yang harus Anda siapkan sebelum KPR disetujui. Minimal 10-20% dari harga properti, tergantung kebijakan bank.',
    isPopular: false
  },

  // W
  {
    letter: 'W',
    term: 'Wanprestasi',
    category: 'Legal & Dokumen',
    description: 'Gagal memenuhi kewajiban sesuai perjanjian, misalnya telat bayar cicilan. Kalau terus terjadi, bank bisa ambil tindakan hukum sampai sita properti. Segera komunikasi dengan bank kalau kesulitan bayar.',
    isPopular: false
  }
];

// Helper functions
export const getTermsByLetter = (letter: string): KPRTerm[] => {
  return kprTerms.filter(term => term.letter === letter);
};

export const getTermsByCategory = (category: string): KPRTerm[] => {
  if (category === 'Semua') return kprTerms;
  return kprTerms.filter(term => term.category === category);
};

export const getPopularTerms = (): KPRTerm[] => {
  return kprTerms.filter(term => term.isPopular);
};

export const searchTerms = (query: string): KPRTerm[] => {
  const lowercaseQuery = query.toLowerCase();
  return kprTerms.filter(
    term =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAvailableLetters = (): string[] => {
  return [...new Set(kprTerms.map(term => term.letter))].sort();
};

export const categories = ['Semua', 'Dasar KPR', 'Bunga & Cicilan', 'Biaya & Pajak', 'Syariah', 'Legal & Dokumen'];
