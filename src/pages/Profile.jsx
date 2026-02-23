import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Book, Award, Bell, Settings, Lock, MapPin, X, Save, Camera, CheckCircle } from 'lucide-react';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'notifications', 'security', 'enrollment', 'certificates'
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        major: 'Computer Science', // Mocking extended fields
    });
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSave = (e) => {
        e.preventDefault();
        updateUser(formData);
        setSaveStatus('success');
        setTimeout(() => {
            setSaveStatus(null);
            setIsEditing(false);
        }, 1500);
    };

    const QuickSettingModal = ({ type, title, children }) => (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={() => setActiveModal(null)}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-avatar-row">
                    <div className="avatar-wrapper">
                        <div className="main-avatar">
                            {user?.name?.charAt(0)}
                        </div>
                        <button className="edit-avatar-btn">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="header-info">
                        <h1 className="user-name">{user?.name}</h1>
                        <p className="user-status">Institutional Account • {user?.role?.toUpperCase()}</p>
                    </div>
                    <div className="header-actions">
                        <button className="primary-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-col-main">
                    <div className="info-card">
                        <div className="card-header">
                            <h3>Personal Information</h3>
                        </div>
                        <div className="info-list">
                            <div className="info-item">
                                <div className="item-icon"><User size={20} /></div>
                                <div className="item-content">
                                    <label>Full Name</label>
                                    <p>{user?.name}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-icon"><Mail size={20} /></div>
                                <div className="item-content">
                                    <label>Email Address</label>
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-icon"><Shield size={20} /></div>
                                <div className="item-content">
                                    <label>Role</label>
                                    <p>{user?.role}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-icon"><MapPin size={20} /></div>
                                <div className="item-content">
                                    <label>Campus</label>
                                    <p>Koneru Lakshmaiah University</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="card-header">
                            <h3>Academic Details</h3>
                        </div>
                        <div className="stats-mini-grid">
                            <div className="small-stat">
                                <span className="stat-label">Semester</span>
                                <span className="stat-value">6th</span>
                            </div>
                            <div className="small-stat">
                                <span className="stat-label">Major</span>
                                <span className="stat-value">{formData.major}</span>
                            </div>
                            <div className="small-stat">
                                <span className="stat-label">GPA</span>
                                <span className="stat-value">9.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-col-side">
                    <div className="settings-card">
                        <div className="card-header">
                            <h3>Quick Settings</h3>
                        </div>
                        <div className="settings-list">
                            <button className="settings-btn" onClick={() => setActiveModal('notifications')}>
                                <Bell size={18} />
                                <span>Notifications</span>
                            </button>
                            <button className="settings-btn" onClick={() => setActiveModal('security')}>
                                <Lock size={18} />
                                <span>Security & Privacy</span>
                            </button>
                            <button className="settings-btn" onClick={() => setActiveModal('enrollment')}>
                                <Book size={18} />
                                <span>Course Enrollment</span>
                            </button>
                            <button className="settings-btn" onClick={() => setActiveModal('certificates')}>
                                <Award size={18} />
                                <span>Certificates</span>
                            </button>
                        </div>
                    </div>

                    <div className="activity-card">
                        <div className="card-header">
                            <h3>Recent Activity</h3>
                        </div>
                        <div className="activity-timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-text">
                                    <p>Evaluated <strong>CS101</strong></p>
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-text">
                                    <p>Login from new device</p>
                                    <span>Yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="modal-overlay" onClick={() => setIsEditing(false)}>
                    <div className="modal-content profile-edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                            <button className="close-btn" onClick={() => setIsEditing(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="edit-form">
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
                            <div className="form-group">
                                <label>Academic Major</label>
                                <select
                                    value={formData.major}
                                    onChange={e => setFormData({ ...formData, major: e.target.value })}
                                >
                                    <option>Computer Science</option>
                                    <option>Data Science</option>
                                    <option>Artificial Intelligence</option>
                                    <option>Cyber Security</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="save-btn" disabled={saveStatus === 'success'}>
                                    {saveStatus === 'success' ? <><CheckCircle size={18} /> Saved</> : <><Save size={18} /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Quick Settings Modals */}
            {activeModal === 'notifications' && (
                <QuickSettingModal title="Notification Preferences">
                    <div className="settings-content">
                        <div className="setting-toggle">
                            <div>
                                <p className="label">Feedback Reminders</p>
                                <p className="desc">Get notified when new feedback is pending.</p>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div className="setting-toggle">
                            <div>
                                <p className="label">Results Published</p>
                                <p className="desc">Get notified when class results are available.</p>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>
                    </div>
                </QuickSettingModal>
            )}

            {activeModal === 'security' && (
                <QuickSettingModal title="Security & Privacy">
                    <div className="settings-content">
                        <button className="action-row-btn">
                            <Lock size={16} />
                            <span>Change Password</span>
                        </button>
                        <button className="action-row-btn">
                            <Shield size={16} />
                            <span>Two-Factor Authentication</span>
                        </button>
                    </div>
                </QuickSettingModal>
            )}

            {activeModal === 'enrollment' && (
                <QuickSettingModal title="Course Enrollment">
                    <div className="settings-content">
                        <p className="empty-msg">No active enrollment periods at this time.</p>
                        <button className="secondary-btn full-width">View Curriculum</button>
                    </div>
                </QuickSettingModal>
            )}

            {activeModal === 'certificates' && (
                <QuickSettingModal title="Digital Certificates">
                    <div className="settings-content">
                        <div className="cert-item">
                            <Award size={20} color="#f59e0b" />
                            <div>
                                <p className="label">Python Mastery</p>
                                <p className="desc">Issued Jan 2026</p>
                            </div>
                        </div>
                        <button className="secondary-btn full-width">Claim New Badge</button>
                    </div>
                </QuickSettingModal>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .profile-page { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .profile-header { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 32px; }
                .profile-cover { height: 120px; background: linear-gradient(90deg, #2563eb 0%, #8b5cf6 100%); }
                .profile-avatar-row { padding: 0 40px 32px; display: flex; align-items: flex-end; gap: 32px; margin-top: -60px; }
                
                .main-avatar { 
                    width: 120px; height: 120px; background: #2563eb; color: white; border-radius: 24px; 
                    border: 6px solid white; display: flex; align-items: center; justify-content: center; 
                    font-size: 48px; font-weight: 800; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
                }

                .avatar-wrapper { position: relative; }
                .edit-avatar-btn { 
                    position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; 
                    background: #0f172a; color: white; border-radius: 10px; display: flex; 
                    align-items: center; justify-content: center; border: 3px solid white; 
                }

                .header-info { flex: 1; padding-bottom: 8px; }
                .user-name { font-size: 32px; font-weight: 800; color: #0f172a; margin: 0; }
                .user-status { color: #64748b; font-weight: 600; font-size: 14px; margin-top: 4px; }

                .primary-btn { 
                    background: #2563eb; color: white; padding: 10px 24px; border-radius: 12px; 
                    font-weight: 700; border: none; cursor: pointer; transition: 0.2s; 
                }
                .primary-btn:hover { background: #1d4ed8; }

                .profile-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 32px; }
                .info-card, .settings-card, .activity-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 32px; margin-bottom: 32px; }
                
                .info-list { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .info-item { display: flex; gap: 16px; align-items: center; }
                .item-icon { width: 40px; height: 40px; background: #f8fafc; color: #64748b; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .item-content label { display: block; font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
                .item-content p { font-weight: 700; color: #1e293b; margin: 2px 0 0; }

                .stats-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
                .small-stat { background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center; }
                .stat-label { display: block; font-size: 12px; color: #64748b; margin-bottom: 4px; }
                .stat-value { font-size: 18px; font-weight: 800; color: #0f172a; }

                .settings-list { display: flex; flex-direction: column; gap: 8px; }
                .settings-btn { 
                    width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 16px; 
                    background: transparent; color: #475569; font-weight: 600; font-size: 14px; 
                    border-radius: 12px; border: none; text-align: left; cursor: pointer; transition: 0.2s; 
                }
                .settings-btn:hover { background: #f1f5f9; color: #0f172a; }

                .activity-timeline { display: flex; flex-direction: column; gap: 20px; }
                .timeline-item { display: flex; gap: 16px; }
                .timeline-dot { width: 8px; height: 8px; background: #cbd5e1; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
                .timeline-text p { font-size: 14px; color: #1e293b; margin: 0; }
                .timeline-text span { font-size: 12px; color: #94a3b8; }

                /* Modal Styles */
                .modal-overlay { 
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px); 
                    display: flex; align-items: center; justify-content: center; z-index: 1000; 
                }
                .modal-content { 
                    background: white; border-radius: 24px; width: 100%; max-width: 500px; 
                    padding: 32px; box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.2); 
                    animation: modalIn 0.3s ease-out; 
                }
                @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .modal-header h3 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; }
                .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }

                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; font-size: 13px; font-weight: 700; color: #64748b; margin-bottom: 8px; }
                .form-group input, .form-group select { 
                    width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; 
                    outline: none; font-family: inherit; font-size: 15px; transition: 0.2s; 
                }
                .form-group input:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }
                .secondary-btn { background: #f1f5f9; color: #475569; padding: 10px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }
                .save-btn { 
                    background: #2563eb; color: white; padding: 10px 24px; border-radius: 12px; 
                    font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; 
                }
                .save-btn:disabled { background: #22c55e; }

                .setting-toggle { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f1f5f9; }
                .setting-toggle:last-child { border-bottom: none; }
                .setting-toggle .label { font-weight: 700; color: #1e293b; font-size: 14px; margin: 0; }
                .setting-toggle .desc { font-size: 12px; color: #64748b; margin-top: 2px; }

                .action-row-btn { 
                    width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px; 
                    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; 
                    font-weight: 600; color: #334155; margin-bottom: 12px; cursor: pointer; 
                }
                .cert-item { display: flex; align-items: center; gap: 16px; padding: 16px; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; margin-bottom: 20px; }
                .full-width { width: 100%; }
                .empty-msg { text-align: center; color: #94a3b8; font-size: 14px; margin-bottom: 20px; }
                `
            }} />
        </div>
    );
};

export default Profile;
