import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, Plus, ShieldCheck } from 'lucide-react';

export const Navbar = ({ onGetStarted }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 1);
  };

  return (
    <header className="glass-panel" style={{ padding: '14px 28px', margin: '20px auto 30px auto', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Brand Logo & Title */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
            }}
          >
            <Sparkles size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
              TaskSphere
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
              <ShieldCheck size={12} color="var(--accent-emerald)" /> Task Management System
            </p>
          </div>
        </NavLink>

        {/* Navigation Links for Lazy Loaded Routes */}
        {user && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                color: isActive ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                padding: '6px 14px',
                borderRadius: '8px',
                background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              style={({ isActive }) => ({
                color: isActive ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                padding: '6px 14px',
                borderRadius: '8px',
                background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              Projects
            </NavLink>
            <NavLink
              to="/analytics"
              style={({ isActive }) => ({
                color: isActive ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                padding: '6px 14px',
                borderRadius: '8px',
                background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              Analytics
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                padding: '6px 14px',
                borderRadius: '8px',
                background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              Contact
            </NavLink>
          </nav>
        )}

        {/* User Info & Actions matching 2nd image */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onGetStarted && (
              <button
                onClick={onGetStarted}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #0070f3 0%, #00a8ff 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Create New Task"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Get Started</span>
              </button>
            )}

            {/* Profile Component (Avatar, Name, Email) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(10, 18, 38, 0.75)',
                padding: '6px 20px 6px 8px',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: '#ffffff',
                  boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)'
                }}
              >
                {getInitials(user.name)}
              </div>
              <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user.email}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.92rem',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Logout"
            >
              <LogOut size={18} strokeWidth={2} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

