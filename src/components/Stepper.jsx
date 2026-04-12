import { useApp } from '../context/AppContext';

const STEPS = [
  ['1', 'Technology'],
  ['2', 'Panels'],
  ['3', 'Inverter'],
  ['4', 'BOS Kit'],
  ['5', 'Checkout']
];

export default function Stepper() {
  const { step } = useApp();

  return (
    <div className="stepper-bar">
      <div className="stepper-inner">
        {STEPS.map(([num, label], i) => (
          <span key={num} style={{ display: 'contents' }}>
            <div className="step-it">
              <div className={`sc ${step > +num ? 'done' : step === +num ? 'act' : ''}`}>
                {step > +num ? '✓' : num}
              </div>
              <div className={`sl ${step > +num ? 'done' : step === +num ? 'act' : ''}`}>
                {label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`scon ${step > +num ? 'done' : ''}`}></div>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
