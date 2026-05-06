import { useState } from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Navbar } from '../components/layout/Navbar';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';

export function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
            Wishlist Saya
          </h1>
          <p className="text-lg text-[#64748B]">
            {wishlist.length} properti tersimpan
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">💔</div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
              Wishlist Anda Masih Kosong
            </h2>
            <p className="text-[#64748B] mb-8">
              Mulai simpan properti favorit Anda dengan klik ikon hati
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
            >
              Jelajahi Properti
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((property) => (
              <div key={property.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
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
                      onClick={() => removeFromWishlist(property.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 fill-red-500 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-2xl font-bold text-[#0F172A] mb-2">
                    {property.price}
                  </div>
                  <h3 className="font-bold text-lg text-[#0F172A] mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#64748B] mb-4">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm line-clamp-1">{property.location}</span>
                  </div>

                  {/* Details */}
                  {property.bedrooms && (
                    <div className="flex items-center justify-between text-sm text-[#64748B] pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>{property.bedrooms} KT</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span>{property.bathrooms} KM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  )}

                  <button className="w-full mt-4 px-4 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all font-semibold">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block px-8 py-4 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-[#2563EB] hover:text-white transition-all font-semibold"
            >
              Lihat Properti Lainnya
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
