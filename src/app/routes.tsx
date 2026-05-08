import { createBrowserRouter, ScrollRestoration, Outlet } from 'react-router';

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

// Direct imports instead of lazy loading to avoid suspense conflicts
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { BuyPropertiesPage } from './pages/BuyPropertiesPage';
import { RentPropertiesPage } from './pages/RentPropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AgentListPage } from './pages/AgentListPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { KPRPage } from './pages/KPRPage';
import { KPRSimulationPage } from './pages/KPRSimulationPage';
import { ListingFormPage } from './pages/ListingFormPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdvertiserPage } from './pages/AdvertiserPage';
import { DeveloperLoginPage } from './pages/DeveloperLoginPage';
import { ProfilePage } from './pages/ProfilePage';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-[#0F172A] mb-4">404</h1>
      <p className="text-xl text-[#64748B] mb-8">Halaman tidak ditemukan</p>
      <a href="/" className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all">
        Kembali ke Beranda
      </a>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/properties', element: <PropertiesPage /> },
      { path: '/buy', element: <BuyPropertiesPage /> },
      { path: '/rent', element: <RentPropertiesPage /> },
      { path: '/property/:id', element: <PropertyDetailPage /> },
      { path: '/agents', element: <AgentListPage /> },
      { path: '/blog', element: <BlogListPage /> },
      { path: '/blog/:id', element: <BlogArticlePage /> },
      { path: '/blog/:slug', element: <BlogArticlePage /> },
      { path: '/kpr', element: <KPRPage /> },
      { path: '/kpr/simulation', element: <KPRSimulationPage /> },
      { path: '/list-property', element: <ListingFormPage /> },
      { path: '/list-property/:roleType', element: <ListingFormPage /> },
      { path: '/wishlist', element: <WishlistPage /> },
      { path: '/advertiser', element: <AdvertiserPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/developer/login', element: <DeveloperLoginPage /> },
      { path: '*', Component: NotFound },
    ],
  },
]);