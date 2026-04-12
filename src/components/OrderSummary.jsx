import { useApp } from '../context/AppContext';

export default function OrderSummary() {
  const { qty, inverter, invCost, gstAmount, total, fmt, panelProducts, bosPrice } = useApp();

  return (
    <>
      <div className="card-panel">
        <div className="cp-title">📋 Order Summary</div>
        {panelProducts.filter(p => (qty[p.wp] || 0) > 0).map(p => (
          <div className="sum-row" key={p.wp}>
            <span className="sr-label">{p.name} × {qty[p.wp]}</span>
            <span className="sr-val">{fmt(p.price * qty[p.wp])}</span>
          </div>
        ))}
        <div className="sum-row">
          <span className="sr-label">Inverter {inverter}kW</span>
          <span className="sr-val">{fmt(invCost())}</span>
        </div>
        <div className="sum-row">
          <span className="sr-label">BOS Complete Kit</span>
          <span className="sr-val">{fmt(bosPrice)}</span>
        </div>
        <div className="sum-row">
          <span className="sr-label">GST @ 18%</span>
          <span className="sr-val">{fmt(gstAmount())}</span>
        </div>
        <div className="sum-total-row">
          <span className="st-label">TOTAL AMOUNT</span>
          <span className="st-val">{fmt(total())}</span>
        </div>
        <div className="gst-note">* Inclusive of all taxes. Free installation survey included.</div>
      </div>
    </>
  );
}
