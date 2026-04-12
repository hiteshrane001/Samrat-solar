export default function HeroSection({ tag, title, titleHighlight, subtitle, stats, badges, style }) {
  return (
    <div className="cat-hero" style={style}>
      <div className="hero-left">
        <div className="hero-tag">{tag}</div>
        <div className="hero-title">
          {title} <span>{titleHighlight}</span>
        </div>
        <div className="hero-sub">{subtitle}</div>
        {stats && (
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div className="hs" key={i}>
                <span className="hs-v">{s.value}</span>
                <span className="hs-l">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="hero-right">
        {badges && badges.map((b, i) => (
          <div className="hero-badge" key={i}>
            <span className="hb-icon">{b.icon}</span>
            <span className="hb-text">{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
