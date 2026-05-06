// ============================================================================
// TYPE DEFINITIONS
// All TypeScript interfaces and types for the RumahKu platform
// ============================================================================

// Property Types
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'buy' | 'rent';
  category: 'house' | 'apartment' | 'land' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  image: string;
  description?: string;
  features?: string[];
  agent?: Agent;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Agent Types
export interface Agent {
  id: string;
  name: string;
  photo: string;
  company?: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  specialization?: string[];
  description?: string;
  verified?: boolean;
  listings?: number;
}

// Blog Types
export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'KPR' | 'Tips' | 'News' | 'Guide';
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags?: string[];
}

// KPR Types
export interface KPRTerm {
  id: string;
  term: string;
  definition: string;
  category: 'Umum' | 'Bunga' | 'Dokumen' | 'Proses' | 'Lainnya';
  relatedTerms?: string[];
}

export interface KPRSimulation {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // in years
  monthlyInstallment: number;
  totalPayment: number;
  totalInterest: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'owner' | 'agent';
  verified?: boolean;
}

// Auth Types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'buyer' | 'owner' | 'agent';
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Filter Types
export interface PropertyFilters {
  type?: 'buy' | 'rent';
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
}
