const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth
export async function apiLogin(email, password) {
  const data = await request('POST', '/auth/login', { email, password });
  setToken(data.token);
  return data;
}

export async function apiRegister(name, email, password, phone) {
  const data = await request('POST', '/auth/register', { name, email, password, phone });
  setToken(data.token);
  return data;
}

export async function apiGetMe() {
  return request('GET', '/auth/me');
}

export function apiLogout() {
  setToken(null);
}

export function hasToken() {
  return !!getToken();
}

// Products
export async function apiGetTech() {
  return request('GET', '/products/tech');
}

export async function apiGetPanels() {
  return request('GET', '/products/panels');
}

export async function apiGetInverters() {
  return request('GET', '/products/inverters');
}

export async function apiGetBOS() {
  return request('GET', '/products/bos');
}

// Orders
export async function apiCreateOrder(orderData) {
  return request('POST', '/orders', orderData);
}

export async function apiCreatePayment(orderId, amount) {
  return request('POST', '/orders/create-payment', { orderId, amount });
}

export async function apiVerifyPayment(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature) {
  return request('POST', '/orders/verify-payment', {
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  });
}

export async function apiGetOrders() {
  return request('GET', '/orders');
}

export async function apiGetOrder(orderId) {
  return request('GET', `/orders/${orderId}`);
}
