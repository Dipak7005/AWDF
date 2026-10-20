import React from 'react';
import './Components.css';

const Spinner = ({ message = "Loading profile data..." }) => {
  return (
    <div className="spinner-container">
      <div className="simple-loader"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default Spinner;
