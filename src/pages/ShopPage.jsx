import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';

export default function ShopPage() {
  const { panelProducts, qty, updateQty, fmt, setPage } = useApp();

  const stockLabel = (status) => {
    if (status === 'out_of_stock') return 'Sold Out';
    if (status === 'coming_soon')  return 'Coming Soon';
    return null;
  };

  const isUnavailable = (status) =>
    status === 'out_of_stock' || status === 'coming_soon';

  return (
    <>
      <Navbar />
      <div className="page-wrap">
        <div className="shop-page">
          <div className="shop-header">
            <h1 className="shop-title">☀️ Solar Modules</h1>
            <p className="shop-subtitle">Browse our premium solar panel collection</p>
          </div>

          <div className="prod-grid">
            {panelProducts.map((product) => {
              const status    = product.stockStatus ?? 'in_stock';
              const unavail   = isUnavailable(status);
              const label     = stockLabel(status);
              const isLow     = status === 'low_stock';
              const isSelected = !unavail && (qty[product.wp] || 0) > 0;

              return (
                <div
                  key={product.wp}
                  className={`prod-card ${isSelected ? 'sel' : ''} ${unavail ? 'unavailable' : ''}`}
                  onClick={() => !isSelected && !unavail && updateQty(product.wp, 'i')}
                  style={{ cursor: unavail ? 'default' : 'pointer', opacity: unavail ? 0.88 : 1 }}
                >
                  {/* Stock overlay for Sold Out / Coming Soon */}
                  {label && (
                    <div className="ss-stock-overlay">
                      <span className={`ss-stock-badge ${status === 'out_of_stock' ? 'sold-out' : 'coming-soon'}`}>
                        {label === 'Sold Out' ? '🚫 Sold Out' : '🕐 Coming Soon'}
                      </span>
                    </div>
                  )}

                  <div className="prod-tag">Premium</div>
                  {isSelected && <div className="prod-check">✓</div>}

                  <div className="prod-img-wrap">
                    {product.img ? (
                      <img className="prod-img" src={product.img} alt={product.name} />
                    ) : (
                      <div className="prod-img-fallback">☀️</div>
                    )}
                  </div>

                  <div className="prod-body">
                    <div className="prod-brand">{product.cells} Cell</div>
                    <div className="prod-name">{product.name}</div>

                    {/* Low stock warning */}
                    {isLow && (
                      <div className="ss-low-stock-warn">⚠️ Only a few left!</div>
                    )}

                    <div className="prod-specs">
                      <span className="spec-chip">{product.wp}W</span>
                      {product.voc && <span className="spec-chip">{product.voc}V</span>}
                      {product.isc && <span className="spec-chip">{product.isc}A</span>}
                    </div>

                    <div className="prod-price-row">
                      <div className="prod-price">{fmt(product.price)}</div>
                      {product.mrp > product.price && (
                        <div className="prod-mrp">{fmt(product.mrp)}</div>
                      )}
                    </div>

                    <div className="prod-actions">
                      <button
                        className="btn-add"
                        disabled={unavail}
                        style={unavail ? { opacity: 0.5, cursor: 'not-allowed', background: '#9AA0A6' } : {}}
                      >
                        {isSelected
                          ? '✓ Added to Cart'
                          : unavail
                            ? (status === 'coming_soon' ? '🕐 Coming Soon' : '🚫 Unavailable')
                            : 'Add to Cart'}
                      </button>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="qty-strip">
                      <div className="qty-ctrl">
                        <button className="qb" onClick={(e) => {
                          e.stopPropagation();
                          updateQty(product.wp, 'd');
                        }}>−</button>
                        <div className="qv">{qty[product.wp] || 0}</div>
                        <button className="qb" onClick={(e) => {
                          e.stopPropagation();
                          updateQty(product.wp, 'i');
                        }}>+</button>
                      </div>
                      <div className="qty-watt" style={{ textAlign: 'right' }}>
                        {(product.wp * (qty[product.wp] || 0)) / 1000} kW
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px' }}>
            <button
              className="btn-next"
              onClick={() => setPage('configurator')}
              style={{ marginRight: '10px' }}
            >
              Go to Configurator →
            </button>
            <button
              className="btn-next"
              onClick={() => {
                const totalPanels = Object.values(qty).reduce((a, b) => a + b, 0);
                if (totalPanels > 0) setPage('cart');
              }}
              style={{ background: 'var(--gold)', color: 'var(--dark)' }}
            >
              View Cart ({Object.values(qty).reduce((a, b) => a + b, 0)})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
