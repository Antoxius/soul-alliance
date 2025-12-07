import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const { login, register, error } = useAuth();
    
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setFormError('');
    };

    const validateForm = () => {
        if (isLogin) {
            if (!formData.email && !formData.username) {
                setFormError('Please enter email or username');
                return false;
            }
            if (!formData.password) {
                setFormError('Please enter password');
                return false;
            }
        } else {
            if (!formData.username || formData.username.length < 3) {
                setFormError('Username must be at least 3 characters');
                return false;
            }
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
                setFormError('Please enter a valid email');
                return false;
            }
            if (!formData.password || formData.password.length < 6) {
                setFormError('Password must be at least 6 characters');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setFormError('Passwords do not match');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setFormError('');

        try {
            if (isLogin) {
                await login({
                    email: formData.email || undefined,
                    username: formData.username || undefined,
                    password: formData.password
                });
            } else {
                await register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    displayName: formData.displayName || formData.username
                });
            }
            navigate('/dashboard');
        } catch (err) {
            setFormError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormError('');
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            displayName: ''
        });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1 className="login-title">
                        {isLogin ? 'WELCOME BACK' : 'JOIN THE ALLIANCE'}
                    </h1>
                    <p className="login-subtitle">
                        {isLogin 
                            ? 'Sign in to access your player account' 
                            : 'Create your account and start your journey'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {formError && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {formError}
                        </div>
                    )}

                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="username">Username *</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="displayName">Display Name</label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    placeholder="How others see you (optional)"
                                    disabled={loading}
                                />
                            </div>
                        </>
                    )}

                    {isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username or Email *</label>
                            <input
                                type="text"
                                id="loginInput"
                                name="loginInput"
                                value={formData.username || formData.email}
                                onChange={(e) => {
                                    if (e.target.value.includes('@')) {
                                        setFormData({ ...formData, email: e.target.value, username: '' });
                                    } else {
                                        setFormData({ ...formData, username: e.target.value, email: '' });
                                    }
                                }}
                                placeholder="Enter username or email"
                                disabled={loading}
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                disabled={loading}
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">⟳</span>
                        ) : isLogin ? (
                            'SIGN IN'
                        ) : (
                            'CREATE ACCOUNT'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            type="button" 
                            onClick={toggleMode}
                            className="toggle-btn"
                            disabled={loading}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

                <div className="security-notice">
                    <span>🔒</span>
                    <p>Your data is encrypted and securely stored</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
