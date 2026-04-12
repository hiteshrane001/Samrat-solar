import { useState } from 'react';

export default function ProductCard({
  selected, tag, tagType, name, brand, imgSrc, imgAlt, fallbackIcon,
  rating, reviewCount, specs, price, mrp, savings, perNote, desc,
  actionLabel, selectedLabel, onSelect, onWish,
  children, checkContent, imgStyle
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`prod-card ${selected ? 'sel' : ''}`} onClick={onSelect}>
      {tag && <div className={`prod-tag ${tagType || ''}`}>{tag}</div>}
      <div className="prod-check">{checkContent || '✓'}</div>
      <div className="prod-img-wrap" style={imgStyle}>
        {!imgError ? (
          <img
            className="prod-img"
            src={imgSrc}
            alt={imgAlt || name}
            style={imgStyle}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="prod-img-fallback">
            {fallbackIcon || '🔆'}
            <br />
            <span style={{ fontSize: '12px', marginTop: '4px', color: '#9AA0A6' }}>{name}</span>
          </div>
        )}
      </div>
      <div className="prod-body">
        {brand && <div className="prod-brand">{brand}</div>}
        <div className="prod-name">{name}</div>
        {rating && (
          <div className="prod-rating">
            <span className="stars">{rating}</span>
            <span className="rev-count">({reviewCount} reviews)</span>
          </div>
        )}
        {specs && (
          <div className="prod-specs">
            {specs.map((s, i) => <span className="spec-chip" key={i}>{s}</span>)}
          </div>
        )}
        {price && (
          <div className="prod-price-row">
            <span className="prod-price">{price}</span>
            {mrp && <span className="prod-mrp">{mrp}</span>}
          </div>
        )}
        {savings && <div className="prod-savings">{savings}</div>}
        {desc && <div className="prod-per">{desc}</div>}
        {perNote && <div className="prod-per">{perNote}</div>}
        {children}
        <div className="prod-actions">
          <button
            className="btn-add"
            onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); }}
          >
            {selected ? (selectedLabel || '✓ Selected') : (actionLabel || 'Select')}
          </button>
          {onWish && <button className="btn-wish" onClick={(e) => { e.stopPropagation(); onWish(); }}>♡</button>}
        </div>
      </div>
    </div>
  );
}
