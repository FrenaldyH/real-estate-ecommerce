import { useState } from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { MapPin, Bed, Bath, Ruler, Heart, LogIn } from 'lucide-react';
import { formatCurrency } from '../utils';

export function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">Wishlist Saya</h1>
          <p className="text-lg text-[#64748B]">{wishlist.length} properti tersimpan</p>
        </div>

        {/* Login prompt for guests */}
        {!isAuthenticated && (
          <div className="mb-6 flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-6 py-4">
            <LogIn className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-700 flex-1">
              Login untuk menyimpan wishlist secara permanen dan mengaksesnya di perangkat lain.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              Masuk
            </button>
          </div>
        )}

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Wishlist Anda Masih Kosong</h2>
            <p className="text-[#64748B] mb-8">Mulai simpan properti favorit Anda dengan klik ikon hati</p>
            <Link
              to="/properties"
              className="inline-block px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
            >
              Jelajahi Properti
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-bold rounded-full shadow-lg">
                        Premium
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-2xl font-bold text-[#0F172A] mb-2">
                    {formatCurrency(property.price)}
                  </div>
                  <h3 className="font-bold text-lg text-[#0F172A] mb-2 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center gap-2 text-[#64748B] mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{property.location}</span>
                  </div>

                  {(property.bedrooms || property.landSize) && (
                    <div className="flex items-center justify-between text-sm text-[#64748B] pt-4 border-t border-slate-200">
                      {property.bedrooms != null && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms} KT</span>
                        </div>
                      )}
                      {property.bathrooms != null && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.bathrooms} KM</span>
                        </div>
                      )}
                      {(property.landSize ?? property.area) != null && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          <span>{property.landSize ?? property.area}m²</span>
                        </div>
                      )}
                    </div>
                  )}

                  <Link
                    to={`/property/${property.id}`}
                    className="block w-full mt-4 px-4 py-3 bg-[#2563EB] text-white text-center rounded-lg hover:bg-[#1d4ed8] transition-all font-semibold"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-block px-8 py-4 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-[#2563EB] hover:text-white transition-all font-semibold"
            >
              Lihat Properti Lainnya
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
