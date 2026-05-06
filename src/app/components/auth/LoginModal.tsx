// ============================================================================
// Login Modal Component
// User authentication modal
// ============================================================================

import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { USER_ROLES } from '../../constants';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'owner' | 'agent'>('buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRole = USER_ROLES.find(r => r.value === role);
    alert(`Login berhasil dengan email: ${email} (${selectedRole?.label})`);
    onClose();
    // Reset form
    setEmail('');
    setPassword('');
    setRole('buyer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Masuk ke Akun Anda" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
        />

        {/* Password */}
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password"
          required
        />

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Login sebagai
          </label>
          <div className="grid grid-cols-1 gap-3">
            {USER_ROLES.map((roleOption) => (
              <label
                key={roleOption.value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  role === roleOption.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={roleOption.value}
                  checked={role === roleOption.value}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 font-medium text-gray-900">
                  {roleOption.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Lupa password?
          </button>
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth size="lg">
          Masuk
        </Button>

        {/* Switch to Register */}
        <div className="text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Daftar sekarang
          </button>
        </div>
      </form>
    </Modal>
  );
}