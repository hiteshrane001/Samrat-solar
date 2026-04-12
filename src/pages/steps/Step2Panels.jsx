import { useApp } from '../../context/AppContext';
import { useState } from 'react';

function PanelCard({ panel, qty, techShort, onIncrement, onDecrement, onDelete, fmt }) {
  const [imgError, setImgError] = useState(false);
  const status = panel.stockStatus ?? 'in_stock';
  const isOut = status === 'out_of_stock';
  const isComing = status === 'coming_soon';
  const unavail = isOut || isComing;

  return (
    <div className={`prod-card ${qty > 0 ? 'sel' : ''} ${unavail ? 'unavail-card' : ''}`} 
         style={{ opacity: unavail ? 0.8 : 1, pointerEvents: unavail ? 'none' : 'auto' }}>
      
      {unavail && (
        <div className="ss-stock-overlay">
          <span className={`ss-stock-badge ${isOut ? 'sold-out' : 'coming-soon'}`}>
            {isOut ? '🚫 Sold Out' : '🕐 Coming Soon'}
          </span>
        </div>
      )}

      <div className="prod-tag">{panel.wp} Wp</div>
      {qty > 0 && <div className="prod-check">{qty}</div>}
      <div className="prod-img-wrap">
        {!imgError ? (
          <img className="prod-img" src={panel.img} alt={panel.name}
            onError={() => setImgError(true)} />
        ) : (
          <div className="prod-img-fallback">🔲</div>
        )}
      </div>
      <div className="prod-body">
        <div className="prod-brand">Samrat Solar — {techShort}</div>
        <div className="prod-name">{panel.name}</div>
        
        {status === 'low_stock' && (
          <div className="ss-low-stock-warn">⚠️ Low Stock!</div>
        )}

        <div className="prod-rating">
          <span className="stars">★★★★★</span>
          <span className="rev-count">({67 + panel.wp % 20} reviews)</span>
        </div>
        <div className="prod-specs">
          <span className="spec-chip">{panel.cells}</span>
          <span className="spec-chip">Voc: {panel.voc}</span>
          <span className="spec-chip">Isc: {panel.isc}</span>
          <span className="spec-chip">Model: {panel.model}</span>
        </div>
        <div className="prod-price-row">
          <span className="prod-price">{fmt(panel.price)}</span>
          <span className="prod-mrp">{fmt(panel.mrp)}</span>
        </div>
        <div className="prod-savings">
          Save {fmt(panel.mrp - panel.price)} ({Math.round((panel.mrp - panel.price) / panel.mrp * 100)}% off)
        </div>
      </div>
      <div className="qty-strip">
        <div className="qty-ctrl">
          <button className="qb" disabled={unavail} onClick={(e) => { e.stopPropagation(); onDecrement(); }}>−</button>
          <span className="qv">{qty}</span>
          <button className="qb" disabled={unavail} onClick={(e) => { e.stopPropagation(); onIncrement(); }}>+</button>
          {qty > 0 && (
            <button 
              className="qb" 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              style={{ background: 'var(--red-l)', color: 'var(--red)', marginLeft: '4px' }}
              title="Remove this panel"
            >
              🗑️
            </button>
          )}
        </div>
        <div className="qty-watt">
          {panel.wp * qty} W total<br />{fmt(panel.price * qty)}
        </div>
      </div>
    </div>
  );
}

export default function Step2Panels() {
  const { tech, qty, setStep, updateQty, totalWatt, totalPanels, panelCost, fmt, techProducts, panelProducts } = useApp();
  const tc = techProducts.find(t => t.id === tech);
  const watt = totalWatt();
  const panels = totalPanels();
  const cost = panelCost();

  return (
    <>
      <div className="watt-counter">
        <div className="wc-left">
          <div className="wc-icon">⚡</div>
          <div>
            <div className="wc-label">System Size</div>
            <div className="wc-val">{(watt / 1000).toFixed(2)}<span> kW</span></div>
          </div>
        </div>
        <div className="wc-right">
          <div className="wc-stat"><div className="wc-stat-v">{panels}</div><div className="wc-stat-l">Total Panels</div></div>
          <div className="wc-stat"><div className="wc-stat-v">{watt} W</div><div className="wc-stat-l">Total Wattage</div></div>
          <div className="wc-stat"><div className="wc-stat-v">{fmt(cost)}</div><div className="wc-stat-l">Panel Cost</div></div>
        </div>
      </div>

      <div className="sec-head">
        <div>
          <div className="sec-title"><div className="sec-line"></div>Select Panel Wattage &amp; Quantity</div>
          <div className="sec-sub">Technology: <strong>{tc?.name || ''}</strong> — Use + / − to set quantity for each wattage variant</div>
        </div>
      </div>

      <div className="prod-grid">
        {panelProducts.map(p => (
          <PanelCard
            key={p.wp}
            panel={p}
            qty={qty[p.wp] || 0}
            techShort={tc?.short || ''}
            onIncrement={() => updateQty(p.wp, 'i')}
            onDecrement={() => updateQty(p.wp, 'd')}
            onDelete={() => {
              const currentQty = qty[p.wp] || 0;
              for (let i = 0; i < currentQty; i++) {
                updateQty(p.wp, 'd');
              }
            }}
            fmt={fmt}
          />
        ))}
      </div>

      <div className="nav-acts">
        <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
        <button className="btn-next" disabled={panels === 0} onClick={() => setStep(3)}>
          Select Inverter →
        </button>
      </div>
    </>
  );
}
