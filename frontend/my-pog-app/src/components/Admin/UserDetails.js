
import React from 'react';

const UserDetails = ({ username, email }) => {
  return (
    <div className="user-details">
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserDetails;
