import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { PropertyCard } from '../components/PropertyCard';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { Search, SlidersHorizontal, Home, X } from 'lucide-react';
import { getProperties, mapToPropertyCard, type ApiProperty } from '../services/properties';

const PROPERTY_TYPES = ['semua', 'rumah', 'apartemen', 'villa', 'tanah'];

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [selectedType, setSelectedType] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const listingType = searchParams.get('type') || 'all'; // 'all' | 'buy' | 'rent'
  const agentFilter = searchParams.get('agent') || '';

  // Fetch dari API saat listing type berubah
  useEffect(() => {
    setLoading(true);
    setFetchError('');

    const filters: Record<string, string> = {};
    if (listingType === 'buy') filters['listing-type'] = 'dijual';
    if (listingType === 'rent') filters['listing-type'] = 'disewa';

    getProperties(filters)
      .then(setProperties)
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [listingType]);

  // Filter client-side untuk type, search, dan agent
  const filteredProperties = properties.filter((p) => {
    const matchesType = selectedType === 'semua' || p.type === selectedType;
    const location = [p.city, p.province, p.address].filter(Boolean).join(' ').toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.includes(searchQuery.toLowerCase());
    const agentName = p.agent?.user?.full_name ?? '';
    const matchesAgent = !agentFilter || agentName === agentFilter;
    return matchesType && matchesSearch && matchesAgent;
  });

  // Hitung jumlah properti per tipe untuk tombol filter
  const typeCounts = PROPERTY_TYPES.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === 'semua' ? properties.length : properties.filter((p) => p.type === t).length;
    return acc;
  }, {});

  const handleListingTypeChange = (type: 'all' | 'buy' | 'rent') => {
    const params: Record<string, string> = { type };
    if (agentFilter) params.agent = agentFilter;
    setSearchParams(params);
  };

  const clearAgentFilter = () => {
    const params: Record<string, string> = {};
    if (listingType !== 'all') params.type = listingType;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero / Search */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {listingType === 'buy' ? 'Properti Dijual' : listingType === 'rent' ? 'Properti Disewakan' : 'Semua Properti'}
          </h1>
          <p className="text-blue-100 mb-4">
            {loading ? 'Memuat...' : `${filteredProperties.length} properti tersedia`}
          </p>

          {agentFilter && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <span className="text-sm">Menampilkan properti dari: <strong>{agentFilter}</strong></span>
                <button onClick={clearAgentFilter} className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-2 shadow-xl max-w-3xl">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Cari lokasi, nama properti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors font-semibold">
                Cari
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Type Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1">
            {(['all', 'buy', 'rent'] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleListingTypeChange(t)}
                className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                  listingType === t
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {t === 'all' ? 'Semua Properti' : t === 'buy' ? 'Dijual' : 'Disewakan'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Type Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-[64px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all capitalize ${
                    selectedType === type
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} ({typeCounts[type] ?? 0})
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors font-semibold">
              <SlidersHorizontal className="w-4 h-4" />
              Filter Lanjutan
            </button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading && (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Memuat properti...</p>
            </div>
          )}

          {fetchError && !loading && (
            <div className="text-center py-20">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gagal memuat properti</h3>
              <p className="text-gray-600 text-sm">{fetchError}</p>
            </div>
          )}

          {!loading && !fetchError && filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada properti ditemukan</h3>
              <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}

          {!loading && !fetchError && filteredProperties.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={mapToPropertyCard(property)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
    </div>
  );
}
