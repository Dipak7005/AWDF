import React from 'react';
import './Components.css';

const UserProfile = ({ user }) => {
  if (!user) return null;

  const formatFollowers = (count) => {
    if (!count) return '0';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className="user-profile-sidebar glass-card animate-fade-in">
      <div className="profile-top-info">
        <div className="avatar-container">
          <img 
            src={user.avatar_url} 
            alt={`${user.login}'s profile`} 
            className="profile-avatar-img" 
          />
        </div>

        <div className="profile-names">
          <h1 className="profile-full-name">{user.name || user.login}</h1>
          <span className="profile-username">{user.login}</span>
        </div>

        {user.bio && <p className="profile-bio">{user.bio}</p>}

        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="follow-btn"
        >
          Follow on GitHub
        </a>

        <div className="follow-stats">
          <span><strong>{formatFollowers(user.followers)}</strong> followers</span>
          <span className="dot-sep">•</span>
          <span><strong>{user.following || 0}</strong> following</span>
        </div>
      </div>

      <div className="profile-meta-list">
        {user.company && (
          <div className="meta-row">
            <span className="meta-icon">🏢</span>
            <span>{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="meta-row">
            <span className="meta-icon">📍</span>
            <span>{user.location}</span>
          </div>
        )}
        {user.blog && (
          <div className="meta-row">
            <span className="meta-icon">🔗</span>
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        <div className="meta-row">
          <span className="meta-icon">📦</span>
          <span><strong>{user.public_repos || 0}</strong> Public Repositories</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
