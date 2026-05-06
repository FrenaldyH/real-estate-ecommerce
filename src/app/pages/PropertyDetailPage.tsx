import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import {
  MapPin, Bed, Bath, Ruler, Car, Zap, FileText, Home,
  Phone, MessageCircle, Calendar, ChevronLeft, ChevronRight,
  ChevronDown, ChevronUp, Share2, Heart, School, ShoppingBag,
  Train, Download, Calculator
} from 'lucide-react';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showKprAssumptions, setShowKprAssumptions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // KPR Calculator State - Fixed assumptions
  const downPayment = 5; // Fixed 5%
  const loanTenor = 15; // Fixed 15 years

  // Mock property data - in real app, fetch based on ID
  const property = {
    id: parseInt(id || '1'),
    type: 'sale', // 'sale' or 'rent'
    title: 'Rumah Modern Minimalis di Menteng',
    price: 2450000000,
    pricePerMonth: 15000000, // for rent
    location: 'Menteng, Jakarta Pusat',
    address: 'Jl. Teuku Umar No. 45, Menteng, Jakarta Pusat, DKI Jakarta',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 180,
    buildingSize: 250,
    floors: 2,
    carport: 2,
    garage: 1,
    electricity: 3500,
    certificate: 'SHM',
    furnishing: 'Semi Furnished',
    yearBuilt: 2020,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: `Rumah mewah dengan desain modern minimalis di kawasan elit Menteng. Properti ini menawarkan kenyamanan maksimal dengan ruang yang luas dan pencahayaan alami yang optimal.

Rumah ini dilengkapi dengan berbagai fasilitas premium seperti taman belakang yang asri, dapur modern dengan island counter, dan kamar tidur utama dengan walk-in closet. Setiap sudut rumah dirancang dengan detail yang sempurna untuk memberikan pengalaman tinggal yang eksklusif.

Lokasi strategis dengan akses mudah ke berbagai fasilitas publik seperti sekolah internasional, pusat perbelanjaan, dan rumah sakit. Lingkungan yang aman dan nyaman dengan sistem keamanan 24 jam.`,
    agent: {
      name: 'Jessica Tanoto',
      company: 'Premium Property Group',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      phone: '+62 812-3456-7890',
      verified: true
    },
    nearbyPlaces: [
      { type: 'school', name: 'SD Menteng 01', distance: '500m' },
      { type: 'school', name: 'SMA Negeri 4 Jakarta', distance: '1.2km' },
      { type: 'mall', name: 'Plaza Indonesia', distance: '2.5km' },
      { type: 'mall', name: 'Grand Indonesia', distance: '2.8km' },
      { type: 'transport', name: 'Stasiun MRT Bundaran HI', distance: '3km' },
      { type: 'transport', name: 'Halte TransJakarta Tosari', distance: '1.5km' }
    ]
  };

  const relatedProperties = [
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      price: 'Rp 1.850.000.000',
      title: 'Villa Mewah dengan Taman',
      location: 'Pondok Indah, Jakarta Selatan',
      bedrooms: 5,
      bathrooms: 4,
      area: 250
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      price: 'Rp 3.200.000.000',
      title: 'Rumah Kolam Renang Premium',
      location: 'BSD City, Tangerang',
      bedrooms: 4,
      bathrooms: 3,
      area: 300
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      price: 'Rp 2.750.000.000',
      title: 'Rumah Tropis Modern',
      location: 'Kemang, Jakarta Selatan',
      bedrooms: 4,
      bathrooms: 4,
      area: 220
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      price: 'Rp 1.950.000.000',
      title: 'Rumah Kontemporer Elegant',
      location: 'Bintaro, Tangerang Selatan',
      bedrooms: 3,
      bathrooms: 2,
      area: 160
    }
  ];

  const faqItems = [
    {
      question: 'Bagaimana cara pembayaran properti ini?',
      answer: 'Kami menerima berbagai metode pembayaran termasuk KPR (Kredit Pemilikan Rumah) dari berbagai bank terkemuka, cash bertahap, dan hard cash. Tim kami akan membantu Anda dalam proses pengajuan KPR.'
    },
    {
      question: 'Dokumen apa saja yang diperlukan?',
      answer: 'Dokumen yang diperlukan meliputi: KTP, Kartu Keluarga, NPWP, Slip Gaji 3 bulan terakhir (untuk KPR), dan bukti pembayaran DP. Tim legal kami akan membantu memastikan kelengkapan dokumen.'
    },
    {
      question: 'Apakah properti ini masih tersedia?',
      answer: 'Ya, properti ini masih tersedia dan ready untuk dilihat. Anda dapat menghubungi agen kami untuk jadwal viewing atau survey lokasi.'
    },
    {
      question: 'Apakah harga bisa dinegosiasi?',
      answer: 'Harga yang tertera adalah harga terbaik, namun kami terbuka untuk diskusi lebih lanjut. Silakan hubungi agen kami untuk informasi lebih detail.'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateMonthlyPayment = () => {
    const principal = property.price * (1 - downPayment / 100);
    const fixedRate = 0.0365 / 12; // 3.65% annual interest (fixed 3 years)
    const numPayments = loanTenor * 12;
    const monthly = (principal * fixedRate * Math.pow(1 + fixedRate, numPayments)) /
                   (Math.pow(1 + fixedRate, numPayments) - 1);
    return monthly;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#2563EB]">Beranda</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-[#2563EB]">Properti</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-[500px] bg-gray-900">
                <ImageWithFallback
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && (
                    <div className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-sm font-bold rounded-lg shadow-lg">
                      Premium
                    </div>
                  )}
                  <div className="px-3 py-1 bg-[#2563EB] text-white text-sm font-bold rounded-lg shadow-lg">
                    {property.type === 'sale' ? 'Dijual' : 'Disewakan'}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <Share2 className="w-5 h-5 text-gray-900" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(property)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-lg">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 grid grid-cols-5 gap-3">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-[#2563EB] ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ImageWithFallback src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <div className="text-3xl font-bold text-[#0F172A] mb-2">
                  {formatPrice(property.price)}
                </div>
                <div className="text-sm text-gray-600">
                  {property.type === 'sale' ? 'Estimasi KPR mulai dari Rp ' + Math.floor(calculateMonthlyPayment() / 1000000) + ' juta/bulan' : 'Per bulan'}
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
                {property.title}
              </h1>

              <div className="flex items-start gap-2 text-gray-700 mb-6">
                <MapPin className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                <span>{property.address}</span>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#0F172A]">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Kamar Tidur</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#0F172A]">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Kamar Mandi</div>
                </div>
                <div className="text-center">
                  <Ruler className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#0F172A]">{property.landSize}m²</div>
                  <div className="text-sm text-gray-600">Luas Tanah</div>
                </div>
                <div className="text-center">
                  <Home className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#0F172A]">{property.buildingSize}m²</div>
                  <div className="text-sm text-gray-600">Luas Bangunan</div>
                </div>
              </div>
            </div>

            {/* Price Simulation */}
            {property.type === 'sale' && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Simulasi KPR</h2>

                <div className="space-y-4">
                  {/* Assumptions Toggle Button */}
                  <button
                    onClick={() => setShowKprAssumptions(!showKprAssumptions)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-700">Lihat Asumsi Perhitungan</span>
                    {showKprAssumptions ? (
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </button>

                  {/* Assumptions Details */}
                  {showKprAssumptions && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h3 className="text-sm font-bold text-gray-800 mb-3">Asumsi Perhitungan KPR/KPA:</h3>
                      <ul className="space-y-2 text-xs text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-[#2563EB] mt-0.5">•</span>
                          <span>DP <strong>{downPayment}%</strong> dari harga properti ({formatPrice(property.price * downPayment / 100)})</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2563EB] mt-0.5">•</span>
                          <span>Tenor pembiayaan <strong>{loanTenor} tahun</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2563EB] mt-0.5">•</span>
                          <span>Bunga <strong>3.65%</strong> per tahun selama masa fixed 3 tahun</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2563EB] mt-0.5">•</span>
                          <span>Asumsi bunga floating <strong>13%</strong> per tahun setelah masa fixed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2563EB] mt-0.5">•</span>
                          <span>Angsuran belum termasuk biaya lain-lain seperti biaya appraisal, biaya provisi, biaya asuransi, biaya notaris, dan biaya administrasi lainnya</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Monthly Payment Result */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="text-sm text-gray-700 mb-2">Estimasi Cicilan Per Bulan</div>
                    <div className="text-sm text-gray-600 mb-1">(3 tahun pertama - masa fixed)</div>
                    <div className="text-3xl font-bold text-[#2563EB] mb-3">
                      {formatPrice(calculateMonthlyPayment())}
                    </div>
                    <div className="text-xs text-gray-600 bg-white/60 rounded p-2">
                      <strong>Note:</strong> Setelah 3 tahun, cicilan dapat berubah mengikuti suku bunga floating (estimasi 13% p.a.)
                    </div>
                  </div>

                  {/* CTA Button to KPR Simulation Page */}
                  <Link
                    to="/kpr/simulation"
                    className="block w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Coba Simulasi KPR Lengkap
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Features & Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Spesifikasi & Fasilitas</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bed className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Kamar Tidur</div>
                    <div className="font-bold text-[#0F172A]">{property.bedrooms}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bath className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Kamar Mandi</div>
                    <div className="font-bold text-[#0F172A]">{property.bathrooms}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Garasi</div>
                    <div className="font-bold text-[#0F172A]">{property.garage} Mobil</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Carport</div>
                    <div className="font-bold text-[#0F172A]">{property.carport} Mobil</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Listrik</div>
                    <div className="font-bold text-[#0F172A]">{property.electricity} Watt</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Sertifikat</div>
                    <div className="font-bold text-[#0F172A]">{property.certificate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Lantai</div>
                    <div className="font-bold text-[#0F172A]">{property.floors}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Kondisi</div>
                    <div className="font-bold text-[#0F172A]">{property.furnishing}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Tahun Dibangun</div>
                    <div className="font-bold text-[#0F172A]">{property.yearBuilt}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Deskripsi Properti</h2>

              <div className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                {property.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center gap-2 text-[#2563EB] font-semibold hover:text-[#1d4ed8] transition-colors mt-2"
              >
                {showFullDescription ? (
                  <>Lihat Lebih Sedikit <ChevronUp className="w-5 h-5" /></>
                ) : (
                  <>Lihat Selengkapnya <ChevronDown className="w-5 h-5" /></>
                )}
              </button>
            </div>

            {/* Location & Map */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Lokasi & Lingkungan</h2>

              <div className="flex items-start gap-2 text-gray-700 mb-6">
                <MapPin className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                <span>{property.address}</span>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Peta Lokasi</p>
                  <p className="text-sm">Google Maps Embed</p>
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h3 className="font-bold text-[#0F172A] mb-4">Lokasi Terdekat</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.nearbyPlaces.map((place, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        {place.type === 'school' && <School className="w-5 h-5 text-[#2563EB]" />}
                        {place.type === 'mall' && <ShoppingBag className="w-5 h-5 text-[#2563EB]" />}
                        {place.type === 'transport' && <Train className="w-5 h-5 text-[#2563EB]" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#0F172A] text-sm">{place.name}</div>
                        <div className="text-xs text-gray-600">{place.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Pertanyaan Umum</h2>

              <div className="space-y-3">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#0F172A] text-left">{item.question}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === idx && (
                      <div className="px-4 pb-4 text-gray-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Properti Serupa</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProperties.map((prop) => (
                  <Link
                    key={prop.id}
                    to={`/property/${prop.id}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <ImageWithFallback
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-[#0F172A] text-sm mb-1">{prop.price}</div>
                      <div className="text-xs text-gray-700 mb-2 line-clamp-1">{prop.title}</div>
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{prop.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          <Bed className="w-3 h-3" />
                          <span>{prop.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-3 h-3" />
                          <span>{prop.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3" />
                          <span>{prop.area}m²</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Agent Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <ImageWithFallback
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    {property.agent.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-[#0F172A]">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">{property.agent.company}</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl hover:bg-[#1d4ed8] transition-colors font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                    <Phone className="w-5 h-5" />
                    Hubungi Agen
                  </button>

                  <button className="w-full bg-[#10B981] text-white py-3 rounded-xl hover:bg-[#059669] transition-colors font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30">
                    <MessageCircle className="w-5 h-5" />
                    Chat via WhatsApp
                  </button>

                  <button className="w-full border-2 border-[#2563EB] text-[#2563EB] py-3 rounded-xl hover:bg-blue-50 transition-colors font-bold flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Jadwalkan Survey
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-600 text-center">
                    Respon cepat dalam 5 menit
                  </div>
                </div>
              </div>

              {/* App Download CTA */}
              <div className="bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center mb-4">
                  <Download className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Download Aplikasi RumahKu</h3>
                  <p className="text-sm text-blue-100">
                    Cari properti lebih mudah dengan aplikasi mobile kami
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white text-[#2563EB] py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm">
                    App Store
                  </button>
                  <button className="flex-1 bg-white text-[#2563EB] py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm">
                    Play Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
