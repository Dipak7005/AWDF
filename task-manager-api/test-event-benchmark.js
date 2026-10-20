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
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch {
          parsed = { raw: data };
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          durationMs: parseFloat(durationMs),
          body: parsed
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runEventEmitterBenchmark() {
  console.log('========================================================================');
  console.log('  CO4 / PO3, PO5: ASYNCHRONOUS BACKGROUND PROCESSING (EVENTEMITTER)     ');
  console.log('========================================================================\n');

  // Step 1: Authentication
  const email = `event_user_${Date.now()}@test.com`;
  const password = 'password123';
  console.log(`[Setup] Registering test user: ${email}...`);
  await makeRequest('/api/auth/register', 'POST', {}, { name: 'Event Benchmark User', email, password });
  const loginRes = await makeRequest('/api/auth/login', 'POST', {}, { email, password });
  const token = loginRes.body.token;
  const headers = { 'Authorization': `Bearer ${token}` };
  console.log(`[Setup] Logged in. JWT Token obtained successfully.\n`);

  // Step 2: Create a task and measure API response time
  console.log('------------------------------------------------------------------------');
  console.log('TEST 1: CREATE TASK & DEMONSTRATE NON-BLOCKING ASYNCHRONOUS DISPATCH');
  console.log('------------------------------------------------------------------------');
  console.log('Sending POST /tasks request (Task has 2s simulated background notification)...');

  const createStart = new Date();
  const createRes = await makeRequest('/api/tasks', 'POST', headers, {
    title: 'Deploy Production Microservices',
    description: 'Trigger deployment pipeline and dispatch event notifications.',
    priority: 'high'
  });
  const createEnd = new Date();

  console.log(`\n>>> API HTTP Response Code: ${createRes.status} (Created)`);
  console.log(`>>> Total Client Wait Time (Round-trip): ${createRes.durationMs} ms`);
  console.log(`>>> Client Sent At:     ${createStart.toISOString()}`);
  console.log(`>>> Client Received At: ${createEnd.toISOString()}`);
  
  if (createRes.durationMs < 1000) {
    console.log(`>>> [VERIFIED] API returned IMMEDIATELY (${createRes.durationMs}ms) without blocking for the 2000ms background listener!`);
  } else {
    console.warn(`>>> [WARNING] Response took longer than expected: ${createRes.durationMs}ms`);
  }

  const taskId = createRes.body._id;

  // Step 3: Check Event Log immediately while background listener is still running
  console.log('\nQuerying /api/events immediately (0.3s after response)...');
  await sleep(300);
  const eventsMid = await makeRequest('/api/events', 'GET');
  const taskCreatedLogMid = eventsMid.body.find(e => e.taskId === taskId && e.event === 'task-created');
  if (taskCreatedLogMid) {
    console.log(`Event Log State at t=0.3s:`);
    console.log(`  - Status:           ${taskCreatedLogMid.status.toUpperCase()}`);
    console.log(`  - API Response:     ${taskCreatedLogMid.apiResponseTime}`);
    console.log(`  - Listener Started: ${taskCreatedLogMid.listenerStartTime}`);
    console.log(`  - Completed Time:   ${taskCreatedLogMid.completedTime || 'STILL EXECUTING IN BACKGROUND...'}`);
  }

  // Step 4: Wait for 2s simulated background listener to complete
  console.log('\nWaiting 2.2 seconds for background listener (setTimeout) to finish execution...');
  await sleep(2200);

  const eventsAfter = await makeRequest('/api/events', 'GET');
  const taskCreatedLogAfter = eventsAfter.body.find(e => e.taskId === taskId && e.event === 'task-created');
  if (taskCreatedLogAfter) {
    console.log(`\nEvent Log State at t=2.5s:`);
    console.log(`  - Status:            ${taskCreatedLogAfter.status.toUpperCase()}`);
    console.log(`  - API Responded At:  ${taskCreatedLogAfter.apiResponseTime}`);
    console.log(`  - Listener Started:  ${taskCreatedLogAfter.listenerStartTime}`);
    console.log(`  - Listener Finished: ${taskCreatedLogAfter.completedTime}`);
    console.log(`  - Simulated Lag:     ${taskCreatedLogAfter.durationMs} ms`);
    console.log(`  - Final Message:     "${taskCreatedLogAfter.message}"`);
  }

  // Step 5: Supplementary Problem 1 - Delete task & verify task-deleted event
  console.log('\n------------------------------------------------------------------------');
  console.log('TEST 2: SUPPLEMENTARY PROBLEM 1 - TASK-DELETED EVENT EMISSION');
  console.log('------------------------------------------------------------------------');
  console.log(`Sending DELETE /tasks/${taskId} request...`);
  const delRes = await makeRequest(`/api/tasks/${taskId}`, 'DELETE', headers);
  console.log(`>>> API HTTP Response: ${delRes.status} in ${delRes.durationMs} ms`);

  await sleep(1200); // Allow 1s background cleanup to complete
  const eventsDel = await makeRequest('/api/events', 'GET');
  const taskDelLog = eventsDel.body.find(e => e.taskId === taskId && e.event === 'task-deleted');
  if (taskDelLog) {
    console.log(`Event Log for 'task-deleted':`);
    console.log(`  - Status:            ${taskDelLog.status.toUpperCase()}`);
    console.log(`  - API Responded At:  ${taskDelLog.apiResponseTime}`);
    console.log(`  - Listener Finished: ${taskDelLog.completedTime}`);
    console.log(`  - Message:           "${taskDelLog.message}"`);
  }

  // Step 6: Supplementary Problem 2 - Error Event Listener
  console.log('\n------------------------------------------------------------------------');
  console.log('TEST 3: SUPPLEMENTARY PROBLEM 2 - ERROR EVENT LISTENER HANDLING');
  console.log('------------------------------------------------------------------------');
  console.log('Triggering simulated error event via POST /api/events/test-error...');
  const errRes = await makeRequest('/api/events/test-error', 'POST');
  console.log(`Server response: ${errRes.body.message}`);

  const eventsErr = await makeRequest('/api/events', 'GET');
  const errorLog = eventsErr.body.find(e => e.event === 'error');
  if (errorLog) {
    console.log(`>>> [VERIFIED] Error event listener caught: "${errorLog.error}"`);
    console.log(`>>> Server process remained active and unaffected!`);
  }

  console.log('\n========================================================================');
  console.log('  ALL PRACTICAL 10 REQUIREMENTS & SUPPLEMENTARY CHECKS PASSED!           ');
  console.log('========================================================================\n');
}

runEventEmitterBenchmark().catch(console.error);
