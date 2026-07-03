export const AboutUs = () => {
  return (
    <div className="ra-card ra-card--info">
      <h1 className="ra-title">About PokeBricks</h1>
      <p className="ra-card__desc" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        PokeBricks was founded in 1998 by a group of Pokemon trainers who wanted to 
        recreate their favorite pocket monsters using building blocks. 
        What started in a small garage in Pallet Town has now grown into the 
        world's leading supplier of Pokemon-themed Lego sets.
      </p>
      <p className="ra-card__desc" style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Our mission is to inspire creativity and adventure through every brick. 
        Whether you're building a life-sized Pikachu or a miniature Pokecenter, 
        PokeBricks is here to help you "Build 'em All!"
      </p>
      
      <div className="ra-grid" style={{ marginTop: '2rem' }}>
        <div className="ra-card">
          <h2 className="ra-card__title">Quality</h2>
          <p className="ra-card__desc">Premium bricks that last for generations.</p>
        </div>
        <div className="ra-card">
          <h2 className="ra-card__title">Passion</h2>
          <p className="ra-card__desc">Designed by fans, for fans.</p>
        </div>
      </div>
    </div>
  );
};
