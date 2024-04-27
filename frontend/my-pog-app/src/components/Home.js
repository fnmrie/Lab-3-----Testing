
// src/components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content ticker-marquee">Ticker Marquee - Display all the pogs in the database</div>
      <div className="home-content">
        E-Wallet Balance: $1000
      </div>
      <div className="home-content">
        Username: [Username] <br />
        Email: [Email]
      </div>
      <button className="button-logout">Log Out</button>
    </div>
  );
}

export default Home;