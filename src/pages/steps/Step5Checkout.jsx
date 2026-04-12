import { useApp } from '../../context/AppContext';
import { useState } from 'react';
import OrderSummary from '../../components/OrderSummary';
import AddressForm from '../../components/AddressForm';
import PaymentSelector from '../../components/PaymentSelector';
import TrustBadges from '../../components/TrustBadges';

export default function Step5Checkout() {
  const { addr, pay, setStep, totalPanels, totalWatt, inverter, tech, placeOrder, total, fmt, techProducts } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const ok = addr.name && addr.phone && addr.address && addr.city && addr.state && addr.pin;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await placeOrder();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="checkout-grid">
        <div>
          <OrderSummary />
          <AddressForm />
        </div>
        <div>
          <div className="card-panel">
            <div className="cp-title">💡 System Summary</div>
            <div className="sum-row">
              <span className="sr-label">Module Technology</span>
              <span className="sr-val">{techProducts.find(t => t.id === tech)?.short || '—'}</span>
            </div>
            <div className="sum-row">
              <span className="sr-label">Total Panels</span>
              <span className="sr-val">{totalPanels()} panels</span>
            </div>
            <div className="sum-row">
              <span className="sr-label">System Wattage</span>
              <span className="sr-val">{(totalWatt() / 1000).toFixed(2)} kW</span>
            </div>
            <div className="sum-row">
              <span className="sr-label">Inverter Capacity</span>
              <span className="sr-val">{inverter || '—'} kW</span>
            </div>
            <div className="sum-row">
              <span className="sr-label">BOS Kit</span>
              <span className="sr-val" style={{ color: 'var(--green)' }}>✓ Included</span>
            </div>
            <div className="divider"></div>

            <PaymentSelector />

            <button className="order-btn" disabled={!ok || isProcessing} onClick={handlePlaceOrder}>
              {isProcessing ? (
                <>⏳ Processing...</>
              ) : pay === 'online' ? (
                '🔒 Proceed to Payment'
              ) : (
                `📋 Place Order — ${fmt(total())}`
              )}
            </button>
            {!ok && (
              <p style={{ fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '8px' }}>
                Please fill all required (*) fields to proceed
              </p>
            )}
            <TrustBadges />
          </div>
        </div>
      </div>
      <div className="nav-acts">
        <button className="btn-back" onClick={() => setStep(4)} disabled={isProcessing}>← Back</button>
        <div></div>
      </div>
    </>
  );
}
