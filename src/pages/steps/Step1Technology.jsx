import { useApp } from '../../context/AppContext';
import HeroSection from '../../components/HeroSection';
import ProductCard from '../../components/ProductCard';

export default function Step1Technology() {
  const { tech, setTech, setStep, techProducts } = useApp();

  // Use techProducts from API (loaded via context), fall back to TECH from constants if empty
  const products = techProducts.length > 0 ? techProducts : [];

  return (
    <>
      <HeroSection
        tag="Step 1 of 5 — Choose Technology"
        title="Solar Panel"
        titleHighlight="Modules"
        subtitle="India's most trusted solar modules — from entry-level PERC to premium HJT bifacial. Select the technology that powers your home."
        stats={[
          { value: '3 Types', label: 'Technologies' },
          { value: '25–30yr', label: 'Warranty' },
          { value: 'IS/IEC', label: 'Certified' }
        ]}
        badges={[
          { icon: '🏭', text: 'Manufactured in India' },
          { icon: '⚡', text: 'Up to 24% Module Efficiency' },
          { icon: '📦', text: 'Free Delivery Pan India' }
        ]}
      />

      <div className="sec-head">
        <div>
          <div className="sec-title"><div className="sec-line"></div>Select Module Technology</div>
          <div className="sec-sub">Click a card to select your preferred technology</div>
        </div>
        <div className="sort-bar">
          Sort by: <select className="sort-select"><option>Featured</option><option>Efficiency</option><option>Price</option></select>
        </div>
      </div>

      <div className="prod-grid">
        {products.map(t => (
          <ProductCard
            key={t.id}
            selected={tech === t.id}
            tag={t.badge}
            tagType={t.badgeType}
            name={t.name}
            brand="Samrat Solar"
            imgSrc={t.img}
            imgAlt={t.name}
            fallbackIcon="🔆"
            rating="★★★★★"
            reviewCount={124}
            specs={[`⚡ ${t.eff}`, t.cells, `Max ${t.power}`, t.warranty]}
            price="Get free Quotes"
            desc={t.desc.slice(0, 70) + '…'}
            actionLabel="Select Technology"
            selectedLabel="✓ Selected"
            onSelect={() => setTech(t.id)}
            onWish={() => {}}
          />
        ))}
      </div>

      <div className="nav-acts">
        <div></div>
        <button className="btn-next" disabled={!tech} onClick={() => setStep(2)}>
          Configure Panels →
        </button>
      </div>
    </>
  );
}
