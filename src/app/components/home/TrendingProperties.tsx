import { PropertyCard } from '../PropertyCard';
import { Link } from 'react-router';
import { getFeaturedProperties } from '../../data/properties';

export function TrendingProperties() {
  // Get featured properties from our unified data source
  const featuredProperties = getFeaturedProperties().slice(0, 8);

  return (
    <section id="properties" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Paling Banyak Dicari Minggu Ini
          </h2>
          <p className="text-lg text-[#64748B]">
            Pilihan favorit pembeli properti di seluruh Indonesia
          </p>
        </div>

        {/* Grid using PropertyCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
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
