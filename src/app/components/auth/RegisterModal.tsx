// ============================================================================
// Register Modal Component
// User registration modal with Figma design
// ============================================================================

import { useState } from 'react';
import { X } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    nik: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer' as 'buyer' | 'owner' | 'agent',
    nib: '',
    siup4: '',
    agreeToTerms: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert('Anda harus menyetujui Syarat & Ketentuan');
      return;
    }

    const roleLabel = formData.role === 'buyer' ? 'Pembeli' : formData.role === 'owner' ? 'Pemilik Rumah' : 'Agen Properti';
    alert(`Pendaftaran berhasil!\nNama: ${formData.fullName}\nEmail: ${formData.email}\nRole: ${roleLabel}`);
    onClose();

    // Reset form
    setFormData({
      fullName: '',
      username: '',
      nik: '',
      email: '',
      phone: '',
      password: '',
      role: 'buyer',
      nib: '',
      siup4: '',
      agreeToTerms: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[rgba(0,0,0,0.5)]" onClick={onClose}>
      <div
        className="bg-white rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] w-full max-w-[768px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Inter',sans-serif] font-bold text-[24px] leading-[32px] text-[#0f172a]">
              Daftar Akun Baru
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Nama Lengkap & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Username Anda"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Row 2: NIK & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  NIK
                </label>
                <input
                  type="text"
                  value={formData.nik}
                  onChange={(e) => handleChange('nik', e.target.value)}
                  placeholder="Nomor Induk Kependudukan"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="nama@email.com"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Row 3: No. Telepon & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="08xx xxxx xxxx"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                  required
                />
              </div>
            </div>

            {/* Daftar Sebagai */}
            <div className="space-y-3">
              <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                Daftar Sebagai
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pembeli */}
                <label className={`flex flex-col gap-2 p-3 rounded-[10px] border-[1.18px] cursor-pointer transition-colors ${
                  formData.role === 'buyer' ? 'border-[#2563eb] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#2563eb]'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={formData.role === 'buyer'}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="font-['Inter',sans-serif] font-semibold text-[16px] leading-[24px] text-[#0f172b]">
                      Pembeli
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] font-medium text-[12px] leading-[16px] text-[#62748e] ml-6">
                    Saya ingin mencari properti
                  </p>
                </label>

                {/* Pemilik Rumah */}
                <label className={`flex flex-col gap-2 p-3 rounded-[10px] border-[1.18px] cursor-pointer transition-colors ${
                  formData.role === 'owner' ? 'border-[#2563eb] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#2563eb]'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="owner"
                      checked={formData.role === 'owner'}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="font-['Inter',sans-serif] font-semibold text-[16px] leading-[24px] text-[#0f172b]">
                      Pemilik Rumah
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] font-medium text-[12px] leading-[16px] text-[#62748e] ml-6">
                    Saya ingin menjual atau menyewakan properti
                  </p>
                </label>

                {/* Agen Properti */}
                <label className={`flex flex-col gap-2 p-3 rounded-[10px] border-[1.18px] cursor-pointer transition-colors ${
                  formData.role === 'agent' ? 'border-[#2563eb] bg-blue-50' : 'border-[#e2e8f0] hover:border-[#2563eb]'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="agent"
                      checked={formData.role === 'agent'}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-4 h-4 text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="font-['Inter',sans-serif] font-semibold text-[16px] leading-[24px] text-[#0f172b]">
                      Agen Properti
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] font-medium text-[12px] leading-[16px] text-[#62748e] ml-6">
                    Saya adalah agen yang memasarkan properti
                  </p>
                </label>
              </div>
            </div>

            {/* Agent-specific fields */}
            {formData.role === 'agent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                    NIB (Nomor Induk Berusaha)
                  </label>
                  <input
                    type="text"
                    value={formData.nib}
                    onChange={(e) => handleChange('nib', e.target.value)}
                    placeholder="Nomor Induk Berusaha"
                    className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#314158]">
                    SIU-P4
                  </label>
                  <input
                    type="text"
                    value={formData.siup4}
                    onChange={(e) => handleChange('siup4', e.target.value)}
                    placeholder="Surat Izin Usaha Perantara Pedagang Properti"
                    className="h-[46px] px-4 py-2.5 rounded-[10px] border-[1.18px] border-[#cad5e2] font-['Inter',sans-serif] text-[16px] placeholder:text-[rgba(15,23,43,0.5)] focus:outline-none focus:border-[#2563eb]"
                    required
                  />
                </div>
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
              <label htmlFor="terms" className="font-['Inter',sans-serif] font-medium text-[14px] leading-[20px] text-[#45556c]">
                Saya setuju dengan{' '}
                <a href="#" className="text-[#2563eb] hover:underline">Syarat & Ketentuan</a>
                {' '}dan{' '}
                <a href="#" className="text-[#2563eb] hover:underline">Kebijakan Privasi</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-['Inter',sans-serif] font-semibold text-[16px] leading-[24px] rounded-[10px] transition-colors"
            >
              Daftar
            </button>

            {/* Switch to Login */}
            <div className="text-center">
              <p className="font-['Inter',sans-serif] font-normal text-[14px] leading-[20px] text-[#45556c]">
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-['Inter',sans-serif] font-semibold text-[16px] leading-[24px] text-[#2563eb] hover:underline"
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
