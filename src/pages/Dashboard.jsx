import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import './Dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchPlayerData = async () => {
            try {
                const response = await apiService.getProfile();
                setPlayerData(response.player);
            } catch (error) {
                console.error('Failed to fetch player data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getRankColor = (rank) => {
        const colors = {
            R5: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            R4: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
            R3: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            R2: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        };
        return colors[rank] || colors.R2;
    };

    const calculateKD = () => {
        if (!playerData?.playerData?.stats) return '0.00';
        const { kills, deaths } = playerData.playerData.stats;
        return deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2);
    };

    const calculateWinRate = () => {
        if (!playerData?.playerData?.stats) return '0%';
        const { wins, losses } = playerData.playerData.stats;
        const total = wins + losses;
        return total === 0 ? '0%' : `${((wins / total) * 100).toFixed(1)}%`;
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner">⟳</div>
                <p>Loading player data...</p>
            </div>
        );
    }

    if (!playerData) {
        return (
            <div className="dashboard-error">
                <h2>Failed to load player data</h2>
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>
        );
    }

    const { playerData: data } = playerData;

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="player-info">
                        <img 
                            src={data.avatar} 
                            alt={data.displayName}
                            className="player-avatar"
                        />
                        <div>
                            <h1 className="player-name">{data.displayName}</h1>
                            <p className="player-username">@{playerData.username}</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <span 
                            className="player-rank"
                            style={{ background: getRankColor(data.rank) }}
                        >
                            {data.rank}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <span className="stat-label">Level</span>
                        <span className="stat-value">{data.level}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">K/D Ratio</span>
                        <span className="stat-value">{calculateKD()}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Win Rate</span>
                        <span className="stat-value">{calculateWinRate()}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Games Played</span>
                        <span className="stat-value">{data.stats.gamesPlayed}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    <button 
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >
                        OVERVIEW
                    </button>
                    <button 
                        className={activeTab === 'stats' ? 'active' : ''}
                        onClick={() => setActiveTab('stats')}
                    >
                        STATISTICS
                    </button>
                    <button 
                        className={activeTab === 'achievements' ? 'active' : ''}
                        onClick={() => setActiveTab('achievements')}
                    >
                        ACHIEVEMENTS
                    </button>
                    <button 
                        className={activeTab === 'inventory' ? 'active' : ''}
                        onClick={() => setActiveTab('inventory')}
                    >
                        INVENTORY
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="info-section">
                                <h3>Account Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Email:</span>
                                        <span className="value">{playerData.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Member Since:</span>
                                        <span className="value">
                                            {new Date(playerData.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Last Login:</span>
                                        <span className="value">
                                            {new Date(playerData.lastLogin).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Experience:</span>
                                        <span className="value">{data.experience} XP</span>
                                    </div>
                                </div>
                            </div>

                            <div className="preferences-section">
                                <h3>Preferences</h3>
                                <div className="preferences-grid">
                                    <div className="pref-item">
                                        <span className="label">Theme:</span>
                                        <span className="value">{data.preferences.theme}</span>
                                    </div>
                                    <div className="pref-item">
                                        <span className="label">Notifications:</span>
                                        <span className="value">
                                            {data.preferences.notifications ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <div className="pref-item">
                                        <span className="label">Privacy:</span>
                                        <span className="value">{data.preferences.privacy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="stats-tab">
                            <h3>Combat Statistics</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="label">Games Played</span>
                                    <span className="value">{data.stats.gamesPlayed}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Wins</span>
                                    <span className="value wins">{data.stats.wins}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Losses</span>
                                    <span className="value losses">{data.stats.losses}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Kills</span>
                                    <span className="value">{data.stats.kills}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Deaths</span>
                                    <span className="value">{data.stats.deaths}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">K/D Ratio</span>
                                    <span className="value kd">{calculateKD()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="achievements-tab">
                            <h3>Unlocked Achievements</h3>
                            {data.achievements && data.achievements.length > 0 ? (
                                <div className="achievements-list">
                                    {data.achievements.map((achievement, index) => (
                                        <div key={index} className="achievement-card">
                                            <div className="achievement-icon">🏆</div>
                                            <div className="achievement-info">
                                                <h4>{achievement.name}</h4>
                                                <p>{achievement.description}</p>
                                                <span className="achievement-date">
                                                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>No achievements unlocked yet. Keep playing!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="inventory-tab">
                            <h3>Your Inventory</h3>
                            {data.inventory && data.inventory.length > 0 ? (
                                <div className="inventory-grid">
                                    {data.inventory.map((item, index) => (
                                        <div key={index} className="inventory-item">
                                            <div className="item-header">
                                                <span className="item-name">{item.itemName}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                            </div>
                                            <span className="item-type">{item.itemType}</span>
                                            <span className="item-date">
                                                Acquired: {new Date(item.acquiredAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>Your inventory is empty</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
