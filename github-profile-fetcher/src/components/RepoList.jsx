import React, { useState } from 'react';
import './Components.css';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Ruby: '#701516',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb'
};

const RepoList = ({ data = [] }) => {
  const [filterQuery, setFilterQuery] = useState('');

  // Filter repos by search query
  const filteredData = data.filter((repo) => {
    const nameMatch = repo.name.toLowerCase().includes(filterQuery.toLowerCase());
    const descMatch = repo.description && repo.description.toLowerCase().includes(filterQuery.toLowerCase());
    return nameMatch || descMatch;
  });

  // Limit display to max 6 repositories
  const displayRepos = filteredData.slice(0, 6);

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="repo-list-wrapper">
      {/* Header Row with Search Bar */}
      <div className="repo-section-header">
        <div className="repo-header-left">
          <h2>Repositories</h2>
          <span className="repo-count-badge">{filteredData.length} total</span>
        </div>

        <div className="repo-search-box">
          <input
            type="text"
            placeholder="Search repositories..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="repo-search-input"
          />
          {filterQuery && (
            <button onClick={() => setFilterQuery('')} className="clear-filter-btn">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2 Repos Per Row Grid */}
      {displayRepos.length === 0 ? (
        <div className="empty-repos-card glass-card">
          <p>No matching repositories found.</p>
        </div>
      ) : (
        <div className="repos-grid-2col">
          {displayRepos.map((repo) => {
            const langColor = languageColors[repo.language] || '#94a3b8';
            return (
              <div key={repo.id} className="repo-item-card glass-card animate-fade-in">
                <div className="repo-item-top">
                  <h3 className="repo-title">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h3>
                  <span className="repo-public-badge">
                    {repo.private ? 'Private' : 'Public'}
                  </span>
                </div>

                {repo.description && (
                  <p className="repo-desc-text">{repo.description}</p>
                )}

                <div className="repo-item-footer">
                  <div className="repo-meta-left">
                    {repo.language && (
                      <span className="repo-lang">
                        <span className="lang-dot" style={{ backgroundColor: langColor }}></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="repo-stat">⭐ {repo.stargazers_count || 0}</span>
                    <span className="repo-stat">🍴 {repo.forks_count || 0}</span>
                  </div>

                  <span className="repo-updated-date">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RepoList;
