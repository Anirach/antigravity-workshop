import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeView, onViewChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: '📊',
            description: 'Overview & Stats'
        },
        {
            id: 'expenses',
            label: 'Expenses',
            icon: '💰',
            description: 'Manage Expenses'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: '📈',
            description: 'Reports & Insights'
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: '⚙️',
            description: 'Preferences'
        }
    ];

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">💸</span>
                    {!isCollapsed && <span className="logo-text">ExpenseTracker</span>}
                </div>
                <button
                    className="collapse-btn"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul className="menu-list">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`menu-item ${activeView === item.id ? 'active' : ''}`}
                                onClick={() => onViewChange(item.id)}
                                title={item.label}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                {!isCollapsed && (
                                    <div className="menu-content">
                                        <span className="menu-label">{item.label}</span>
                                        <span className="menu-description">{item.description}</span>
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {!isCollapsed && (
                    <div className="user-profile">
                        <div className="user-avatar">👤</div>
                        <div className="user-info">
                            <span className="user-name">User</span>
                            <span className="user-email">user@example.com</span>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
