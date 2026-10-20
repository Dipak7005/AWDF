import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';

export const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: total,
      icon: ListTodo,
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.2)'
    },
    {
      title: 'Completed',
      value: completed,
      subtitle: `${completionPercentage}% done`,
      icon: CheckCircle2,
      color: '#34d399',
      bg: 'rgba(52, 211, 153, 0.2)'
    },
    {
      title: 'Pending',
      value: pending,
      icon: Clock,
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.2)'
    },
    {
      title: 'High Priority',
      value: highPriority,
      icon: AlertTriangle,
      color: '#fb7185',
      bg: 'rgba(251, 113, 133, 0.2)'
    }
  ];

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.2px' }}>
                  {card.title}
                </span>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '11px',
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${card.color}55`,
                    boxShadow: `0 0 14px ${card.color}33`
                  }}
                >
                  <Icon size={20} color={card.color} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                  {card.value}
                </span>
                {card.subtitle && (
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: card.color }}>
                    ({card.subtitle})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Glass Progress Bar */}
      {total > 0 && (
        <div className="glass-panel" style={{ marginTop: '16px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '8px' }}>
            <span style={{ fontWeight: 500 }}>Overall Progress</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>{completionPercentage}% Completed</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(8, 12, 24, 0.7)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div
              style={{
                width: `${completionPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #c084fc 0%, #34d399 100%)',
                borderRadius: '10px',
                transition: 'width 0.5s ease',
                boxShadow: '0 0 12px rgba(52, 211, 153, 0.5)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
