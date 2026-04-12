import { useApp } from '../../context/AppContext';
import HeroSection from '../../components/HeroSection';
import { useState } from 'react';

function InverterCard({ inv, selected, onSelect, onDeselect, fmt }) {
  const [imgError, setImgError] = useState(false);
  const status = inv.stockStatus ?? 'in_stock';
  const isOut = status === 'out_of_stock';
  const isComing = status === 'coming_soon';
  const unavail = isOut || isComing;

  return (
    <div 
      className={`prod-card ${selected ? 'sel' : ''} ${unavail ? 'unavail-card' : ''}`} 
      onClick={() => !unavail && onSelect()}
      style={{ opacity: unavail ? 0.8 : 1, cursor: unavail ? 'not-allowed' : 'pointer' }}
    >
      {unavail && (
        <div className="ss-stock-overlay">
          <span className={`ss-stock-badge ${isOut ? 'sold-out' : 'coming-soon'}`}>
            {isOut ? '🚫 Sold Out' : '🕐 Coming Soon'}
          </span>
        </div>
      )}

      <div className={`prod-tag ${inv.badge === 'Recommended' ? 'gold' : 'red'}`}>{inv.badge}</div>
      {selected && <div className="prod-check">✓</div>}
      <div className="prod-img-wrap" style={{ height: '220px', position: 'relative' }}>
        {!imgError ? (
          <img className="prod-img" src={inv.img} alt={inv.name}
            style={{ objectFit: 'contain', padding: '20px', background: '#F8F9FA' }}
            onError={() => setImgError(true)} />
        ) : (
          <div className="prod-img-fallback">⚡</div>
        )}
      </div>
      <div className="prod-body">
        <div className="prod-brand">{inv.brand}</div>
        <div className="prod-name">{inv.name}</div>

        {status === 'low_stock' && (
          <div className="ss-low-stock-warn">⚠️ Limited Stock!</div>
        )}

        <div className="prod-rating">
          <span className="stars">★★★★★</span>
          <span className="rev-count">({inv.kw * 18 + 14} reviews)</span>
        </div>
        <div className="prod-specs">
          {inv.specs.slice(0, 4).map(([l, v], i) => (
            <span className="spec-chip" key={i}>{l}: {v}</span>
          ))}
        </div>
        <div className="prod-price-row">
          <span className="prod-price">{fmt(inv.price)}</span>
          <span className="prod-mrp">{fmt(inv.mrp)}</span>
        </div>
        <div className="prod-savings">Save {fmt(inv.mrp - inv.price)}</div>
        <div className="prod-per" style={{ marginBottom: '12px' }}>{inv.desc}</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          {inv.specs.map(([l, v], i) => (
            <div key={i} style={{
              background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
              borderRadius: '6px', padding: '7px 10px'
            }}>
              <div style={{ fontSize: '10px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.3px' }}>{l}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-800)' }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="prod-actions">
          <button 
            className="btn-add" 
            disabled={unavail}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!unavail) selected ? onDeselect() : onSelect();
            }}
          >
            {unavail ? (isOut ? 'Sold Out' : 'Coming Soon') : (selected ? '✓ Selected' : 'Select Inverter')}
          </button>
          {selected && !unavail && (
            <button 
              className="btn-wish" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onDeselect();
              }}
              style={{ background: 'var(--red-l)', color: 'var(--red)', border: '1px solid var(--red)' }}
              title="Remove selection"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Step3Inverter() {
  const { inverter, setInverter, setStep, fmt, inverterProducts } = useApp();

  return (
    <>
      <HeroSection
        tag="Step 3 of 5 — Choose Inverter"
        title="Solar"
        titleHighlight="Inverters"
        subtitle="On-grid string inverters with MPPT technology, Wi-Fi monitoring and 5-year warranty."
        stats={[
          { value: '98.6%', label: 'Peak Efficiency' },
          { value: '5yr', label: 'Warranty' },
          { value: 'IP65', label: 'Rated' }
        ]}
        badges={[
          { icon: '📡', text: 'Wi-Fi + GPRS Monitoring' },
          { icon: '🔋', text: 'Battery-Ready Options' }
        ]}
        style={{ marginBottom: '24px' }}
      />

      <div className="sec-head">
        <div><div className="sec-title"><div className="sec-line"></div>On-Grid Solar Inverters</div></div>
      </div>

      <div className="prod-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))' }}>
        {inverterProducts.map(inv => (
          <InverterCard
            key={inv.kw}
            inv={inv}
            selected={inverter === inv.kw}
            onSelect={() => setInverter(inv.kw)}
            onDeselect={() => setInverter(null)}
            fmt={fmt}
          />
        ))}
      </div>

      <div className="nav-acts">
        <button className="btn-back" onClick={() => setStep(2)}>← Back</button>
        <button className="btn-next" disabled={!inverter} onClick={() => setStep(4)}>
          View Components →
        </button>
      </div>
    </>
  );
}
