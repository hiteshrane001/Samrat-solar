import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// SVG Icon Components for Benefits Section
const IconReducedCarbon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <path d="M24 8C17.4 8 12 13.4 12 20c0 4.8 2.8 9 7 10.8V34a2 2 0 002 2h6a2 2 0 002-2v-3.2c4.2-1.8 7-6 7-10.8 0-6.6-5.4-12-12-12z" fill="#10542A" opacity="0.2"/>
    <path d="M20 38h8M21 41h6" stroke="#10542A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 20l4 4 8-8" stroke="#10542A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconReducedBill = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <path d="M14 12h20v28l-4-3-3 3-3-3-3 3-3-3-4 3V12z" fill="#10542A" opacity="0.15"/>
    <path d="M19 20h10M19 25h10M19 30h6" stroke="#10542A" strokeWidth="2" strokeLinecap="round"/>
    <text x="24" y="18" textAnchor="middle" fill="#10542A" fontSize="10" fontWeight="bold">₹</text>
  </svg>
);

const IconLowMaintenance = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <path d="M30 14l4 4-16 16-6 2 2-6L30 14z" fill="#10542A" opacity="0.2"/>
    <path d="M30 14l4 4M14 34l2-6 16-16" stroke="#10542A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28l-2 6 6-2" stroke="#10542A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconEasyInstallation = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <rect x="12" y="20" width="24" height="16" rx="2" fill="#10542A" opacity="0.15"/>
    <path d="M12 14l12-6 12 6" stroke="#10542A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 14v6M32 14v6" stroke="#10542A" strokeWidth="1.5"/>
    <path d="M20 28h8M24 24v8" stroke="#10542A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconEasyFinancing = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <rect x="10" y="16" width="28" height="18" rx="3" fill="#10542A" opacity="0.15"/>
    <path d="M10 22h28" stroke="#10542A" strokeWidth="2"/>
    <rect x="14" y="26" width="8" height="4" rx="1" stroke="#10542A" strokeWidth="1.5"/>
    <circle cx="33" cy="28" r="3" stroke="#10542A" strokeWidth="1.5"/>
  </svg>
);

const IconCleanEnergy = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <circle cx="24" cy="20" r="8" fill="#F5B111" opacity="0.3"/>
    <circle cx="24" cy="20" r="5" fill="#F5B111" opacity="0.6"/>
    <line x1="24" y1="8" x2="24" y2="11" stroke="#F5B111" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="29" x2="24" y2="32" stroke="#F5B111" strokeWidth="2" strokeLinecap="round"/>
    <line x1="15" y1="20" x2="12" y2="20" stroke="#F5B111" strokeWidth="2" strokeLinecap="round"/>
    <line x1="36" y1="20" x2="33" y2="20" stroke="#F5B111" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 36h16M20 40h8" stroke="#10542A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconSmartMonitoring = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <rect x="14" y="10" width="20" height="28" rx="3" fill="#10542A" opacity="0.15"/>
    <rect x="17" y="14" width="14" height="16" rx="1" fill="white"/>
    <path d="M19 22l3 3 5-6" stroke="#10542A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="35" r="2" fill="#10542A" opacity="0.4"/>
  </svg>
);

const IconHighEfficiency = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="benefit-svg">
    <circle cx="24" cy="24" r="22" stroke="#10542A" strokeWidth="2" fill="#E8F5E9"/>
    <path d="M28 8l-6 16h8l-6 16" stroke="#F5B111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 8l-6 16h8l-6 16" fill="#F5B111" opacity="0.2"/>
  </svg>
);

// Knowledge Section Icons
const IconRooftop = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#E8F5E9"/>
    <path d="M10 28l18-14 18 14" stroke="#10542A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="16" y="28" width="24" height="16" fill="#10542A" opacity="0.15" rx="2"/>
    <rect x="22" y="18" width="12" height="6" fill="#F5B111" opacity="0.5" rx="1"/>
    <rect x="20" y="34" width="6" height="10" fill="#10542A" opacity="0.3" rx="1"/>
    <rect x="30" y="34" width="6" height="6" fill="#10542A" opacity="0.2" rx="1"/>
  </svg>
);

