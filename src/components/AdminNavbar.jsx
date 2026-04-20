import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminNavbar() {
  const { adminUser, adminLogout, adminPage, setAdminPage } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setAdminPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-inner">
        <div className="admin-nav-brand" onClick={() => handleNavClick('dashboard')}>
          <div className="admin-nav-logo">👨‍💼</div>
          <div className="admin-nav-text">
            <strong>Admin Panel</strong>
            <span>Samrat Solar</span>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className={`admin-hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle admin menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`admin-nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            className={`admin-nav-item ${adminPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`admin-nav-item ${adminPage === 'products' ? 'active' : ''}`}
            onClick={() => handleNavClick('products')}
          >
            📦 Products
          </button>
          <button
            className={`admin-nav-item ${adminPage === 'orders' ? 'active' : ''}`}
            onClick={() => handleNavClick('orders')}
          >
            📋 Orders
          </button>
        </div>

        <div className="admin-nav-right">
          <span className="admin-user-name">{adminUser?.name}</span>
          <button
            className="admin-logout-btn"
            onClick={adminLogout}
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay show" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
}
