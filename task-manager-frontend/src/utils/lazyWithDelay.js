import { lazy } from 'react';

/**
 * Lazy loads a component with an optional minimum delay to prevent UI flickering on fast network connections.
 * @param {Function} factory - Dynamic import function, e.g. () => import('./pages/Projects')
 * @param {number} minDelayMs - Minimum delay in milliseconds (default: 300ms)
 */
export function lazyWithDelay(factory, minDelayMs = 300) {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise(resolve => setTimeout(resolve, minDelayMs))
    ]).then(([moduleExports]) => moduleExports)
  );
}
