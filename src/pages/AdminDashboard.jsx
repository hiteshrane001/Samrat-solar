import { useAdmin } from '../context/AdminContext';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { fetchStats, stats, orders, fmt } = useAdmin();
  
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fmt_currency = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <>
      <AdminNavbar />
      <div className="admin-page-wrap">
        <div className="admin-dashboard">
          <h1 className="admin-page-title">📊 Dashboard</h1>

          {stats && (
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="stat-icon"></div>
                <div className="stat-content">
                  <div className="stat-label">Total Orders</div>
                  <div className="stat-value">{stats.totalOrders}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-label">Paid Orders</div>
                  <div className="stat-value">{stats.paidOrders}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-label">Total Revenue</div>
                  <div className="stat-value">{fmt_currency(stats.totalRevenue)}</div>
                </div>
              </div>
            </div>
          )}

          <div className="admin-card">
            <h2 className="admin-card-title">📋 Recent Orders</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.slice(0, 10).map(order => (
                  <tr key={order._id}>
                    <td className="order-id">{order.orderId}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td className="email">{order.user?.email || 'N/A'}</td>
                    <td className="amount">{fmt_currency(order.total)}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`payment-badge ${order.paymentStatus}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
