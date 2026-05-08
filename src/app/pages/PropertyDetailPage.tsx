import { useState, useEffect } from 'react';
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
  ChevronDown, ChevronUp, Share2, Heart, Download, Calculator
} from 'lucide-react';
import {
  getProperty,
  getFacilityAmount,
  mapToPropertyCard,
  type ApiProperty,
} from '../services/properties';
import { getPropertyReviews, postReview, type ApiReview } from '../services/reviews';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Star } from 'lucide-react';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showKprAssumptions, setShowKprAssumptions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    if (!id) return;
    getPropertyReviews(id)
      .then(setReviews)
      .catch(() => {});
  }, [id]);

  const downPayment = 5;
  const loanTenor = 15;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFetchError('');
    setCurrentImageIndex(0);
    getProperty(id)
      .then(setProperty)
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateMonthlyPayment = (price: number) => {
    const principal = price * (1 - downPayment / 100);
    const fixedRate = 0.0365 / 12;
    const numPayments = loanTenor * 12;
    return (principal * fixedRate * Math.pow(1 + fixedRate, numPayments)) /
      (Math.pow(1 + fixedRate, numPayments) - 1);
  };

  const faqItems = [
    {
      question: 'Bagaimana cara pembayaran properti ini?',
      answer: 'Kami menerima berbagai metode pembayaran termasuk KPR dari berbagai bank terkemuka, cash bertahap, dan hard cash. Tim kami akan membantu Anda dalam proses pengajuan KPR.',
    },
    {
      question: 'Dokumen apa saja yang diperlukan?',
      answer: 'Dokumen yang diperlukan meliputi: KTP, Kartu Keluarga, NPWP, Slip Gaji 3 bulan terakhir (untuk KPR), dan bukti pembayaran DP.',
    },
    {
      question: 'Apakah properti ini masih tersedia?',
      answer: 'Ya, properti ini masih tersedia dan ready untuk dilihat. Hubungi agen kami untuk jadwal viewing.',
    },
    {
      question: 'Apakah harga bisa dinegosiasi?',
      answer: 'Harga yang tertera adalah harga terbaik, namun kami terbuka untuk diskusi lebih lanjut. Silakan hubungi agen kami.',
    },
  ];

  // Derived values from API response
  const images = property?.images ?? (property?.primary_image ? [property.primary_image] : []);
  const imageUrls = images.map((img) => img.image_url).filter(Boolean);
  const facilities = property?.facilities ?? [];

  const bedrooms = getFacilityAmount(facilities, 'Kamar Tidur');
  const bathrooms = getFacilityAmount(facilities, 'Kamar Mandi');
  const garage = getFacilityAmount(facilities, 'Garasi');
  const carport = getFacilityAmount(facilities, 'Carport');

  const isSale = property?.listing_type === 'dijual';
  const location = property
    ? [property.city, property.province].filter(Boolean).join(', ') || property.address || ''
    : '';

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
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
            <span className="text-gray-900 font-semibold">
              {loading ? 'Memuat...' : (property?.title ?? 'Tidak ditemukan')}
            </span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail properti...</p>
        </div>
      )}

      {/* Error state */}
      {fetchError && !loading && (
        <div className="text-center py-32">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Gagal memuat properti</h2>
          <p className="text-gray-600 text-sm mb-6">{fetchError}</p>
          <Link to="/properties" className="text-[#2563EB] font-semibold hover:underline">
            Kembali ke daftar properti
          </Link>
        </div>
      )}

      {/* Main Content */}
      {!loading && !fetchError && property && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-[500px] bg-gray-900">
                  {imageUrls.length > 0 ? (
                    <ImageWithFallback
                      src={imageUrls[currentImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-24 h-24 text-gray-600" />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.is_featured && (
                      <div className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-sm font-bold rounded-lg shadow-lg">
                        Premium
                      </div>
                    )}
                    <div className="px-3 py-1 bg-[#2563EB] text-white text-sm font-bold rounded-lg shadow-lg">
                      {isSale ? 'Dijual' : 'Disewakan'}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {imageUrls.length > 1 && (
                    <>
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
                    </>
                  )}

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <Share2 className="w-5 h-5 text-gray-900" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(mapToPropertyCard(property))}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  {imageUrls.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-lg">
                      {currentImageIndex + 1} / {imageUrls.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {imageUrls.length > 1 && (
                  <div className="p-4 grid grid-cols-5 gap-3">
                    {imageUrls.map((img, idx) => (
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
                )}
              </div>

              {/* Property Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#0F172A] mb-2">
                    {formatPrice(property.price)}
                    {!isSale && property.rent_period && (
                      <span className="text-base font-normal text-gray-600">/{property.rent_period}</span>
                    )}
                  </div>
                  {isSale && (
                    <div className="text-sm text-gray-600">
                      Estimasi KPR mulai dari Rp {Math.floor(calculateMonthlyPayment(property.price) / 1000000)} juta/bulan
                    </div>
                  )}
                </div>

                <h1 className="text-2xl font-bold text-[#0F172A] mb-4">{property.title}</h1>

                <div className="flex items-start gap-2 text-gray-700 mb-6">
                  <MapPin className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>{property.address || location}</span>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#0F172A]">{bedrooms}</div>
                    <div className="text-sm text-gray-600">Kamar Tidur</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#0F172A]">{bathrooms}</div>
                    <div className="text-sm text-gray-600">Kamar Mandi</div>
                  </div>
                  <div className="text-center">
                    <Ruler className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#0F172A]">{property.land_size ?? 0}m²</div>
                    <div className="text-sm text-gray-600">Luas Tanah</div>
                  </div>
                  <div className="text-center">
                    <Home className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#0F172A]">{property.building_size ?? 0}m²</div>
                    <div className="text-sm text-gray-600">Luas Bangunan</div>
                  </div>
                </div>
              </div>

              {/* KPR Simulation */}
              {isSale && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-[#0F172A] mb-6">Simulasi KPR</h2>

                  <div className="space-y-4">
                    <button
                      onClick={() => setShowKprAssumptions(!showKprAssumptions)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">Lihat Asumsi Perhitungan</span>
                      {showKprAssumptions ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                    </button>

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
                            <span>Angsuran belum termasuk biaya notaris, provisi, asuransi, dan biaya administrasi lainnya</span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="text-sm text-gray-700 mb-2">Estimasi Cicilan Per Bulan</div>
                      <div className="text-sm text-gray-600 mb-1">(3 tahun pertama - masa fixed)</div>
                      <div className="text-3xl font-bold text-[#2563EB] mb-3">
                        {formatPrice(calculateMonthlyPayment(property.price))}
                      </div>
                      <div className="text-xs text-gray-600 bg-white/60 rounded p-2">
                        <strong>Note:</strong> Setelah 3 tahun, cicilan dapat berubah mengikuti suku bunga floating (estimasi 13% p.a.)
                      </div>
                    </div>

                    <Link to="/kpr/simulation" className="block w-full">
                      <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Coba Simulasi KPR Lengkap
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Specifications */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">Spesifikasi & Fasilitas</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Bed className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Kamar Tidur</div>
                      <div className="font-bold text-[#0F172A]">{bedrooms}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Bath className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Kamar Mandi</div>
                      <div className="font-bold text-[#0F172A]">{bathrooms}</div>
                    </div>
                  </div>

                  {garage > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Car className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Garasi</div>
                        <div className="font-bold text-[#0F172A]">{garage} Mobil</div>
                      </div>
                    </div>
                  )}

                  {carport > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Car className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Carport</div>
                        <div className="font-bold text-[#0F172A]">{carport} Mobil</div>
                      </div>
                    </div>
                  )}

                  {property.electrical_power != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Listrik</div>
                        <div className="font-bold text-[#0F172A]">{property.electrical_power} Watt</div>
                      </div>
                    </div>
                  )}

                  {property.certificate && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Sertifikat</div>
                        <div className="font-bold text-[#0F172A]">{property.certificate}</div>
                      </div>
                    </div>
                  )}

                  {property.floors != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Lantai</div>
                        <div className="font-bold text-[#0F172A]">{property.floors}</div>
                      </div>
                    </div>
                  )}

                  {property.furnishing && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Kondisi</div>
                        <div className="font-bold text-[#0F172A]">{property.furnishing}</div>
                      </div>
                    </div>
                  )}

                  {property.year_built != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Tahun Dibangun</div>
                        <div className="font-bold text-[#0F172A]">{property.year_built}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.description && (
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
              )}

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">Lokasi</h2>

                <div className="flex items-start gap-2 text-gray-700 mb-6">
                  <MapPin className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>{property.address || location}</span>
                </div>

                <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Peta Lokasi</p>
                    <p className="text-sm">Google Maps Embed</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
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
                        <div className="px-4 pb-4 text-gray-700">{item.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                  Ulasan ({reviews.length})
                </h2>

                {/* Submit form — authenticated only */}
                {isAuthenticated ? (
                  <form
                    className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!reviewContent.trim() || !id) return;
                      setReviewSubmitting(true);
                      setReviewError('');
                      try {
                        const newReview = await postReview(id, { content: reviewContent, rating: reviewRating });
                        setReviews((prev) => [newReview, ...prev]);
                        setReviewContent('');
                        setReviewRating(5);
                        showToast('Ulasan berhasil dikirim', 'success');
                      } catch (err: unknown) {
                        const msg = err instanceof Error ? err.message : 'Gagal mengirim ulasan';
                        setReviewError(msg);
                        showToast(msg, 'error');
                      } finally {
                        setReviewSubmitting(false);
                      }
                    }}
                  >
                    <h3 className="font-semibold text-[#0F172A] mb-3">Tulis Ulasan</h3>

                    {/* Star rating picker */}
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="Bagikan pengalaman Anda tentang properti ini..."
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />

                    {reviewError && (
                      <p className="text-red-500 text-xs mt-1">{reviewError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={reviewSubmitting || !reviewContent.trim()}
                      className="mt-3 px-5 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {reviewSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                    </button>
                  </form>
                ) : (
                  <div className="mb-6 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                    <p className="text-sm text-blue-700 flex-1">Login untuk menulis ulasan.</p>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-4 py-1.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors"
                    >
                      Masuk
                    </button>
                  </div>
                )}

                {/* Review list */}
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">Belum ada ulasan untuk properti ini.</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold text-[#0F172A] text-sm">
                              {review.user?.full_name || review.user?.username || 'Pengguna'}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-8 h-8 text-[#2563EB]" />
                    </div>
                    <h3 className="font-bold text-[#0F172A]">Hubungi Agen</h3>
                    <p className="text-sm text-gray-600">Tanyakan properti ini sekarang</p>
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
      )}

      <Footer />
    </div>
  );
}
