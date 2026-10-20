import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

export const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onOpenCreateModal
}) => {
  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Top Row: Search & Add Button */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '42px' }}
            />
          </div>

          <button onClick={onOpenCreateModal} className="glass-button">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

        {/* Bottom Row: Filter Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
              <Filter size={14} color="var(--accent-purple)" /> Status:
            </span>
            {['all', 'pending', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: statusFilter === status ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.15)',
                  background: statusFilter === status ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(139, 92, 246, 0.5) 100%)' : 'rgba(8, 12, 24, 0.55)',
                  color: statusFilter === status ? '#ffffff' : '#cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                  boxShadow: statusFilter === status ? '0 0 14px rgba(168, 85, 247, 0.4)' : 'none'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Priority Filters */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginRight: '4px' }}>Priority:</span>
            {['all', 'low', 'medium', 'high'].map((prio) => (
              <button
                key={prio}
                onClick={() => setPriorityFilter(prio)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: priorityFilter === prio ? 'var(--accent-pink)' : 'rgba(255, 255, 255, 0.15)',
                  background: priorityFilter === prio ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.5) 0%, rgba(219, 39, 119, 0.5) 100%)' : 'rgba(8, 12, 24, 0.55)',
                  color: priorityFilter === prio ? '#ffffff' : '#cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                  boxShadow: priorityFilter === prio ? '0 0 14px rgba(236, 72, 153, 0.4)' : 'none'
                }}
              >
                {prio}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
