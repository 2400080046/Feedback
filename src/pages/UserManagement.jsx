import React, { useState } from 'react';
import { INSTRUCTORS, STUDENTS } from '../data/dummyData';
import { UserPlus, Search, Filter, MoreVertical, Edit3, Trash2, Shield, User } from 'lucide-react';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [searchTerm, setSearchTerm] = useState('');

    const users = activeTab === 'students' ? STUDENTS : INSTRUCTORS;
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-mgmt-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">User Management</h1>
                    <p className="page-subtitle">Manage institutional access, roles, and faculty assignments.</p>
                </div>
                <button className="add-user-btn">
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            <div className="mgmt-controls">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'students' ? 'active' : ''}`}
                        onClick={() => setActiveTab('students')}
                    >
                        Students
                    </button>
                    <button
                        className={`tab ${activeTab === 'instructors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('instructors')}
                    >
                        Instructors
                    </button>
                    <button className="tab">Admins</button>
                </div>
                <div className="search-group">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn"><Filter size={18} /></button>
                </div>
            </div>

            <div className="users-table-card">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User Details</th>
                            <th>Email</th>
                            <th>{activeTab === 'students' ? 'Major / Semester' : 'Department'}</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar">{user.name.charAt(0)}</div>
                                        <div>
                                            <p className="font-bold">{user.name}</p>
                                            <span className="user-id">ID: {user.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="email-cell">{user.email}</td>
                                <td>
                                    {activeTab === 'students' ? (
                                        <div className="academic-tag">
                                            {user.major} • Sem {user.semester}
                                        </div>
                                    ) : (
                                        <div className="dept-tag">{user.dept}</div>
                                    )}
                                </td>
                                <td>
                                    <span className="status-active">Active</span>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button className="icon-action"><Edit3 size={16} /></button>
                                        <button className="icon-action"><Shield size={16} /></button>
                                        <button className="icon-action delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .user-mgmt-page {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .page-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }

                .page-subtitle {
                    color: #64748b;
                    margin-top: 4px;
                    font-size: 15px;
                }

                .add-user-btn {
                    padding: 10px 24px;
                    background: #2563eb;
                    color: white;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .mgmt-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .tabs {
                    display: flex;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: 12px;
                    gap: 4px;
                }

                .tab {
                    padding: 8px 20px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #64748b;
                    transition: 0.2s;
                }

                .tab.active {
                    background: white;
                    color: #2563eb;
                    box-shadow: 0 4px 10px -5px rgba(0,0,0,0.1);
                }

                .search-group {
                    display: flex;
                    gap: 12px;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 0 16px;
                    height: 44px;
                    border-radius: 12px;
                    width: 300px;
                }

                .search-box input {
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 14px;
                }

                .filter-btn {
                    width: 44px;
                    height: 44px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                }

                .users-table-card {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                }

                .users-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .users-table th {
                    padding: 16px 32px;
                    background: #f8fafc;
                    font-size: 12px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                }

                .users-table td {
                    padding: 20px 32px;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 14px;
                    color: #0f172a;
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    background: #eff6ff;
                    color: #2563eb;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                }

                .user-id { font-size: 11px; color: #94a3b8; font-weight: 600; }
                .email-cell { color: #64748b; }
                
                .academic-tag, .dept-tag {
                    display: inline-flex;
                    padding: 4px 12px;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .status-active {
                    color: #16a34a;
                    background: #f0fdf4;
                    padding: 4px 10px;
                    border-radius: 99px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .action-row {
                    display: flex;
                    gap: 8px;
                }

                .icon-action {
                    width: 34px;
                    height: 34px;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                    transition: 0.2s;
                }

                .icon-action:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }

                .icon-action.delete:hover {
                    color: #ef4444;
                    background: #fef2f2;
                    border-color: #fee2e2;
                }

                .font-bold { font-weight: 700; }

                @media (max-width: 1024px) {
                    .mgmt-controls { flex-direction: column; align-items: stretch; gap: 16px; }
                    .search-box { width: 100%; }
                }
                `
            }} />
        </div>
    );
};

export default UserManagement;
