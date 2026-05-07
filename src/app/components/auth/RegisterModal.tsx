import { useState } from 'react';
import { X } from 'lucide-react';
import { register } from '../../services/users';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    nik: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'buyer' as 'buyer' | 'owner' | 'agent',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setError('Anda harus menyetujui Syarat & Ketentuan');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({
        nik: formData.nik,
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        username: formData.username,
      });
      // Registrasi berhasil → arahkan ke login
      onSwitchToLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[rgba(0,0,0,0.5)]" onClick={onClose}>
      <div
        className="bg-white rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] w-full max-w-[768px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[24px] leading-[32px] text-[#0f172a]">
              Daftar Akun Baru
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Nama Lengkap & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Username Anda"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Row 2: NIK & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">NIK</label>
                <input
                  type="text"
                  value={formData.nik}
                  onChange={(e) => handleChange('nik', e.target.value)}
                  placeholder="Nomor Induk Kependudukan (16 digit)"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="nama@email.com"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Row 3: No. Telepon & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">No. Telepon</label>
                <input
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                  placeholder="08xx xxxx xxxx"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] text-[#314158]">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Daftar Sebagai */}
            <div className="space-y-3">
              <label className="font-medium text-[14px] text-[#314158]">Daftar Sebagai</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'buyer', label: 'Pembeli', desc: 'Saya ingin mencari properti' },
                  { value: 'owner', label: 'Pemilik Rumah', desc: 'Saya ingin menjual atau menyewakan properti' },
                  { value: 'agent', label: 'Agen Properti', desc: 'Saya adalah agen yang memasarkan properti' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex flex-col gap-2 p-3 rounded-[10px] border-[1.18px] cursor-pointer transition-colors ${
                      formData.role === opt.value ? 'border-[#2563eb] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#2563eb]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value={opt.value}
                        checked={formData.role === opt.value}
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span className="font-semibold text-[16px] text-[#0f172b]">{opt.label}</span>
                    </div>
                    <p className="font-medium text-[12px] text-[#62748e] ml-6">{opt.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                className="mt-1 w-[13px] h-[13px] text-[#2563eb] rounded focus:ring-[#2563eb]"
              />
              <label htmlFor="terms" className="font-medium text-[14px] text-[#45556c]">
                Saya setuju dengan{' '}
                <a href="#" className="text-[#2563eb] hover:underline">Syarat & Ketentuan</a>
                {' '}dan{' '}
                <a href="#" className="text-[#2563eb] hover:underline">Kebijakan Privasi</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-[10px] transition-colors"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>

            <div className="text-center">
              <p className="font-normal text-[14px] text-[#45556c]">
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-semibold text-[16px] text-[#2563eb] hover:underline"
                >
                  Masuk
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
