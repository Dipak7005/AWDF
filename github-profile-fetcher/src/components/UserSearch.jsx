import React, { useState } from 'react';
import { Search, UserCheck, Sparkles } from 'lucide-react';
import './Components.css';

const UserSearch = ({ currentUsername, onSearch }) => {
  const [inputVal, setInputVal] = useState(currentUsername || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const presetUsers = ['octocat', 'torvalds', 'gaearon', 'facebook', 'shadcn'];

  return (
    <div className="user-search-box flat-card">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Enter GitHub username (e.g. octocat, torvalds)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <UserCheck size={16} />
            <span>Fetch Data</span>
          </button>
        </div>
      </form>

      <div className="preset-suggestions">
        <span className="preset-label">
          <Sparkles size={14} /> Quick Profiles:
        </span>
        <div className="preset-pills">
          {presetUsers.map((user) => (
            <button
              key={user}
              onClick={() => {
                setInputVal(user);
                onSearch(user);
              }}
              className={`preset-pill ${currentUsername?.toLowerCase() === user ? 'active' : ''}`}
            >
              @{user}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
