import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px 20px', position: 'relative', zIndex: 1 }}>
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 0 24px rgba(56, 189, 248, 0.4)'
          }}
        >
          <Mail size={28} color="#ffffff" />
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>
          Contact & Technical Support
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Have questions about the TaskSphere frontend performance optimization or need support? Send us a message!
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '12px' }}>
          Route: <code style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>/contact</code> (Lazy loaded chunk)
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle2 size={54} color="#34d399" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>Message Received!</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '20px' }}>
              Thank you for reaching out. Our engineering team will get back to you shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
              className="glass-button"
              style={{ margin: '0 auto' }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 500, marginBottom: '8px' }}>
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="glass-input"
                style={{ width: '100%', padding: '12px 16px' }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 500, marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                className="glass-input"
                style={{ width: '100%', padding: '12px 16px' }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 500, marginBottom: '8px' }}>
                Feedback / Query
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your inquiry or observations on route-based code splitting..."
                className="glass-input"
                style={{ width: '100%', padding: '12px 16px', resize: 'vertical' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="glass-button" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <Send size={18} />
              <span>Submit Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
