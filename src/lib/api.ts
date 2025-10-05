import axios from 'axios';
import { IEventInput } from '@/modules/submit/model';

const apiClient = axios.create({
  baseURL: 'http://your-backend.render.com', // This will be replaced with the actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to add the auth token to requests.
 * In a real app, the token would be retrieved from a global state manager (like Context or Redux) or secure storage.
 */
apiClient.interceptors.request.use((config) => {
  // This is a placeholder for where auth logic would go.
  // We'll assume for now that the token is stored in localStorage.
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API Functions ---

export const getEvents = async (filters: { location?: string, category?: string, limit?: number, skip?: number } = {}) => {
  const { data } = await apiClient.get('/events', { params: filters });
  return data;
};

export const createEvent = async (eventData: IEventInput) => {
  const { data } = await apiClient.post('/events', eventData);
  return data;
};

export const upvoteEvent = async (id: string) => {
  const { data } = await apiClient.post(`/events/${id}/upvote`);
  return data;
};

export const flagEvent = async (id: string) => {
  const { data } = await apiClient.post(`/events/${id}/flag`);
  return data;
};

export const loginWithX = () => {
  // In a real application, this would trigger a redirect to the backend OAuth endpoint.
  // For now, it's a placeholder.
  console.log('Redirecting to X for authentication...');
  // Example: window.location.href = `${apiClient.defaults.baseURL}/auth/twitter`;
};

export default apiClient;