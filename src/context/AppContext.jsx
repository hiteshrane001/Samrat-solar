import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { PANELS as FALLBACK_PANELS, INVERTERS as FALLBACK_INVERTERS, PRICES } from '../data/constants';
import { fmt as fmtUtil } from '../data/constants';
import {
  apiLogin, apiRegister, apiGetMe, apiLogout, hasToken,
  apiGetTech, apiGetPanels, apiGetInverters, apiGetBOS,
  apiCreateOrder, apiCreatePayment, apiVerifyPayment
} from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState('home');
  const [step, setStep] = useState(1);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginMode, setLoginMode] = useState('login'); // 'login' or 'register'
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [tech, setTech] = useState(null);
  const [qty, setQty] = useState({ 560: 0, 590: 0, 630: 0, 680: 0 });
  const [inverter, setInverter] = useState(null);
  const [pay, setPay] = useState('cod');
  const [addr, setAddr] = useState({ name: '', phone: '', address: '', city: '', state: '', pin: '', landmark: '' });
  const [orderId, setOrderId] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Products from API
  const [techProducts, setTechProducts] = useState([]);
  const [panelProducts, setPanelProducts] = useState(FALLBACK_PANELS);
  const [inverterProducts, setInverterProducts] = useState(FALLBACK_INVERTERS);
  const [bosProducts, setBosProducts] = useState([]);
  const [bosPrice, setBosPrice] = useState(PRICES.bos);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (hasToken()) {
        try {
          const data = await apiGetMe();
          setUser(data.user);
          setPage('configurator');
          setStep(1);
        } catch {
          apiLogout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [techRes, panelRes, invRes, bosRes] = await Promise.all([
          apiGetTech().catch(() => null),
          apiGetPanels().catch(() => null),
          apiGetInverters().catch(() => null),
          apiGetBOS().catch(() => null)
        ]);

        if (techRes?.products?.length) {
          setTechProducts(techRes.products.map(t => ({
            id: t.techId, name: t.name, short: t.short, badge: t.badge, badgeType: t.badgeType,
            eff: t.eff, cells: t.cells, power: t.power, warranty: t.warranty, temp: t.temp,
            desc: t.desc, feats: t.feats, img: t.img, price: t.price, mrp: t.mrp
          })));
        }
        if (panelRes?.products?.length) {
          setPanelProducts(panelRes.products.map(p => ({
            wp: p.wp, name: p.name, model: p.model, cells: p.cells, voc: p.voc, isc: p.isc,
            img: p.img, price: p.price, mrp: p.mrp,
            stock: p.stock ?? 100, stockStatus: p.stockStatus ?? 'in_stock'
          })));
        }
        if (invRes?.products?.length) {
          setInverterProducts(invRes.products.map(i => ({
            kw: i.kw, name: i.name, model: i.model, brand: i.brand, desc: i.desc,
            specs: i.specs, img: i.img, price: i.price, mrp: i.mrp, badge: i.badge,
            stock: i.stock ?? 100, stockStatus: i.stockStatus ?? 'in_stock'
          })));
        }
        if (bosRes?.products?.length) {
          const bosKit = bosRes.products.find(b => b.type === 'bos');
          if (bosKit && bosKit.items) {
            setBosProducts(bosKit.items);
            if (bosKit.price) setBosPrice(bosKit.price);
          } else if (bosRes.products[0]?.items) {
            // Fallback if first product is BOS kit
            setBosProducts(bosRes.products[0].items);
            if (bosRes.products[0]?.price) setBosPrice(bosRes.products[0].price);
          }
        }
      } catch {
        // Fallback to hardcoded data on error
      }
    };
    loadProducts();
  }, []);

  const panelCost = useCallback(() => panelProducts.reduce((s, p) => s + p.price * (qty[p.wp] || 0), 0), [qty, panelProducts]);
  const invCost = useCallback(() => inverter ? inverterProducts.find(i => i.kw === inverter)?.price || 0 : 0, [inverter, inverterProducts]);
  const totalWatt = useCallback(() => panelProducts.reduce((s, p) => s + p.wp * (qty[p.wp] || 0), 0), [qty, panelProducts]);
  const totalPanels = useCallback(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);
  const subtotal = useCallback(() => panelCost() + invCost() + bosPrice, [panelCost, invCost, bosPrice]);
  const gstAmount = useCallback(() => Math.round(subtotal() * PRICES.gst), [subtotal]);
  const total = useCallback(() => subtotal() + gstAmount(), [subtotal, gstAmount]);
  const fmt = fmtUtil;

  const updateQty = useCallback((wp, action) => {
    setQty(prev => {
      const newQty = { ...prev };
      if (action === 'i') newQty[wp] = (newQty[wp] || 0) + 1;
      else if ((newQty[wp] || 0) > 0) newQty[wp]--;
      return newQty;
    });
  }, []);

  const updateAddr = useCallback((field, value) => {
    setAddr(prev => ({ ...prev, [field]: value }));
  }, []);

  const login = useCallback(async () => {
    try {
      setLoginErr('');
      const data = await apiLogin(loginEmail, loginPass);
      setUser(data.user);
      setPage('configurator');
      setStep(1);
    } catch (err) {
      setLoginErr(err.message || 'Invalid credentials.');
    }
  }, [loginEmail, loginPass]);

  const register = useCallback(async () => {
    try {
      setLoginErr('');
      if (!registerName.trim()) {
        setLoginErr('Name is required.');
        return;
      }
      const data = await apiRegister(registerName, loginEmail, loginPass, registerPhone);
      setUser(data.user);
      setPage('configurator');
      setStep(1);
    } catch (err) {
      setLoginErr(err.message || 'Registration failed.');
    }
  }, [registerName, loginEmail, loginPass, registerPhone]);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setPage('login');
    setStep(1);
  }, []);

  const placeOrder = useCallback(async () => {
    try {
      const selectedTech = techProducts.find(t => t.id === tech);
      const selectedInverter = inverterProducts.find(i => i.kw === inverter);
      const selectedPanels = panelProducts
        .filter(p => (qty[p.wp] || 0) > 0)
        .map(p => ({
          wp: p.wp, name: p.name, qty: qty[p.wp],
          pricePerUnit: p.price, total: p.price * qty[p.wp]
        }));

      const orderData = {
        tech: { id: tech, name: selectedTech?.name || '' },
        panels: selectedPanels,
        inverter: inverter,
        paymentMethod: pay,
        address: addr
      };

      // Create order
      const orderRes = await apiCreateOrder(orderData);
      const newOrderId = orderRes.order.orderId;
      const orderTotal = orderRes.order.total;

      setOrderId(newOrderId);

      // Handle payment based on method
      if (pay === 'online') {
        // Initiate Razorpay payment
        const paymentRes = await apiCreatePayment(newOrderId, orderTotal);
        
        // Open Razorpay checkout
        const options = {
          key: paymentRes.razorpayKeyId,
          amount: paymentRes.amount,
          currency: paymentRes.currency,
          order_id: paymentRes.razorpayOrderId,
          name: 'Samrat Solar',
          description: `${selectedPanels.length} Solar Panels + ${inverter}kW Inverter`,
          prefill: {
            name: orderRes.order.address.name || '',
            email: user?.email || '',
            contact: orderRes.order.address.phone || ''
          },
          handler: async (response) => {
            try {
              // Verify payment on backend
              await apiVerifyPayment(
                newOrderId,
                paymentRes.razorpayOrderId,
                response.razorpay_payment_id,
                response.razorpay_signature
              );
              setPage('success');
            } catch (verifyErr) {
              alert('Payment verification failed: ' + (verifyErr.message || 'Unknown error'));
              setOrderId('');
            }
          },
          modal: {
            ondismiss: () => {
              alert('Payment cancelled. You can retry from your orders page.');
              setOrderId('');
            }
          },
          theme: { color: '#FF6B35' }
        };

        // Dynamically load Razorpay script if not loaded
        if (!window.Razorpay) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => {
            const rzp = new window.Razorpay(options);
            rzp.open();
          };
          script.onerror = () => alert('Failed to load payment gateway. Please try again.');
          document.body.appendChild(script);
        } else {
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } else {
        // COD - order placed, show success
        setPage('success');
      }
    } catch (err) {
      alert(err.message || 'Failed to place order. Please try again.');
      setOrderId('');
    }
  }, [tech, qty, inverter, pay, addr, techProducts, panelProducts, inverterProducts, user]);

  const resetApp = useCallback(() => {
    setPage('configurator');
    setStep(1);
    setTech(null);
    setQty({ 560: 0, 590: 0, 630: 0, 680: 0 });
    setInverter(null);
    setPay('cod');
    setAddr({ name: '', phone: '', address: '', city: '', state: '', pin: '', landmark: '' });
  }, []);

  const value = useMemo(() => ({
    page, step, loginEmail, loginPass, loginErr, loginMode, registerName, registerPhone,
    tech, qty, inverter, pay, addr, orderId, user, loading,
    techProducts, panelProducts, inverterProducts, bosProducts, bosPrice,
    setPage, setStep, setLoginEmail, setLoginPass, setLoginErr, setLoginMode,
    setRegisterName, setRegisterPhone,
    setTech, setInverter, setPay,
    updateQty, updateAddr, login, register, logout, placeOrder, resetApp,
    panelCost, invCost, totalWatt, totalPanels, subtotal, gstAmount, total, fmt
  }), [page, step, loginEmail, loginPass, loginErr, loginMode, registerName, registerPhone,
    tech, qty, inverter, pay, addr, orderId, user, loading,
    techProducts, panelProducts, inverterProducts, bosProducts, bosPrice,
    updateQty, updateAddr, login, register, logout, placeOrder, resetApp,
    panelCost, invCost, totalWatt, totalPanels, subtotal, gstAmount, total]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
