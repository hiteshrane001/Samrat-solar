import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function CartPage() {
  const { 
    qty, panelProducts, inverterProducts, techProducts, 
    updateQty, subtotal, gstAmount, total, fmt, setPage, tech, inverter, bosPrice, setTech, setInverter
  } = useApp();

  const [panelImgErrors, setPanelImgErrors] = useState({});
  const [invImgError, setInvImgError] = useState(false);

  const cartItems = panelProducts.filter(p => (qty[p.wp] || 0) > 0);
  const totalItems = Object.values(qty).reduce((a, b) => a + b, 0);
  const hasItems = totalItems > 0 || tech || inverter;

  const selectedTech = techProducts.find(t => t.id === tech);
  const selectedInverter = inverterProducts.find(i => i.kw === inverter);

  const handleRemoveAll = (wp) => {
    const currentQty = qty[wp] || 0;
    for (let i = 0; i < currentQty; i++) {
      updateQty(wp, 'd');
    }
  };

  const handleRemoveInverter = () => {
    setInverter(null);
  };

  const totalKW = (panelProducts.reduce((sum, p) => sum + p.wp * (qty[p.wp] || 0), 0)) / 1000;

  return (
    <>
      <Navbar />
      <div className="page-wrap">
        <div className="cart-page">
          <div className="cart-header">
            <h1 className="cart-title">🛒 Your Solar System Cart</h1>
            <p className="cart-subtitle">
              {hasItems ? 'Review your solar system configuration' : 'Your cart is empty'}
            </p>
          </div>

          {!hasItems ? (
            <div className="cart-items-wrap">
              <div className="cart-empty">
                <div className="cart-empty-icon">📦</div>
                <div className="cart-empty-text">Your cart is empty</div>
                <div className="cart-empty-subtext">
                  Start by selecting a module technology and components
                </div>
                <button className="btn-continue" onClick={() => setPage('configurator')}>
                  Go to Configurator
                </button>
              </div>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items-wrap">
                {/* Combined Panel Items with Technology */}
                {cartItems.map((product) => (
                  <div key={product.wp} className="cart-item">
                    <div className="cart-item-img">
                      {!panelImgErrors[product.wp] ? (
                        <img 
                          src={product.img} 
                          alt={product.name}
                          onError={() => setPanelImgErrors(prev => ({ ...prev, [product.wp]: true }))}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ fontSize: '2rem' }}>☀️</div>
                      )}
                    </div>
                    <div style={{ width: '100%' }}>
                      <div className="ci-name">
                        {selectedTech ? `${selectedTech.name} - ${product.wp}W Solar Panel` : `${product.wp}W Solar Panel`}
                      </div>
                      <div className="ci-spec">
                        <span>{product.wp} Watts</span>
                        <span>•</span>
                        <span>{product.cells} cells</span>
                        <span>•</span>
                        <span>{product.voc}V</span>
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--red)', fontWeight: 600 }}>
                        Total System: {(product.wp * (qty[product.wp] || 0)) / 1000} kW ({product.wp}W × {qty[product.wp]} panels)
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ci-price">
                          <div className="ci-price-val">
                            {fmt(product.price * (qty[product.wp] || 0))}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                            {fmt(product.price)} × {qty[product.wp]} unit(s)
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="ci-qty-ctrl">
                            <button
                              className="ci-qty-btn"
                              onClick={() => updateQty(product.wp, 'd')}
                              title="Decrease quantity"
                            >
                              −
                            </button>
                            <div className="ci-qty-val">{qty[product.wp] || 0}</div>
                            <button
                              className="ci-qty-btn"
                              onClick={() => updateQty(product.wp, 'i')}
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="ci-qty-btn"
                            onClick={() => handleRemoveAll(product.wp)}
                            title="Remove from cart"
                            style={{ background: 'var(--red-l)', color: 'var(--red)' }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Inverter Selection */}
                {selectedInverter && (
                  <div className="cart-item" style={{ backgroundColor: '#fff5e6', borderLeft: '4px solid #ff6b35' }}>
                    <div className="cart-item-img">
                      {!invImgError ? (
                        <img 
                          src={selectedInverter.img} 
                          alt={selectedInverter.name}
                          onError={() => setInvImgError(true)}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px', background: '#f8f9fa' }}
                        />
                      ) : (
                        <div style={{ fontSize: '2rem' }}>⚡</div>
                      )}
                    </div>
                    <div style={{ width: '100%' }}>
                      <div className="ci-name">{selectedInverter.name}</div>
                      <div className="ci-spec">
                        <span>{selectedInverter.brand}</span>
                        <span>•</span>
                        <span>{selectedInverter.model}</span>
                        <span>•</span>
                        <span>{selectedInverter.kw}kW</span>
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ci-price">
                          <div className="ci-price-val">{fmt(selectedInverter.price)}</div>
                        </div>
                        <button
                          className="ci-qty-btn"
                          onClick={handleRemoveInverter}
                          title="Remove inverter"
                          style={{ background: 'var(--red-l)', color: 'var(--red)' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Balance of System (BOS) */}
                {bosPrice > 0 && (
                  <div className="cart-item" style={{ backgroundColor: '#f0fff4', borderLeft: '4px solid #22c55e' }}>
                    <div className="cart-item-img" style={{ fontSize: '2rem' }}>🔧</div>
                    <div style={{ width: '100%' }}>
                      <div className="ci-name">System Kit (Balance of System)</div>
                      <div className="ci-spec">
                        <span>Cables, Connectors, Mounting, Safety Equipment</span>
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ci-price">
                          <div className="ci-price-val">{fmt(bosPrice)}</div>
                        </div>
                        <button
                          className="ci-qty-btn"
                          onClick={() => {}}
                          title="System kit is included"
                          disabled
                          style={{ background: 'var(--gray-200)', color: 'var(--gray-500)', cursor: 'not-allowed' }}
                        >
                          ✓
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="cart-summary">
                <div className="cs-title">📊 Order Summary</div>

                {selectedTech && (
                  <div className="cs-row">
                    <span>Technology ({selectedTech.name})</span>
                    <span className="cs-row-val">{fmt(selectedTech.price)}</span>
                  </div>
                )}

                {totalItems > 0 && (
                  <div className="cs-row">
                    <span>Solar Panels ({totalItems} × {panelProducts.find(p => (qty[p.wp] || 0) > 0)?.wp || 0}W = {totalKW.toFixed(2)}kW)</span>
                    <span className="cs-row-val">{fmt(panelProducts.reduce((sum, p) => sum + p.price * (qty[p.wp] || 0), 0))}</span>
                  </div>
                )}

                {selectedInverter && (
                  <div className="cs-row">
                    <span>Inverter ({selectedInverter.kw}kW)</span>
                    <span className="cs-row-val">{fmt(selectedInverter.price)}</span>
                  </div>
                )}

                {bosPrice > 0 && (
                  <div className="cs-row">
                    <span>System Kit (Included)</span>
                    <span className="cs-row-val">{fmt(bosPrice)}</span>
                  </div>
                )}

                <div className="cs-row">
                  <span>Subtotal</span>
                  <span className="cs-row-val">{fmt(subtotal())}</span>
                </div>

                <div className="cs-row">
                  <span>GST (18%)</span>
                  <span className="cs-row-val">{fmt(gstAmount())}</span>
                </div>

                <div className="cs-divider"></div>

                <div className="cs-total">
                  <span>Total Amount</span>
                  <span className="cs-total-val">{fmt(total())}</span>
                </div>

                <button
                  className="cs-checkout"
                  onClick={() => setPage('configurator')}
                >
                  Continue Configuration
                </button>

                <div className="cs-note">
                  ✓ Free shipping on orders above ₹50,000
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
