import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { HeroSection } from '../components/home/HeroSection';
import { PriceEstimation } from '../components/home/PriceEstimation';
import { TrendingProperties } from '../components/home/TrendingProperties';
import { NewsSection } from '../components/home/NewsSection';
import { Testimonials } from '../components/home/Testimonials';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { CategoryList } from '../components/home/CategoryList';
import { AppDownload } from '../components/home/AppDownload';
import { useModal } from '../hooks/useModal';

export function HomePage() {
  const loginModal = useModal();
  const registerModal = useModal();

  const handleSwitchToRegister = () => {
    loginModal.close();
    registerModal.open();
  };

  const handleSwitchToLogin = () => {
    registerModal.close();
    loginModal.open();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onLoginClick={loginModal.open}
        onRegisterClick={registerModal.open}
      />
      <HeroSection />
      <PriceEstimation />
      <TrendingProperties />
      <NewsSection />
      <Testimonials />
      <WhyChooseUs />
      <CategoryList />
      <AppDownload />
      <Footer />

      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={loginModal.close}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={registerModal.isOpen}
        onClose={registerModal.close}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}
