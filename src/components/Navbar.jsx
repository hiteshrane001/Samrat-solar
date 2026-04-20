import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { step, totalPanels, logout, user, page, setPage, setStep } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const panels = totalPanels();
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleNavClick = (navPage, targetStep) => {
    setPage(navPage);
    if (targetStep) setStep(targetStep);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // ✅ Login-protected Shop redirect
  const handleShopClick = () => {
    if (!user) {
      setPage('login');
    } else {
      handleNavClick('shop');
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button 
          className="nav-brand" 
          onClick={handleShopClick}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <div className="nav-sun">☀️</div>
          <div className="nav-brand-text">
            <strong>Samrat Solar</strong>
            <span>Premium Solar Solutions</span>
          </div>
        </button>

        {/* Hamburger Button */}
        <button
          className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
        <div className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`nav-item ${page === 'configurator' && step === 1 ? 'active' : ''}`}
            onClick={() => handleNavClick('configurator', 1)}
          >
            Module Technology
          </button>
          <button 
            className={`nav-item ${page === 'configurator' && step === 2 ? 'active' : ''}`}
            onClick={() => handleNavClick('configurator', 2)}
          >
            Configure Panels
          </button>
          <button 
            className={`nav-item ${page === 'configurator' && step === 3 ? 'active' : ''}`}
            onClick={() => handleNavClick('configurator', 3)}
          >
            Inverters
          </button>
          <button 
            className={`nav-item ${page === 'configurator' && (step === 4 || step === 5) ? 'active' : ''}`}
            onClick={() => handleNavClick('configurator', 5)}
          >
            Order
          </button>
        </div>
        
        <div className="nav-right">
          <div className="nav-toll">📞 1800-2121-321</div>
          
          <button 
            className={`nav-cart ${page === 'cart' ? 'active' : ''}`}
            onClick={() => handleNavClick('cart')}
          >
            🛒 Cart
            {panels > 0 && <span className="cart-badge">{panels}</span>}
          </button>
          
          <div className="nav-user-container">
            <button 
              className="nav-user" 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title={user?.name || 'User'}
            >
              {initial}
            </button>
            
            {userDropdownOpen && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <strong>{user?.name || 'User'}</strong>
                  <small>{user?.email || 'No email'}</small>
                </div>
                <hr className="dropdown-divider" />
                <button 
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay show" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
}
