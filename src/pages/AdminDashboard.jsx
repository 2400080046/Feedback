import React from 'react';
import { DASHBOARD_STATS, STUDENTS, INSTRUCTORS, COURSES } from '../data/dummyData';
import { Users, Star, MessageSquare, ShieldCheck, Trophy, Layers, Target, ArrowUpRight, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = DASHBOARD_STATS.admin;
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@inst.edu', role: 'Student', status: 'Active' },
    { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh@inst.edu', role: 'Instructor', status: 'Active' },
    { id: 3, name: 'Arjun Singh', email: 'admin@system.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Rohan Verma', email: 'rohan@u.edu', role: 'Student', status: 'Suspended' },
  ]);
  const [editingUser, setEditingUser] = React.useState(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: 'Student', status: 'Active' });

  const handleUpdate = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id }]);
    setIsCreating(false);
    setNewUser({ name: '', email: '', role: 'Student', status: 'Active' });
  };

  return (
    <div className="admin-space">
      {/* Edit Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="edit-modal glass animate-fade-in">
            <h3>Edit Campus Permissions</h3>
            <p>Managing access for <strong>{editingUser.name}</strong></p>

            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label>Institutional Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {isCreating && (
        <div className="modal-overlay">
          <div className="edit-modal glass animate-fade-in">
            <h3>Register Institutional User</h3>
            <p>Onboarding a new member to the campus system.</p>

            <form onSubmit={handleCreate} className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Campus Email</label>
                <input
                  type="email"
                  placeholder="name@inst.edu"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Assign Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsCreating(false)}>Cancel</button>
                <button type="submit" className="save-btn"><Plus size={18} /> Onboard User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Institution Metrics */}
      <div className="metrics-ribbon">
        <div className="metric-tile">
          <div className="tile-icon p-blue"><Users size={20} /></div>
          <div className="tile-data">
            <span className="tile-title">Total Students</span>
            <span className="tile-number">{stats.totalStudents.toLocaleString()}</span>
          </div>
        </div>
        <div className="metric-tile">
          <div className="tile-icon p-green"><ShieldCheck size={20} /></div>
          <div className="tile-data">
            <span className="tile-title">Instructors</span>
            <span className="tile-number">{stats.totalInstructors}</span>
          </div>
        </div>
        <div className="metric-tile">
          <div className="tile-icon p-gold"><Star size={20} /></div>
          <div className="tile-data">
            <span className="tile-title">Avg satisfaction</span>
            <span className="tile-number">{stats.averageRating}</span>
          </div>
        </div>
        <div className="metric-tile">
          <div className="tile-icon p-red"><Target size={20} /></div>
          <div className="tile-data">
            <span className="tile-title">Active Forms</span>
            <span className="tile-number">{stats.activeForms}</span>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Ranking Module (EXTRA) */}
        <div className="grid-card ranking-panel">
          <div className="card-header">
            <div className="header-icon"><Trophy size={18} /></div>
            <h3>Top Rated Instructors</h3>
          </div>
          <div className="ranking-list">
            {[
              { name: 'Dr. Rajesh Kumar', dept: 'CS', rating: 4.9 },
              { name: 'Prof. Sunita Rao', dept: 'DS', rating: 4.8 },
              { name: 'Dr. Amit Shah', dept: 'AI', rating: 4.7 },
              { name: 'Dr. Meera Deshmukh', dept: 'SE', rating: 4.6 },
            ].map((hero, i) => (
              <div key={i} className="rank-item">
                <div className="rank-num">{i + 1}</div>
                <div className="rank-info">
                  <p className="rank-name">{hero.name}</p>
                  <p className="rank-dept">{hero.dept}</p>
                </div>
                <div className="rank-score">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  {hero.rating}
                </div>
              </div>
            ))}
          </div>
          <Link to="/analytics" className="card-footer-link">Full Rankings <ArrowUpRight size={14} /></Link>
        </div>

        {/* Completion Monitoring */}
        <div className="grid-card monitoring-panel">
          <div className="card-header">
            <div className="header-icon"><Layers size={18} /></div>
            <h3>Feedback Participation</h3>
          </div>
          <div className="completion-stats">
            <div className="radial-summary">
              <div className="radial-circle">
                <span className="radial-val">75%</span>
                <span className="radial-label">Completed</span>
              </div>
            </div>
            <div className="dept-breakdown">
              <div className="dept-stat">
                <span>CSE</span>
                <div className="mini-progress-bg"><div style={{ width: '82%' }}></div></div>
                <span>82%</span>
              </div>
              <div className="dept-stat">
                <span>A&DS</span>
                <div className="mini-progress-bg"><div style={{ width: '45%' }}></div></div>
                <span>45%</span>
              </div>
              <div className="dept-stat">
                <span>CS&IT</span>
                <div className="mini-progress-bg"><div style={{ width: '70%' }}></div></div>
                <span>70%</span>
              </div>
              <div className="dept-stat">
                <span>ECE</span>
                <div className="mini-progress-bg"><div style={{ width: '60%' }}></div></div>
                <span>60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Quick View */}
        <div className="grid-card full-span user-panel">
          <div className="card-header">
            <h3>Institutional User Management</h3>
            <div className="header-actions">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search users..." />
              </div>
              <button className="add-user-btn" onClick={() => setIsCreating(true)}><Plus size={18} /> Create New</button>
            </div>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`role-tag ${u.role.toLowerCase()}`}>{u.role}</span></td>
                  <td><span className={`status-dot ${u.status.toLowerCase()}`}>{u.status}</span></td>
                  <td><button className="edit-action" onClick={() => setEditingUser(u)}>Edit Permission</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                .admin-space { 
                  display: flex; 
                  flex-direction: column; 
                  gap: 32px; 
                  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .metrics-ribbon { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
                .metric-tile { 
                  background: var(--glass); 
                  padding: 24px; 
                  border-radius: 20px; 
                  border: 1px solid var(--glass-border); 
                  display: flex; 
                  align-items: center; 
                  gap: 20px; 
                  transition: var(--transition);
                }
                .metric-tile:hover {
                  transform: translateY(-4px);
                  background: rgba(255, 255, 255, 0.05);
                  border-color: var(--primary);
                }
                
                .tile-icon { 
                  width: 52px; 
                  height: 52px; 
                  border-radius: 14px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }
                .p-blue { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
                .p-green { background: rgba(16, 185, 129, 0.1); color: var(--success); }
                .p-gold { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
                .p-red { background: rgba(244, 63, 94, 0.1); color: var(--accent); }
                
                .tile-title { font-size: 13px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; }
                .tile-number { font-size: 24px; font-weight: 800; color: var(--text-main); }

                .admin-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
                .grid-card { 
                  background: var(--glass); 
                  border-radius: 24px; 
                  border: 1px solid var(--glass-border); 
                  overflow: hidden; 
                  padding: 32px; 
                  transition: var(--transition);
                }
                .full-span { grid-column: span 2; }

                .card-header { 
                  display: flex; 
                  align-items: center; 
                  gap: 16px; 
                  margin-bottom: 24px; 
                  padding-bottom: 16px; 
                  border-bottom: 1px solid var(--glass-border); 
                }
                .header-icon { 
                  width: 36px; 
                  height: 36px; 
                  background: rgba(255, 255, 255, 0.03); 
                  border-radius: 10px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  color: var(--text-secondary); 
                }
                .card-header h3 { font-size: 18px; font-weight: 800; color: var(--text-main); flex: 1; letter-spacing: -0.01em; }

                .ranking-list { display: flex; flex-direction: column; gap: 12px; }
                .rank-item { 
                  display: flex; 
                  align-items: center; 
                  gap: 16px; 
                  padding: 16px; 
                  border-radius: 16px; 
                  background: rgba(255, 255, 255, 0.02); 
                  border: 1px solid var(--glass-border);
                  transition: var(--transition);
                }
                .rank-item:hover {
                  background: rgba(255, 255, 255, 0.05);
                  border-color: var(--primary);
                }
                .rank-num { 
                  width: 28px; 
                  height: 28px; 
                  background: var(--primary); 
                  color: white; 
                  border-radius: 50%; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  font-weight: 800; 
                  font-size: 12px; 
                  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
                }
                .rank-name { font-size: 14px; font-weight: 700; color: var(--text-main); }
                .rank-dept { font-size: 12px; color: var(--text-secondary); }
                .rank-score { margin-left: auto; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 4px; }

                .completion-stats { display: flex; align-items: center; gap: 48px; padding: 20px 0; }
                .radial-circle { 
                  width: 110px; 
                  height: 110px; 
                  border-radius: 50%; 
                  border: 8px solid rgba(255, 255, 255, 0.03); 
                  border-top-color: var(--primary); 
                  display: flex; 
                  flex-direction: column; 
                  align-items: center; 
                  justify-content: center; 
                  box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.1);
                  position: relative;
                }
                .radial-val { font-size: 24px; font-weight: 800; color: var(--primary); text-shadow: 0 0 12px rgba(139, 92, 246, 0.3); }
                .radial-label { font-size: 10px; color: var(--text-secondary); font-weight: 800; text-transform: uppercase; }
                .dept-breakdown { flex: 1; display: flex; flex-direction: column; gap: 20px; }
                .dept-stat { display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 700; color: var(--text-secondary); }
                .mini-progress-bg { flex: 1; height: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; overflow: hidden; }
                .mini-progress-bg div { height: 100%; background: var(--grad-primary); border-radius: 4px; box-shadow: 0 0 8px rgba(139, 92, 246, 0.3); }

                .header-actions { display: flex; gap: 16px; align-items: center; }
                .search-box { 
                  display: flex; 
                  align-items: center; 
                  gap: 12px; 
                  background: rgba(255, 255, 255, 0.03); 
                  padding: 10px 16px; 
                  border-radius: 12px; 
                  width: 250px; 
                  border: 1px solid var(--glass-border);
                  transition: var(--transition);
                }
                .search-box:focus-within { border-color: var(--primary); background: rgba(255, 255, 255, 0.06); }
                .search-box input { background: transparent; border: none; outline: none; font-size: 14px; width: 100%; color: var(--text-main); }
                .search-box input::placeholder { color: var(--text-muted); }
                .search-box svg { color: var(--text-muted); }

                .add-user-btn { 
                  background: var(--grad-primary); 
                  color: white; 
                  border: none; 
                  padding: 12px 20px; 
                  border-radius: 12px; 
                  font-weight: 700; 
                  font-size: 13px; 
                  display: flex; 
                  align-items: center; 
                  gap: 8px; 
                  cursor: pointer; 
                  transition: var(--transition);
                  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
                  text-transform: uppercase;
                }
                .add-user-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3); }

                .user-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
                .user-table th { text-align: left; font-size: 11px; font-weight: 800; color: var(--text-muted); padding: 16px; border-bottom: 1px solid var(--glass-border); text-transform: uppercase; letter-spacing: 0.1em; }
                .user-table td { padding: 20px 16px; font-size: 14px; border-bottom: 1px solid var(--glass-border); color: var(--text-main); }
                .role-tag { padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .student { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
                .instructor { background: rgba(6, 182, 212, 0.1); color: var(--secondary); }
                .admin { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
                
                .status-dot { display: flex; align-items: center; gap: 8px; color: var(--text-main); font-weight: 700; font-size: 13px; }
                .status-dot::before { content: ""; width: 8px; height: 8px; border-radius: 50%; display: block; }
                .status-dot.active::before { background: var(--success); box-shadow: 0 0 8px var(--success); }
                .status-dot.suspended::before { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
                
                .edit-action { 
                  background: rgba(255, 255, 255, 0.03); 
                  border: 1px solid var(--glass-border); 
                  padding: 8px 14px; 
                  border-radius: 10px; 
                  font-size: 12px; 
                  font-weight: 700; 
                  color: var(--text-secondary); 
                  cursor: pointer; 
                  transition: var(--transition);
                }
                .edit-action:hover { background: rgba(255, 255, 255, 0.08); color: var(--text-main); border-color: var(--primary); }

                .card-footer-link { 
                  margin-top: 24px; 
                  display: flex; 
                  align-items: center; 
                  gap: 8px; 
                  color: var(--primary); 
                  font-size: 14px; 
                  font-weight: 700; 
                  text-decoration: none; 
                  transition: var(--transition);
                }
                .card-footer-link:hover { color: var(--secondary); transform: translateX(4px); }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(2, 6, 23, 0.6); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                .edit-modal { 
                  background: var(--bg-card); 
                  width: 100%; 
                  max-width: 480px; 
                  padding: 48px; 
                  border-radius: 32px; 
                  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); 
                  border: 1px solid var(--glass-border); 
                }
                .edit-modal h3 { font-size: 26px; font-weight: 800; color: var(--text-main); margin-bottom: 8px; letter-spacing: -0.02em; }
                .edit-modal p { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; }
                
                .edit-form { display: flex; flex-direction: column; gap: 24px; }
                .form-group { display: flex; flex-direction: column; gap: 10px; }
                .form-group label { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .form-group select, .form-group input { 
                  padding: 14px 18px; 
                  border-radius: 14px; 
                  border: 1px solid var(--glass-border); 
                  background: #1e293b; /* Solid background for dropdown reliability */
                  color: var(--text-main); 
                  font-size: 15px; 
                  font-weight: 600; 
                  outline: none; 
                  transition: var(--transition); 
                  width: 100%; 
                  color-scheme: dark; /* Forces browser to use dark system UI */
                }
                .form-group option {
                  background: #1e293b;
                  color: var(--text-main);
                }
                .form-group select:focus, .form-group input:focus { 
                  border-color: var(--primary); 
                  background: #1e293b; 
                  box-shadow: 0 0 0 4px var(--glass-glow); 
                }
                
                .modal-actions { display: flex; gap: 16px; margin-top: 32px; }
                .cancel-btn { 
                  flex: 1; 
                  padding: 16px; 
                  border-radius: 14px; 
                  background: rgba(255, 255, 255, 0.03); 
                  color: var(--text-secondary); 
                  font-weight: 700; 
                  border: 1px solid var(--glass-border); 
                  cursor: pointer; 
                  transition: var(--transition); 
                }
                .cancel-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--text-main); }
                .save-btn { 
                  flex: 2; 
                  padding: 16px; 
                  border-radius: 14px; 
                  background: var(--grad-primary); 
                  color: white; 
                  font-weight: 800; 
                  border: none; 
                  cursor: pointer; 
                  transition: var(--transition); 
                  box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.3); 
                }
                .save-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.4); }

                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) { .admin-grid { grid-template-columns: 1fr; } .full-span { grid-column: span 1; } }
            `}} />
    </div>
  );
};

export default AdminDashboard;
