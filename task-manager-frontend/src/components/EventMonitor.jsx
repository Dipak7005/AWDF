import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import {
  Activity,
  Bell,
  Trash2,
  AlertTriangle,
  Clock,
  CheckCircle,
  RefreshCw,
  Cpu,
  Zap,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const EventMonitor = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [testingError, setTestingError] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showTheory, setShowTheory] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      setErrorMsg('Failed to load background events');
    }
  };

  useEffect(() => {
    fetchEvents();
    if (!autoRefresh) return;
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleTestError = async () => {
    setTestingError(true);
    try {
      await api.triggerTestError();
      await fetchEvents();
    } catch (err) {
      console.error(err);
    } finally {
      setTestingError(false);
    }
  };

  const getEventBadge = (type) => {
    switch (type) {
      case 'task-created':
        return {
          icon: Bell,
          label: 'task-created',
          color: '#38bdf8',
          bg: 'rgba(56, 189, 248, 0.15)',
          border: 'rgba(56, 189, 248, 0.3)'
        };
      case 'task-deleted':
        return {
          icon: Trash2,
          label: 'task-deleted',
          color: '#fb7185',
          bg: 'rgba(251, 113, 133, 0.15)',
          border: 'rgba(251, 113, 133, 0.3)'
        };
      case 'error':
        return {
          icon: AlertTriangle,
          label: 'error caught',
          color: '#fbbf24',
          bg: 'rgba(251, 191, 36, 0.15)',
          border: 'rgba(251, 191, 36, 0.3)'
        };
      default:
        return {
          icon: Activity,
          label: type,
          color: '#cbd5e1',
          bg: 'rgba(203, 213, 225, 0.1)',
          border: 'rgba(203, 213, 225, 0.2)'
        };
    }
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '28px', padding: '24px', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
            }}
          >
            <Cpu size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                EventEmitter Background Processing Monitor
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.4)'
                }}
              >
                CO4 / PO3, PO5
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '4px 0 0 0' }}>
              Native Node.js asynchronous event decoupling & non-blocking execution proof
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="glass-button glass-button-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              color: autoRefresh ? '#34d399' : '#94a3b8',
              borderColor: autoRefresh ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.15)'
            }}
            title="Toggle Live Polling (every 2s)"
          >
            <Activity size={14} className={autoRefresh ? 'animate-pulse' : ''} />
            <span>Live Feed: {autoRefresh ? 'ON' : 'PAUSED'}</span>
          </button>

          <button
            onClick={fetchEvents}
            className="glass-button glass-button-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            title="Manual Refresh"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleTestError}
            disabled={testingError}
            className="glass-button"
            style={{
              padding: '6px 14px',
              fontSize: '0.78rem',
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              borderColor: 'rgba(245, 158, 11, 0.4)'
            }}
            title="Test Supplementary Problem 2: Error Event Listener"
          >
            <AlertTriangle size={14} />
            <span>Test Error Event</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-button glass-button-secondary"
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Theory / Analysis Accordion Toggle */}
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setShowTheory(!showTheory)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#38bdf8',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={16} />
                <span>Lab Key Analysis: Why EventEmitter Keeps the Main Request Fast</span>
              </div>
              <span>{showTheory ? 'Hide Analysis ▲' : 'Read 3 Key Analysis Answers ▼'}</span>
            </button>

            {showTheory && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(8, 12, 24, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  color: '#e2e8f0'
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#38bdf8' }}>Q1. Why does emitting an event not block the API response?</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#cbd5e1' }}>
                    In Node.js, the HTTP response is dispatched immediately via <code>res.status(201).json(...)</code>. Background listeners scheduled with asynchronous operations (such as <code>setTimeout</code>, file I/O, or remote HTTP calls) register their callbacks onto the libuv event loop phases (Timers / Poll / Check), allowing the main HTTP socket to flush the response instantly to the client.
                  </p>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ color: '#38bdf8' }}>Q2. What would happen if notification logic were placed directly inside POST /tasks?</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#cbd5e1' }}>
                    If slow side-effects (e.g., SMTP email sending or 2-second webhooks) were executed inline before <code>res.json()</code>, the HTTP client would wait at least 2,000ms+ for each task creation. By decoupling with <code>taskEvents.emit('task-created')</code>, API latency drops from &gt;2000ms to &lt;20ms.
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#38bdf8' }}>Q3. Why EventEmitter for this scale vs. external Message Queues in production?</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#cbd5e1' }}>
                    <code>EventEmitter</code> runs purely in-process with zero external dependencies (no Redis/RabbitMQ required). However, events live in RAM: if the Node server restarts or crashes, pending in-memory events are lost, and events cannot be distributed across multiple cluster workers. At production enterprise scale (&gt;millions/day), message brokers (Kafka/BullMQ/RabbitMQ) provide persistence, distributed workers, retries, and backpressure.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Event Stream List */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent Background Events Stream ({events.length})
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Demonstrating: API Response Time &lt; Event Completion Time
              </span>
            </div>

            {events.length === 0 ? (
              <div
                style={{
                  padding: '30px',
                  textAlign: 'center',
                  background: 'rgba(8, 12, 24, 0.4)',
                  borderRadius: '12px',
                  color: '#94a3b8',
                  fontSize: '0.88rem'
                }}
              >
                <Clock size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                <p>No background events recorded yet. Create or delete a task to trigger background events!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto' }}>
                {events.map((evt) => {
                  const badge = getEventBadge(evt.event);
                  const Icon = badge.icon;
                  const isProcessing = evt.status === 'processing';

                  return (
                    <div
                      key={evt.id}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        background: 'rgba(10, 18, 38, 0.65)',
                        border: `1px solid ${badge.border}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              background: badge.bg,
                              color: badge.color,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase'
                            }}
                          >
                            <Icon size={12} />
                            {badge.label}
                          </span>

                          <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                            {evt.taskTitle || evt.error || 'System Event'}
                          </span>
                        </div>

                        {/* Status Tag */}
                        <div>
                          {isProcessing ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.75rem',
                                color: '#fbbf24',
                                background: 'rgba(251, 191, 36, 0.15)',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}
                            >
                              <RefreshCw size={12} className="animate-spin" />
                              2s Background Processing...
                            </span>
                          ) : evt.status === 'failed' ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.75rem',
                                color: '#fb7185',
                                background: 'rgba(251, 113, 133, 0.15)',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}
                            >
                              <AlertTriangle size={12} />
                              Caught & Handled
                            </span>
                          ) : (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.75rem',
                                color: '#34d399',
                                background: 'rgba(52, 211, 153, 0.15)',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}
                            >
                              <CheckCircle size={12} />
                              Completed (+{evt.durationMs || 2000}ms lag)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Message and Timestamps */}
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>
                        {evt.message || evt.error}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '16px',
                          fontSize: '0.75rem',
                          color: '#94a3b8',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingTop: '6px',
                          marginTop: '4px'
                        }}
                      >
                        {evt.apiResponseTime && (
                          <span>
                            <strong style={{ color: '#38bdf8' }}>⚡ API Response Sent:</strong>{' '}
                            {new Date(evt.apiResponseTime).toLocaleTimeString()} ({evt.apiResponseTime})
                          </span>
                        )}
                        {evt.listenerStartTime && (
                          <span>
                            <strong style={{ color: '#fbbf24' }}>⏱ Listener Started:</strong>{' '}
                            {new Date(evt.listenerStartTime).toLocaleTimeString()}
                          </span>
                        )}
                        {evt.completedTime && (
                          <span>
                            <strong style={{ color: '#34d399' }}>✓ Completed in Background:</strong>{' '}
                            {new Date(evt.completedTime).toLocaleTimeString()}
                          </span>
                        )}
                        {evt.user && (
                          <span>
                            <strong style={{ color: '#c084fc' }}>User ID:</strong> {evt.user}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
