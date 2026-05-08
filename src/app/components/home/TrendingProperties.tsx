import { useState, useEffect } from 'react';
import { PropertyCard } from '../PropertyCard';
import { Link } from 'react-router';
import { getProperties, mapToPropertyCard } from '../../services/properties';

export function TrendingProperties() {
  const [properties, setProperties] = useState<ReturnType<typeof mapToPropertyCard>[]>([]);

  useEffect(() => {
    getProperties({ status: 'available' })
      .then((data) => setProperties(data.slice(0, 8).map(mapToPropertyCard)))
      .catch(() => {});
  }, []);

  return (
    <section id="properties" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Paling Banyak Dicari Minggu Ini
          </h2>
          <p className="text-lg text-[#64748B]">
            Pilihan favorit pembeli properti di seluruh Indonesia
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/properties" className="px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-blue-500/50 transition-all inline-flex items-center gap-2">
            Lihat Semua Properti
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
