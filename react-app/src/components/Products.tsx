import { useState } from 'react';
import { LEGO_SETS } from '../data';
import { getGlobalCounter } from '../shared-counter';

export const Products = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(LEGO_SETS.map((s) => [s.id, 1]))
  );

  const handleQuantityChange = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: isNaN(val) ? 1 : Math.max(1, val) }));
  };

  const addToCart = (id: string) => {
    const qty = quantities[id] || 1;
    const counter = getGlobalCounter();
    counter.set(counter.get() + qty);
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="ra-grid">
      {LEGO_SETS.map((set) => (
        <div key={set.id} className="ra-card">
          <div className="ra-logo" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{set.image}</div>
          <h2 className="ra-card__title">{set.name}</h2>
          <p className="ra-card__desc">{set.description}</p>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '1rem 0', color: 'var(--ra-accent)' }}>
            ${set.price}
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: 'auto' }}>
            <input
              type="number"
              min="1"
              value={quantities[set.id]}
              onChange={(e) => handleQuantityChange(set.id, parseInt(e.target.value))}
              style={{ 
                width: '60px', 
                background: 'var(--ra-surface-2)', 
                border: '1px solid var(--ra-border)',
                color: 'var(--ra-text)',
                padding: '0.4rem',
                borderRadius: '4px'
              }}
            />
            <button 
              className="ra-btn ra-btn--primary" 
              style={{ flex: 1 }}
              onClick={() => addToCart(set.id)}
            >
              Add to Cart
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <button 
              className="ra-btn ra-btn--sm" 
              style={{ fontSize: '0.8125rem', alignSelf: 'center' }}
              onClick={() => navigate(`/react/product-details/${set.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
