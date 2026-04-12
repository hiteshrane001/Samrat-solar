import { useApp } from '../context/AppContext';
import { STATES_LIST } from '../data/constants';

export default function AddressForm() {
  const { addr, updateAddr } = useApp();

  return (
    <div className="card-panel">
      <div className="cp-title">🏠 Delivery &amp; Installation Address</div>
      <div className="form-row2">
        <div className="fg">
          <label className="fl">Full Name *</label>
          <input className="fi" placeholder="Rajesh Kumar" value={addr.name}
            onChange={(e) => updateAddr('name', e.target.value)} />
        </div>
        <div className="fg">
          <label className="fl">Mobile *</label>
          <input className="fi" placeholder="98XXXXXXXX" value={addr.phone}
            onChange={(e) => updateAddr('phone', e.target.value)} />
        </div>
      </div>
      <div className="form-row2 full">
        <div className="fg">
          <label className="fl">Installation Address *</label>
          <input className="fi" placeholder="House No., Street, Area" value={addr.address}
            onChange={(e) => updateAddr('address', e.target.value)} />
        </div>
      </div>
      <div className="form-row2">
        <div className="fg">
          <label className="fl">City *</label>
          <input className="fi" placeholder="Mumbai" value={addr.city}
            onChange={(e) => updateAddr('city', e.target.value)} />
        </div>
        <div className="fg">
          <label className="fl">State *</label>
          <select className="fi" value={addr.state}
            onChange={(e) => updateAddr('state', e.target.value)}>
            <option value="">Select State</option>
            {STATES_LIST.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row2">
        <div className="fg">
          <label className="fl">Pincode *</label>
          <input className="fi" placeholder="400001" value={addr.pin}
            onChange={(e) => updateAddr('pin', e.target.value)} />
        </div>
        <div className="fg">
          <label className="fl">Landmark (Optional)</label>
          <input className="fi" placeholder="Near Metro Station" value={addr.landmark}
            onChange={(e) => updateAddr('landmark', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
