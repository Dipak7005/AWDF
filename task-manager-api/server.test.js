const request = require('supertest');
const app = require('./server');

describe('Task Management API - CI/CD Automated Test Suite', () => {

  // Test 1: Verify Cache Stats Endpoint (Public)
  test('GET /api/cache-stats returns 200 and cache statistics', async () => {
    const res = await request(app).get('/api/cache-stats');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('hits');
    expect(res.body).toHaveProperty('misses');
  });

  // Test 2: Verify Background Event Stream Endpoint (Public)
  test('GET /api/events returns 200 and background events list', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 3: Verify Error Event Trigger Endpoint
  test('POST /api/events/test-error returns 200 and message', async () => {
    const res = await request(app)
      .post('/api/events/test-error')
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  // Test 4: Verify Protected /tasks Route blocks unauthorized requests
  test('GET /tasks returns 401 when no JWT token is provided', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(401);
  });

});
