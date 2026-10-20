require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Task = require('./models/Task');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const {
  cache,
  trackHit,
  trackMiss,
  getCacheStats,
  resetStats,
  invalidateUserCache
} = require('./utils/cache');

// Practical 10: Import EventEmitter and Register Listeners (Steps 1 & 2)
const taskEvents = require('./events');
require('./listeners');

const app = express();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 1. CORS & Body Parser Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 2. Global Request Logger & Performance Response Time Middleware
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} [${timeInMs}ms]`);
  });
  next();
});

// 3. JSON Header Check Middleware (Applies to POST and PUT requests)
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
  }
  next();
});

// 4. ObjectId Validation Middleware (Route-level for /tasks/:id)
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Task ID format. Must be a 24-character hexadecimal ObjectId.' });
  }
  next();
};

// --- AUTHENTICATION ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// --- CACHE DEBUG & METRICS ENDPOINTS ---
app.get('/api/cache-stats', (req, res) => {
  res.status(200).json(getCacheStats());
});
app.post('/api/cache-reset', (req, res) => {
  resetStats();
  res.status(200).json({ message: 'Cache and statistics reset successfully' });
});

// --- PRACTICAL 10: EVENT EMITTER MONITORING & AUDIT ENDPOINTS ---
app.get('/api/events', (req, res) => {
  res.status(200).json(taskEvents.getLogs());
});
app.get('/events', (req, res) => {
  res.status(200).json(taskEvents.getLogs());
});
app.post('/api/events/test-error', (req, res) => {
  // Supplementary Problem 2: Trigger error event listener
  taskEvents.emit('error', new Error('Simulated Background Notification Failure: External Webhook/SMTP timed out'));
  res.status(200).json({
    message: 'Simulated background error emitted and safely handled by taskEvents error listener',
    timestamp: new Date().toISOString()
  });
});

// --- PROTECTED TASK ROUTE HANDLERS ---
const taskRouter = express.Router();
taskRouter.use(auth); // Enforce JWT auth token verification middleware on all task routes

// 1. CREATE TASK - POST /tasks (Status 201) - Invalidates Cache
taskRouter.post('/', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    // Server-side input validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        error: 'Validation Error',
        details: ['Task title is required and must be a non-empty string.']
      });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        error: 'Validation Error',
        details: [`'${priority}' is not a valid priority. Allowed values: low, medium, high.`]
      });
    }

    const task = new Task({
      user: req.user.id,
      title: title.trim(),
      description,
      completed: Boolean(completed),
      priority: priority || 'medium'
    });

    await task.save();

    // Cache Invalidation on Write Operation
    invalidateUserCache(req.user.id);

    // Practical 10: Step 3 - Send API response immediately, then emit task-created event
    const apiResponseTime = new Date().toISOString();
    console.log(`[API] Response sent at ${apiResponseTime} for task: "${task.title}" (Status: 201 Created)`);
    res.status(201).json(task);

    // Emit event asynchronously to background listeners without blocking API response
    taskEvents.emit('task-created', task, { apiResponseTime });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation Error', details: messages });
    }
    next(err);
  }
});

// 2. READ ALL TASKS - GET /tasks (Status 200) - In-Memory Caching (node-cache)
taskRouter.get('/', async (req, res, next) => {
  try {
    const cacheKey = `tasks_all_${req.user.id}`;
    const cachedTasks = cache.get(cacheKey);

    if (cachedTasks) {
      trackHit();
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(cachedTasks);
    }

    trackMiss();
    res.setHeader('X-Cache', 'MISS');
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    cache.set(cacheKey, tasks);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// 3. READ SINGLE TASK - GET /tasks/:id (Status 200 / 404) - In-Memory Caching
taskRouter.get('/:id', validateId, async (req, res, next) => {
  try {
    const cacheKey = `task_single_${req.user.id}_${req.params.id}`;
    const cachedTask = cache.get(cacheKey);

    if (cachedTask) {
      trackHit();
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(cachedTask);
    }

    trackMiss();
    res.setHeader('X-Cache', 'MISS');
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    cache.set(cacheKey, task);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

// 4. UPDATE TASK - PUT /tasks/:id (Status 200) - Invalidates Cache
taskRouter.put('/:id', validateId, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const updateData = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          error: 'Validation Error',
          details: ['Task title must be a non-empty string.']
        });
      }
      updateData.title = title.trim();
    }

    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = Boolean(completed);

    if (priority !== undefined) {
      if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
          error: 'Validation Error',
          details: [`'${priority}' is not a valid priority. Allowed values: low, medium, high.`]
        });
      }
      updateData.priority = priority;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    // Cache Invalidation on Update Write Operation
    invalidateUserCache(req.user.id, req.params.id);

    res.status(200).json(updatedTask);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation Error', details: messages });
    }
    next(err);
  }
});

// 5. DELETE TASK - DELETE /tasks/:id (Status 200) - Invalidates Cache
taskRouter.delete('/:id', validateId, async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    // Cache Invalidation on Delete Write Operation
    invalidateUserCache(req.user.id, req.params.id);

    // Practical 10: Supplementary Problem 1 - Send API response immediately, then emit task-deleted event
    const apiResponseTime = new Date().toISOString();
    console.log(`[API] Delete response sent at ${apiResponseTime} for task: "${deletedTask.title}" (Status: 200 OK)`);
    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });

    // Emit task-deleted event to background listeners
    taskEvents.emit('task-deleted', deletedTask, { apiResponseTime });
  } catch (err) {
    next(err);
  }
});

// Mount task routes for both /api/tasks and /tasks
app.use('/api/tasks', taskRouter);
app.use('/tasks', taskRouter);

// 6. 404 Catch-All Middleware (Unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// 7. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server', details: [err.message] });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