const IconSunlight = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#FFF8E1"/>
    <circle cx="28" cy="28" r="10" fill="#F5B111" opacity="0.4"/>
    <circle cx="28" cy="28" r="6" fill="#F5B111" opacity="0.7"/>
    <line x1="28" y1="10" x2="28" y2="16" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="28" y1="40" x2="28" y2="46" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="10" y1="28" x2="16" y2="28" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="40" y1="28" x2="46" y2="28" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="15.3" y1="15.3" x2="19.5" y2="19.5" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="36.5" y1="36.5" x2="40.7" y2="40.7" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="40.7" y1="15.3" x2="36.5" y2="19.5" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="19.5" y1="36.5" x2="15.3" y2="40.7" stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const IconLoadAssessment = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#E3F2FD"/>
    <rect x="12" y="14" width="32" height="28" rx="3" fill="#10542A" opacity="0.15"/>
    <path d="M18 36V26M24 36V22M30 36V28M36 36V20" stroke="#10542A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M14 18h28" stroke="#10542A" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

const IconStructural = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#FBE9E7"/>
    <path d="M10 40h36" stroke="#10542A" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 40V24l12-10 12 10v16" stroke="#10542A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 40V32h8v8" stroke="#10542A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="18" width="12" height="5" fill="#F5B111" opacity="0.4" rx="1"/>
  </svg>
);

const IconGridConnection = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#E8F5E9"/>
    <circle cx="20" cy="20" r="6" fill="#10542A" opacity="0.2" stroke="#10542A" strokeWidth="2"/>
    <circle cx="36" cy="20" r="6" fill="#F5B111" opacity="0.3" stroke="#10542A" strokeWidth="2"/>
    <circle cx="28" cy="36" r="6" fill="#10542A" opacity="0.2" stroke="#10542A" strokeWidth="2"/>
    <line x1="25" y1="22" x2="31" y2="18" stroke="#10542A" strokeWidth="2"/>
    <line x1="22" y1="25" x2="26" y2="31" stroke="#10542A" strokeWidth="2"/>
    <line x1="34" y1="25" x2="30" y2="31" stroke="#10542A" strokeWidth="2"/>
  </svg>
);

const IconBudget = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#FFF3E0"/>
    <circle cx="28" cy="28" r="14" fill="#F5B111" opacity="0.2" stroke="#10542A" strokeWidth="2"/>
    <text x="28" y="34" textAnchor="middle" fill="#10542A" fontSize="18" fontWeight="bold">₹</text>
  </svg>
);

const IconInverter = () => (
  <svg viewBox="0 0 56 56" fill="none" className="knowledge-svg">
    <rect width="56" height="56" rx="12" fill="#E8F5E9"/>
    <rect x="14" y="16" width="28" height="24" rx="3" fill="#10542A" opacity="0.15" stroke="#10542A" strokeWidth="2"/>
    <path d="M22 28l4 4 8-8" stroke="#10542A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="20" r="2" fill="#F5B111"/>
    <circle cx="36" cy="20" r="2" fill="#10542A" opacity="0.4"/>
  </svg>
);


