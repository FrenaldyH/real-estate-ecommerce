import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { useAuth } from '../context/AuthContext';
import { updateUser, type UpdateUserRequest } from '../services/users';
import { createAgent } from '../services/agents';
import { User, Mail, Phone, Shield, LogOut, Edit3, Check, X, ChevronRight, Home } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateUserRequest>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [becomingAgent, setBecomingAgent] = useState(false);
  const [agentFormOpen, setAgentFormOpen] = useState(false);
  const [agentBio, setAgentBio] = useState('');
  const [agentSiup, setAgentSiup] = useState('');
  const [agentError, setAgentError] = useState('');
  const [agentSuccess, setAgentSuccess] = useState(false);

  const startEdit = () => {
    setEditData({
      full_name: user?.full_name ?? '',
      email: user?.email ?? '',
      phone_number: user?.phone_number ?? '',
    });
    setSaveError('');
    setSaveSuccess(false);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditData({});
    setSaveError('');
  };

  const saveEdit = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError('');
    try {
      await updateUser(user.username, editData);
      // Re-login to refresh user data in context
      setSaveSuccess(true);
      setEditing(false);
      // Refresh stored user data
      const stored = localStorage.getItem('rumahku-user');
      if (stored) {
        const updated = { ...JSON.parse(stored), ...editData };
        localStorage.setItem('rumahku-user', JSON.stringify(updated));
        window.location.reload();
      }
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const handleBecomeAgent = async () => {
    if (!agentBio.trim()) {
      setAgentError('Bio wajib diisi');
      return;
    }
    setBecomingAgent(true);
    setAgentError('');
    try {
      await createAgent({ bio_description: agentBio, agency_id: 1, siup4: agentSiup });
      setAgentFormOpen(false);
      setAgentSuccess(true);
      setTimeout(() => {
        logout();
        navigate('/');
      }, 2500);
    } catch (err: unknown) {
      setAgentError(err instanceof Error ? err.message : 'Gagal mendaftar sebagai agen');
    } finally {
      setBecomingAgent(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
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
        <div className="max-w-md mx-auto px-6 py-32 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Login untuk melihat profil</h1>
          <p className="text-gray-600 mb-6">Anda harus login untuk mengakses halaman ini.</p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors"
          >
            Masuk
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const roleLabel = user.role === 'agent' ? 'Agen Properti' : user.role === 'owner' ? 'Pemilik' : 'Pengguna';
  const roleBadgeColor = user.role === 'agent'
    ? 'bg-green-100 text-green-700'
    : user.role === 'owner'
    ? 'bg-purple-100 text-purple-700'
    : 'bg-blue-100 text-blue-700';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
                {(user.full_name?.[0] ?? user.username[0]).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">{user.full_name || user.username}</h1>
                <p className="text-gray-500">@{user.username}</p>
                <span className={`inline-block mt-1 px-3 py-0.5 text-xs font-bold rounded-full ${roleBadgeColor}`}>
                  {roleLabel}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {!editing && (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-slate-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-6">Informasi Akun</h2>

          {saveSuccess && (
            <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
              <Check className="w-4 h-4" />
              Perubahan berhasil disimpan.
            </div>
          )}

          {saveError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {saveError}
            </div>
          )}

          <div className="space-y-5">
            {/* Full name */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Lengkap</label>
                {editing ? (
                  <input
                    value={editData.full_name ?? ''}
                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-semibold text-[#0F172A]">{user.full_name || '—'}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                {editing ? (
                  <input
                    type="email"
                    value={editData.email ?? ''}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-semibold text-[#0F172A]">{user.email || '—'}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nomor Telepon</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editData.phone_number ?? ''}
                    onChange={(e) => setEditData({ ...editData, phone_number: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-semibold text-[#0F172A]">{user.phone_number || '—'}</p>
                )}
              </div>
            </div>

            {/* Password (only in edit mode) */}
            {editing && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password Baru (opsional)</label>
                  <input
                    type="password"
                    value={editData.password ?? ''}
                    onChange={(e) => setEditData({ ...editData, password: e.target.value || undefined })}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {editing && (
            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
              >
                <Check className="w-4 h-4" />
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 px-6 py-2.5 border border-slate-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link
              to="/wishlist"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-[#0F172A]">Wishlist Saya</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2563EB]" />
            </Link>

            <Link
              to="/advertiser"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="font-semibold text-[#0F172A]">Pasang Properti</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2563EB]" />
            </Link>
          </div>
        </div>

        {/* Become Agent CTA */}
        {user.role !== 'agent' && (
          <div className="bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Jadilah Agen Properti RumahKu</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Kelola listing properti secara profesional, jangkau lebih banyak pembeli, dan tingkatkan penghasilan Anda.
                </p>
              </div>
            </div>

            {agentSuccess ? (
              <div className="bg-white/20 rounded-xl p-5 text-center">
                <Check className="w-10 h-10 mx-auto mb-2" />
                <p className="font-bold text-lg mb-1">Pendaftaran Berhasil!</p>
                <p className="text-blue-100 text-sm">Akun Anda diupgrade menjadi agen. Mengalihkan ke beranda...</p>
              </div>
            ) : !agentFormOpen ? (
              <button
                onClick={() => setAgentFormOpen(true)}
                className="w-full py-3 bg-white text-[#2563EB] rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Daftar Sebagai Agen Sekarang
              </button>
            ) : (
              <div className="bg-white/10 rounded-xl p-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-100">Bio / Deskripsi Diri *</label>
                  <textarea
                    value={agentBio}
                    onChange={(e) => setAgentBio(e.target.value)}
                    rows={3}
                    placeholder="Ceritakan pengalaman dan keahlian Anda di bidang properti..."
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-blue-100">No. SIUP4 (opsional)</label>
                  <input
                    value={agentSiup}
                    onChange={(e) => setAgentSiup(e.target.value)}
                    placeholder="Nomor izin usaha agen"
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                {agentError && (
                  <p className="text-xs text-red-300">{agentError}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleBecomeAgent}
                    disabled={becomingAgent}
                    className="flex-1 py-2.5 bg-white text-[#2563EB] rounded-xl font-bold text-sm hover:bg-blue-50 disabled:opacity-60 transition-colors"
                  >
                    {becomingAgent ? 'Mendaftar...' : 'Kirim Pendaftaran'}
                  </button>
                  <button
                    onClick={() => setAgentFormOpen(false)}
                    className="px-4 py-2.5 border border-white/30 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
