// ============================================================================
// CONSTANTS
// All constant values used throughout the RumahKu platform
// ============================================================================

// Brand Colors
export const COLORS = {
  primary: '#2563EB',
  primaryHover: '#1d4ed8',
  primaryLight: '#3B82F6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  BUY: '/properties?type=buy',
  RENT: '/properties?type=rent',
  PROPERTY_DETAIL: '/property/:id',
  AGENTS: '/agents',
  BLOG: '/blog',
  BLOG_ARTICLE: '/blog/:id',
  KPR: '/kpr',
  KPR_SIMULATION: '/kpr/simulation',
  KPR_DICTIONARY: '/kpr/dictionary',
  WISHLIST: '/wishlist',
  ADVERTISER: '/advertiser',
  PROFILE: '/profile',
  DEVELOPER_LOGIN: '/developer/login',
} as const;

// Navigation Menu Items
export const NAV_ITEMS = [
  { label: 'Beli', href: ROUTES.BUY },
  { label: 'Sewa', href: ROUTES.RENT },
  { label: 'Agen', href: ROUTES.AGENTS },
  { label: 'KPR', href: ROUTES.KPR },
  { label: 'Blog', href: ROUTES.BLOG },
] as const;

// Property Categories
export const PROPERTY_CATEGORIES = [
  { value: 'house', label: 'Rumah', icon: '🏠' },
  { value: 'apartment', label: 'Apartemen', icon: '🏢' },
  { value: 'land', label: 'Tanah', icon: '🌳' },
  { value: 'commercial', label: 'Komersial', icon: '🏪' },
] as const;

// Property Features
export const PROPERTY_FEATURES = [
  'AC',
  'Water Heater',
  'Swimming Pool',
  'Gym',
  'Security 24/7',
  'Playground',
  'Garden',
  'Garage',
  'Balcony',
  'Smart Home',
] as const;

// Blog Categories
export const BLOG_CATEGORIES = [
  { value: 'KPR', label: 'KPR' },
  { value: 'Tips', label: 'Tips' },
  { value: 'News', label: 'Berita' },
  { value: 'Guide', label: 'Panduan' },
] as const;

// KPR Dictionary Categories
export const KPR_CATEGORIES = [
  'Semua',
  'Umum',
  'Bunga',
  'Dokumen',
  'Proses',
  'Lainnya',
] as const;

// User Roles
export const USER_ROLES = [
  { value: 'buyer', label: 'Pembeli/Penyewa' },
  { value: 'owner', label: 'Pemilik Properti' },
  { value: 'agent', label: 'Agen Properti' },
] as const;

// App Configuration
export const APP_CONFIG = {
  name: 'RumahKu',
  description: 'Platform Real Estate Terpercaya di Indonesia',
  currency: 'Rp',
  locale: 'id-ID',
} as const;

// Pagination
export const PAGINATION = {
  itemsPerPage: 12,
  agentsPerPage: 9,
  blogsPerPage: 9,
} as const;

// Price Ranges (for filters)
export const PRICE_RANGES = [
  { label: '< 500 Juta', min: 0, max: 500000000 },
  { label: '500 Juta - 1 Miliar', min: 500000000, max: 1000000000 },
  { label: '1 - 2 Miliar', min: 1000000000, max: 2000000000 },
  { label: '2 - 5 Miliar', min: 2000000000, max: 5000000000 },
  { label: '> 5 Miliar', min: 5000000000, max: Infinity },
] as const;

// Area Ranges (for filters)
export const AREA_RANGES = [
  { label: '< 50 m²', min: 0, max: 50 },
  { label: '50 - 100 m²', min: 50, max: 100 },
  { label: '100 - 200 m²', min: 100, max: 200 },
  { label: '200 - 500 m²', min: 200, max: 500 },
  { label: '> 500 m²', min: 500, max: Infinity },
] as const;

// KPR Interest Rates
export const KPR_INTEREST_RATES = {
  min: 3,
  max: 15,
  default: 8.5,
} as const;

// KPR Loan Terms (in years)
export const KPR_LOAN_TERMS = [5, 10, 15, 20, 25, 30] as const;
