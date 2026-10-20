const EventEmitter = require('events');

/**
 * TaskEvents - Dedicated EventEmitter for Task Management System
 * CO4 / PO3, PO5: Asynchronous background processing using Node.js native EventEmitter
 */
class TaskEvents extends EventEmitter {
  constructor() {
    super();
    // In-memory log of recent background events for auditing and frontend visualization
    this.eventLogs = [];
    this.maxLogs = 50;
  }

  logEvent(entry) {
    if (!entry.id) {
      entry.id = 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    }
    this.eventLogs.unshift(entry);
    if (this.eventLogs.length > this.maxLogs) {
      this.eventLogs.pop();
    }
    return entry;
  }

  getLogs() {
    return this.eventLogs;
  }

  clearLogs() {
    this.eventLogs = [];
  }
}

// Export singleton instance as specified by Lab Step 1
module.exports = new TaskEvents();
