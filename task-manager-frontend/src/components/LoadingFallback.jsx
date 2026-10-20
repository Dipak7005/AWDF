import React from 'react';
import { Layers } from 'lucide-react';

export const LoadingFallback = ({ message = 'Loading page chunk...' }) => {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          padding: '40px 48px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(56, 189, 248, 0.2)',
              borderTopColor: '#38bdf8',
              animation: 'spin 1s linear infinite'
            }}
          />
          <Layers size={28} color="#38bdf8" />
        </div>
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>
            Fetching Code Chunk
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{message}</p>
        </div>
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '8px'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '60%',
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              borderRadius: '2px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
};
