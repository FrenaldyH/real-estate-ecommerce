import { useState } from 'react';

interface ListingModalProps {
  onClose: () => void;
}

export function ListingModal({ onClose }: ListingModalProps) {
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('jual');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Listing properti "${title}" berhasil dibuat! Tim kami akan menghubungi Anda segera.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Pasang Iklan Properti</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Listing</label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                required
              >
                <option value="jual">Dijual</option>
                <option value="sewa">Disewakan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Properti</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                required
              >
                <option value="">Pilih Tipe</option>
                <option value="rumah">Rumah</option>
                <option value="apartemen">Apartemen</option>
                <option value="villa">Villa</option>
                <option value="tanah">Tanah</option>
                <option value="ruko">Ruko</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul Iklan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
              placeholder="Contoh: Rumah Modern Minimalis di Jakarta Selatan"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Harga (Rp)</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                placeholder="1.500.000.000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Lokasi</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900"
                placeholder="Contoh: Pondok Indah, Jakarta Selatan"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-900 h-32"
              placeholder="Deskripsikan properti Anda..."
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-slate-700">
                <strong>Catatan:</strong> Tim kami akan menghubungi Anda dalam 1x24 jam untuk verifikasi properti dan foto.
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}
