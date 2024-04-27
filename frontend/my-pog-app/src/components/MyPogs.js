
// src/components/MyPogs.js
// Shop.js
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Pog from './Pog';

const Shop = () => {
  const [pogs, setPogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pogs');
        const data = await response.json();
        setPogs(data);
      } catch (error) {
        console.error('Error fetching pogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="shop-container">
      <h2>Shop</h2>
      <table className="pogs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Ticker Symbol</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {pogs.map(pog => (
            <Pog key={pog.id} pog={pog} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shop;
