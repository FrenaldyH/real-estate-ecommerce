// Blog articles data for the entire application

export interface BlogArticle {
  id: number;
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

// All blog articles
export const allBlogArticles: BlogArticle[] = [
  // KPR Related Articles
  {
    id: 1,
    slug: 'tips-pengajuan-kpr-disetujui',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: '7 Tips Agar Pengajuan KPR Disetujui Bank',
    excerpt: 'Pelajari strategi dan persiapan dokumen yang tepat agar KPR Anda disetujui dengan cepat oleh bank.',
    category: 'Panduan KPR',
    date: '15 April 2026',
    readTime: '5 menit'
  },
  {
    id: 2,
    slug: 'kpr-konvensional-vs-syariah',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'KPR Konvensional vs Syariah: Mana yang Lebih Menguntungkan?',
    excerpt: 'Analisis lengkap perbedaan, kelebihan, dan kekurangan kedua jenis KPR untuk keputusan terbaik Anda.',
    category: 'Perbandingan',
    date: '12 April 2026',
    readTime: '8 menit'
  },
  {
    id: 3,
    slug: 'cara-menghitung-kemampuan-bayar-kpr',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Cara Menghitung Kemampuan Bayar KPR dengan Benar',
    excerpt: 'Panduan praktis menghitung kemampuan finansial sebelum mengajukan KPR agar tidak terbebani cicilan.',
    category: 'Tips & Trik',
    date: '10 April 2026',
    readTime: '6 menit'
  },
  {
    id: 4,
    slug: 'kpr-untuk-pemula',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    title: 'Panduan KPR untuk Pembeli Rumah Pertama',
    excerpt: 'Semua yang perlu Anda ketahui tentang kredit pemilikan rumah untuk pembeli pertama kali.',
    category: 'Panduan KPR',
    date: '18 April 2026',
    readTime: '8 menit'
  },
  // General Property Articles
  {
    id: 5,
    slug: 'cara-mengatur-ruang-kos',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    title: '5 Cara Mengatur Ruang Kos Anda Jadi Lebih Nyaman',
    excerpt: 'Tips praktis mengoptimalkan ruang sempit menjadi nyaman dan fungsional.',
    category: 'Tips & Trik',
    date: '27 April 2026',
    readTime: '5 menit'
  },
  {
    id: 6,
    slug: 'investasi-properti-2026',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop',
    title: 'Panduan Lengkap Investasi Properti di Tahun 2026',
    excerpt: 'Strategi investasi properti yang menguntungkan di tahun 2026.',
    category: 'Investasi',
    date: '25 April 2026',
    readTime: '10 menit'
  },
  {
    id: 7,
    slug: 'desain-interior-modern',
    image: 'https://images.unsplash.com/photo-1760072513442-9872656c1b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Tren Desain Interior Modern untuk Rumah Minimalis',
    excerpt: 'Inspirasi desain interior terkini untuk hunian minimalis yang stylish.',
    category: 'Desain',
    date: '23 April 2026',
    readTime: '7 menit'
  },
  {
    id: 8,
    slug: 'tips-memilih-lokasi-rumah',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    title: '7 Tips Memilih Lokasi Rumah yang Strategis',
    excerpt: 'Lokasi adalah faktor kunci dalam membeli properti. Pelajari cara memilih lokasi terbaik.',
    category: 'Tips & Trik',
    date: '22 April 2026',
    readTime: '5 menit'
  },
  {
    id: 9,
    slug: 'renovasi-rumah-hemat',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop',
    title: 'Cara Renovasi Rumah dengan Budget Terbatas',
    excerpt: 'Renovasi tidak harus mahal. Simak tips menghemat biaya tanpa mengurangi kualitas.',
    category: 'Tips & Trik',
    date: '20 April 2026',
    readTime: '6 menit'
  },
  {
    id: 10,
    slug: 'hunian-ramah-lingkungan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
    title: 'Membangun Hunian Ramah Lingkungan',
    excerpt: 'Panduan membangun rumah berkelanjutan yang hemat energi dan ramah lingkungan.',
    category: 'Desain',
    date: '15 April 2026',
    readTime: '9 menit'
  },
  {
    id: 11,
    slug: 'apartemen-vs-rumah',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop',
    title: 'Apartemen vs Rumah: Mana yang Lebih Menguntungkan?',
    excerpt: 'Perbandingan lengkap kelebihan dan kekurangan apartemen vs rumah tapak.',
    category: 'Perbandingan',
    date: '14 April 2026',
    readTime: '7 menit'
  },
  {
    id: 12,
    slug: 'properti-komersial-2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
    title: 'Peluang Investasi Properti Komersial di 2026',
    excerpt: 'Analisis peluang investasi di sektor properti komersial tahun ini.',
    category: 'Investasi',
    date: '12 April 2026',
    readTime: '8 menit'
  },
  {
    id: 13,
    slug: 'tips-jual-rumah-cepat',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
    title: 'Strategi Jitu Menjual Rumah dengan Cepat',
    excerpt: 'Tips dan trik menjual properti dalam waktu singkat dengan harga terbaik.',
    category: 'Tips & Trik',
    date: '10 April 2026',
    readTime: '6 menit'
  },
  {
    id: 14,
    slug: 'pajak-properti-2026',
    image: 'https://images.unsplash.com/photo-1772588627527-db42040f3a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    title: 'Panduan Lengkap Pajak Properti 2026',
    excerpt: 'Pahami berbagai jenis pajak yang harus dibayar pemilik properti.',
    category: 'Informasi',
    date: '8 April 2026',
    readTime: '10 menit'
  },
  {
    id: 15,
    slug: 'hukum-jual-beli-properti',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    title: 'Aspek Hukum dalam Jual Beli Properti',
    excerpt: 'Kenali hak dan kewajiban Anda sebagai pembeli atau penjual properti.',
    category: 'Informasi',
    date: '5 April 2026',
    readTime: '12 menit'
  },
  {
    id: 16,
    slug: 'sertifikat-tanah',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    title: 'Jenis-jenis Sertifikat Tanah di Indonesia',
    excerpt: 'Pelajari perbedaan antara SHM, HGB, dan jenis sertifikat lainnya.',
    category: 'Informasi',
    date: '3 April 2026',
    readTime: '8 menit'
  }
];

// Helper function to get KPR-related articles
export const getKPRArticles = () => {
  return allBlogArticles.filter(article => 
    article.category === 'Panduan KPR' || 
    article.slug.includes('kpr') ||
    article.title.toLowerCase().includes('kpr')
  );
};

// Helper function to get article by slug
export const getArticleBySlug = (slug: string) => {
  return allBlogArticles.find(article => article.slug === slug);
};
