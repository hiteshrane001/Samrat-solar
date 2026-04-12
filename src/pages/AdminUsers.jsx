import { useAdmin } from '../context/AdminContext';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';

export default function AdminUsers() {
  const { users, fetchUsers, setSelectedItem, selectedItem } = useAdmin();
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (user) => {
    setSelectedItem(user);
    setShowDetails(true);
  };

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <>
      <AdminNavbar />
      <div className="admin-page-wrap">
        <div className="admin-users">
          <h1 className="admin-page-title">👥 User Management</h1>

          <div className="admin-card">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="count">Total: {filteredUsers.length}</span>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td className="name">{user.name}</td>
                    <td className="email">{user.email}</td>
                    <td className="phone">{user.phone || 'N/A'}</td>
                    <td className="orders">
                      <span className="order-count">{user.orderCount || 0}</span>
                    </td>
                    <td className="amount">{fmt(user.totalSpent || 0)}</td>
                    <td className="date">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="actions">
                      <button
                        className="btn-view"
                        onClick={() => handleViewDetails(user)}
                        title="View Details"
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showDetails && selectedItem && (
            <div className="modal-overlay" onClick={() => setShowDetails(false)}>
              <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{selectedItem.name}</h2>
                  <button 
                    className="modal-close"
                    onClick={() => setShowDetails(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="modal-body">
                  <div className="detail-section">
                    <h3>User Information</h3>
                    <div className="detail-row">
                      <span className="label">Name:</span>
                      <span className="value">{selectedItem.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span className="value">{selectedItem.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{selectedItem.phone || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Joined:</span>
                      <span className="value">
                        {new Date(selectedItem.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Order Summary</h3>
                    <div className="detail-row">
                      <span className="label">Total Orders:</span>
                      <span className="value">{selectedItem.orderCount || 0}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total Amount Spent:</span>
                      <span className="value">{fmt(selectedItem.totalSpent || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
