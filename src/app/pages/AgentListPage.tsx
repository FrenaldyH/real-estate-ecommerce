import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Star, MapPin, Phone, Mail, X } from 'lucide-react';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';

interface Agent {
  id: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  properties: number;
  phone: string;
  email: string;
  image: string;
  experience: string;
}

const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Property Agent',
    location: 'Jakarta Selatan',
    rating: 4.9,
    reviews: 127,
    properties: 45,
    phone: '+62 812-3456-7890',
    email: 'sarah.johnson@property.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    experience: '8 Tahun Pengalaman'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Luxury Property Specialist',
    location: 'Jakarta Pusat',
    rating: 4.8,
    reviews: 98,
    properties: 32,
    phone: '+62 813-9876-5432',
    email: 'michael.chen@property.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    experience: '10 Tahun Pengalaman'
  },
  {
    id: 3,
    name: 'Dewi Santika',
    title: 'Residential Agent',
    location: 'Tangerang',
    rating: 4.7,
    reviews: 156,
    properties: 67,
    phone: '+62 815-2468-1357',
    email: 'dewi.santika@property.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    experience: '6 Tahun Pengalaman'
  },
  {
    id: 4,
    name: 'Ahmad Rizki',
    title: 'Commercial Property Agent',
    location: 'Bekasi',
    rating: 4.9,
    reviews: 203,
    properties: 89,
    phone: '+62 817-3691-2580',
    email: 'ahmad.rizki@property.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    experience: '12 Tahun Pengalaman'
  },
  {
    id: 5,
    name: 'Lisa Wijaya',
    title: 'Investment Property Consultant',
    location: 'Jakarta Barat',
    rating: 4.8,
    reviews: 134,
    properties: 54,
    phone: '+62 818-7531-9642',
    email: 'lisa.wijaya@property.com',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    experience: '9 Tahun Pengalaman'
  },
  {
    id: 6,
    name: 'David Tan',
    title: 'Property Developer Agent',
    location: 'Depok',
    rating: 4.6,
    reviews: 87,
    properties: 41,
    phone: '+62 819-4567-8901',
    email: 'david.tan@property.com',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    experience: '7 Tahun Pengalaman'
  },
  {
    id: 7,
    name: 'Siti Nurhaliza',
    title: 'Real Estate Consultant',
    location: 'Bogor',
    rating: 4.9,
    reviews: 176,
    properties: 72,
    phone: '+62 821-6543-2109',
    email: 'siti.nurhaliza@property.com',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    experience: '11 Tahun Pengalaman'
  },
  {
    id: 8,
    name: 'Kevin Hartono',
    title: 'Property Market Analyst',
    location: 'Jakarta Timur',
    rating: 4.7,
    reviews: 112,
    properties: 38,
    phone: '+62 822-8765-4321',
    email: 'kevin.hartono@property.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    experience: '5 Tahun Pengalaman'
  },
  {
    id: 9,
    name: 'Rina Permata',
    title: 'Villa & Resort Specialist',
    location: 'Bali',
    rating: 4.8,
    reviews: 145,
    properties: 56,
    phone: '+62 823-1357-2468',
    email: 'rina.permata@property.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    experience: '8 Tahun Pengalaman'
  }
];

export function AgentListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || agent.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = Array.from(new Set(mockAgents.map(agent => agent.location)));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Temukan Agen Properti Terbaik
            </h1>
            <p className="text-lg text-blue-100">Hubungkan dengan agen profesional untuk membantu perjalanan properti Anda</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari nama agen atau spesialisasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              >
                <option value="">Semua Lokasi</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-slate-600">Menampilkan {filteredAgents.length} agen properti</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            return (
              <div key={agent.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 overflow-hidden">
                {/* Shape Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-20"></div>

                {/* Agent Info */}
                <div className="px-6 pb-6 -mt-10">
                  {/* Profile Section with Background Glow */}
                  <div className="relative flex flex-col items-center mb-4">
                    {/* Background Glow */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-30 pointer-events-none"></div>

                    <div className="relative z-10 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white mb-3">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 text-center">{agent.name}</h3>
                    <p className="text-sm text-slate-600 text-center mb-2">{agent.title}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-900 text-sm">{agent.rating}</span>
                      <span className="text-xs text-slate-500">({agent.reviews})</span>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg py-3 px-3">
                      <div className="text-xl font-bold text-white">{agent.properties}</div>
                      <div className="text-xs text-white/90">Properti Terjual</div>
                    </div>
                    <div className="text-center bg-slate-100 rounded-lg py-3 px-3">
                      <div className="text-xl font-bold text-slate-900">{agent.experience.replace(' Tahun Pengalaman', '')}</div>
                      <div className="text-xs text-slate-600">Tahun Pengalaman</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-4 py-2 bg-slate-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{agent.location}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedAgent(agent)}
                      className="w-full bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold text-sm"
                    >
                      Hubungi Agen
                    </button>
                    <button 
                      onClick={() => navigate(`/properties?agent=${encodeURIComponent(agent.name)}`)}
                      className="w-full bg-[#2563EB] text-white py-2 rounded-lg hover:bg-[#1d4ed8] hover:shadow-md transition-all font-semibold text-sm"
                    >
                      Lihat Properti
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Tidak ada agen yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Hubungi Agen</h2>
              <button onClick={() => setSelectedAgent(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <img
                src={selectedAgent.image}
                alt={selectedAgent.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-xl font-bold text-slate-900">{selectedAgent.name}</h3>
              <p className="text-sm text-slate-600">{selectedAgent.title}</p>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${selectedAgent.phone}`}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Telepon</div>
                  <div className="font-semibold text-slate-900">{selectedAgent.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${selectedAgent.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">WhatsApp</div>
                  <div className="font-semibold text-slate-900">Chat via WhatsApp</div>
                </div>
              </a>

              <a
                href={`mailto:${selectedAgent.email}`}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-semibold text-slate-900 truncate">{selectedAgent.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Login & Register Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <Footer />
    </div>
  );
}