import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, ChevronRight, Search, Building2, Percent, Clock, FileText, CheckCircle, ArrowRight, Shield, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { PropertyCard } from '../components/PropertyCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { KPRDictionary } from '../components/KPRDictionary';
import { getKPRArticles } from '../data/blogArticles';
import { getProperties, mapToPropertyCard } from '../services/properties';
import { useToast } from '../context/ToastContext';

export function KPRPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const kprArticles = getKPRArticles().slice(0, 3);
  const [kprProperties, setKprProperties] = useState<ReturnType<typeof mapToPropertyCard>[]>([]);

  useEffect(() => {
    getProperties({ 'listing-type': 'dijual', status: 'available' })
      .then((data) => setKprProperties(data.slice(0, 3).map(mapToPropertyCard)))
      .catch(() => {});
  }, []);

  // KPR Calculator State
  const [propertyPrice, setPropertyPrice] = useState(500000000);
  const [downPayment, setDownPayment] = useState(100000000);
  const [tenor, setTenor] = useState(15);
  const [kprType, setKprType] = useState<'konvensional' | 'syariah'>('konvensional');
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate monthly installment
  useEffect(() => {
    const loanAmount = propertyPrice - downPayment;
    const months = tenor * 12;
    
    if (kprType === 'konvensional') {
      // Fixed interest rate ~8% per year
      const monthlyRate = 0.08 / 12;
      const installment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      setMonthlyInstallment(Math.round(installment));
    } else {
      // Syariah: flat margin ~7% per year
      const totalPayment = loanAmount + (loanAmount * 0.07 * tenor);
      const installment = totalPayment / months;
      setMonthlyInstallment(Math.round(installment));
    }
  }, [propertyPrice, downPayment, tenor, kprType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const downPaymentPercentage = Math.round((downPayment / propertyPrice) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Section with KPR Simulator */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzYxMDc3OHww&ixlib=rb-4.1.0&q=80&w=1080')`,
            filter: "blur(8px)",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-800/85"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT SIDE - Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400/30">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Solusi Kepemilikan Rumah
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                KPR Mudah & Menguntungkan untuk
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Rumah Impian Anda
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                Wujudkan rumah impian dengan cicilan yang terjangkau. Proses
                cepat, bunga kompetitif, dan disetujui bank terpercaya di
                Indonesia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => navigate("/kpr/simulation")}
                  className="px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Simulasi & Ajukan KPR
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 text-slate-400">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">
                  Didukung oleh bank terpercaya di Indonesia
                </span>
              </div>
            </div>

            {/* RIGHT SIDE - KPR Calculator Card */}
            <div className="w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Cek Estimasi Cicilan KPR
                  </h2>
                </div>

                {/* Monthly Installment Display */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-100">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-slate-600">Cicilan per Bulan</p>
                    <span className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-700 text-xs font-semibold rounded">
                      Simulasi
                    </span>
                  </div>
                  <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-3">
                    {formatCurrency(monthlyInstallment)}
                  </p>

                  {/* Interest/Margin Info */}
                  <div className="flex items-start gap-2 mb-3 p-3 bg-white/60 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-slate-600">
                      {kprType === "konvensional" ? (
                        <p>
                          <span className="font-semibold text-slate-700">
                            Suku bunga estimasi: ~8% per tahun
                          </span>
                          <br />
                          <span className="text-slate-500">
                            (fixed simulasi)
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span className="font-semibold text-slate-700">
                            Margin estimasi: ~7% per tahun
                          </span>
                          <br />
                          <span className="text-slate-500">(flat)</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Trust Layer */}
                  <p className="text-xs text-slate-500 italic">
                    ⚠️ Estimasi, bukan angka final bank. Perhitungan berdasarkan
                    asumsi standar.
                  </p>
                </div>

                {/* Calculation Breakdown */}
                <div className="mb-8">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between text-left py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                  >
                    <span className="font-semibold text-slate-700 text-sm">
                      Rincian Simulasi
                    </span>
                    {showBreakdown ? (
                      <ChevronUp className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    )}
                  </button>

                  {showBreakdown && (
                    <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">
                          Harga Properti
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {formatCurrency(propertyPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">
                          Uang Muka (DP)
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {formatCurrency(downPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">
                          Total Pinjaman
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {formatCurrency(propertyPrice - downPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Tenor</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {tenor} tahun ({tenor * 12} bulan)
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">
                          {kprType === "konvensional"
                            ? "Estimasi Bunga"
                            : "Estimasi Margin"}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {kprType === "konvensional"
                            ? "~8% / tahun"
                            : "~7% / tahun"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 pt-3">
                        <span className="text-sm font-bold text-slate-700">
                          Total Pembayaran Akhir
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {formatCurrency(monthlyInstallment * tenor * 12)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* KPR Type Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Tipe KPR
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setKprType("konvensional")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all text-left ${
                        kprType === "konvensional"
                          ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <div className="font-semibold">Konvensional</div>
                      <div
                        className={`text-xs mt-1 ${kprType === "konvensional" ? "text-blue-100" : "text-slate-500"}`}
                      >
                        Bunga berbasis suku bunga bank
                      </div>
                    </button>
                    <button
                      onClick={() => setKprType("syariah")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all text-left ${
                        kprType === "syariah"
                          ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <div className="font-semibold">Syariah</div>
                      <div
                        className={`text-xs mt-1 ${kprType === "syariah" ? "text-blue-100" : "text-slate-500"}`}
                      >
                        Tanpa bunga, margin tetap
                      </div>
                    </button>
                  </div>
                </div>

                {/* Property Price Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Harga Properti
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatNumber(propertyPrice)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPropertyPrice(Number(value) || 0);
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Down Payment Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Uang Muka / DP{" "}
                    <span className="text-blue-600">
                      ({downPaymentPercentage}%)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatNumber(downPayment)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const dpValue = Number(value) || 0;
                        if (dpValue <= propertyPrice) {
                          setDownPayment(dpValue);
                        }
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Tenor Slider */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Tenor <span className="text-blue-600">({tenor} Tahun)</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={tenor}
                    onChange={(e) => setTenor(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((tenor - 5) / 20) * 100}%, #E2E8F0 ${((tenor - 5) / 20) * 100}%, #E2E8F0 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>5 Tahun</span>
                    <span>25 Tahun</span>
                  </div>
                </div>

                {/* Micro Education */}
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Perhitungan dapat berbeda tergantung kebijakan bank, profil
                    kredit, dan properti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Mengapa Pilih KPR RumahKu?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kami menyediakan solusi KPR terbaik dengan proses yang mudah dan
              bunga kompetitif
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Bunga Kompetitif
              </h3>
              <p className="text-slate-600">
                Dapatkan suku bunga KPR terbaik mulai dari 3.88% per tahun
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Proses Cepat
              </h3>
              <p className="text-slate-600">
                Persetujuan KPR dalam 3-7 hari kerja dengan dokumen lengkap
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Disetujui Mudah
              </h3>
              <p className="text-slate-600">
                Persyaratan fleksibel untuk karyawan, wiraswasta, dan
                profesional
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Terpercaya
              </h3>
              <p className="text-slate-600">
                Bekerja sama dengan 15+ bank terpercaya di Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-center text-2xl font-bold text-slate-900 mb-12">
            Didukung oleh Bank Terpercaya
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {[
              { name: "BCA", src: "/logos/banks/BCA.svg" },
              { name: "Mandiri", src: "/logos/banks/Mandiri.svg" },
              { name: "BNI", src: "/logos/banks/BNI.svg" },
              { name: "BRI", src: "/logos/banks/BRI.svg" },
              { name: "CIMB Niaga", src: "/logos/banks/CIMB%20Niaga.svg" },
              { name: "BTN", src: "/logos/banks/BTN.svg" },
              { name: "Danamon", src: "/logos/banks/Danamon.svg" },
              { name: "Permata", src: "/logos/banks/Permata%20Bank.svg" },
              { name: "OCBC NISP", src: "/logos/banks/OCBC%20NISP.svg" },
              { name: "Maybank", src: "/logos/banks/Maybank.svg" },
            ].map((bank) => (
              <div
                key={bank.name}
                className="w-full bg-white rounded-xl px-4 py-5 shadow-sm hover:shadow-md transition-all border border-slate-200 flex flex-col items-center gap-2"
              >
                <img
                  src={bank.src}
                  alt={bank.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                <p className="font-bold text-slate-700 text-center text-sm">
                  {bank.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2563EB] to-[#3B82F6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Wujudkan Rumah Impian Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Konsultasikan kebutuhan KPR Anda dengan tim ahli kami sekarang juga
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285385560367?text=Halo%20RumahKu%2C%20saya%20ingin%20konsultasi%20KPR."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#2563EB] rounded-xl hover:shadow-2xl transition-all font-bold text-lg text-center"
            >
              Hubungi Konsultan KPR
            </a>
            <button
              onClick={() => navigate('/properties?listing-type=dijual')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl hover:bg-white/20 transition-all font-bold text-lg"
            >
              Lihat Properti KPR
            </button>
          </div>
        </div>
      </section>

      {/* Properties with KPR Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Properti Tersedia dengan KPR
              </h2>
              <p className="text-lg text-slate-600">
                Rumah dan apartemen pilihan yang dapat dibeli dengan fasilitas
                KPR
              </p>
            </div>
            <button
              onClick={() => navigate("/properties?type=buy")}
              className="hidden md:block px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Lihat Semua
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kprProperties.length > 0
              ? kprProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
                ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => navigate("/properties?type=buy")}
              className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Lihat Semua Properti
            </button>
          </div>
        </div>
      </section>

      {/* KPR Related Articles Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Artikel Terkait KPR
              </h2>
              <p className="text-lg text-slate-600">
                Tips dan panduan lengkap seputar KPR untuk Anda
              </p>
            </div>
            <button
              onClick={() => navigate("/blog")}
              className="hidden md:block px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Lihat Semua Artikel
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {kprArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>📅 {article.date}</span>
                    <span className="mx-2">•</span>
                    <span>⏱️ {article.readTime} baca</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-slate-600">
              Temukan jawaban untuk pertanyaan umum seputar KPR
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>Apa itu KPR dan bagaimana cara kerjanya?</span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed">
                  KPR (Kredit Pemilikan Rumah) adalah fasilitas kredit dari bank
                  untuk membeli properti. Anda membayar uang muka (DP) terlebih
                  dahulu, kemudian sisanya dibiayai oleh bank dan dicicil
                  bulanan selama tenor yang disepakati (biasanya 5-25 tahun).
                  Cicilan terdiri dari pokok pinjaman dan bunga/margin.
                </p>
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>Berapa minimal DP (Down Payment) untuk KPR?</span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed">
                  Minimal DP untuk KPR biasanya 10-20% dari harga properti,
                  tergantung kebijakan bank dan jenis properti. Untuk rumah
                  subsidi, DP bisa lebih rendah (5-10%). Semakin besar DP yang
                  Anda bayarkan, cicilan bulanan akan semakin ringan dan peluang
                  approval lebih tinggi.
                </p>
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>Apa perbedaan KPR Konvensional dan Syariah?</span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed mb-3">
                  <strong>KPR Konvensional:</strong> Menggunakan sistem bunga
                  yang bisa berubah (floating) setelah masa promo. Total
                  pembayaran bergantung pada suku bunga bank.
                </p>
                <p className="leading-relaxed">
                  <strong>KPR Syariah:</strong> Menggunakan akad jual-beli
                  (murabahah) tanpa bunga. Margin sudah ditetapkan di awal dan
                  tidak berubah, sesuai prinsip syariah Islam.
                </p>
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>Berapa lama proses persetujuan KPR?</span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed">
                  Proses persetujuan KPR biasanya memakan waktu 1-2 minggu jika
                  dokumen lengkap. Namun bisa lebih cepat (3-7 hari kerja) atau
                  lebih lama tergantung kelengkapan dokumen, profil kredit
                  pemohon, dan kebijakan bank. Pastikan semua dokumen yang
                  dibutuhkan sudah disiapkan dengan lengkap dan benar.
                </p>
              </div>
            </details>

            {/* FAQ Item 5 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>
                  Apa saja dokumen yang dibutuhkan untuk mengajukan KPR?
                </span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed mb-3">
                  Dokumen yang umumnya dibutuhkan:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>KTP dan Kartu Keluarga</li>
                  <li>NPWP</li>
                  <li>Slip gaji 3 bulan terakhir / laporan keuangan usaha</li>
                  <li>Rekening koran 3-6 bulan terakhir</li>
                  <li>Surat keterangan kerja / izin usaha</li>
                  <li>Akta nikah/cerai (jika sudah menikah/cerai)</li>
                  <li>Fotokopi sertifikat properti (jika sudah ada)</li>
                </ul>
              </div>
            </details>

            {/* FAQ Item 6 */}
            <details className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 text-lg hover:bg-slate-100 transition-colors">
                <span>
                  Apakah bisa mengajukan KPR jika masih punya pinjaman lain?
                </span>
                <ChevronDown className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                <p className="leading-relaxed">
                  Bisa, asalkan rasio cicilan total (debt service ratio) tidak
                  melebihi 30-40% dari penghasilan bulanan. Bank akan menghitung
                  kemampuan bayar Anda berdasarkan penghasilan dikurangi cicilan
                  yang sudah ada. Sebaiknya lunasi atau kurangi pinjaman lain
                  terlebih dahulu untuk meningkatkan peluang approval.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* KPR Dictionary Section */}
      <KPRDictionary />

      {/* Mobile App Download Section */}
      <section className="py-20 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0wIDM4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                KPR di Genggaman Anda
              </h2>
              <p className="text-xl text-blue-50 mb-8">
                Simulasikan KPR, ajukan, dan kelola semua dari smartphone dengan
                aplikasi RumahKu
              </p>

              {/* Features List */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">
                      Simulasi KPR Real-time
                    </div>
                    <div className="text-blue-50">
                      Hitung cicilan dan bandingkan program dari berbagai bank
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">
                      Pengajuan KPR Online
                    </div>
                    <div className="text-blue-50">
                      Ajukan KPR langsung dari aplikasi tanpa ribet
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">
                      Konsultasi dengan Ahli
                    </div>
                    <div className="text-blue-50">
                      Chat langsung dengan konsultan KPR berpengalaman
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => showToast('Aplikasi RumahKu akan segera hadir di App Store!', 'info')}
                  className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download di</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => showToast('Aplikasi RumahKu akan segera hadir di Google Play!', 'info')}
                  className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download di</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-[600px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                  <div className="h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F59E0B] rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#10B981] rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
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

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
          border: none;
        }
      `}</style>
    </div>
  );
}