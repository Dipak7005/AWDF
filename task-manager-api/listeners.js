const taskEvents = require('./events');

/**
 * Register Event Listeners for Task Events
 * Step 2 & Supplementary Problems Implementation
 */

// 1. Task Created Listener (Main Practical Requirement + Supplementary Slow Handler Simulation)
taskEvents.on('task-created', (task, metadata = {}) => {
  const listenerStartTime = new Date();
  const apiTimestamp = metadata.apiResponseTime || 'N/A';

  console.log(`\n======================================================`);
  console.log(`[Event Received] 'task-created' event triggered!`);
  console.log(`[Notification] Task "${task.title}" created at ${listenerStartTime.toISOString()}`);
  console.log(`[Notification] Assigned User ID: ${task.user}`);
  console.log(`[Timing Evidence] API responded at:      ${apiTimestamp}`);
  console.log(`[Timing Evidence] Listener triggered at:  ${listenerStartTime.toISOString()}`);
  console.log(`======================================================`);

  // Initial event entry logged immediately as "processing"
  const logEntry = {
    event: 'task-created',
    taskId: task._id ? task._id.toString() : 'unknown',
    taskTitle: task.title,
    user: task.user ? task.user.toString() : 'unknown',
    apiResponseTime: apiTimestamp,
    listenerStartTime: listenerStartTime.toISOString(),
    completedTime: null,
    status: 'processing',
    message: `Background email & push notification dispatching for task "${task.title}"...`
  };
  taskEvents.logEvent(logEntry);

  try {
    // Supplementary Problem: Artificial delay (setTimeout of 2 seconds) to simulate slow external service (e.g. SMTP/Webhook)
    // and demonstrate that the API has ALREADY returned to the client before this finishes.
    const SIMULATED_DELAY_MS = 2000;

    setTimeout(() => {
      const completionTime = new Date();
      console.log(`\n------------------------------------------------------`);
      console.log(`[Notification Completed] Simulated 2s background job finished!`);
      console.log(`[Notification] Dispatched alert for task: "${task.title}"`);
      console.log(`[Timing Evidence] Listener finished at:   ${completionTime.toISOString()}`);
      console.log(`[Timing Evidence] Total async lag:       ~${completionTime - listenerStartTime}ms`);
      console.log(`------------------------------------------------------\n`);

      // Update log in event history
      logEntry.status = 'completed';
      logEntry.completedTime = completionTime.toISOString();
      logEntry.durationMs = completionTime - listenerStartTime;
      logEntry.message = `Notification successfully delivered to assigned user ${task.user} in background.`;
    }, SIMULATED_DELAY_MS);
  } catch (err) {
    // Forward error to error event listener
    taskEvents.emit('error', err);
  }
});

// 2. Task Deleted Listener (Supplementary Problem 1)
taskEvents.on('task-deleted', (task, metadata = {}) => {
  const listenerStartTime = new Date();
  const apiTimestamp = metadata.apiResponseTime || 'N/A';

  console.log(`\n======================================================`);
  console.log(`[Event Received] 'task-deleted' event triggered!`);
  console.log(`[Cleanup Listener] Task "${task.title}" (ID: ${task._id}) deleted at ${listenerStartTime.toISOString()}`);
  console.log(`[Cleanup Listener] Associated User: ${task.user}`);
  console.log(`[Timing Evidence] API responded at:      ${apiTimestamp}`);
  console.log(`======================================================`);

  const logEntry = {
    event: 'task-deleted',
    taskId: task._id ? task._id.toString() : 'unknown',
    taskTitle: task.title,
    user: task.user ? task.user.toString() : 'unknown',
    apiResponseTime: apiTimestamp,
    listenerStartTime: listenerStartTime.toISOString(),
    completedTime: null,
    status: 'processing',
    message: `Background purge & audit logging for deleted task "${task.title}"...`
  };
  taskEvents.logEvent(logEntry);

  // Simulate background cleanup (1s delay)
  setTimeout(() => {
    const completionTime = new Date();
    console.log(`[Cleanup Completed] Background archive completed for "${task.title}" at ${completionTime.toISOString()}`);
    logEntry.status = 'completed';
    logEntry.completedTime = completionTime.toISOString();
    logEntry.durationMs = completionTime - listenerStartTime;
    logEntry.message = `Audit log archived for task "${task.title}".`;
  }, 1000);
});

// 3. Error Event Listener (Supplementary Problem 2)
// Catches and logs any error thrown inside event handlers without crashing the Node.js process
taskEvents.on('error', (err) => {
  const errorTime = new Date().toISOString();
  console.error(`\n[EVENT ERROR CAUGHT] Error handled by EventEmitter at ${errorTime}:`);
  console.error(`Message: ${err.message}`);
  if (err.stack) console.error(err.stack);

  taskEvents.logEvent({
    event: 'error',
    error: err.message,
    timestamp: errorTime,
    status: 'failed',
    message: `Handled background error: ${err.message}`
  });
});

console.log('Task event listeners registered successfully: [task-created, task-deleted, error]');

module.exports = taskEvents;
