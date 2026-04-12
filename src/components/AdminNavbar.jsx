import { useAdmin } from '../context/AdminContext';

export default function AdminNavbar() {
  const { adminUser, adminLogout, adminPage, setAdminPage } = useAdmin();

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-inner">
        <div className="admin-nav-brand" onClick={() => setAdminPage('dashboard')}>
          <div className="admin-nav-logo">👨‍💼</div>
          <div className="admin-nav-text">
            <strong>Admin Panel</strong>
            <span>Samrat Solar</span>
          </div>
        </div>

        <div className="admin-nav-menu">
          <button
            className={`admin-nav-item ${adminPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setAdminPage('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`admin-nav-item ${adminPage === 'products' ? 'active' : ''}`}
            onClick={() => setAdminPage('products')}
          >
            📦 Products
          </button>
          <button
            className={`admin-nav-item ${adminPage === 'orders' ? 'active' : ''}`}
            onClick={() => setAdminPage('orders')}
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
    </nav>
  );
}
