/* eslint-disable jsx-a11y/no-distracting-elements */

import React, { useState } from 'react';
import AdminPogCard from './PogCard';
import UserDetails from './UserDetails'; // Import UserDetails component
import './Admin.css'; // Import Admin.css

const Admin = ({ username, email }) => { // Accept username and email as props
  const [pogs, setPogs] = useState([]);

  const handlePriceChange = (index) => {
    const updatedPogs = [...pogs];
    updatedPogs[index].price += Math.random() * 10 - 5;
    setPogs(updatedPogs);
  };

  return (
    <div className="admin-page">
      <div className="user-details">
        <UserDetails username={username} email={email} /> {/* Pass username and email as props */}
      </div>
      <div className="admin-content">
        <h1>Welcome, Admin!</h1>
        <marquee behavior="scroll" direction="left" className="slogan">Create your own pog!</marquee>
        <form className="create-pog-form">
  <label htmlFor="name">Name:</label>
  <input type="text" id="name" name="name" />

  <label htmlFor="id">ID:</label>
  <input type="text" id="id" name="id" />

  <label htmlFor="color">Color:</label>
  <input type="text" id="color" name="color" />

  <label htmlFor="symbol">Symbol:</label>
  <input type="text" id="symbol" name="symbol" />

  <label htmlFor="price">Price:</label>
  <input type="text" id="price" name="price" />

  <button type="submit">Create Pog</button>
</form>

        <div className="pog-cards">
          {/* Render Pog cards */}
          {pogs.map((pog, index) => (
            <AdminPogCard key={index} pog={pog} onPriceChange={() => handlePriceChange(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
