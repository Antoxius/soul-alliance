import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        const initAuth = async () => {
            if (apiService.isAuthenticated()) {
                try {
                    const response = await apiService.getCurrentUser();
                    setUser(response.user);
                } catch (err) {
                    console.error('Auth init error:', err);
                    apiService.logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await apiService.login(credentials);
            setUser(response.user);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await apiService.register(userData);
            setUser(response.user);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        apiService.logout();
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            const response = await apiService.updateProfile(userData);
            setUser(response.player);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
