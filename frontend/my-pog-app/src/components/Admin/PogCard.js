import React from 'react';
import './PogCard.css'; 

const AdminPogCard = ({ pog, onPriceChange }) => {
  return (
    <div className="pog-card">
      <h2>{pog.name}</h2>
      <p>ID: {pog.id}</p>
      <p>Color: {pog.color}</p>
      <p>Symbol: {pog.symbol}</p>
      <p>Price: {pog.price}</p>
      <button onClick={onPriceChange}>Trigger Price Change</button>
    </div>
  );
};

export default AdminPogCard;
