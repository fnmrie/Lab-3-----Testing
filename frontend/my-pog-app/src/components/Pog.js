
// Pog.js
import React from 'react';
import './Pog.css';

const Pog = ({ pog }) => {
  const handleBuy = () => {
    // Handle buy logic
  };

  const handleSell = () => {
    // Handle sell logic
  };

  return (
    <tr>
      <td>{pog.name}</td>
      <td>${pog.price}</td>
      <td>{pog.tickerSymbol}</td>
      <td>
        <div className="pog-color" style={{ backgroundColor: pog.color }}></div>
      </td>
      <td>
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleSell}>Sell</button>
      </td>
    </tr>
  );
};

export default Pog;
