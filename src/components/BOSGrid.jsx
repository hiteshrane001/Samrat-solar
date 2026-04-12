import { BOS } from '../data/constants';
import { fmt } from '../data/constants';
import { PRICES } from '../data/constants';

export default function BOSGrid() {
  return (
    <div className="card-panel">
      <div className="cp-title">
        📦 Balance of System — Complete Kit
        <span style={{
          marginLeft: 'auto', background: 'var(--red-l)', color: 'var(--red)',
          border: '1px solid #F5B7B1', borderRadius: '6px', padding: '4px 12px',
          fontSize: '12px', fontWeight: 700
        }}>
          {fmt(PRICES.bos)} flat
        </span>
      </div>
      <div className="bos-grid">
        {BOS.map((b, i) => (
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
  );
}
