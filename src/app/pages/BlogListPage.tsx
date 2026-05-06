import { useNavigate } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useState } from 'react';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

const featuredArticles = [
  {
    id: 1,
    slug: 'cara-mengatur-ruang-kos',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    title: '5 Cara Mengatur Ruang Kos Anda Jadi Lebih Nyaman',
    category: 'Tips & Trik',
    date: '27 April 2026'
  },
  {
    id: 2,
    slug: 'investasi-properti-2026',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop',
    title: 'Panduan Lengkap Investasi Properti di Tahun 2026',
    category: 'Investasi',
    date: '25 April 2026'
  },
  {
    id: 3,
    slug: 'desain-interior-modern',
    image: 'https://images.unsplash.com/photo-1760072513442-9872656c1b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    title: 'Tren Desain Interior Modern untuk Rumah Minimalis',
    category: 'Desain',
    date: '23 April 2026'
  }
];

const latestArticles = [
  {
    id: 4,
    slug: 'tips-memilih-lokasi-rumah',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    title: '7 Tips Memilih Lokasi Rumah yang Strategis',
    excerpt: 'Lokasi adalah faktor kunci dalam membeli properti. Pelajari cara memilih lokasi terbaik.',
    date: '22 April 2026',
    readTime: '5 menit'
  },
  {
    id: 5,
    slug: 'renovasi-rumah-hemat',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop',
    title: 'Cara Renovasi Rumah dengan Budget Terbatas',
    excerpt: 'Renovasi tidak harus mahal. Simak tips menghemat biaya tanpa mengurangi kualitas.',
    date: '20 April 2026',
    readTime: '6 menit'
  },
  {
    id: 6,
    slug: 'kpr-untuk-pemula',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    title: 'Panduan KPR untuk Pembeli Rumah Pertama',
    excerpt: 'Semua yang perlu Anda ketahui tentang kredit pemilikan rumah.',
    date: '18 April 2026',
    readTime: '8 menit'
  }
];

const popularArticles = [
  {
    id: 7,
    slug: 'hunian-ramah-lingkungan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
    title: 'Membangun Hunian Ramah Lingkungan',
    date: '15 April 2026'
  },
  {
    id: 8,
    slug: 'apartemen-vs-rumah',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop',
    title: 'Apartemen vs Rumah: Mana yang Lebih Menguntungkan?',
    date: '14 April 2026'
  },
  {
    id: 9,
    slug: 'properti-komersial-2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
    title: 'Peluang Investasi Properti Komersial di 2026',
    date: '12 April 2026'
  },
  {
    id: 10,
    slug: 'tips-jual-rumah-cepat',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
    title: 'Strategi Jitu Menjual Rumah dengan Cepat',
    date: '10 April 2026'
  }
];

const informationArticles = [
  {
    id: 11,
    slug: 'pajak-properti-2026',
    image: 'https://images.unsplash.com/photo-1772588627527-db42040f3a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    title: 'Panduan Lengkap Pajak Properti 2026',
    excerpt: 'Pahami berbagai jenis pajak yang harus dibayar pemilik properti.',
    date: '8 April 2026'
  },
  {
    id: 12,
    slug: 'hukum-jual-beli-properti',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    title: 'Aspek Hukum dalam Jual Beli Properti',
    excerpt: 'Kenali hak dan kewajiban Anda sebagai pembeli atau penjual properti.',
    date: '5 April 2026'
  },
  {
    id: 13,
    slug: 'sertifikat-tanah',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    title: 'Jenis-jenis Sertifikat Tanah di Indonesia',
    excerpt: 'Pelajari perbedaan antara SHM, HGB, dan jenis sertifikat lainnya.',
    date: '3 April 2026'
  }
];

export function BlogListPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleArticleClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e40af] via-[#2563EB] to-[#3b82f6] overflow-hidden">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-white text-sm font-semibold">📚 Pusat Pengetahuan Properti</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Panduan & Insight <br className="hidden md:block"/>
              Properti Terlengkap
            </h1>

            <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
              Temukan tips, strategi, dan panduan praktis dari para ahli untuk membantu Anda membuat keputusan properti yang tepat
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <span className="text-sm">Tips Praktis</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <span className="text-sm">Panduan Lengkap</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <span className="text-sm">Update Terkini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#2563EB] text-white text-sm font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-all">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Artikel Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-all">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span>{article.readTime} baca</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Populer untuk Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group cursor-pointer flex gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all"
              >
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-32 h-24 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-all">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Information Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Informasi</h2>
          <div className="space-y-6">
            {informationArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group cursor-pointer flex gap-6 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-48 h-32 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-all">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
    </div>
  );
}