const API_BASE_URL = 'http://localhost:5000';

const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = data.details
      ? (Array.isArray(data.details) ? data.details.join(', ') : data.details)
      : (data.error || `HTTP error ${response.status}`);
    throw new Error(errorMessage);
  }
  return data;
};

export const api = {
  // Authentication API calls
  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password })
    });
    return handleResponse(res);
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  getMe: async (token) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: getHeaders(token)
    });
    return handleResponse(res);
  },

  // Task Management API calls (Protected with JWT)
  getTasks: async (token) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: getHeaders(token)
    });
    return handleResponse(res);
  },

  createTask: async (token, taskData) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(taskData)
    });
    return handleResponse(res);
  },

  updateTask: async (token, id, updateData) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(updateData)
    });
    return handleResponse(res);
  },

  deleteTask: async (token, id) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    return handleResponse(res);
  },

  // Practical 10: Event Emitter Background Processing API calls
  getEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  triggerTestError: async () => {
    const res = await fetch(`${API_BASE_URL}/api/events/test-error`, {
      method: 'POST',
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};
