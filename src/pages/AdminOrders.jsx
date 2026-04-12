import { useAdmin } from '../context/AdminContext';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const {
    orders, fetchOrders, updateOrder, setSelectedItem, selectedItem,
    products, fetchProducts, updateProduct
  } = useAdmin();

  const [showDetails, setShowDetails]   = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [activeTab, setActiveTab]       = useState('orders'); // 'orders' | 'inventory'

  // Per-row stock edits stored locally before saving
  const [stockEdits, setStockEdits] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  /* -------- Orders logic -------- */
  const filteredOrders = orders.filter(order => {
    const statusMatch  = filterStatus  === 'all' || order.status        === filterStatus;
    const paymentMatch = filterPayment === 'all' || order.paymentStatus === filterPayment;
    return statusMatch && paymentMatch;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    try {
      await updateOrder(orderId, { paymentStatus: newPaymentStatus });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedItem(order);
    setShowDetails(true);
  };

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  /* -------- Inventory logic -------- */
  const getEdit = (id, field, fallback) =>
    stockEdits[id]?.[field] !== undefined ? stockEdits[id][field] : fallback;

  const setEdit = (id, field, value) =>
    setStockEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));

  const handleStockSave = async (product) => {
    const newStock  = parseInt(getEdit(product._id, 'stock',       product.stock  ?? 100), 10);
    const newStatus =          getEdit(product._id, 'stockStatus', product.stockStatus ?? 'in_stock');
    try {
      await updateProduct(product._id, { stock: newStock, stockStatus: newStatus });
      // Clear local edit after save
      setStockEdits(prev => { const n = { ...prev }; delete n[product._id]; return n; });
      alert(`Stock updated for "${product.name}"`);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const statusChipClass = (s) => ({
    in_stock:    'in-stock',
    low_stock:   'low-stock',
    out_of_stock:'out-stock',
    coming_soon: 'coming-soon'
  }[s] || 'in-stock');

  const statusLabel = (s) => ({
    in_stock:    'In Stock',
    low_stock:   'Low Stock',
    out_of_stock:'Out of Stock',
    coming_soon: 'Coming Soon'
  }[s] || s);

  // Inventory summary counts
  const invSummary = {
    total:    products.length,
    inStock:  products.filter(p => (p.stockStatus ?? 'in_stock') === 'in_stock').length,
    lowStock: products.filter(p => p.stockStatus === 'low_stock').length,
    outStock: products.filter(p => p.stockStatus === 'out_of_stock').length,
  };

  const stockPct = (stock) => {
    const s = stock ?? 100;
    return Math.min(100, Math.round((s / 200) * 100));
  };
  const barClass = (stock) => {
    const s = stock ?? 100;
    if (s <= 0)  return 'low';
    if (s <= 20) return 'mid';
    return 'high';
  };

  /* -------- Render -------- */
  return (
    <>
      <AdminNavbar />
      <div className="admin-page-wrap">
        <div className="admin-orders">
          <h1 className="admin-page-title">📋 Order & Inventory Management</h1>

          {/* ---- Tab Strip ---- */}
          <div className="inv-tabs">
            <button
              className={`inv-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
              id="tab-orders"
            >
              🗒️ Orders
              <span style={{
                background: activeTab === 'orders' ? 'var(--red-l)' : 'var(--gray-100)',
                color: activeTab === 'orders' ? 'var(--red)' : 'var(--gray-600)',
                fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px'
              }}>
                {filteredOrders.length}
              </span>
            </button>
            <button
              className={`inv-tab ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
              id="tab-inventory"
            >
              📦 Inventory
              <span style={{
                background: activeTab === 'inventory' ? 'var(--red-l)' : 'var(--gray-100)',
                color: activeTab === 'inventory' ? 'var(--red)' : 'var(--gray-600)',
                fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px'
              }}>
                {products.length}
              </span>
            </button>
          </div>

          {/* ========== ORDERS TAB ========== */}
          {activeTab === 'orders' && (
            <div className="admin-card">
              <div className="filter-section">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>

                <span className="count">Total: {filteredOrders.length}</span>
              </div>

              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</div>
                  <div>No orders match the current filters.</div>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id}>
                        <td className="order-id">{order.orderId}</td>
                        <td className="customer-name">{order.user?.name || 'N/A'}</td>
                        <td className="amount">{fmt(order.total)}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => handlePaymentChange(order._id, e.target.value)}
                            className="payment-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                          </select>
                        </td>
                        <td>
                          <span className="method-badge">{order.paymentMethod || 'COD'}</span>
                        </td>
                        <td className="date">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="actions">
                          <button
                            className="btn-view"
                            onClick={() => handleViewDetails(order)}
                            title="View Details"
                          >
                            👁️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ========== INVENTORY TAB ========== */}
          {activeTab === 'inventory' && (
            <>
              {/* Summary Cards */}
              <div className="inv-summary-grid">
                {[
                  { icon: '📦', label: 'Total Products', val: invSummary.total, color: 'var(--dark)' },
                  { icon: '✅', label: 'In Stock',       val: invSummary.inStock,  color: 'var(--green)' },
                  { icon: '⚠️', label: 'Low Stock',      val: invSummary.lowStock, color: 'var(--gold)' },
                  { icon: '🚫', label: 'Out of Stock',   val: invSummary.outStock, color: 'var(--red)' },
                ].map((c, i) => (
                  <div className="inv-summary-card" key={i} style={{ borderLeft: `4px solid ${c.color}` }}>
                    <div className="inv-sum-icon">{c.icon}</div>
                    <div>
                      <div className="inv-sum-val" style={{ color: c.color }}>{c.val}</div>
                      <div className="inv-sum-label">{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-card">
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)' }}>
                    📋 Product Stock Levels
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                    Changes are saved per-row — click <strong>Update</strong> to confirm.
                  </div>
                </div>

                {products.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</div>
                    <div>No products found. Add some from the Products section.</div>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Current Stock</th>
                        <th>Stock Level</th>
                        <th>Status</th>
                        <th>Edit Qty</th>
                        <th>New Status</th>
                        <th>Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => {
                        const curStock  = product.stock ?? 100;
                        const curStatus = product.stockStatus ?? 'in_stock';
                        const editStock  = getEdit(product._id, 'stock',       curStock);
                        const editStatus = getEdit(product._id, 'stockStatus', curStatus);
                        const isDirty    = editStock !== curStock || editStatus !== curStatus;

                        return (
                          <tr key={product._id}>
                            <td className="name">{product.name}</td>
                            <td className="type">
                              <span className="badge">{product.type}</span>
                            </td>
                            <td className="amount">{curStock} units</td>
                            <td>
                              <div className="inv-stock-bar-wrap">
                                <div style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 600 }}>
                                  {stockPct(curStock)}%
                                </div>
                                <div className="inv-stock-bar">
                                  <div
                                    className={`inv-stock-bar-fill ${barClass(curStock)}`}
                                    style={{ width: `${stockPct(curStock)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`inv-stock-chip ${statusChipClass(curStatus)}`}>
                                {statusLabel(curStatus)}
                              </span>
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="inv-qty-input"
                                value={editStock}
                                onChange={(e) => setEdit(product._id, 'stock', parseInt(e.target.value, 10) || 0)}
                              />
                            </td>
                            <td>
                              <select
                                className="inv-status-select"
                                value={editStatus}
                                onChange={(e) => setEdit(product._id, 'stockStatus', e.target.value)}
                              >
                                <option value="in_stock">In Stock</option>
                                <option value="low_stock">Low Stock</option>
                                <option value="out_of_stock">Out of Stock</option>
                                <option value="coming_soon">Coming Soon</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="inv-update-btn"
                                onClick={() => handleStockSave(product)}
                                style={{ opacity: isDirty ? 1 : 0.55 }}
                                title={isDirty ? 'Save changes' : 'No changes'}
                              >
                                {isDirty ? '💾 Update' : '✓ Saved'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---- Order Details Modal ---- */}
      {showDetails && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details — {selectedItem.orderId}</h2>
              <button className="modal-close" onClick={() => setShowDetails(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Customer Info</h3>
                <div className="detail-row"><span className="label">Name:</span><span className="value">{selectedItem.user?.name || 'N/A'}</span></div>
                <div className="detail-row"><span className="label">Email:</span><span className="value">{selectedItem.user?.email || 'N/A'}</span></div>
                <div className="detail-row"><span className="label">Phone:</span><span className="value">{selectedItem.user?.phone || 'N/A'}</span></div>
              </div>

              <div className="detail-section">
                <h3>Delivery Address</h3>
                <div className="detail-row"><span className="label">Address:</span><span className="value">{selectedItem.address?.address || 'N/A'}</span></div>
                <div className="detail-row"><span className="label">City:</span><span className="value">{selectedItem.address?.city || 'N/A'}</span></div>
                <div className="detail-row"><span className="label">State:</span><span className="value">{selectedItem.address?.state || 'N/A'}</span></div>
                <div className="detail-row"><span className="label">Pincode:</span><span className="value">{selectedItem.address?.pin || 'N/A'}</span></div>
              </div>

              <div className="detail-section">
                <h3>Order Items</h3>
                {selectedItem.panels?.map((panel, i) => (
                  <div key={i} className="detail-row">
                    <span className="label">{panel.name} × {panel.qty}</span>
                    <span className="value">{fmt(panel.total)}</span>
                  </div>
                ))}
                <div className="detail-row">
                  <span className="label">Inverter ({selectedItem.inverter?.kw}kW)</span>
                  <span className="value">{fmt(selectedItem.inverter?.price || 0)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">BOS Kit</span>
                  <span className="value">{fmt(selectedItem.bosPrice)}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Pricing</h3>
                <div className="detail-row"><span className="label">Subtotal:</span><span className="value">{fmt(selectedItem.subtotal)}</span></div>
                <div className="detail-row"><span className="label">GST (18%):</span><span className="value">{fmt(selectedItem.gst)}</span></div>
                <div className="detail-row total"><span className="label">Total:</span><span className="value">{fmt(selectedItem.total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
