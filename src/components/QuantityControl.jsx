export default function QuantityControl({ wp, qty, totalWatt, totalCost, onIncrement, onDecrement }) {
  return (
    <div className="qty-strip">
      <div className="qty-ctrl">
        <button className="qb" onClick={(e) => { e.stopPropagation(); onDecrement(); }}>−</button>
        <span className="qv">{qty}</span>
        <button className="qb" onClick={(e) => { e.stopPropagation(); onIncrement(); }}>+</button>
      </div>
      <div className="qty-watt">
        {totalWatt} W total<br />{totalCost}
      </div>
    </div>
  );
}
