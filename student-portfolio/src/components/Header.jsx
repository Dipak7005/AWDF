import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="name">Dipak Karangiya</h1>
        <p className="title">Frontend Developer</p>
        <p className="email">dipak7005@gmail.com</p>
        <p className="phone">+91 9876543210</p>
      </div>
    </header>
  );
};

export default Header;
