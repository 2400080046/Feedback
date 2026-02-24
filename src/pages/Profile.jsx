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
                .profile-page { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                .profile-header { background: var(--glass); backdrop-filter: blur(12px); border-radius: 24px; border: 1px solid var(--glass-border); overflow: hidden; margin-bottom: 32px; box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3); }
                .profile-cover { height: 160px; background: var(--grad-primary); position: relative; }
                .profile-cover::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%); }
                
                .profile-avatar-row { padding: 0 40px 32px; display: flex; align-items: flex-end; gap: 32px; margin-top: -60px; position: relative; z-index: 2; }
                
                .main-avatar { 
                    width: 140px; height: 140px; background: var(--primary); color: white; border-radius: 32px; 
                    border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; 
                    font-size: 64px; font-weight: 800; box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.4); 
                }

                .avatar-wrapper { position: relative; }
                .edit-avatar-btn { 
                    position: absolute; bottom: 8px; right: 8px; width: 40px; height: 40px; 
                    background: #1e293b; color: white; border-radius: 12px; display: flex; 
                    align-items: center; justify-content: center; border: 1px solid var(--glass-border); 
                    transition: var(--transition); cursor: pointer;
                }
                .edit-avatar-btn:hover { background: var(--primary); transform: scale(1.1); }

                .header-info { flex: 1; padding-bottom: 12px; }
                .user-name { font-size: 36px; font-weight: 800; color: var(--text-main); margin: 0; letter-spacing: -0.02em; }
                .user-status { color: var(--text-muted); font-weight: 700; font-size: 15px; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.1em; }

                .primary-btn { 
                    background: var(--grad-primary); color: white; padding: 12px 28px; border-radius: 14px; 
                    font-weight: 800; border: none; cursor: pointer; transition: var(--transition); 
                    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
                }
                .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4); filter: brightness(1.1); }

                .profile-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 32px; }
                .info-card, .settings-card, .activity-card { 
                    background: var(--glass); backdrop-filter: blur(12px); border-radius: 24px; 
                    border: 1px solid var(--glass-border); padding: 32px; margin-bottom: 0px; 
                    transition: var(--transition);
                }
                .info-card:hover, .settings-card:hover, .activity-card:hover { border-color: var(--primary); background: rgba(255, 255, 255, 0.05); }

                .card-header h3 { font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 24px; letter-spacing: -0.01em; }
                
                .info-list { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
                .info-item { display: flex; gap: 20px; align-items: center; }
                .item-icon { 
                    width: 48px; height: 48px; background: rgba(255, 255, 255, 0.03); color: var(--primary); 
                    border-radius: 16px; display: flex; align-items: center; justify-content: center; 
                    border: 1px solid var(--glass-border);
                }
                .item-content label { display: block; font-size: 11px; color: var(--text-muted); font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; }
                .item-content p { font-weight: 800; color: var(--text-main); margin: 4px 0 0; font-size: 16px; }

                .stats-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                .small-stat { background: rgba(255, 255, 255, 0.02); padding: 24px; border-radius: 20px; text-align: center; border: 1px solid var(--glass-border); }
                .stat-label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; font-weight: 700; text-transform: uppercase; }
                .stat-value { font-size: 24px; font-weight: 800; color: var(--text-main); }

                .settings-list { display: flex; flex-direction: column; gap: 12px; }
                .settings-btn { 
                    width: 100%; display: flex; align-items: center; gap: 16px; padding: 16px 20px; 
                    background: rgba(255, 255, 255, 0.03); color: var(--text-secondary); font-weight: 700; font-size: 15px; 
                    border-radius: 14px; border: 1px solid var(--glass-border); text-align: left; cursor: pointer; transition: var(--transition); 
                }
                .settings-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--primary); border-color: var(--primary); transform: translateX(4px); }

                .activity-timeline { display: flex; flex-direction: column; gap: 24px; position: relative; padding-left: 12px; }
                .activity-timeline::before { content: ''; position: absolute; left: 15px; top: 8px; bottom: 8px; width: 2px; background: var(--glass-border); }
                .timeline-item { display: flex; gap: 20px; position: relative; z-index: 1; }
                .timeline-dot { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; border: 3px solid #0f172a; margin-top: 6px; flex-shrink: 0; box-shadow: 0 0 10px var(--primary); }
                .timeline-text p { font-size: 15px; color: var(--text-secondary); margin: 0; font-weight: 600; }
                .timeline-text p strong { color: var(--text-main); }
                .timeline-text span { font-size: 12px; color: var(--text-muted); font-weight: 700; }

                /* Modal Styles */
                .modal-overlay { 
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); 
                    display: flex; align-items: center; justify-content: center; z-index: 1000; 
                }
                .modal-content { 
                    background: var(--glass); backdrop-filter: blur(12px); border-radius: 32px; width: 100%; max-width: 500px; 
                    padding: 40px; border: 1px solid var(--glass-border); box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5); 
                    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
                }
                @keyframes modalIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .modal-header h3 { font-size: 24px; font-weight: 800; color: var(--text-main); margin: 0; }
                .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: var(--transition); }
                .close-btn:hover { color: var(--danger); transform: rotate(90deg); }

                .form-group { margin-bottom: 24px; }
                .form-group label { display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em; }
                .form-group input, .form-group select { 
                    width: 100%; padding: 14px 18px; border-radius: 14px; border: 1px solid var(--glass-border); 
                    background: rgba(255, 255, 255, 0.03); color: var(--text-main); font-weight: 600;
                    outline: none; font-family: inherit; font-size: 15px; transition: var(--transition); 
                    color-scheme: dark;
                }
                .form-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--glass-glow); }

                .modal-footer { display: flex; justify-content: flex-end; gap: 16px; margin-top: 40px; }
                .secondary-btn { background: rgba(255, 255, 255, 0.03); color: var(--text-secondary); padding: 12px 28px; border-radius: 14px; font-weight: 800; border: 1px solid var(--glass-border); cursor: pointer; transition: var(--transition); }
                .secondary-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--text-main); }
                
                .save-btn { 
                    background: var(--grad-primary); color: white; padding: 12px 28px; border-radius: 14px; 
                    font-weight: 800; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; 
                    transition: var(--transition); box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
                }
                .save-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4); }
                .save-btn:disabled { background: var(--success); box-shadow: none; cursor: default; transform: none; }

                .settings-content { display: flex; flex-direction: column; gap: 8px; }
                .setting-toggle { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: rgba(255, 255, 255, 0.02); border-radius: 16px; border: 1px solid var(--glass-border); margin-bottom: 12px; }
                .setting-toggle .label { font-weight: 800; color: var(--text-main); font-size: 15px; margin: 0; }
                .setting-toggle .desc { font-size: 13px; color: var(--text-muted); margin-top: 4px; font-weight: 600; }

                .action-row-btn { 
                    width: 100%; display: flex; align-items: center; gap: 16px; padding: 18px 24px; 
                    background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); border-radius: 16px; 
                    font-weight: 700; color: var(--text-secondary); margin-bottom: 16px; cursor: pointer; 
                    transition: var(--transition);
                }
                .action-row-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--primary); border-color: var(--primary); transform: scale(1.02); }
                
                .cert-item { display: flex; align-items: center; gap: 20px; padding: 20px; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; margin-bottom: 24px; }
                .cert-item .label { font-weight: 800; color: #f59e0b; font-size: 15px; margin: 0; }
                .cert-item .desc { font-size: 13px; color: rgba(245, 158, 11, 0.7); margin-top: 4px; font-weight: 700; }
                
                .full-width { width: 100%; }
                .empty-msg { text-align: center; color: var(--text-muted); font-size: 15px; margin: 32px 0; font-weight: 600; font-style: italic; }
                `
            }} />
        </div>
    );
};

export default Profile;
