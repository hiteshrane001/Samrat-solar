import { useApp } from '../../context/AppContext';
import HeroSection from '../../components/HeroSection';
import { BOS as FALLBACK_BOS } from '../../data/constants';
import { fmt } from '../../data/constants';

export default function Step4BOS() {
  const { setStep, bosProducts, bosPrice } = useApp();
  const items = bosProducts.length > 0 ? bosProducts : FALLBACK_BOS;

  return (
    <>
      <HeroSection
        tag="Step 4 of 5 — Balance of System"
        title="Complete"
        titleHighlight="BOS Kit"
        subtitle="Every component needed for a safe, compliant, and fully functional rooftop solar installation — included at a flat price."
        badges={[
          { icon: '📦', text: '15 Components Auto-Included' },
          { icon: '🛡️', text: 'IS 3043 Compliant Earthing' },
          { icon: '✅', text: 'Pre-cut & Certified Cables' }
        ]}
        style={{ marginBottom: '24px' }}
      />

      <div className="card-panel">
        <div className="cp-title">
          📦 Balance of System — Complete Kit
          <span style={{
            marginLeft: 'auto', background: 'var(--red-l)', color: 'var(--red)',
            border: '1px solid #F5B7B1', borderRadius: '6px', padding: '4px 12px',
            fontSize: '12px', fontWeight: 700
          }}>
            {fmt(bosPrice)} flat
          </span>
        </div>
        <div className="bos-grid">
          {items.map((b, i) => (
            <div className="bos-item" key={i}>
              <div className="bos-img-icon">{b.icon}</div>
              <div className="bos-name">
                {b.name}<br />
                <span style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{b.sub}</span>
              </div>
              <div className="bos-incl">✓ Included</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '16px', background: '#EBF5FB', border: '1px solid #AED6F1',
          borderRadius: 'var(--r8)', padding: '12px 16px', fontSize: '12px',
          color: '#1A5276', lineHeight: '1.7'
        }}>
          <strong>📋 Quality Assurance:</strong> All DC cables rated 1500V / IP68. MC4 connectors are TÜV certified. Earthing system complies with IS 3043:2018. All structural hardware is SS304 galvanized and UV-resistant.
        </div>
      </div>

      <div className="nav-acts">
        <button className="btn-back" onClick={() => setStep(3)}>← Back</button>
        <button className="btn-next" onClick={() => setStep(5)}>
          Proceed to Checkout →
        </button>
      </div>
    </>
  );
}
