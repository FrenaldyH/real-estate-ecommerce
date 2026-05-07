import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Phone, Mail, X } from 'lucide-react';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { getAllAgents, type ApiAgent } from '../services/agents';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AgentListPage() {
  const [agents, setAgents] = useState<ApiAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<ApiAgent | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAgents()
      .then(setAgents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const name = agent.user?.full_name?.toLowerCase() ?? '';
    const bio = agent.bio_description?.toLowerCase() ?? '';
    const q = searchQuery.toLowerCase();
    return name.includes(q) || bio.includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Temukan Agen Properti Terbaik
            </h1>
            <p className="text-lg text-blue-100">
              Hubungkan dengan agen profesional untuk membantu perjalanan properti Anda
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <input
            type="text"
            placeholder="Cari nama agen atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {loading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Memuat data agen...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-2 font-semibold">Gagal memuat data agen</p>
            <p className="text-slate-500 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <p className="text-slate-600">Menampilkan {filteredAgents.length} agen properti</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => {
                const name = agent.user?.full_name || 'Agen';
                const initials = getInitials(name);
                return (
                  <div
                    key={agent.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 overflow-hidden"
                  >
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-20" />

                    <div className="px-6 pb-6 -mt-10">
                      {/* Avatar */}
                      <div className="relative flex flex-col items-center mb-4">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-30 pointer-events-none" />
                        <div className="relative z-10 w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3">
                          <span className="text-white text-2xl font-bold">{initials}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 text-center">{name}</h3>
                        <p className="text-sm text-slate-500 text-center line-clamp-2 mt-1">
                          {agent.bio_description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg py-3 px-3">
                          <div className="text-xl font-bold text-white">
                            {agent.total_properties_sold}
                          </div>
                          <div className="text-xs text-white/90">Properti Terjual</div>
                        </div>
                        <div className="text-center bg-slate-100 rounded-lg py-3 px-3">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {agent.user?.username ?? '-'}
                          </div>
                          <div className="text-xs text-slate-600">Username</div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedAgent(agent)}
                          className="w-full bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#06B6D4] text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold text-sm"
                        >
                          Hubungi Agen
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/properties?agent=${encodeURIComponent(name)}`)
                          }
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
          </>
        )}
      </div>

      {/* Contact Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Hubungi Agen</h2>
              <button onClick={() => setSelectedAgent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3">
                <span className="text-white text-3xl font-bold">
                  {getInitials(selectedAgent.user?.full_name || 'Agen')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedAgent.user?.full_name || 'Agen'}
              </h3>
              <p className="text-sm text-slate-600 text-center mt-1">
                {selectedAgent.bio_description}
              </p>
            </div>

            <div className="space-y-3">
              {selectedAgent.user?.phone_number && (
                <>
                  <a
                    href={`tel:${selectedAgent.user.phone_number}`}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Telepon</div>
                      <div className="font-semibold text-slate-900">{selectedAgent.user.phone_number}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${selectedAgent.user.phone_number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">WhatsApp</div>
                      <div className="font-semibold text-slate-900">Chat via WhatsApp</div>
                    </div>
                  </a>
                </>
              )}

              {selectedAgent.user?.email && (
                <a
                  href={`mailto:${selectedAgent.user.email}`}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="font-semibold text-slate-900 truncate">{selectedAgent.user.email}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true); }}
      />

      <Footer />
    </div>
  );
}
