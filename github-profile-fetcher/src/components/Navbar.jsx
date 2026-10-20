import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ currentUsername, onSearch }) => {
  const [inputVal, setInputVal] = useState(currentUsername || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  return (
    <header className="navbar-container glass-card">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-name">GitHub Profile Fetcher</span>
        </div>

        <form onSubmit={handleSubmit} className="header-search-form">
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="header-search-input"
          />
          <button type="submit" className="header-search-btn">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
