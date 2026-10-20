const http = require('http');

function makeRequest(path, method = 'GET', headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const diff = process.hrtime(start);
        const durationMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          cacheHeader: res.headers['x-cache'] || 'N/A',
          durationMs: parseFloat(durationMs),
          body: data ? JSON.parse(data) : {}
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function testFullSuite() {
  console.log('=== PRACTICAL 9: IN-MEMORY CACHING & QUERY OPTIMIZATION BENCHMARK ===\n');

  // Authenticate
  const email = `bench_${Date.now()}@example.com`;
  const password = 'password123';
  await makeRequest('/api/auth/register', 'POST', {}, { name: 'Benchmark User', email, password });
  const loginRes = await makeRequest('/api/auth/login', 'POST', {}, { email, password });
  const token = loginRes.body.token;
  const headers = { 'Authorization': `Bearer ${token}` };

  // Create initial tasks
  const t1 = await makeRequest('/api/tasks', 'POST', headers, { title: 'Benchmark Task 1', priority: 'high' });
  const taskId = t1.body._id;

  // Reset Stats
  await makeRequest('/api/cache-reset', 'POST');

  console.log('--- 1. GET /api/tasks (All Tasks Endpoint Readings) ---');
  const allReadingsUncached = [];
  const allReadingsCached = [];

  // Reading 1: Uncached (MISS)
  const r1 = await makeRequest('/api/tasks', 'GET', headers);
  allReadingsUncached.push(r1.durationMs);
  console.log(`Read 1 (Uncached DB Read): ${r1.durationMs} ms | X-Cache: ${r1.cacheHeader}`);

  // Reading 2 & 3: Cached (HIT)
  const r2 = await makeRequest('/api/tasks', 'GET', headers);
  allReadingsCached.push(r2.durationMs);
  console.log(`Read 2 (Cached Memory Read): ${r2.durationMs} ms | X-Cache: ${r2.cacheHeader}`);

  const r3 = await makeRequest('/api/tasks', 'GET', headers);
  allReadingsCached.push(r3.durationMs);
  console.log(`Read 3 (Cached Memory Read): ${r3.durationMs} ms | X-Cache: ${r3.cacheHeader}`);

  // Reading 4: Force Uncached MISS after Invalidation
  await makeRequest('/api/tasks', 'POST', headers, { title: 'Invalidation Task' });
  const r4 = await makeRequest('/api/tasks', 'GET', headers);
  allReadingsUncached.push(r4.durationMs);
  console.log(`Read 4 (Post-Invalidation DB Read): ${r4.durationMs} ms | X-Cache: ${r4.cacheHeader}`);

  // Reading 5: Re-cached HIT
  const r5 = await makeRequest('/api/tasks', 'GET', headers);
  allReadingsCached.push(r5.durationMs);
  console.log(`Read 5 (Re-cached Memory Read): ${r5.durationMs} ms | X-Cache: ${r5.cacheHeader}`);

  console.log('\n--- 2. GET /api/tasks/:id (Single Task Endpoint Supplementary Problem) ---');
  const single1 = await makeRequest(`/api/tasks/${taskId}`, 'GET', headers);
  console.log(`Single Task Read 1 (MISS): ${single1.durationMs} ms | X-Cache: ${single1.cacheHeader}`);

  const single2 = await makeRequest(`/api/tasks/${taskId}`, 'GET', headers);
  console.log(`Single Task Read 2 (HIT):  ${single2.durationMs} ms | X-Cache: ${single2.cacheHeader}`);

  console.log('\n--- 3. Debug Metrics Endpoint (/api/cache-stats) ---');
  const stats = await makeRequest('/api/cache-stats', 'GET');
  console.log(JSON.stringify(stats.body, null, 2));
}

testFullSuite().catch(console.error);
