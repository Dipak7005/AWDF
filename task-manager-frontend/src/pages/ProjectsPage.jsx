import React, { useState } from 'react';
import { FolderKanban, Plus, Clock, CheckCircle2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      title: 'Frontend Performance Optimization',
      category: 'Engineering',
      progress: 85,
      tasksCount: 12,
      completedCount: 10,
      dueDate: '2026-10-15',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'JWT Authentication Upgrade',
      category: 'Security',
      progress: 100,
      tasksCount: 8,
      completedCount: 8,
      dueDate: '2026-09-20',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Mobile Responsive Glassmorphism Redesign',
      category: 'UI/UX Design',
      progress: 45,
      tasksCount: 15,
      completedCount: 7,
      dueDate: '2026-11-01',
      status: 'In Progress'
    },
    {
      id: 4,
      title: 'REST API Rate Limiting & Caching',
      category: 'Backend',
      progress: 20,
      tasksCount: 10,
      completedCount: 2,
      dueDate: '2026-11-15',
      status: 'Planning'
    }
  ]);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px', position: 'relative', zIndex: 1 }}>
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FolderKanban size={28} color="#38bdf8" />
              <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 700 }}>Projects Workspace</h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '4px' }}>
              Route: <code style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>/projects</code> (Lazy loaded chunk)
            </p>
          </div>
          <button className="glass-button">
            <Plus size={18} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {projects.map(project => (
          <div
            key={project.id}
            className="glass-panel"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)'
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: project.status === 'Completed' ? '#34d399' : '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {project.status === 'Completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                  {project.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 600, marginBottom: '10px' }}>
                {project.title}
              </h3>

              <div style={{ margin: '16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  <span>Progress ({project.completedCount}/{project.tasksCount} tasks)</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{project.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${project.progress}%`,
                      background: project.progress === 100
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Due: {project.dueDate}</span>
              <button className="glass-button glass-button-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                View Tasks
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
