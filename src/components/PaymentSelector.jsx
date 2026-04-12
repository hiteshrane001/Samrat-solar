import { useApp } from '../context/AppContext';

export default function PaymentSelector() {
  const { pay, setPay } = useApp();

  return (
    <>
      <div className="cp-title" style={{ border: 'none', padding: 0, marginBottom: '12px', fontSize: '13px' }}>
        💳 Payment Method
      </div>
      <div className="pay-opts">
        <div className={`pay-opt ${pay === 'cod' ? 'sel' : ''}`} onClick={() => setPay('cod')}>
          <div className="po-icon">🚚</div>
          <div className="po-name">Pay on Delivery (COD)</div>
          <div className="po-desc">Cash / Cheque at Installation</div>
        </div>
        <div className={`pay-opt ${pay === 'online' ? 'sel' : ''}`} onClick={() => setPay('online')}>
          <div className="po-icon">🔒</div>
          <div className="po-name">Online Payment</div>
          <div className="po-desc">UPI / Cards / Wallets</div>
        </div>
      </div>
      {pay === 'online' ? (
        <div style={{
          background: '#E8F5E9', border: '1px solid #4CAF50', borderRadius: 'var(--r8)', padding: '10px 12px',
          fontSize: '11px', color: '#2E7D32', marginBottom: '12px', lineHeight: '1.7'
        }}>
          🔒 <strong>Secure Payment via Razorpay</strong><br/>
          Accepts UPI, Debit/Credit Cards, NEFT, NetBanking & Digital Wallets. Money is transferred directly to seller account on successful payment.
        </div>
      ) : (
        <div style={{
          background: '#FFF3E0', border: '1px solid #FF9800', borderRadius: 'var(--r8)', padding: '10px 12px',
          fontSize: '11px', color: '#E65100', marginBottom: '12px', lineHeight: '1.7'
        }}>
          💼 <strong>Pay at Installation</strong><br/>
          Samrat Solar's installation engineer will contact you within 48 hours. Full payment due on survey/installation day.
        </div>
      )}
    </>
  );
}