// Benefit data
const benefits = [
  {
    Icon: IconReducedCarbon,
    title: 'Reduced Carbon Footprint',
    description: 'By harnessing solar energy, you significantly lower your greenhouse gas emissions, contributing to a cleaner and more sustainable environment.'
  },
  {
    Icon: IconReducedBill,
    title: 'Reduced Electricity Bill',
    description: 'Generating your own power through solar reduces reliance on the grid, leading to substantial savings on monthly electricity expenses.'
  },
  {
    Icon: IconLowMaintenance,
    title: 'Low Maintenance',
    description: "Samrat Solar's systems are built for durability and require minimal maintenance, ensuring long-term, hassle-free performance."
  },
  {
    Icon: IconEasyInstallation,
    title: 'Easy Installation',
    description: 'Installing solar with Samrat Solar is simple and well-managed. Our skilled team delivers quick and reliable setup with support throughout.'
  },
  {
    Icon: IconEasyFinancing,
    title: 'Easy Financing',
    description: "Samrat Solar's strong reputation ensures you get the advantage of easy financing solutions for your solar energy system."
  },
  {
    Icon: IconCleanEnergy,
    title: 'Clean Energy',
    description: 'As a reliable and clean energy source, solar power plays a vital role in advancing global sustainability and energy independence.'
  },
  {
    Icon: IconSmartMonitoring,
    title: 'Smart Monitoring',
    description: 'Track your energy generation and consumption in real-time through our digital interface. Stay informed about your solar performance anytime.'
  },
  {
    Icon: IconHighEfficiency,
    title: 'High Efficiency',
    description: 'Advanced module technology ensures maximum energy output even in low-light conditions, delivering more power per square foot.'
  }
];

// Knowledge data
const knowledgePoints = [
  {
    Icon: IconRooftop,
    title: 'Rooftop Space Availability',
    description: 'Ensure sufficient, shadow-free space for solar panel installation. A 1 kW system typically requires 80–100 sq. ft. of usable rooftop space.'
  },
  {
    Icon: IconSunlight,
    title: 'Sunlight Exposure',
    description: 'Your rooftop should get at least 4–6 hours of direct sunlight daily for optimal efficiency. Avoid obstructions like trees, water tanks, or high-rise shadows.'
  },
  {
    Icon: IconLoadAssessment,
    title: 'Load Assessment',
    description: 'Review your electricity bills to understand your average monthly consumption. Helps in determining the correct solar system capacity (in kW).'
  },
  {
    Icon: IconStructural,
    title: 'Structural Strength',
    description: 'Roof should be strong enough to bear the weight of solar panels and mounting structures. Flat or slightly sloped RCC rooftops are ideal.'
  },
  {
    Icon: IconGridConnection,
    title: 'Grid Connection & Net Metering',
    description: 'Check with your local DISCOM (distribution company) for grid connectivity rules. Apply for net metering to track energy usage and excess power sent to the grid.'
  },
  {
    Icon: IconBudget,
    title: 'Budget & Financing',
    description: 'Solar systems are a long-term investment. Assess costs and available subsidies. Explore government schemes, loans, or EMI options to make it affordable.'
  },
  {
    Icon: IconInverter,
    title: 'Inverter & Battery Selection (if applicable)',
    description: 'Choose the right inverter based on system size and type (on-grid, off-grid, hybrid). Batteries are required for off-grid systems or backup needs.'
  }
];

// Appliance data for table
const applianceData = [
  { name: 'Ceiling Fan', units: 4, power: 0.075, total: 0.3 },
  { name: 'LED Bulb', units: 6, power: 0.009, total: 0.05 },
  { name: 'Television (LED)', units: 2, power: 0.08, total: 0.16 },
  { name: 'Refrigerator (Single Door)', units: 1, power: 0.15, total: 0.15 },
  { name: 'Washing Machine', units: 1, power: 0.5, total: 0.5 },
  { name: 'Microwave Oven', units: 1, power: 1.2, total: 1.2 },
  { name: 'Water Pump', units: 1, power: 0.75, total: 0.75 },
  { name: 'Iron', units: 1, power: 1, total: 1 },
  { name: 'Air Conditioner (1 Ton)', units: 1, power: 1.2, total: 1.2 },
  { name: 'Geyser (Water Heater)', units: 1, power: 2, total: 2 },
];

const systemSizeData = [
  { appliances: 10, load: 3.85, recommended: 4.81 },
  { appliances: 20, load: 7.69, recommended: 9.61 },
  { appliances: 30, load: 11.54, recommended: 14.42 },
  { appliances: 40, load: 15.39, recommended: 19.24 },
  { appliances: 50, load: 19.24, recommended: 24.05 },
];


