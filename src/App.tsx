import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage, ShippingPolicyPage, TermsPrivacyPage } from './pages/PolicyPages';

const MainRouter: React.FC = () => {
  const { route } = useStore();

  const renderCurrentView = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
      case 'orders':
        return <AccountPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <FaqPage />;
      case 'shipping-policy':
        return <ShippingPolicyPage />;
      case 'privacy':
        return <TermsPrivacyPage type="privacy" />;
      case 'terms':
        return <TermsPrivacyPage type="terms" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090909] text-white">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
