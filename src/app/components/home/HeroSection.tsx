import { ImageWithFallback } from '../common/ImageWithFallback';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState('beli');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (activeTab === 'beli') {
      navigate('/properties?type=buy');
    } else {
      navigate('/properties?type=rent');
    }
  };

  return (
    <div className="relative h-[600px] bg-gradient-to-b from-gray-900 to-slate-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1628744448968-bf7a32f8dd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Modern luxury house"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/10"></div>
        {/* Bottom Blend Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Wujudkan Hunian Impian Anda
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12">
              Dari Jakarta hingga Bali, jelajahi ribuan pilihan properti premium
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('beli')}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                    activeTab === 'beli'
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Beli
                </button>
                <button
                  onClick={() => setActiveTab('sewa')}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                    activeTab === 'sewa'
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Sewa
                </button>
              </div>

              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-4 lg:col-span-1">
                  <label className="block text-sm text-slate-600 mb-2">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Cari kota, area..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Harga</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900">
                    <option>Semua Harga</option>
                    <option>&lt; Rp 500 Juta</option>
                    <option>Rp 500 Juta - 1 M</option>
                    <option>Rp 1 M - 2 M</option>
                    <option>&gt; Rp 2 M</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Tipe</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900">
                    <option>Semua Tipe</option>
                    <option>Rumah</option>
                    <option>Apartemen</option>
                    <option>Tanah</option>
                    <option>Ruko</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Kamar Tidur</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900">
                    <option>Semua</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button onClick={handleSearch} className="w-full bg-[#2563EB] text-white py-4 rounded-lg hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Properti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}