export default function HomePage() {
  const { setPage, user } = useApp();
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleGetQuote = () => {
    setPage('configurator');
  };

  // ✅ Login-protected Shop redirect
  const handleShopNow = () => {
    if (!user) {
      setPage('login');
    } else {
      setPage('shop');
    }
  };

  const handleLogin = () => {
    setPage('login');
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ======= STICKY HEADER ======= */}
      <header className="ss-header">
        <div className="ss-header-inner">
          <div className="ss-header-brand" onClick={() => setPage('home')} role="button" tabIndex={0} id="header-brand-btn">
            <div className="ss-brand-icon">
              <svg viewBox="0 0 36 36" fill="none" width="28" height="28">
                <circle cx="18" cy="18" r="8" fill="#F5B111"/>
                <g stroke="#F5B111" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="2" x2="18" y2="7"/>
                  <line x1="18" y1="29" x2="18" y2="34"/>
                  <line x1="2" y1="18" x2="7" y2="18"/>
                  <line x1="29" y1="18" x2="34" y2="18"/>
                  <line x1="6.7" y1="6.7" x2="10.2" y2="10.2"/>
                  <line x1="25.8" y1="25.8" x2="29.3" y2="29.3"/>
                  <line x1="29.3" y1="6.7" x2="25.8" y2="10.2"/>
                  <line x1="10.2" y1="25.8" x2="6.7" y2="29.3"/>
                </g>
              </svg>
            </div>
            <div className="ss-brand-text">
              <strong>Samrat Solar</strong>
              <span>One with the Sun</span>
            </div>
          </div>

          <nav className="ss-header-nav">
            <button className="ss-nav-link" onClick={() => scrollToSection('benefits-section')} id="nav-benefits-btn">
              Why Solar
            </button>
            <button className="ss-nav-link" onClick={() => scrollToSection('knowledge-section')} id="nav-knowledge-btn">
              Solar Guide
            </button>
            <button className="ss-nav-link" onClick={handleShopNow} id="nav-shop-btn">
              Shop
            </button>
            <button className="ss-nav-link" onClick={() => setPage('cart')} id="nav-cart-btn">
              🛒 Cart
            </button>
            <button className="ss-nav-cta" onClick={handleLogin} id="nav-login-btn">
              Login →
            </button>
          </nav>
        </div>
      </header>

      {/* ======= HERO BANNER (Modern Boxed Layout) ======= */}
      <section className="ss-hero-boxed" id="hero-section">
        <div className="ss-hero-container">
          {/* Text Box (approx 30-35%) */}
          <div className="ss-hero-box ss-hero-box-text">
            <h1 className="ss-hero-headline-alt">
              Power Your Home<br />
              With <span className="ss-hero-highlight-alt">Confidence</span>
            </h1>

            <p className="ss-hero-sub-alt">
              Premium solar panels · Expert installation · Smart monitoring<br />
              Backed by our 25-Year performance warranty.
            </p>

            <div className="ss-hero-actions-alt">
              <button className="ss-btn-primary" onClick={handleShopNow} id="hero-shop-btn">
                🛒 Shop Now
              </button>
              <button className="ss-btn-outline-alt" onClick={handleGetQuote} id="hero-quote-btn">
                📋 Get Free Quote
              </button>
            </div>
          </div>

          {/* Right Box (Empty / Placeholder per request) */}
          <div className="ss-hero-box ss-hero-box-image">
            <img 
              src="https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/original/image-manager/pm-surya-yojna-banner-v2-02-3-.jpg?t=1775560302"
              alt="Surya Yojana Solar Banner"
              className="ss-hero-image-fill"
            />
          </div>
        </div>
      </section>

      {/* ======= POWER SOLUTIONS CATEGORY STRIP ======= */}
      <section className="ss-categories">
        <div className="ss-categories-inner">
          <h2 className="ss-categories-title">Power Solutions for Every Lifestyle</h2>
          <div className="ss-categories-grid">
            {[
              { icon: '☀️', label: 'Solar Panels', desc: 'High-efficiency modules' },
              { icon: '⚡', label: 'Solar Inverters', desc: 'Smart power conversion' },
              { icon: '🔧', label: 'Solar Accessories', desc: 'Complete BOS kits' },
              { icon: '🏠', label: 'Rooftop Solutions', desc: 'Turnkey installations' },
              { icon: '📦', label: 'Solar Kits', desc: 'Ready-to-install bundles' },
              { icon: '💰', label: 'Save More', desc: 'Exclusive deals & offers' },
            ].map((cat, i) => (
              <button
                key={i}
                className="ss-category-card"
                onClick={handleShopNow}
                id={`category-card-${i}`}
              >
                <div className="ss-cat-icon">{cat.icon}</div>
                <div className="ss-cat-label">{cat.label}</div>
                <div className="ss-cat-desc">{cat.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ======= WHY SWITCHING TO SOLAR SECTION ======= */}
      <section className="ss-benefits" id="benefits-section" data-animate>
        <div className="ss-benefits-inner">
          <div className={`ss-section-header ${isVisible['benefits-section'] ? 'ss-animate-in' : ''}`}>
            <h2>Why Switching to Solar with Samrat Solar is a Smart Move</h2>
            <p>
              Switching to solar means getting smart with your energy — and your wallet. While bills go up, your solar gear soaks up free sunshine, saving you money nonstop. Plus, saving the planet? That's a win-win.
            </p>
          </div>

          <div className="ss-benefits-grid">
            {benefits.map((benefit, i) => (
              <div
                className={`ss-benefit-card ${isVisible['benefits-section'] ? 'ss-animate-in' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                key={i}
              >
                <div className="ss-benefit-icon">
                  <benefit.Icon />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= KNOW YOUR SOLAR ENERGY NEEDS ======= */}
      <section className="ss-knowledge" id="knowledge-section" data-animate>
        <div className="ss-knowledge-inner">
          <div className={`ss-section-header ${isVisible['knowledge-section'] ? 'ss-animate-in' : ''}`}>
            <h2>Know Your Solar Energy Needs</h2>
            <p>Understanding your energy requirements is the first step towards a successful solar installation.</p>
          </div>

          {/* Infographic Image */}
          <div className={`ss-knowledge-infographic ${isVisible['knowledge-section'] ? 'ss-animate-in' : ''}`}>
            <img
              src="/images/solar-knowledge-infographic.png"
              alt="Solar Energy System Components — Rooftop panels, inverter, battery, and grid connection illustrated"
              className="ss-infographic-img"
            />
          </div>

          {/* Appliance Power Table */}
          <div className={`ss-appliance-table-wrap ${isVisible['knowledge-section'] ? 'ss-animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="ss-table-responsive">
              <table className="ss-appliance-table">
                <thead>
                  <tr>
                    <th>Appliance</th>
                    <th>Units Required (sample)</th>
                    <th>Power Rating per Unit (kW)</th>
                    <th>Total Power Requirement (kW)</th>
                  </tr>
                </thead>
                <tbody>
                  {applianceData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'ss-row-even' : ''}>
                      <td>{row.name}</td>
                      <td>{row.units}</td>
                      <td>{row.power}</td>
                      <td>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Size Recommendation Table */}
          <div className={`ss-system-table-wrap ${isVisible['knowledge-section'] ? 'ss-animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="ss-table-responsive">
              <table className="ss-system-table">
                <thead>
                  <tr>
                    <th>Total Appliances</th>
                    <th>Estimated Load (KW)</th>
                    <th>Recommended Solar System Size (KW)</th>
                  </tr>
                </thead>
                <tbody>
                  {systemSizeData.map((row, i) => (
                    <tr key={i}>
                      <td>{row.appliances}</td>
                      <td>{row.load}</td>
                      <td>{row.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ss-knowledge-cta">
            <button className="ss-btn-outline-dark" onClick={handleGetQuote} id="knowledge-calculate-btn">
              Calculate Yours →
            </button>
          </div>

          {/* 7 Knowledge Points */}
          <div className="ss-knowledge-points">
            {knowledgePoints.map((point, i) => (
              <div
                className={`ss-knowledge-card ${isVisible['knowledge-section'] ? 'ss-animate-in' : ''}`}
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
                key={i}
              >
                <div className="ss-knowledge-icon">
                  <point.Icon />
                </div>
                <div className="ss-knowledge-text">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ss-knowledge-cta" style={{ marginTop: '40px' }}>
            <button className="ss-btn-outline-dark" onClick={handleGetQuote} id="knowledge-quote-btn">
              Get a Quote 📋
            </button>
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="ss-footer">
        <div className="ss-footer-inner">
          <div className="ss-footer-col">
            <h4>Categories</h4>
            <button className="ss-footer-link" onClick={handleShopNow}>Solar Panels</button>
            <button className="ss-footer-link" onClick={handleShopNow}>Solar Inverters</button>
            <button className="ss-footer-link" onClick={handleShopNow}>Solar Accessories</button>
            <button className="ss-footer-link" onClick={handleShopNow}>Rooftop Solutions</button>
            <button className="ss-footer-link" onClick={handleShopNow}>Solar Kits</button>
          </div>
          <div className="ss-footer-col">
            <h4>Support</h4>
            <button className="ss-footer-link" onClick={() => scrollToSection('knowledge-section')}>Solar Guide</button>
            <button className="ss-footer-link" onClick={() => alert('About Us page coming soon!')}>About Us</button>
            <button className="ss-footer-link" onClick={() => alert('FAQ page coming soon!')}>FAQ</button>
            <button className="ss-footer-link" onClick={() => alert('Shipping & Returns info coming soon!')}>Shipping & Returns</button>
            <button className="ss-footer-link" onClick={() => alert('Privacy Policy coming soon!')}>Privacy / T&C Policy</button>
          </div>
          <div className="ss-footer-col">
            <h4>Customer Service</h4>
            <button className="ss-footer-link" onClick={handleGetQuote}>Solar Calculator</button>
            <button className="ss-footer-link" onClick={() => alert('Complaint form coming soon!')}>Raise a Complaint</button>
            <button className="ss-footer-link" onClick={() => alert('Contact Us page coming soon!')}>Contact Us</button>
          </div>
          <div className="ss-footer-col">
            <h4>Address</h4>
            <p className="ss-footer-address">
              Samrat Solar Pvt. Ltd.<br />
              Dhule, Maharashtra, India<br />
              <a href="tel:1800-SOLAR-99" className="ss-footer-contact">📞 1800-SOLAR-99</a><br />
              <a href="mailto:support@samratsolar.com" className="ss-footer-contact">✉️ support@samratsolar.com</a>
            </p>
            <div className="ss-footer-social">
              <button className="ss-social-btn" onClick={() => window.open('#', '_blank')} aria-label="Facebook">f</button>
              <button className="ss-social-btn" onClick={() => window.open('#', '_blank')} aria-label="Instagram">📷</button>
              <button className="ss-social-btn" onClick={() => window.open('#', '_blank')} aria-label="YouTube">▶</button>
            </div>
          </div>
        </div>

        <div className="ss-footer-bottom">
          <p>© 2026 Samrat Solar Pvt. Ltd. | All rights reserved.</p>
        </div>
      </footer>

      {/* ======= FLOATING CTA ======= */}
      <div className="ss-floating-cta">
        <button className="ss-float-calc" onClick={handleGetQuote} id="floating-calc-btn" title="Solar Calculator">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="2"/>
            <rect x="7" y="5" width="10" height="5" rx="1" fill="white" opacity="0.3"/>
            <circle cx="9" cy="14" r="1.2" fill="white"/>
            <circle cx="15" cy="14" r="1.2" fill="white"/>
            <circle cx="9" cy="18" r="1.2" fill="white"/>
            <circle cx="15" cy="18" r="1.2" fill="white"/>
          </svg>
        </button>
        <button className="ss-float-quote" onClick={handleGetQuote} id="floating-quote-btn" title="Get a Quote">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15"/>
          </svg>
        </button>
      </div>
    </>
  );
}
