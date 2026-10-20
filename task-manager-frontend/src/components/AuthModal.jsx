import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { login, register, error, clearError } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLocalError('');

    try {
      if (isRegister) {
        if (!formData.name.trim()) {
          throw new Error('Please enter your full name');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setLocalError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTab = (mode) => {
    setIsRegister(mode);
    setLocalError('');
    clearError();
  };

  const activeError = localError || error;

  return (
    <div className="modal-overlay">
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px 32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 16px auto',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.45)'
            }}
          >
            <Sparkles size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
            {isRegister ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
            {isRegister ? 'Sign up to start organizing tasks with JWT security' : 'Enter your credentials to access your protected workspace'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(8, 12, 24, 0.6)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <button
            type="button"
            onClick={() => toggleTab(false)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: !isRegister ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)' : 'transparent',
              color: !isRegister ? '#fff' : '#94a3b8',
              boxShadow: !isRegister ? '0 2px 10px rgba(56, 189, 248, 0.3)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => toggleTab(true)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: isRegister ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)' : 'transparent',
              color: isRegister ? '#fff' : '#94a3b8',
              boxShadow: isRegister ? '0 2px 10px rgba(56, 189, 248, 0.3)' : 'none'
            }}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {activeError && (
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#fca5a5',
              fontSize: '0.85rem'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{activeError}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input"
                  style={{ paddingLeft: '42px' }}
                  required={isRegister}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="glass-input"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="glass-input"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="glass-button"
            style={{ width: '100%', marginTop: '8px', padding: '14px' }}
          >
            {submitting ? 'Authenticating...' : (isRegister ? 'Create Account' : 'Sign In')}
            {!submitting && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};
