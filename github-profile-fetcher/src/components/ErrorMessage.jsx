import React from 'react';
import './Components.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-card glass-card animate-fade-in">
      <h3>User Not Found or API Error</h3>
      <p>{message || "Failed to fetch GitHub profile."}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-action-btn">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
