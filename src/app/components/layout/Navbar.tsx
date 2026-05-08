import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS, ROUTES, APP_CONFIG } from '../../constants';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const isActive = (href: string) => {
    if (href.includes('?')) {
      const [path, query] = href.split('?');
      const params = new URLSearchParams(query);
      return location.pathname === path && searchParams.get('type') === params.get('type');
    }
    return location.pathname === href;
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">{APP_CONFIG.name}</span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`font-semibold transition-colors ${
                  isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Wishlist */}
            <button
              onClick={() => navigate(ROUTES.WISHLIST)}
              className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">Favorit</span>
              {wishlist.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate(ROUTES.PROFILE)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {(user?.full_name?.[0] ?? user?.username?.[0] ?? '?').toUpperCase()}
                </div>
                <span className="font-medium text-gray-700 text-sm">{user?.full_name || user?.username}</span>
              </button>
            ) : (
              <>
                {onLoginClick && (
                  <button
                    onClick={onLoginClick}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Masuk
                  </button>
                )}
                {onRegisterClick && (
                  <button
                    onClick={onRegisterClick}
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Daftar
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => navigate(ROUTES.ADVERTISER)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Pasang Properti
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => { navigate(item.href); closeMenu(); }}
                className={`block w-full text-left py-2 font-semibold ${
                  isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => { navigate(ROUTES.WISHLIST); closeMenu(); }}
              className="flex items-center gap-2 py-2 text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Favorit ({wishlist.length})</span>
            </button>

            <div className="pt-3 space-y-2 border-t border-gray-200">
              {isAuthenticated ? (
                <button
                  onClick={() => { navigate(ROUTES.PROFILE); closeMenu(); }}
                  className="flex items-center gap-3 w-full py-2 px-1"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {(user?.full_name?.[0] ?? user?.username?.[0] ?? '?').toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user?.full_name || user?.username}</span>
                </button>
              ) : (
                <>
                  {onLoginClick && (
                    <button
                      onClick={() => { onLoginClick(); closeMenu(); }}
                      className="w-full py-2 text-gray-700 border border-gray-300 rounded-lg"
                    >
                      Masuk
                    </button>
                  )}
                  {onRegisterClick && (
                    <button
                      onClick={() => { onRegisterClick(); closeMenu(); }}
                      className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg"
                    >
                      Daftar
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => { navigate(ROUTES.ADVERTISER); closeMenu(); }}
                className="w-full py-2 bg-blue-600 text-white rounded-lg"
              >
                Pasang Properti
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
