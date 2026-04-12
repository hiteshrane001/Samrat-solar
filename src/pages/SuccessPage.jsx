import { useApp } from '../context/AppContext';

export default function SuccessPage() {
  const { orderId, totalPanels, totalWatt, total, fmt, resetApp } = useApp();
  const watt = totalWatt();

  return (
    <>
      <div className="topbar"><span>Samrat Solar</span></div>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="nav-sun">☀️</div>
            <div className="nav-brand-text">
              <strong>Samrat Solar</strong>
              <span>Premium Solar Solutions</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="page-wrap">
        <div className="success-wrap">
          <div className="suc-icon">✅</div>
          <div className="suc-title">Order Confirmed!</div>
          <div className="suc-sub">
            Thank you for choosing Samrat Solar. Our installation team will call you within 48 hours to schedule your free site survey and installation date.
          </div>
          <div className="suc-order">ORDER ID: {orderId}</div>
          <div className="suc-stats">
            <div className="suc-stat">
              <div className="suc-stat-v">{totalPanels()}</div>
              <div className="suc-stat-l">Panels</div>
            </div>
            <div className="suc-stat">
              <div className="suc-stat-v">{(watt / 1000).toFixed(2)}kW</div>
              <div className="suc-stat-l">System Size</div>
            </div>
            <div className="suc-stat">
              <div className="suc-stat-v">{fmt(total())}</div>
              <div className="suc-stat-l">Amount</div>
            </div>
            <div className="suc-stat">
              <div className="suc-stat-v">₹{Math.round(watt * 0.0042 * 365).toLocaleString('en-IN')}</div>
              <div className="suc-stat-l">Est. Annual Savings</div>
            </div>
          </div>
          <button className="login-btn" style={{ maxWidth: '260px', margin: '0 auto', display: 'block' }}
            onClick={resetApp}>
            Configure Another System →
          </button>
        </div>
      </div>
    </>
  );
}
