import { useState } from 'react';
import { Link } from 'react-router';
import { Home, FileEdit, Rocket } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { useToast } from '../context/ToastContext';

export function AdvertiserPage() {
  const { showToast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTip, setOpenTip] = useState<number | null>(null);
  const [estimateAddress, setEstimateAddress] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [formData, setFormData] = useState({
    propertyType: '',
    listingType: 'jual',
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    landSize: '',
    buildingSize: '',
    description: '',
    name: '',
    phone: '',
    email: ''
  });

  const userRoles = [
    {
      id: 'owner',
      title: 'Pemilik Properti',
      icon: '🏠',
      benefits: [
        'Jual atau sewakan properti pribadi',
        'Kontrol penuh atas listing',
        'Tidak ada komisi untuk pemilik',
        'Update listing kapan saja'
      ],
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-[#2563EB]'
    },
    {
      id: 'agent',
      title: 'Agen Properti',
      icon: '👔',
      benefits: [
        'Kelola multiple listing',
        'Dashboard profesional',
        'Lead management tools',
        'Analytics & insights'
      ],
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-[#10B981]',
      featured: true
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Klik "Pasang Iklan"',
      description: 'Pilih tipe properti dan jenis listing Anda',
      icon: <Home className="w-12 h-12 text-[#2563EB]" />
    },
    {
      number: '2',
      title: 'Isi Detail Properti',
      description: 'Lengkapi informasi: lokasi, harga, foto, dan deskripsi',
      icon: <FileEdit className="w-12 h-12 text-[#2563EB]" />
    },
    {
      number: '3',
      title: 'Listing Langsung Tayang',
      description: 'Properti Anda live dan pembeli mulai menghubungi',
      icon: <Rocket className="w-12 h-12 text-[#2563EB]" />
    }
  ];

  const tips = [
    {
      title: 'Optimasi Judul Listing',
      content: 'Gunakan kata kunci yang spesifik seperti "Rumah Modern 2 Lantai di Jakarta Selatan" daripada hanya "Rumah Dijual". Sertakan lokasi dan fitur utama.'
    },
    {
      title: 'Tulis Deskripsi yang Menarik',
      content: 'Jelaskan keunggulan properti, fasilitas sekitar, dan akses transportasi. Gunakan bullet points untuk kemudahan membaca. Hindari typo dan gunakan bahasa yang profesional.'
    },
    {
      title: 'Upload Foto Berkualitas Tinggi',
      content: 'Minimal 5 foto dengan pencahayaan bagus. Sertakan foto eksterior, ruang tamu, kamar tidur, dapur, dan kamar mandi. Foto drone akan membuat listing lebih menarik.'
    },
    {
      title: 'Tentukan Harga yang Kompetitif',
      content: 'Riset harga properti serupa di area yang sama. Gunakan fitur estimasi harga kami untuk mendapat gambaran pasar. Harga yang realistis akan mempercepat penjualan.'
    }
  ];

  const faqs = [
    {
      question: 'Apakah benar gratis tanpa biaya tersembunyi?',
      answer: 'Ya, pasang iklan properti di RumahKu 100% gratis tanpa biaya apapun. Tidak ada biaya pendaftaran, biaya bulanan, atau komisi untuk pemilik properti.'
    },
    {
      question: 'Berapa lama proses verifikasi listing?',
      answer: 'Tim kami akan verifikasi listing Anda dalam waktu 1x24 jam di hari kerja. Setelah diverifikasi, listing langsung tayang dan bisa dilihat oleh jutaan pencari properti.'
    },
    {
      question: 'Dokumen apa saja yang diperlukan?',
      answer: 'Untuk listing basic: foto properti dan informasi dasar. Untuk verifikasi lengkap: sertifikat, IMB, PBB, dan identitas pemilik. Dokumen lengkap akan meningkatkan kepercayaan pembeli.'
    },
    {
      question: 'Bisakah saya edit listing setelah dipublish?',
      answer: 'Tentu saja! Anda bisa login ke dashboard dan edit informasi, foto, atau harga kapan saja. Perubahan akan langsung diterapkan setelah verifikasi singkat.'
    },
    {
      question: 'Berapa lama iklan saya akan tayang?',
      answer: 'Listing Anda akan tayang selama 90 hari. Setelah itu Anda bisa memperpanjang secara gratis. Anda juga bisa menandai sebagai "Terjual" atau hapus kapan saja.'
    },
    {
      question: 'Bagaimana cara mendapat lebih banyak viewers?',
      answer: 'Gunakan foto berkualitas, tulis deskripsi detail, update harga sesuai pasar, dan refresh listing secara berkala. Kami juga menawarkan paket premium untuk boost listing Anda.'
    }
  ];

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEstimateModal(false);
    setEstimateAddress('');
    showToast('Estimasi harga: Rp 2,1M – Rp 2,5M berdasarkan 127 properti serupa. Pasang iklan untuk analisis detail gratis!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Listing "${formData.title}" berhasil dibuat! Tim kami akan menghubungi Anda dalam 1x24 jam.`, 'success');
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

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2563EB] rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                #1 Platform Properti Indonesia
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
                Pasang Iklan Properti
                <span className="block text-[#2563EB]">Gratis, Cepat & Mudah</span>
              </h1>
              <p className="text-xl text-[#64748B] mb-8 leading-relaxed">
                Jangkau jutaan calon pembeli dan penyewa di seluruh Indonesia. Listing Anda tayang dalam hitungan menit, tanpa ribet dan tanpa biaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('user-roles')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-blue-500/50 transition-all font-bold text-lg inline-flex items-center justify-center gap-2"
                >
                  Mulai Pasang Iklan
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-all font-bold text-lg inline-flex items-center justify-center gap-2"
                >
                  Lihat Cara Kerja
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#0F172A]">10K+</div>
                  <div className="text-sm text-[#64748B]">Properti Terjual</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0F172A]">50K+</div>
                  <div className="text-sm text-[#64748B]">Pengguna Aktif</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#10B981]">98%</div>
                  <div className="text-sm text-[#64748B]">Kepuasan</div>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Image Card with Modern Shape */}
                <div className="relative">
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                      alt="Real estate agent with client"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/90 via-[#2563EB]/70 to-transparent"></div>
                  </div>

                  {/* Floating Badge - Top Right */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white rounded-2xl px-6 py-3 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
                    <div className="text-sm font-bold">100% GRATIS</div>
                  </div>

                  {/* Floating Stat Card 1 - Left */}
                  <div className="absolute -left-6 top-1/4 bg-white rounded-2xl p-4 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#64748B] font-medium">Published</div>
                        <div className="text-lg font-bold text-[#0F172A]">5 min</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stat Card 2 - Right */}
                  <div className="absolute -right-6 bottom-1/4 bg-white rounded-2xl p-4 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#64748B] font-medium">Views</div>
                        <div className="text-lg font-bold text-[#0F172A]">1.2K+</div>
                      </div>
                    </div>
                  </div>

                  {/* Small Decorative Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* Background Blur Elements */}
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 right-0 w-40 h-40 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full blur-3xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* User Segmentation Section - VERY IMPORTANT */}
      <section id="user-roles" className="py-20 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pilih Peran Anda
            </h2>
            <p className="text-xl text-blue-50">
              Kami menyediakan solusi yang tepat untuk setiap kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userRoles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative bg-gradient-to-br ${role.color} rounded-3xl p-8 border-2 ${role.borderColor} ${role.hoverColor} hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  selectedRole === role.id ? 'ring-4 ring-[#2563EB] scale-105' : ''
                }`}
              >
                {role.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold rounded-full shadow-lg">
                      PALING POPULER
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{role.icon}</div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{role.title}</h3>
                </div>

                <ul className="space-y-3 mb-8">
                  {role.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#0F172A]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/list-property/${role.id}`}
                  className="w-full py-3 bg-white text-[#2563EB] rounded-xl font-bold hover:bg-[#2563EB] hover:text-white hover:shadow-2xl hover:scale-105 transition-all shadow-md group-hover:shadow-xl block text-center"
                >
                  Pasang sebagai {role.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-100 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 text-[#2563EB] rounded-full text-sm font-semibold mb-4">
              Proses Mudah
            </div>
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Cara Kerja Super Mudah
            </h2>
            <p className="text-xl text-[#64748B]">
              Hanya 3 langkah untuk menjangkau jutaan pembeli
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:border-[#2563EB] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center h-full">
                  {/* Number Badge - Floating */}
                  <div className="absolute -top-4 -right-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all">
                        {step.number}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    </div>
                  </div>

                  {/* Icon with Background */}
                  <div className="mt-8 mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-blue-100 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-blue-100 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1769447386115-d83f1c26b97a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                    alt="Creative ideas and innovation"
                    className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F172A] mb-2">Tips & Trik</div>
                  <div className="text-[#64748B]">Dari para ahli properti</div>
                </div>
              </div>
            </div>

            {/* Right: Accordion */}
            <div>
              <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
                Tips Jual atau Sewa Lebih Cepat
              </h2>
              <p className="text-xl text-[#64748B] mb-8">
                Pelajari strategi terbaik dari ahli kami
              </p>

              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="bg-gradient-to-r from-white via-blue-50 to-cyan-50 rounded-xl border border-blue-200 overflow-hidden shadow-md hover:shadow-xl hover:border-[#2563EB] transition-all">
                    <button
                      onClick={() => setOpenTip(openTip === index ? null : index)}
                      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30">
                          {index + 1}
                        </div>
                        <span className="font-bold text-left text-[#0F172A]">{tip.title}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-[#2563EB] transition-transform ${openTip === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openTip === index && (
                      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-200">
                        <p className="text-[#334155] leading-relaxed">{tip.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Estimation CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2563EB] rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Alat Gratis
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Tidak Yakin Harga Properti Anda?
            </h2>
            <p className="text-xl text-[#64748B] mb-8 max-w-2xl mx-auto">
              Gunakan AI-powered price estimator kami untuk mendapatkan estimasi harga berdasarkan data pasar terkini secara GRATIS!
            </p>

            <button
              onClick={() => setShowEstimateModal(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#2563EB] text-white rounded-2xl hover:bg-[#1d4ed8] hover:shadow-2xl hover:scale-105 transition-all font-bold text-xl shadow-xl"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Cek Estimasi Harga Gratis
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-[#64748B]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Hasil Instan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Data Akurat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Estimation Modal */}
      {showEstimateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => {
          setShowEstimateModal(false);
          setEstimateAddress('');
        }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-[#10B981] text-white text-xs font-bold rounded-full">
                    Verified by RumahKu
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">PriceEstimator™</h2>
              </div>
              <button
                onClick={() => {
                  setShowEstimateModal(false);
                  setEstimateAddress('');
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="mb-6">
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">Estimasi Harga Properti Anda</h3>
                <p className="text-sm text-[#64748B]">
                  Dapatkan estimasi harga real-time berdasarkan data pasar terkini.
                </p>
              </div>

              <form onSubmit={handleEstimate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Lokasi Properti
                    </label>
                    <input
                      type="text"
                      value={estimateAddress}
                      onChange={(e) => setEstimateAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                      placeholder="Contoh: Menteng, Jakarta Pusat"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tipe Properti
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                      required
                    >
                      <option value="">Pilih Tipe</option>
                      <option value="rumah">Rumah</option>
                      <option value="apartemen">Apartemen</option>
                      <option value="villa">Villa</option>
                      <option value="tanah">Tanah</option>
                      <option value="ruko">Ruko</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Luas Tanah
                    <span className="text-xs text-slate-500 ml-1">(m²)</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                    placeholder="120"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Luas tanah dalam meter persegi</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Luas Bangunan
                    <span className="text-xs text-slate-500 ml-1">(m²)</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                    placeholder="80"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Luas bangunan dalam meter persegi</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kamar Tidur
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                      placeholder="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kamar Mandi
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white py-4 rounded-lg hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
                >
                  Hitung Estimasi Harga
                </button>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 border-2 border-green-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1705948354520-08d2557f55b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                    alt="Real estate consultation and support"
                    className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
                  Butuh Bantuan dari Ahli Properti?
                </h2>
                <p className="text-lg text-[#64748B] mb-8">
                  Tim support kami siap membantu Anda 24/7. Konsultasi gratis untuk strategi listing yang lebih efektif.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#20ba5a] transition-all font-semibold"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat via WhatsApp
                  </a>
                  <a
                    href="mailto:support@rumahku.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#10B981] text-[#10B981] rounded-xl hover:bg-[#10B981] hover:text-white transition-all font-semibold"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xl text-[#64748B]">
              Temukan jawaban untuk pertanyaan umum Anda
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-[#2563EB] transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-left text-[#0F172A] pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#2563EB] flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-5 bg-slate-50 border-t-2 border-slate-200">
                    <p className="text-[#64748B] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
