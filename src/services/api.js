// API base URL - Update this after deploying to Railway
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Remove auth token
    removeToken() {
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Get auth headers
    getHeaders(includeAuth = false) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Generic request handler
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: this.getHeaders(options.auth),
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (data.success && data.token) {
            this.setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    }

    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (data.success && data.token) {
            this.setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    }

    async getCurrentUser() {
        return await this.request('/auth/me', {
            method: 'GET',
            auth: true,
        });
    }

    async updatePassword(passwords) {
        return await this.request('/auth/password', {
            method: 'PUT',
            body: JSON.stringify(passwords),
            auth: true,
        });
    }

    logout() {
        this.removeToken();
    }

    // Player endpoints
    async getProfile() {
        return await this.request('/player/profile', {
            method: 'GET',
            auth: true,
        });
    }

    async updateProfile(profileData) {
        return await this.request('/player/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
            auth: true,
        });
    }

    async updateStats(stats) {
        return await this.request('/player/stats', {
            method: 'PUT',
            body: JSON.stringify(stats),
            auth: true,
        });
    }

    async addAchievement(achievement) {
        return await this.request('/player/achievement', {
            method: 'POST',
            body: JSON.stringify(achievement),
            auth: true,
        });
    }

    async addInventoryItem(item) {
        return await this.request('/player/inventory', {
            method: 'POST',
            body: JSON.stringify(item),
            auth: true,
        });
    }

    async getLeaderboard() {
        return await this.request('/player/leaderboard', {
            method: 'GET',
            auth: true,
        });
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Get stored user data
    getStoredUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}

export default new ApiService();
