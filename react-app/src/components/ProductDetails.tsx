import { LEGO_SETS } from '../data';

export const ProductDetails = ({ id }: { id: string }) => {
  const set = LEGO_SETS.find((s) => s.id === id);

  if (!set) {
    return <div className="ra-card">Product not found</div>;
  }

  return (
    <div className="ra-card ra-card--info">
      <div className="ra-header" style={{ marginBottom: '2rem' }}>
        <div className="ra-logo" style={{ fontSize: '4rem' }}>{set.image}</div>
        <div>
          <h1 className="ra-title">{set.name}</h1>
          <p className="ra-subtitle">Pokemon Lego Set #{set.id}</p>
        </div>
      </div>
      
      <div className="ra-grid">
        <div className="ra-card">
          <h2 className="ra-card__title">Description</h2>
          <p className="ra-card__desc">{set.description}</p>
        </div>
        
        <div className="ra-card">
          <h2 className="ra-card__title">Specifications</h2>
          <dl className="ra-dl">
            <dt>Price</dt><dd>${set.price}</dd>
            <dt>Pieces</dt><dd>{set.pieces}</dd>
            <dt>Age Range</dt><dd>{set.ageRange}</dd>
          </dl>
        </div>
      </div>
      
      <button 
        className="ra-btn ra-btn--primary" 
        style={{ marginTop: '2rem' }}
        onClick={() => {
            window.history.pushState({}, '', '/react/products');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      >
        ← Back to Products
      </button>
    </div>
  );
};
