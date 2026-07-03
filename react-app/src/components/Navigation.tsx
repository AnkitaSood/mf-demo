import { navigate } from '../location';

export const Navigation = () => {
  const currentPath = window.location.pathname;

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      alignItems: 'center',
      marginBottom: '2rem',
      padding: '1rem 1.5rem',
      background: 'var(--ra-surface)',
      border: '1px solid var(--ra-border)',
      borderRadius: '8px'
    }}>
      <a 
        className={`ra-link ${currentPath.includes('/products') || currentPath === '/react' ? 'ra-link--active' : ''}`}
        href="/react/products"
        onClick={(e) => {
          e.preventDefault();
          navigate('/react/products');
        }}
      >
        Products
      </a>
      <a 
        className={`ra-link ${currentPath.includes('/about-us') ? 'ra-link--active' : ''}`}
        href="/react/about-us"
        onClick={(e) => {
          e.preventDefault();
          navigate('/react/about-us');
        }}
      >
        About Us
      </a>
    </nav>
  );
};
