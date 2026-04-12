import { AppProvider, useApp } from './context/AppContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ConfiguratorPage from './pages/ConfiguratorPage';
import SuccessPage from './pages/SuccessPage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';

function AppContent() {
  const { page, loading, user } = useApp();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F0F2F5', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ fontSize: '3rem' }}>☀️</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: '1.5rem',
          fontWeight: 700, color: '#1A1A2E'
        }}>
          Loading Samrat Solar...
        </div>
      </div>
    );
  }

  // Pages that require authentication
  const protectedPages = ['configurator', 'cart', 'success'];
  if (protectedPages.includes(page) && !user) {
    return <LoginPage />;
  }

  if (page === 'home') return <HomePage />;
  if (page === 'login') return <LoginPage />;
  if (page === 'configurator') return <ConfiguratorPage />;
  if (page === 'success') return <SuccessPage />;
  if (page === 'cart') return <CartPage />;
  if (page === 'shop') return <ShopPage />;
  return <HomePage />;
}

function AdminContent() {
  const { adminUser, adminPage, loading } = useAdmin();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F0F2F5', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ fontSize: '3rem' }}>👨‍💼</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: '1.5rem',
          fontWeight: 700, color: '#1A1A2E'
        }}>
          Loading Admin Panel...
        </div>
      </div>
    );
  }

  if (!adminUser) return <AdminLoginPage />;
  if (adminPage === 'dashboard') return <AdminDashboard />;
  if (adminPage === 'products') return <AdminProducts />;
  if (adminPage === 'users') return <AdminUsers />;
  if (adminPage === 'orders') return <AdminOrders />;
  return <AdminDashboard />;
}

function RoutingApp() {
  const { adminUser } = useAdmin();
  const adminToken = localStorage.getItem('adminToken');
  const queryParams = new URLSearchParams(window.location.search);
  const isAdminPath = window.location.pathname === '/admin' || queryParams.get('view') === 'admin';
  
  // If on admin path (with or without token), show AdminContent
  // AdminContent will decide whether to show login or dashboard based on adminUser state
  if (isAdminPath || adminToken) {
    return <AdminContent />;
  }
  
  // User side
  return <AppContent />;
}

export default function App() {
  return <RoutingApp />;
}
