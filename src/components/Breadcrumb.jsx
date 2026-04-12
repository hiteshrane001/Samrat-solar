import { useApp } from '../context/AppContext';

const STEP_LABELS = ['Technology', 'Panel Selection', 'Inverter', 'Components', 'Checkout'];

export default function Breadcrumb() {
  const { step } = useApp();

  return (
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        <a href="#">Home</a>
        <span className="bc-sep">›</span>
        <a href="#">Solar Modules</a>
        <span className="bc-sep">›</span>
        <span className="bc-cur">{STEP_LABELS[step - 1]}</span>
      </div>
    </div>
  );
}
