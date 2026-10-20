import React, { useState } from 'react';
import { CheckCircle2, Circle, Edit2, Trash2, Calendar, Clock } from 'lucide-react';

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-pill priority-high';
      case 'medium': return 'priority-pill priority-medium';
      case 'low': return 'priority-pill priority-low';
      default: return 'priority-pill priority-medium';
    }
  };

  const handleDelete = () => {
    if (isDeleting) {
      onDelete(task._id);
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 4000); // Reset confirm state after 4 seconds
    }
  };

  return (
    <div
      className="glass-panel glass-panel-hover animate-fade-in"
      style={{
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: task.completed ? 0.75 : 1,
        transition: 'all 0.3s ease',
        borderLeft: task.completed ? '4px solid var(--accent-emerald)' : '1px solid var(--glass-border)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
        {/* Checkbox & Task Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
          <button
            onClick={() => onToggleComplete(task._id, !task.completed)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              marginTop: '2px',
              color: task.completed ? 'var(--accent-emerald)' : 'var(--text-muted)',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center'
            }}
            title={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed ? (
              <CheckCircle2 size={24} color="var(--accent-emerald)" />
            ) : (
              <Circle size={24} />
            )}
          </button>

          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                textDecoration: task.completed ? 'line-through' : 'none',
                lineHeight: '1.4',
                marginBottom: '4px'
              }}
            >
              {task.title}
            </h4>

            {task.description && (
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '8px'
                }}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Priority Badge */}
        <div className={getPriorityClass(task.priority)}>
          {task.priority}
        </div>
      </div>

      {/* Footer Meta & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={13} />
          <span>{formatDate(task.createdAt)}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              transition: 'all 0.2s ease'
            }}
            title="Edit task"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>

          <button
            onClick={handleDelete}
            style={{
              background: isDeleting ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid',
              borderColor: isDeleting ? 'rgba(244, 63, 94, 0.5)' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: isDeleting ? '#fca5a5' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              transition: 'all 0.2s ease'
            }}
            title="Delete task"
          >
            <Trash2 size={14} />
            <span>{isDeleting ? 'Confirm?' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
