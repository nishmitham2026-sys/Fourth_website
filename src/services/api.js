import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Inject JWT token into headers for every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  signup: async (username, email, password, confirmPassword, role, proofreaderDetails) => {
    const response = await api.post('/api/auth/signup', {
      username,
      email,
      password,
      confirmPassword,
      role,
      proofreaderDetails,
    });
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post('/api/auth/forgot-password', { email }, { responseType: 'text' });
    return response.data;
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('musicList_guest');
  },
};

export const lyricsService = {
  getMusicList: async (language) => {
    const email = localStorage.getItem('email') || '';
    const response = await api.get(`/api/lyrics/api/compositions?language=${language}&email=${email}`);
    return response.data;
  },
  getMusicLyrics: async (search, language) => {
    const response = await api.get(`/api/lyrics/pdf/?search=${encodeURIComponent(search)}&language=${language}`);
    return response.data;
  },
  getSongDetails: async (id) => {
    const response = await api.get(`/api/lyrics/fetch?id=${id}`);
    return response.data;
  },
  getEditedTitles: async () => {
    const response = await api.get('/api/lyrics/editedTitle');
    return response.data;
  },
  getEditedSongsWithDescription: async () => {
    const response = await api.get('/api/lyrics/editedSongsWithDescription');
    return response.data;
  },
  updateSong: async (song) => {
    const response = await api.put('/api/lyrics/updateSongs', song, { responseType: 'text' });
    return response.data;
  },
  deleteSong: async (id) => {
    const response = await api.delete(`/api/lyrics/deleteSongs?id=${id}`, { responseType: 'text' });
    return response.data;
  },
};

export const adminService = {
  getVisitorLogs: async () => {
    const response = await api.get('/api/user/auditLogs');
    return response.data;
  },
  getUserCounts: async () => {
    const response = await api.get('/api/user/usersCount');
    return response.data;
  },
  getPendingRequests: async () => {
    const response = await api.get('/api/user/request');
    return response.data;
  },
  getActiveUserCount: async () => {
    const response = await api.get('/api/user/active-user-count');
    return response.data;
  },
  getProofreaderDetails: async () => {
    const response = await api.get('/api/user/proofreader');
    return response.data;
  },
  approveProofreader: async (proofreaderData) => {
    const adminEmail = localStorage.getItem('email') || '';
    const response = await api.post(`/api/user/approve-proofreader?email=${adminEmail}`, proofreaderData);
    return response.data;
  },
  cancelProofreaderApproval: async (proofreaderEmail) => {
    const response = await api.post(`/api/user/cancelproofreader?email=${proofreaderEmail}`);
    return response.data;
  },
};

export const subscriptionService = {
  subscribeUser: async (days, email) => {
    const response = await api.post(`/api/user/subscribe?days=${days}&email=${email}`);
    return response.data;
  },
  cancelSubscription: async (email) => {
    const response = await api.post('/api/user/cancel-subscription', { email });
    return response.data;
  },
};

export default api;
