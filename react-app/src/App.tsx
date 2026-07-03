import { useState, useEffect } from 'react';
import './App.css';
import { getGlobalCounter } from './shared-counter';
import { Products } from './components/Products';
import { ProductDetails } from './components/ProductDetails';
import { AboutUs } from './components/AboutUs';
import { Navigation } from './components/Navigation';
import { subscribeToLocationChange } from './location';

function App() {
  const [, setCount] = useState(getGlobalCounter().get());
  const [path, setPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const unsubscribe = getGlobalCounter().subscribe((c) => setCount(c));
    const unsubscribeLocation = subscribeToLocationChange(() => {
      setPath(window.location.pathname);
    });
    
    return () => {
      unsubscribe();
      unsubscribeLocation();
    };
  }, []);

  const renderContent = () => {
    if (path.includes('/product-details/')) {
      const id = path.split('/').pop() || '';
      return <ProductDetails id={id} />;
    }
    if (path.includes('/about-us')) {
      return <AboutUs />;
    }
    return <Products />;
  };

  return (
    <div className="ra-root">
      <div className="ra-header">
        <div className="ra-logo">⚛</div>
        <div>
          <h1 className="ra-title">Pokemon Lego Store</h1>
          <p className="ra-subtitle">Quality bricks for trainers</p>
        </div>
      </div>

      <Navigation />

      <div className="ra-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
