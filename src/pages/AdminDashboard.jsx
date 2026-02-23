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
                .admin-space { display: flex; flex-direction: column; gap: 32px; }
                
                .metrics-ribbon { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
                .metric-tile { background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 16px; }
                .tile-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .p-blue { background: #eff6ff; color: #2563eb; }
                .p-green { background: #f0fdf4; color: #10b981; }
                .p-gold { background: #fffbeb; color: #f59e0b; }
                .p-red { background: #fef2f2; color: #ef4444; }
                .tile-title { font-size: 13px; color: #64748b; font-weight: 500; display: block; }
                .tile-number { font-size: 20px; font-weight: 800; color: #0f172a; }

                .admin-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
                .grid-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; padding: 24px; }
                .full-span { grid-column: span 2; }

                .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
                .header-icon { width: 32px; height: 32px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; }
                .card-header h3 { font-size: 16px; font-weight: 700; color: #0f172a; flex: 1; }

                .ranking-list { display: flex; flex-direction: column; gap: 16px; }
                .rank-item { display: flex; align-items: center; gap: 16px; padding: 12px; border-radius: 12px; background: #f8fafc; }
                .rank-num { width: 28px; height: 28px; background: #e2e8f0; color: #475569; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; }
                .rank-name { font-size: 14px; font-weight: 700; color: #0f172a; }
                .rank-dept { font-size: 12px; color: #64748b; }
                .rank-score { margin-left: auto; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 4px; }

                .completion-stats { display: flex; align-items: center; gap: 40px; padding: 20px 0; }
                .radial-circle { width: 100px; height: 100px; border-radius: 50%; border: 8px solid #eff6ff; border-top-color: #2563eb; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .radial-val { font-size: 20px; font-weight: 800; color: #2563eb; }
                .radial-label { font-size: 10px; color: #64748b; font-weight: 700; }
                .dept-breakdown { flex: 1; display: flex; flex-direction: column; gap: 16px; }
                .dept-stat { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: #475569; }
                .mini-progress-bg { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; }
                .mini-progress-bg div { height: 100%; background: #2563eb; border-radius: 3px; }

                .header-actions { display: flex; gap: 16px; align-items: center; }
                .search-box { display: flex; align-items: center; gap: 8px; background: #f1f5f9; padding: 8px 16px; border-radius: 10px; width: 250px; }
                .search-box input { background: transparent; border: none; outline: none; font-size: 13px; width: 100%; color: #0f172a; }
                .add-user-btn { background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .user-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
                .user-table th { text-align: left; font-size: 12px; font-weight: 700; color: #94a3b8; padding: 12px; border-bottom: 1px solid #f1f5f9; }
                .user-table td { padding: 16px 12px; font-size: 14px; border-bottom: 1px solid #f8fafc; color: #0f172a; }
                .role-tag { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
                .student { background: #fff7ed; color: #f97316; }
                .instructor { background: #eff6ff; color: #2563eb; }
                .admin { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
                .status-dot { display: flex; align-items: center; gap: 6px; color: #1e293b; font-weight: 600; }
                .status-dot::before { content: ""; width: 8px; height: 8px; border-radius: 50%; display: block; }
                .status-dot.active::before { background: #22c55e; }
                .status-dot.suspended::before { background: #ef4444; }
                .edit-action { background: none; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #475569; cursor: pointer; }

                .card-footer-link { margin-top: 16px; display: flex; align-items: center; gap: 6px; color: #2563eb; font-size: 13px; font-weight: 700; text-decoration: none; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                .edit-modal { background: white; width: 100%; max-width: 450px; padding: 40px; border-radius: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #e2e8f0; }
                .edit-modal h3 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
                .edit-modal p { font-size: 15px; color: #64748b; margin-bottom: 32px; }
                
                .edit-form { display: flex; flex-direction: column; gap: 24px; }
                .form-group { display: flex; flex-direction: column; gap: 10px; }
                .form-group label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
                .form-group select, .form-group input { padding: 14px 16px; border-radius: 12px; border: 2px solid #f1f5f9; background: #f8fafc; color: #0f172a; font-size: 15px; font-weight: 600; outline: none; transition: 0.3s; width: 100%; }
                .form-group select:focus, .form-group input:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
                .form-group input::placeholder { color: #94a3b8; font-weight: 400; }
                
                .modal-actions { display: flex; gap: 16px; margin-top: 24px; }
                .cancel-btn { flex: 1; padding: 16px; border-radius: 12px; background: #f1f5f9; color: #475569; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
                .cancel-btn:hover { background: #e2e8f0; }
                .save-btn { flex: 2; padding: 16px; border-radius: 12px; background: #2563eb; color: white; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3); }
                .save-btn:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.4); }

                @media (max-width: 1024px) { .admin-grid { grid-template-columns: 1fr; } .full-span { grid-column: span 1; } }
            `}} />
    </div>
  );
};

export default AdminDashboard;
