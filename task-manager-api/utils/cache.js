const NodeCache = require('node-cache');

// Initialize in-memory cache with standard TTL of 60 seconds and check period of 120 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Hit / Miss counter tracking for debug & analysis endpoint
let hitCount = 0;
let missCount = 0;

const trackHit = () => {
  hitCount++;
};

const trackMiss = () => {
  missCount++;
};

const getCacheStats = () => {
  const keys = cache.keys();
  const total = hitCount + missCount;
  const hitRatio = total > 0 ? ((hitCount / total) * 100).toFixed(2) + '%' : '0%';

  return {
    hits: hitCount,
    misses: missCount,
    totalRequests: total,
    hitRatio: hitRatio,
    cachedKeysCount: keys.length,
    cachedKeys: keys,
    nodeCacheInternalStats: cache.getStats()
  };
};

const resetStats = () => {
  hitCount = 0;
  missCount = 0;
  cache.flushAll();
};

const invalidateUserCache = (userId, taskId = null) => {
  // Invalidate all-tasks list for this user
  cache.del(`tasks_all_${userId}`);
  cache.del('all_tasks');

  // If specific task ID is provided, invalidate single-task cache entry as well
  if (taskId) {
    cache.del(`task_single_${userId}_${taskId}`);
  }
};

module.exports = {
  cache,
  trackHit,
  trackMiss,
  getCacheStats,
  resetStats,
  invalidateUserCache
};
