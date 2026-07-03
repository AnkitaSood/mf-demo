import { useState } from 'react';
import { LEGO_SETS } from '../data';
import { getGlobalCounter } from '../shared-counter';
import { navigate } from '../location';

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

          <div className="ra-card__actions">
            <input
              className="ra-qty-input"
              type="number"
              min="1"
              value={quantities[set.id]}
              onChange={(e) => handleQuantityChange(set.id, parseInt(e.target.value))}
            />

            <div className="ra-card__buttons">
              <button
                className="ra-btn ra-btn--primary ra-btn--block"
                onClick={() => addToCart(set.id)}
              >
                Add to Cart
              </button>
              <button
                className="ra-btn ra-btn--sm ra-btn--block"
                onClick={() => navigate(`/react/product-details/${set.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
