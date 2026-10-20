import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskStats } from '../components/TaskStats';
import { TaskFilters } from '../components/TaskFilters';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { EventMonitor } from '../components/EventMonitor';
import { api } from '../api/client';
import { ListTodo, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardPage({ onOpenCreateModal }) {
  const { token, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks(token);
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, token]);

  const handleCreateOrUpdateTask = async (formData) => {
    if (taskToEdit) {
      const updated = await api.updateTask(token, taskToEdit._id, formData);
      setTasks(tasks.map(t => t._id === updated._id ? updated : t));
    } else {
      const created = await api.createTask(token, formData);
      setTasks([created, ...tasks]);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const updated = await api.updateTask(token, id, { completed });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (err) {
      console.error('Error toggling complete:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(token, id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (onOpenCreateModal) {
      onOpenCreateModal.current = handleOpenCreate;
    }
  }, [onOpenCreateModal]);

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'completed' ? task.completed :
      !task.completed;

    const matchesPriority =
      priorityFilter === 'all' ? true :
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px', position: 'relative', zIndex: 1 }}>
      <TaskStats tasks={tasks} />

      {/* Practical 10: Native EventEmitter Asynchronous Background Processing Monitor */}
      <EventMonitor />

      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onOpenCreateModal={handleOpenCreate}
      />

      {/* Error Alert */}
      {error && (
        <div
          className="glass-panel"
          style={{
            padding: '16px',
            marginBottom: '20px',
            background: 'rgba(244, 63, 94, 0.15)',
            borderColor: 'rgba(244, 63, 94, 0.3)',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button onClick={fetchTasks} className="glass-button glass-button-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Task Grid / List */}
      {loading ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <RefreshCw size={28} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '12px' }} />
          <p>Loading your protected tasks...</p>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <ListTodo size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5, color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>No Tasks Found</h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px auto', color: '#cbd5e1' }}>
            {tasks.length === 0
              ? 'You have not created any tasks yet. Click below to add your first task.'
              : 'No tasks match your current search and filter criteria.'}
          </p>
          <button onClick={handleOpenCreate} className="glass-button" style={{ margin: '0 auto' }}>
            <Sparkles size={18} />
            <span>Create First Task</span>
          </button>
        </div>
      )}

      {/* Task Create / Edit Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdateTask}
        taskToEdit={taskToEdit}
      />
    </main>
  );
}
