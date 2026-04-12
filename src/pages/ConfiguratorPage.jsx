import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import Stepper from '../components/Stepper';
import Step1Technology from './steps/Step1Technology';
import Step2Panels from './steps/Step2Panels';
import Step3Inverter from './steps/Step3Inverter';
import Step4BOS from './steps/Step4BOS';
import Step5Checkout from './steps/Step5Checkout';

function StepContent() {
  const { step } = useApp();
  switch (step) {
    case 1: return <Step1Technology />;
    case 2: return <Step2Panels />;
    case 3: return <Step3Inverter />;
    case 4: return <Step4BOS />;
    case 5: return <Step5Checkout />;
    default: return null;
  }
}

export default function ConfiguratorPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Breadcrumb />
      <div className="page-wrap">
        <Stepper />
        <StepContent />
      </div>
    </>
  );
}
