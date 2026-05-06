import { Link } from 'react-router';
import { ImageWithFallback } from './common/ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';
import { MapPin, Bed, Bath, Ruler, Home, FileText, Calendar, MessageCircle } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: number;
    image: string;
    price: number;
    priceType?: 'sale' | 'rent'; // sale or rent
    rentPeriod?: 'bulan' | 'tahun'; // for rent only
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    buildingSize: number;
    certificate?: string;
    yearBuilt?: number;
    furnishing?: string;
    floors?: number;
    type: string;
    featured?: boolean;
    agent?: {
      name: string;
      image: string;
      responseTime?: string;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `Rp ${(price / 1000000000).toFixed(1)} M`;
    } else if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(0)} Jt`;
    }
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  // Calculate KPR monthly payment based on fixed assumptions
  const calculateKPREstimate = (propertyPrice: number) => {
    const downPayment = 5; // 5% fixed
    const tenor = 15; // 15 years fixed
    const principal = propertyPrice * (1 - downPayment / 100);
    const fixedRate = 0.0365 / 12; // 3.65% annual interest (fixed 3 years)
    const numPayments = tenor * 12;
    const monthly = (principal * fixedRate * Math.pow(1 + fixedRate, numPayments)) /
                   (Math.pow(1 + fixedRate, numPayments) - 1);
    return monthly;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/property/${property.id}`} className="block relative h-56 overflow-hidden">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.featured && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(property);
            }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <svg
              className={`w-5 h-5 transition-colors ${isInWishlist(property.id) ? 'fill-red-500 text-red-500' : 'text-slate-700'}`}
              fill={isInWishlist(property.id) ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {property.priceType && (
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-lg shadow-lg">
              {property.priceType === 'sale' ? 'Dijual' : 'Disewakan'}
            </div>
          </div>
        )}
      </Link>

      {/* Content */}
      <Link to={`/property/${property.id}`} className="block p-5">
        <div className="mb-3">
          <div className="text-2xl font-bold text-[#0F172A] mb-1">
            {formatPrice(property.price)}
            {property.priceType === 'rent' && property.rentPeriod && (
              <span className="text-sm font-normal text-gray-600">/{property.rentPeriod}</span>
            )}
          </div>
          {property.priceType === 'sale' && (
            <div className="text-xs text-gray-600">
              KPR mulai {formatPrice(calculateKPREstimate(property.price))}/bln*
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg text-[#0F172A] mb-2 line-clamp-2 leading-tight">
          {property.title}
        </h3>

        <div className="flex items-start gap-2 text-[#64748B] mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Main Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm text-gray-700"><span className="font-semibold">{property.bedrooms}</span> KT</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm text-gray-700"><span className="font-semibold">{property.bathrooms}</span> KM</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm text-gray-700"><span className="font-semibold">{property.landSize}</span>m² LT</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm text-gray-700"><span className="font-semibold">{property.buildingSize}</span>m² LB</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-2 mb-4">
          {property.certificate && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FileText className="w-3 h-3 text-gray-400" />
              <span>Sertifikat: <span className="font-semibold text-gray-700">{property.certificate}</span></span>
            </div>
          )}
          {property.yearBuilt && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>Tahun: <span className="font-semibold text-gray-700">{property.yearBuilt}</span></span>
            </div>
          )}
          {property.furnishing && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Home className="w-3 h-3 text-gray-400" />
              <span><span className="font-semibold text-gray-700">{property.furnishing}</span></span>
            </div>
          )}
        </div>

        {/* Agent */}
        {property.agent && (
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src={property.agent.image}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-semibold text-gray-900">{property.agent.name}</div>
                {property.agent.responseTime && (
                  <div className="text-xs text-gray-500">{property.agent.responseTime}</div>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Will be integrated with chat system later
                console.log('Chat with agent:', property.agent?.name);
              }}
              className="p-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </Link>
    </div>
  );
}