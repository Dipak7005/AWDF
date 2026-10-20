import React from 'react';
import { BarChart3, TrendingUp, Zap, PieChart, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px', position: 'relative', zIndex: 1 }}>
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart3 size={28} color="#38bdf8" />
              <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 700 }}>Performance & Analytics</h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '4px' }}>
              Route: <code style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>/analytics</code> (Heavy third-party analytics chunk)
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Initial Bundle Saved</span>
            <Zap size={20} color="#fbbf24" />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 700 }}>~75%</h3>
          <p style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '4px' }}>First Load Speedup</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Task Completion Velocity</span>
            <TrendingUp size={20} color="#38bdf8" />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 700 }}>4.8 Tasks/Day</h3>
          <p style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '4px' }}>+12% vs last week</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>System Health Score</span>
            <Activity size={20} color="#34d399" />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 700 }}>99.9%</h3>
          <p style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '4px' }}>Optimal code splitting</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PieChart size={20} color="#38bdf8" /> Productivity & Priority Distribution Chart
        </h3>
        <div style={{ background: 'rgba(8, 12, 24, 0.4)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>High Priority Tasks Completed</span>
              <span>78%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #ef4444, #f87171)', borderRadius: '5px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Medium Priority Tasks Completed</span>
              <span>62%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '62%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '5px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Low Priority Tasks Completed</span>
              <span>94%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '94%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '5px' }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
