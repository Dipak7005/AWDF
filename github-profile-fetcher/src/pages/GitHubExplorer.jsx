import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import RepoList from '../components/RepoList';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Footer from '../components/Footer';
import './Pages.css';

const GitHubExplorer = () => {
  const [username, setUsername] = useState('octocat');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGitHubData = useCallback((targetUsername) => {
    setLoading(true);
    setError(null);

    const userUrl = `https://api.github.com/users/${targetUsername}`;
    const reposUrl = `https://api.github.com/users/${targetUsername}/repos?sort=updated&per_page=100`;

    // Support GitHub Personal Access Token to bypass rate limits (increases limit from 60/hr to 5,000/hr)
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const fetchOptions = token
      ? { headers: { Authorization: `token ${token}` } }
      : {};

    Promise.all([
      fetch(userUrl, fetchOptions).then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error(`User "${targetUsername}" not found.`);
          if (res.status === 403) throw new Error(`GitHub API rate limit exceeded (60 req/hr). Add a Personal Access Token in .env to get 5,000 req/hr!`);
          throw new Error(`API Error (HTTP ${res.status}).`);
        }
        return res.json();
      }),
      fetch(reposUrl, fetchOptions).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos.');
        return res.json();
      })
    ])
      .then(([userData, repoData]) => {
        setUser(userData);
        setRepos(repoData);
      })
      .catch((err) => {
        setError(err.message || 'Error loading profile.');
        setUser(null);
        setRepos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchGitHubData(username);
  }, [username, fetchGitHubData]);

  const handleSearch = (newUsername) => {
    setUsername(newUsername);
  };

  const handleRetry = () => {
    fetchGitHubData(username);
  };

  return (
    <div className="page-wrapper">
      <Navbar currentUsername={username} onSearch={handleSearch} />

      <main className="main-container">
        {loading ? (
          <Spinner message={`Fetching data for @${username}...`} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <div className="github-layout-grid">
            {/* Left Sidebar (User Profile Info) */}
            <aside className="layout-left-col">
              <UserProfile user={user} />
            </aside>

            {/* Right Column (Repositories List - Max 6) */}
            <section className="layout-right-col">
              <RepoList data={repos} />
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GitHubExplorer;
