import { useAdmin } from '../context/AdminContext';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct } = useAdmin();
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: 'panel',
    name: '',
    price: '',
    mrp: '',
    wp: '',
    kw: '',
    techId: '',
    short: '',
    badge: '',
    eff: '',
    cells: '',
    model: '',
    brand: '',
    img: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('📦 Loading products...');
        await fetchProducts();
        console.log('✅ Products loaded successfully');
      } catch (err) {
        const errorMsg = err.message || 'Unknown error occurred';
        setError(errorMsg);
        console.error('❌ Product load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  const fmt = (n) => {
    if (!n && n !== 0) return '—';
    const num = typeof n === 'string' ? parseFloat(n) : n;
    if (isNaN(num)) return '—';
    return '₹' + num.toLocaleString('en-IN');
  };

  const handleAddClick = () => {
    setEditingId(null);
    setImagePreview(null);
    setUploadError('');
    setFormData({
      type: 'panel',
      name: '',
      price: '',
      mrp: '',
      wp: '',
      kw: '',
      techId: '',
      short: '',
      badge: '',
      eff: '',
      cells: '',
      model: '',
      brand: '',
      img: '',
      items: []
    });
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPG, PNG, and WebP images are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setFormData({ ...formData, img: event.target.result });
      setUploadError('');
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setImagePreview(product.img);
    setUploadError('');
    setFormData(product);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== '') acc[key] = value;
        return acc;
      }, {});

      if (editingId) {
        await updateProduct(editingId, cleanData);
        alert('Product updated successfully!');
      } else {
        await createProduct(cleanData);
        alert('Product created successfully!');
      }
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const filteredProducts = Array.isArray(products) 
    ? (filterType === 'all' 
        ? products 
        : products.filter(p => p.type === filterType))
    : [];

  return (
    <>
      <AdminNavbar />
      <div className="admin-page-wrap">
        <div className="admin-products">
          {/* Loading State */}
          {loading && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '500px',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ fontSize: '3rem' }}>⏳</div>
              <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading products...</div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{
              background: '#fee',
              border: '2px solid #c70039',
              borderRadius: '8px',
              padding: '20px',
              margin: '20px 0',
              color: '#c70039'
            }}>
              <strong>⚠️ Error:</strong> {error}
              <button 
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  fetchProducts().catch(err => setError(err.message)).finally(() => setLoading(false));
                }}
                style={{
                  marginLeft: '15px',
                  padding: '8px 15px',
                  backgroundColor: '#c70039',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Content Section */}
          {!loading && !error && (
            <>
              <div className="admin-header">
                <h1 className="admin-page-title">📦 Product Management</h1>
                <button className="btn-primary" onClick={handleAddClick}>
                  ➕ Add Product
                </button>
              </div>

              <div className="admin-card">
                <div className="filter-section">
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All Products</option>
                    <option value="tech">Technologies</option>
                    <option value="panel">Panels</option>
                    <option value="inverter">Inverters</option>
                    <option value="bos">BOS Kit</option>
                  </select>
                  <span className="count">Total: {filteredProducts.length}</span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#999'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📭</div>
                    <div>No products found. Click "Add Product" to create one.</div>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Model/ID</th>
                        <th>Price</th>
                        <th>MRP</th>
                        <th>Specs</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product._id}>
                          <td className="type">
                            <span className="badge">{product.type}</span>
                          </td>
                          <td className="name">{product.name}</td>
                          <td className="model">
                            {product.model || product.techId || (product.wp ? product.wp + 'W' : (product.kw ? product.kw + 'kW' : '—'))}
                          </td>
                          <td className="amount">{fmt(product.price)}</td>
                          <td className="mrp">{product.mrp ? fmt(product.mrp) : '—'}</td>
                          <td className="specs">
                            {product.wp && `${product.wp}W `}
                            {product.kw && `${product.kw}kW `}
                            {product.eff && `${product.eff}`}
                            {product.type === 'bos' && product.items && `${product.items.length} items`}
                          </td>
                          <td className="actions">
                            <button 
                              className="btn-edit"
                              onClick={() => handleEditClick(product)}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => handleDelete(product._id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {showForm && (
            <div className="modal-overlay" onClick={() => setShowForm(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                  <button 
                    className="modal-close"
                    onClick={() => setShowForm(false)}
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Type *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        required
                      >
                        <option value="tech">Technology</option>
                        <option value="panel">Panel</option>
                        <option value="inverter">Inverter</option>
                        <option value="bos">BOS Kit</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>MRP</label>
                      <input
                        type="number"
                        value={formData.mrp}
                        onChange={(e) => setFormData({...formData, mrp: e.target.value})}
                      />
                    </div>
                  </div>

                  {formData.type === 'panel' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Wattage (Wp)</label>
                        <input
                          type="number"
                          value={formData.wp}
                          onChange={(e) => setFormData({...formData, wp: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input
                          type="text"
                          value={formData.model}
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  {formData.type === 'inverter' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Capacity (kW)</label>
                        <input
                          type="number"
                          value={formData.kw}
                          onChange={(e) => setFormData({...formData, kw: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Brand</label>
                        <input
                          type="text"
                          value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  {formData.type === 'bos' && (
                    <div className="form-row" style={{ flexDirection: 'column' }}>
                      <div className="form-group" style={{ width: '100%' }}>
                        <label>Model/Reference</label>
                        <input
                          type="text"
                          value={formData.model}
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                          placeholder="e.g., SS-BOS-KIT-COMPLETE"
                        />
                      </div>
                      <div className="form-group" style={{ width: '100%' }}>
                        <label>Brand</label>
                        <input
                          type="text"
                          value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                          placeholder="Samrat Solar"
                        />
                      </div>
                      <div className="form-group" style={{ width: '100%' }}>
                        <label>Description</label>
                        <textarea
                          value={formData.desc}
                          onChange={(e) => setFormData({...formData, desc: e.target.value})}
                          placeholder="Describe the BOS kit contents and features"
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div className="form-group" style={{ width: '100%' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Kit Items ({formData.items?.length || 0})</label>
                        <div style={{
                          background: '#f5f5f5',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          padding: '12px',
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          {formData.items && formData.items.length > 0 ? (
                            formData.items.map((item, idx) => (
                              <div key={idx} style={{
                                padding: '8px',
                                background: 'white',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: '1px solid #eee'
                              }}>
                                <div>
                                  <span style={{ marginRight: '10px', fontSize: '1.5rem' }}>{item.icon}</span>
                                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                  <span style={{ color: '#666', marginLeft: '10px', fontSize: '12px' }}>{item.sub}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No items in kit</div>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
                          Note: Kit items are pre-configured. To modify items, keep existing values.
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Cells/Efficiency</label>
                      <input
                        type="text"
                        value={formData.cells}
                        onChange={(e) => setFormData({...formData, cells: e.target.value})}
                        placeholder="e.g., 144 Cells or 22%"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ flex: '1' }}>
                      <label>Product Image</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ flex: '1' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                          {uploadError && <div style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{uploadError}</div>}
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            Max 5MB • JPG, PNG, or WebP
                          </div>
                        </div>
                        {imagePreview && (
                          <div style={{ textAlign: 'center' }}>
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #ddd' }}
                            />
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Preview</div>
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '8px', fontStyle: 'italic' }}>
                        Or paste URL: 
                        <input
                          type="url"
                          value={typeof formData.img === 'string' && !formData.img.startsWith('data:') ? formData.img : ''}
                          onChange={(e) => {
                            setFormData({...formData, img: e.target.value});
                            setImagePreview(e.target.value);
                          }}
                          placeholder="https://..."
                          style={{ width: '100%', marginTop: '4px', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-save">
                      {editingId ? '💾 Update' : '➕ Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
