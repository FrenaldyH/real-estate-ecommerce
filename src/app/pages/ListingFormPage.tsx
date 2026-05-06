import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { Home, Upload, MapPin, DollarSign, Bed, Bath, Ruler, FileText, User, Phone, Mail, Image, FileCheck, Zap, Car, Droplet, Compass, Building2 } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export function ListingFormPage() {
  const { roleType } = useParams<{ roleType: string }>();
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
    email: '',
    certificate: '',
    furnishing: '',
    floors: '',
    // Data Pelengkap untuk Agent
    canNegotiate: 'ya',
    negotiationLimit: '',
    paymentMethods: [] as string[],
    certificateStatus: '',
    certificateLocation: '',
    auctionStatus: '',
    hasIMBPBB: '',
    powerCapacity: '',
    carportCapacity: '',
    garageCapacity: '',
    artBedrooms: '',
    artBathrooms: '',
    carAccess: '',
    carAccessCount: '',
    waterSource: '',
    buildingDirection: '',
    surroundings: '',
    yearBuilt: ''
  });

  const getRoleTitle = () => {
    switch (roleType) {
      case 'owner':
        return 'Pemilik Properti';
      case 'agent':
        return 'Agen Properti';
      default:
        return 'Advertiser';
    }
  };

  const getRoleIcon = () => {
    switch (roleType) {
      case 'owner':
        return '🏠';
      case 'agent':
        return '👔';
      default:
        return '📝';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Listing properti "${formData.title}" berhasil dibuat sebagai ${getRoleTitle()}!\n\nTim kami akan menghubungi Anda dalam 1x24 jam untuk verifikasi.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">RumahKu</span>
          </Link>
          <Link to="/advertiser" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Kembali
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <span className="text-xl">{getRoleIcon()}</span>
                <span className="text-sm font-semibold tracking-wide">{getRoleTitle()}</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                Pasang Properti Anda dan Jangkau Lebih Banyak Pembeli
              </h1>

              {/* Description */}
              <p className="text-lg text-blue-100 leading-relaxed">
                Lengkapi detail properti dengan mudah dan tampilkan listing Anda kepada jutaan calon pembeli di seluruh Indonesia.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-sm text-blue-200">Pengunjung Aktif</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">24h</div>
                  <div className="text-sm text-blue-200">Listing Tayang</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">Gratis</div>
                  <div className="text-sm text-blue-200">Tanpa Biaya</div>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Verifikasi Cepat</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Jangkauan Luas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Mudah Dikelola</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:block hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762811054947-605b20298615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMHJlYWwlMjBlc3RhdGUlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc3MTc1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern property showcase"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient for better blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Wave Transition */}
        <div className="relative">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
          </svg>
        </div>
      </section>

      {/* Main Form */}
      <section className="bg-slate-50 py-12 -mt-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Property Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Informasi Properti</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tipe Properti *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    required
                  >
                    <option value="">Pilih Tipe Properti</option>
                    <option value="rumah">Rumah</option>
                    <option value="apartemen">Apartemen</option>
                    <option value="villa">Villa</option>
                    <option value="tanah">Tanah</option>
                    <option value="ruko">Ruko</option>
                    <option value="gedung">Gedung</option>
                    <option value="warehouse">Gudang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Listing *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="listingType"
                        value="jual"
                        checked={formData.listingType === 'jual'}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-[#2563EB] peer-checked:bg-blue-50 peer-checked:text-[#2563EB] font-semibold transition-all">
                        Jual
                      </div>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="listingType"
                        value="sewa"
                        checked={formData.listingType === 'sewa'}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-[#2563EB] peer-checked:bg-blue-50 peer-checked:text-[#2563EB] font-semibold transition-all">
                        Sewa
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Judul Listing *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                  placeholder="Contoh: Rumah Modern 2 Lantai di Jakarta Selatan"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Harga (Rp) *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="2500000000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="Jakarta Selatan"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Bed className="w-4 h-4 inline mr-1" />
                    Kamar Tidur
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Bath className="w-4 h-4 inline mr-1" />
                    Kamar Mandi
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Ruler className="w-4 h-4 inline mr-1" />
                    Luas Tanah (m²)
                  </label>
                  <input
                    type="number"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Ruler className="w-4 h-4 inline mr-1" />
                    Luas Bangunan (m²)
                  </label>
                  <input
                    type="number"
                    name="buildingSize"
                    value={formData.buildingSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sertifikat
                  </label>
                  <select
                    name="certificate"
                    value={formData.certificate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                  >
                    <option value="">Pilih Sertifikat</option>
                    <option value="shm">SHM - Sertifikat Hak Milik</option>
                    <option value="shgb">SHGB - Sertifikat Hak Guna Bangunan</option>
                    <option value="hgb">HGB - Hak Guna Bangunan</option>
                    <option value="girik">Girik</option>
                    <option value="ppjb">PPJB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Kondisi Perabotan
                  </label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                  >
                    <option value="">Pilih Kondisi</option>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi Furnished</option>
                    <option value="furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Deskripsi Properti *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900 resize-none"
                  placeholder="Deskripsikan properti Anda secara detail: keunggulan, fasilitas, akses transportasi, dll."
                  required
                />
              </div>
            </div>

            {/* Photo Upload Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Foto Properti</h2>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-[#2563EB] hover:bg-blue-50 transition-all cursor-pointer">
                <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-700 mb-2">
                  Upload Foto Properti
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Klik atau drag & drop foto Anda di sini
                </p>
                <p className="text-xs text-slate-400">
                  Format: JPG, PNG (Max. 5MB per foto) • Min. 5 foto
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-[#2563EB] font-medium">
                  💡 Tips: Upload foto dengan pencahayaan yang baik untuk menarik lebih banyak pembeli
                </p>
              </div>
            </div>

            {/* Data Pelengkap (Only for Agent) */}
            {roleType === 'agent' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0F172A]">Data Pelengkap</h2>
                      <p className="text-sm text-slate-500">Opsional - Meningkatkan kepercayaan pembeli</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full">
                    90% konsumen memilih yang lengkap
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Bisa Nego Harga */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Bisa Nego Harga
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="canNegotiate"
                          value="ya"
                          checked={formData.canNegotiate === 'ya'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Bisa
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="canNegotiate"
                          value="tidak"
                          checked={formData.canNegotiate === 'tidak'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Tidak Bisa
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Batas Nego */}
                  {formData.canNegotiate === 'ya' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Batas Nego (Rp)
                      </label>
                      <input
                        type="text"
                        name="negotiationLimit"
                        value={formData.negotiationLimit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        placeholder="100000000"
                      />
                    </div>
                  )}

                  {/* Metode Pembayaran */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Metode Pembayaran (yang Diterima Owner)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['KPR', 'Hard Cash', 'Cash Bertahap'].map((method) => (
                        <label key={method} className="relative">
                          <input
                            type="checkbox"
                            value={method}
                            checked={formData.paymentMethods.includes(method)}
                            onChange={(e) => {
                              const methods = formData.paymentMethods;
                              if (e.target.checked) {
                                setFormData({ ...formData, paymentMethods: [...methods, method] });
                              } else {
                                setFormData({ ...formData, paymentMethods: methods.filter(m => m !== method) });
                              }
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                            {method}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Kondisi Sertifikat */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Kondisi Sertifikat
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="certificateStatus"
                          value="sudah-pecah"
                          checked={formData.certificateStatus === 'sudah-pecah'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Sudah Pecah
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="certificateStatus"
                          value="belum-pecah"
                          checked={formData.certificateStatus === 'belum-pecah'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Belum Pecah
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Tempat Sertifikat */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tempat Sertifikat
                    </label>
                    <input
                      type="text"
                      name="certificateLocation"
                      value={formData.certificateLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      placeholder="Contoh: Owner on hand"
                    />
                  </div>

                  {/* Kondisi Lelang Sertifikat */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Kondisi Lelang Sertifikat
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="auctionStatus"
                          value="tidak-dilelang"
                          checked={formData.auctionStatus === 'tidak-dilelang'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Tidak di Lelang
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="auctionStatus"
                          value="sedang-dilelang"
                          checked={formData.auctionStatus === 'sedang-dilelang'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Sedang di Lelang
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Dokumen IMB/PBB */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Dokumen IMB/PBB
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="hasIMBPBB"
                          value="ada"
                          checked={formData.hasIMBPBB === 'ada'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Ada
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="hasIMBPBB"
                          value="tidak-ada"
                          checked={formData.hasIMBPBB === 'tidak-ada'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Tidak Ada
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Daya Listrik */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Zap className="w-4 h-4 inline mr-1" />
                      Daya Listrik
                    </label>
                    <select
                      name="powerCapacity"
                      value={formData.powerCapacity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                    >
                      <option value="">Pilih daya listrik</option>
                      <option value="450">450 Watt</option>
                      <option value="900">900 Watt</option>
                      <option value="1300">1300 Watt</option>
                      <option value="2200">2200 Watt</option>
                      <option value="3500">3500 Watt</option>
                      <option value="4400">4400 Watt</option>
                      <option value="5500">5500 Watt</option>
                      <option value="6600">6600 Watt</option>
                      <option value="7700">7700 Watt</option>
                    </select>
                  </div>

                  {/* Kapasitas Carport & Garasi */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Car className="w-4 h-4 inline mr-1" />
                        Kapasitas Carport
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, '4+'].map((num) => (
                          <label key={num} className="flex-1">
                            <input
                              type="radio"
                              name="carportCapacity"
                              value={num}
                              checked={formData.carportCapacity === String(num)}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                              {num}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Car className="w-4 h-4 inline mr-1" />
                        Kapasitas Garasi
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, '4+'].map((num) => (
                          <label key={num} className="flex-1">
                            <input
                              type="radio"
                              name="garageCapacity"
                              value={num}
                              checked={formData.garageCapacity === String(num)}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                              {num}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Kamar ART */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Bed className="w-4 h-4 inline mr-1" />
                        Jumlah Kamar Tidur ART
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, '4+'].map((num) => (
                          <label key={num} className="flex-1">
                            <input
                              type="radio"
                              name="artBedrooms"
                              value={num}
                              checked={formData.artBedrooms === String(num)}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                              {num}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Bath className="w-4 h-4 inline mr-1" />
                        Jumlah Kamar Mandi ART
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, '4+'].map((num) => (
                          <label key={num} className="flex-1">
                            <input
                              type="radio"
                              name="artBathrooms"
                              value={num}
                              checked={formData.artBathrooms === String(num)}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                              {num}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Akses Mobil */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <Car className="w-4 h-4 inline mr-1" />
                      Akses Mobil
                    </label>
                    <div className="flex gap-4 mb-3">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="carAccess"
                          value="tidak"
                          checked={formData.carAccess === 'tidak'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Tidak
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="carAccess"
                          value="ya"
                          checked={formData.carAccess === 'ya'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Ya
                        </div>
                      </label>
                    </div>
                    {formData.carAccess === 'ya' && (
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">Muat berapa mobil?</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, '4+'].map((num) => (
                            <label key={num} className="flex-1">
                              <input
                                type="radio"
                                name="carAccessCount"
                                value={num}
                                checked={formData.carAccessCount === String(num)}
                                onChange={handleChange}
                                className="sr-only peer"
                              />
                              <div className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all text-sm">
                                {num}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sumber Air */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <Droplet className="w-4 h-4 inline mr-1" />
                      Sumber Air
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="waterSource"
                          value="pdam"
                          checked={formData.waterSource === 'pdam'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          PDAM
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="waterSource"
                          value="air-tanah"
                          checked={formData.waterSource === 'air-tanah'}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                          Air Tanah
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Arah Bangunan */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      <Compass className="w-4 h-4 inline mr-1" />
                      Arah Bangunan
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {['Utara', 'Selatan', 'Timur', 'Barat'].map((direction) => (
                        <label key={direction}>
                          <input
                            type="radio"
                            name="buildingDirection"
                            value={direction.toLowerCase()}
                            checked={formData.buildingDirection === direction.toLowerCase()}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-center cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 font-semibold transition-all">
                            {direction}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Lingkungan Sekitar */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      Lingkungan Sekitar
                    </label>
                    <select
                      name="surroundings"
                      value={formData.surroundings}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                    >
                      <option value="">Pilih lingkungan sekitar</option>
                      <option value="perumahan">Perumahan</option>
                      <option value="perkantoran">Perkantoran</option>
                      <option value="komersial">Area Komersial</option>
                      <option value="industri">Area Industri</option>
                      <option value="campuran">Area Campuran</option>
                    </select>
                  </div>

                  {/* Tahun Selesai Dibangun */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tahun Selesai Dibangun
                    </label>
                    <input
                      type="text"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      placeholder="Masukkan tahun selesai dibangun"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Informasi Kontak</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="08123456789"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-slate-900"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-[#2563EB] border-2 border-slate-300 rounded focus:ring-2 focus:ring-[#2563EB] mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-700">
                  Saya menyetujui <span className="text-[#2563EB] font-semibold">Syarat & Ketentuan</span> dan <span className="text-[#2563EB] font-semibold">Kebijakan Privasi</span> RumahKu. Saya memahami bahwa informasi yang saya berikan adalah benar dan akurat.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-5 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all font-bold text-xl flex items-center justify-center gap-3"
              >
                <Upload className="w-6 h-6" />
                Pasang Iklan Sekarang
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-center text-sm text-slate-600 mt-4">
                Tim kami akan menghubungi Anda dalam 1x24 jam untuk verifikasi
              </p>
            </div>

          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
