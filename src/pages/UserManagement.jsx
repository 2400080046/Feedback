import React, { useState } from 'react';
import { INSTRUCTORS, STUDENTS } from '../data/dummyData';
import { UserPlus, Search, Filter, MoreVertical, Edit3, Trash2, Shield, User, X, Check, AlertTriangle } from 'lucide-react';

const UserModal = ({ title, user, onClose, onSubmit, type }) => {
    const [formData, setFormData] = useState(user || {
        name: '',
        email: '',
        major: '',
        semester: '1',
        dept: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    {type === 'students' ? (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Major</label>
                                <input
                                    type="text"
                                    value={formData.major}
                                    onChange={e => setFormData({ ...formData, major: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Semester</label>
                                <select
                                    value={formData.semester}
                                    onChange={e => setFormData({ ...formData, semester: e.target.value })}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                value={formData.dept}
                                onChange={e => setFormData({ ...formData, dept: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="modal-footer">
                        <button type="button" className="sec-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="pri-btn">
                            {user ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteModal = ({ user, onClose, onConfirm }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content glass delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-icon-wrapper">
                <AlertTriangle size={32} color="#ef4444" />
            </div>
            <h3>Remove User?</h3>
            <p>Are you sure you want to remove <strong>{user.name}</strong>? This action cannot be undone.</p>
            <div className="modal-footer">
                <button className="sec-btn" onClick={onClose}>Cancel</button>
                <button className="danger-btn" onClick={onConfirm}>Delete User</button>
            </div>
        </div>
    </div>
);

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const [allStudents, setAllStudents] = useState(STUDENTS);
    const [allInstructors, setAllInstructors] = useState(INSTRUCTORS);

    const users = activeTab === 'students' ? allStudents : allInstructors;
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (activeTab === 'students') {
            setAllStudents(allStudents.filter(u => u.id !== id));
        } else {
            setAllInstructors(allInstructors.filter(u => u.id !== id));
        }
        setUserToDelete(null);
    };

    const handleUpdate = (updatedUser) => {
        if (activeTab === 'students') {
            setAllStudents(allStudents.map(u => u.id === updatedUser.id ? updatedUser : u));
        } else {
            setAllInstructors(allInstructors.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
        setEditingUser(null);
    };

    const handleAdd = (newUser) => {
        const id = Date.now().toString();
        const userWithId = { ...newUser, id };
        if (activeTab === 'students') {
            setAllStudents([...allStudents, userWithId]);
        } else {
            setAllInstructors([...allInstructors, userWithId]);
        }
        setIsAddModalOpen(false);
    };

    return (
        <div className="user-mgmt-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">User Management</h1>
                    <p className="page-subtitle">Manage institutional access, roles, and faculty assignments.</p>
                </div>
                <button className="add-user-btn" onClick={() => setIsAddModalOpen(true)}>
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
                                        <button className="icon-action" onClick={() => setEditingUser(user)}>
                                            <Edit3 size={16} />
                                        </button>
                                        <button className="icon-action">
                                            <Shield size={16} />
                                        </button>
                                        <button className="icon-action delete" onClick={() => setUserToDelete(user)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Components */}
            {isAddModalOpen && (
                <UserModal
                    title="Add New User"
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAdd}
                    type={activeTab}
                />
            )}

            {editingUser && (
                <UserModal
                    title="Edit User"
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSubmit={handleUpdate}
                    type={activeTab}
                />
            )}

            {userToDelete && (
                <DeleteModal
                    user={userToDelete}
                    onClose={() => setUserToDelete(null)}
                    onConfirm={() => handleDelete(userToDelete.id)}
                />
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .user-mgmt-page {
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .page-title {
                    font-size: 32px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .page-subtitle {
                    color: var(--text-secondary);
                    margin-top: 6px;
                    font-size: 16px;
                }

                .add-user-btn {
                    padding: 12px 28px;
                    background: var(--grad-primary);
                    color: white;
                    border: none;
                    border-radius: 14px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
                }
                
                .add-user-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4);
                    filter: brightness(1.1);
                }

                .mgmt-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    gap: 20px;
                }

                .tabs {
                    display: flex;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 6px;
                    border-radius: 16px;
                    gap: 4px;
                    border: 1px solid var(--glass-border);
                }

                .tab {
                    padding: 10px 24px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 800;
                    color: var(--text-muted);
                    transition: var(--transition);
                    cursor: pointer;
                    background: none;
                    border: none;
                }

                .tab.active {
                    background: var(--grad-primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
                }

                .search-group {
                    display: flex;
                    gap: 12px;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    padding: 0 20px;
                    height: 48px;
                    border-radius: 14px;
                    width: 320px;
                    transition: var(--transition);
                }
                
                .search-box:focus-within {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.06);
                    box-shadow: 0 0 0 4px var(--glass-glow);
                }

                .search-box input {
                    background: none;
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 15px;
                    color: var(--text-main);
                    font-weight: 600;
                }
                
                .search-box input::placeholder {
                    color: var(--text-muted);
                }

                .filter-btn {
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: var(--transition);
                }
                
                .filter-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .users-table-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                }

                .users-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .users-table th {
                    padding: 20px 32px;
                    background: rgba(255, 255, 255, 0.01);
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid var(--glass-border);
                }

                .users-table td {
                    padding: 24px 32px;
                    border-bottom: 1px solid var(--glass-border);
                    font-size: 15px;
                    color: var(--text-secondary);
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .user-avatar {
                    width: 44px;
                    height: 44px;
                    background: rgba(139, 92, 246, 0.1);
                    color: var(--primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .user-id { font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
                .email-cell { color: var(--text-secondary); font-weight: 600; }
                
                .academic-tag, .dept-tag {
                    display: inline-flex;
                    padding: 6px 14px;
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--text-secondary);
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 700;
                    border: 1px solid var(--glass-border);
                }

                .status-active {
                    color: var(--success);
                    background: rgba(16, 185, 129, 0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .action-row {
                    display: flex;
                    gap: 10px;
                }

                .icon-action {
                    width: 38px;
                    height: 38px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .icon-action:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--primary);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                }

                .icon-action.delete:hover {
                    color: var(--accent);
                    background: rgba(244, 63, 94, 0.1);
                    border-color: var(--accent);
                }

                .font-bold { font-weight: 800; color: var(--text-main); }

                .modal-overlay { 
                    position: fixed; 
                    top: 0; left: 0; 
                    width: 100%; height: 100%; 
                    background: rgba(0, 0, 0, 0.4); 
                    backdrop-filter: blur(8px); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    z-index: 1000; 
                }
                .modal-content { 
                    max-width: 500px; 
                    width: 90%; 
                    padding: 40px; 
                    border-radius: 32px; 
                    border: 1px solid var(--glass-border); 
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
                }
                .modal-content.delete-modal { text-align: center; }
                .delete-icon-wrapper { 
                    width: 80px; height: 80px; 
                    background: rgba(239, 68, 68, 0.1); 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin: 0 auto 24px; 
                }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .modal-header h3 { font-size: 24px; font-weight: 800; color: var(--text-main); margin: 0; }
                .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; }
                
                .modal-form { display: flex; flex-direction: column; gap: 24px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .form-group { display: flex; flex-direction: column; gap: 8px; }
                .form-group label { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .form-group input, .form-group select { 
                    background: rgba(255, 255, 255, 0.03); 
                    border: 1px solid var(--glass-border); 
                    border-radius: 12px; 
                    padding: 14px; 
                    color: var(--text-main); 
                    font-weight: 600;
                    outline: none;
                    color-scheme: dark;
                }
                .form-group input:focus { border-color: var(--primary); }

                .modal-footer { display: flex; gap: 12px; margin-top: 32px; justify-content: flex-end; }
                .modal-content.delete-modal .modal-footer { justify-content: center; }
                
                .pri-btn, .sec-btn, .danger-btn { 
                    padding: 12px 24px; 
                    border-radius: 12px; 
                    font-weight: 700; 
                    cursor: pointer; 
                    transition: var(--transition);
                }
                .pri-btn { background: var(--grad-primary); border: none; color: white; }
                .sec-btn { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); color: var(--text-secondary); }
                .danger-btn { background: #ef4444; border: none; color: white; }
                
                .pri-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4); }
                .sec-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--text-main); }
                .danger-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(239, 68, 68, 0.4); }

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
