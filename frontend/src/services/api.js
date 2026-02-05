import axios from 'axios';

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add interceptor to include token if present
apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const api = {
    // Kines
    getKines: async () => {
        const response = await apiInstance.get('/kines');
        return response.data;
    },
    getKin: async (number) => {
        const response = await apiInstance.get(`/kines/${number}`);
        return response.data;
    },
    getDailyKin: async () => {
        const response = await apiInstance.get('/kines/today');
        return response.data;
    },

    getKinByDate: async (date) => {
        const response = await apiInstance.get(`/kines/date/${date}`);
        return response.data;
    },

    // Auth
    login: async (credentials) => {
        // Sanctum CSRF cookie for SPA - Call root instead of /api
        const rootUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8001/api').replace('/api', '');
        await axios.get(`${rootUrl}/sanctum/csrf-cookie`, { withCredentials: true });
        const response = await apiInstance.post('/login', credentials);
        return response.data;
    },
    register: async (data) => {
        const rootUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8001/api').replace('/api', '');
        await axios.get(`${rootUrl}/sanctum/csrf-cookie`, { withCredentials: true });
        const response = await apiInstance.post('/register', data);
        return response.data;
    },
    logout: async () => {
        const response = await apiInstance.post('/logout');
        return response.data;
    },
    getUser: async () => {
        const response = await apiInstance.get('/user');
        return response.data;
    },

    // AI Assistant (via Google Apps Script - using GET for CORS compatibility)
    askAssistant: async (text, history = [], context = null) => {
        // Production: Google Apps Script | Dev: localhost
        const baseUrl = import.meta.env.VITE_ASSISTANT_URL ||
            'https://script.google.com/macros/s/AKfycbyc8SipUa7FqlqnBWVlqTy4rbmtMEjhFbmP2AmQ-JftZmuzfuaD2-xSPqv6L4qL0arjYg/exec';

        // Use POST to avoid URL length limits with long history.
        // We use text/plain to comply with GAS CORS simple requests, 
        // sending the JSON string as the body.

        const payload = {
            text: text,
            history: history,
            context: context // ChatAssistant passes a clean object now
        };

        const response = await axios.post(baseUrl, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return response.data;
    }
};

export default api;
