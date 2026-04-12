import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AdminContext = createContext(null);
const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [adminPage, setAdminPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const getToken = () => localStorage.getItem('adminToken');

  const adminLogin = useCallback(async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.user.role !== 'admin') {
        throw new Error('Admin access only');
      }

      localStorage.setItem('adminToken', data.token);
      setAdminUser(data.user);
      setAdminPage('dashboard');
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const adminLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    setAdminPage('login');
  }, []);

  const checkAdminAuth = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok && data.user.role === 'admin') {
        setAdminUser(data.user);
        setAdminPage('dashboard');
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch {
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth]);

  // Dashboard stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setStats(data.stats);
      setOrders(data.recentOrders);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  // Products CRUD
  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken();
      console.log('🔍 Fetching products with token:', token ? 'YES' : 'NO');
      
      const res = await fetch(`${API_BASE}/admin/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('📡 Response status:', res.status);
      const data = await res.json();
      console.log('📦 Response data:', data);
      
      if (!res.ok) {
        const errorMsg = data.message || `HTTP ${res.status}: Failed to fetch products`;
        console.error('❌ API Error:', errorMsg);
        throw new Error(errorMsg);
      }
      
      const productsList = data.products || [];
      console.log('✅ Products fetched:', productsList.length);
      setProducts(productsList);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err.message);
      throw err;
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        fetchProducts();
        return data;
      }
      throw new Error(data.message);
    } catch (err) {
      throw err;
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        fetchProducts();
        return data;
      }
      throw new Error(data.message);
    } catch (err) {
      throw err;
    }
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (res.ok) {
        fetchProducts();
        return data;
      }
      throw new Error(data.message);
    } catch (err) {
      throw err;
    }
  }, [fetchProducts]);

  // Users management
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
        return data;
      }
      throw new Error(data.message);
    } catch (err) {
      throw err;
    }
  }, [fetchUsers]);

  // Orders management
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/orders`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  }, []);

  const updateOrder = useCallback(async (id, orderData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok) {
        fetchOrders();
        return data;
      }
      throw new Error(data.message);
    } catch (err) {
      throw err;
    }
  }, [fetchOrders]);

  return (
    <AdminContext.Provider value={{
      adminUser, adminPage, loading, stats, products, users, orders, selectedItem, editFormData,
      setAdminPage, setSelectedItem, setEditFormData,
      adminLogin, adminLogout,
      fetchStats, fetchProducts, createProduct, updateProduct, deleteProduct,
      fetchUsers, updateUser,
      fetchOrders, updateOrder
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
