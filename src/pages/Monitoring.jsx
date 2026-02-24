import React from 'react';
import { COURSES } from '../data/dummyData';
import { Activity, Clock, AlertTriangle, CheckCircle, RefreshCcw, ArrowRight, Bell, Mail, Send } from 'lucide-react';

const Monitoring = () => {
    const [actionStatus, setActionStatus] = React.useState(null);

    const handleAction = (type, course) => {
        setActionStatus({ type, course });
        setTimeout(() => setActionStatus(null), 3000);
    };

    return (
        <div className="monitoring-page">
            {actionStatus && (
                <div className="status-toast">
                    <CheckCircle size={18} />
                    <span>Action Triggered: {actionStatus.type} for {actionStatus.course}</span>
                </div>
            )}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Participation Monitoring</h1>
                    <p className="page-subtitle">Real-time tracking of feedback submission rates across all active courses.</p>
                </div>
                <div className="status-indicator">
                    <div className="pulse"></div>
                    <span>System Live Tracking</span>
                </div>
            </div>

            <div className="monitoring-stats">
                <div className="mon-card">
                    <div className="card-top">
                        <div className="icon purple"><Activity size={24} /></div>
                        <span className="trend">+4.2%</span>
                    </div>
                    <h3>System Participation</h3>
                    <p className="val">86.4%</p>
                    <div className="progress-mini"><div style={{ width: '86.4%' }}></div></div>
                </div>
                <div className="mon-card">
                    <div className="card-top">
                        <div className="icon orange"><Clock size={24} /></div>
                        <span className="trend neg">-1.5%</span>
                    </div>
                    <h3>Average Response Time</h3>
                    <p className="val">2.4 Days</p>
                    <div className="progress-mini"><div style={{ width: '60%', background: '#f97316' }}></div></div>
                </div>
                <div className="mon-card">
                    <div className="card-top">
                        <div className="icon red"><AlertTriangle size={24} /></div>
                        <span className="badge">Critical</span>
                    </div>
                    <h3>Low Response Modules</h3>
                    <p className="val">12</p>
                    <p className="sub">Requiring immediate attention</p>
                </div>
            </div>

            <div className="monitoring-grid">
                <div className="alert-panel">
                    <div className="panel-header">
                        <h3>Critical Alerts</h3>
                        <button className="refresh-btn"><RefreshCcw size={16} /></button>
                    </div>
                    <div className="alert-list">
                        {[
                            { course: 'CS101', issue: 'Participation < 20%', time: '10m ago' },
                            { course: 'DB401', issue: 'Negative sentiment surge', time: '1h ago' },
                            { course: 'AI301', issue: 'Submission deadline passing', time: '3h ago' },
                        ].map((alert, i) => (
                            <div key={i} className="alert-item">
                                <div className="alert-icon"><AlertTriangle size={18} /></div>
                                <div className="alert-info">
                                    <p><strong>{alert.course}:</strong> {alert.issue}</p>
                                    <span>{alert.time}</span>
                                </div>
                                <ArrowRight size={16} color="#94a3b8" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="course-status-panel">
                    <div className="panel-header">
                        <h3>Module Status Overview</h3>
                    </div>
                    <div className="status-table-wrapper">
                        <table className="status-table">
                            <thead>
                                <tr>
                                    <th>Course Information</th>
                                    <th>Instructor</th>
                                    <th>Participation</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COURSES.slice(0, 6).map(course => {
                                    const participation = Math.floor(Math.random() * 100);
                                    let status = { label: 'Healthy', class: 'ok', icon: <CheckCircle size={14} /> };
                                    if (participation < 40) status = { label: 'Critical', class: 'critical', icon: <AlertTriangle size={14} /> };
                                    else if (participation < 70) status = { label: 'At Risk', class: 'warn', icon: <Activity size={14} /> };

                                    return (
                                        <tr key={course.id}>
                                            <td>
                                                <div className="course-cell-stack">
                                                    <strong className="c-code">{course.code}</strong>
                                                    <span className="c-name">{course.name}</span>
                                                </div>
                                            </td>
                                            <td className="instr-cell">{course.instructor}</td>
                                            <td>
                                                <div className="progress-cell">
                                                    <div className="table-progress">
                                                        <div className={`fill ${status.class}`} style={{ width: `${participation}%` }}></div>
                                                    </div>
                                                    <span className="p-val">{participation}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status ${status.class}`}>{status.icon} {status.label}</span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button onClick={() => handleAction('Reminder', course.code)} title="Ping Students" className="act-btn bell"><Bell size={14} /></button>
                                                    <button onClick={() => handleAction('Notify', course.code)} title="Email Instructor" className="act-btn mail"><Mail size={14} /></button>
                                                    <button onClick={() => handleAction('Escalate', course.code)} title="Escalate" className="act-btn send"><Send size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .monitoring-page {
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

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    padding: 10px 20px;
                    border-radius: 99px;
                    font-size: 13px;
                    font-weight: 800;
                    color: var(--text-main);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .pulse {
                    width: 10px;
                    height: 10px;
                    background: var(--success);
                    border-radius: 50%;
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                .monitoring-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .mon-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                    transition: var(--transition);
                }
                
                .mon-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }

                .icon {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }

                .icon.purple { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
                .icon.orange { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
                .icon.red { background: rgba(244, 63, 94, 0.1); color: var(--accent); }

                .trend { font-size: 11px; font-weight: 800; color: var(--success); background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }
                .trend.neg { color: var(--danger); background: rgba(239, 68, 68, 0.1); }
                .badge { font-size: 11px; font-weight: 800; background: var(--grad-primary); color: white; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }

                .mon-card h3 { font-size: 13px; color: var(--text-secondary); font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
                .mon-card .val { font-size: 36px; font-weight: 800; color: var(--text-main); margin-bottom: 16px; letter-spacing: -0.01em; }
                .mon-card .sub { font-size: 12px; color: var(--text-muted); font-weight: 700; }

                .progress-mini { height: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 100px; overflow: hidden; border: 1px solid var(--glass-border); }
                .progress-mini div { height: 100%; background: var(--grad-primary); border-radius: 100px; box-shadow: 0 0 12px rgba(139, 92, 246, 0.3); }

                .monitoring-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 32px;
                }

                .alert-panel, .course-status-panel {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                }

                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid var(--glass-border);
                }

                .panel-header h3 { font-size: 20px; font-weight: 800; color: var(--text-main); letter-spacing: -0.01em; }

                .refresh-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: var(--transition); }
                .refresh-btn:hover { color: var(--primary); transform: rotate(180deg); }

                .alert-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 20px;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    margin-bottom: 12px;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition);
                }
                
                .alert-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--accent);
                }

                .alert-icon { color: var(--accent); }
                .alert-info { flex: 1; }
                .alert-info p { font-size: 15px; color: var(--text-main); margin: 0; }
                .alert-info p strong { color: var(--accent); }
                .alert-info span { font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

                .status-table { width: 100%; border-collapse: collapse; text-align: left; }
                .status-table th { padding: 16px; font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 800; border-bottom: 2px solid var(--glass-border); letter-spacing: 0.1em; }
                .status-table td { padding: 24px 16px; border-bottom: 1px solid var(--glass-border); font-size: 15px; vertical-align: middle; color: var(--text-secondary); }

                .course-cell-stack { display: flex; flex-direction: column; gap: 4px; }
                .c-code { color: var(--text-main); font-weight: 800; font-size: 15px; }
                .c-name { color: var(--text-muted); font-size: 12px; font-weight: 700; }

                .instr-cell { color: var(--text-main); font-weight: 700; }

                .progress-cell { display: flex; align-items: center; gap: 16px; }
                .table-progress { flex: 1; min-width: 80px; height: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 100px; overflow: hidden; border: 1px solid var(--glass-border); }
                .table-progress .fill { height: 100%; border-radius: 100px; }
                .fill.ok { background: var(--success); box-shadow: 0 0 8px var(--success); }
                .fill.warn { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
                .fill.critical { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
                .p-val { font-size: 13px; font-weight: 800; color: var(--text-main); min-width: 45px; }

                .status { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 8px; 
                    font-size: 10px; 
                    font-weight: 900; 
                    padding: 6px 14px; 
                    border-radius: 100px; 
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }
                .status.ok { background: rgba(16, 185, 129, 0.1); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.2); }
                .status.warn { background: rgba(245, 158, 11, 0.1); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.2); }
                .status.critical { background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); }

                .action-btns { display: flex; gap: 10px; }
                .act-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: var(--transition);
                    border: 1px solid var(--glass-border);
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--text-secondary);
                }
                .act-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--primary); border-color: var(--primary); transform: translateY(-2px); }
                .act-btn.bell:hover { color: var(--warning); border-color: var(--warning); }
                .act-btn.mail:hover { color: var(--secondary); border-color: var(--secondary); }
                .act-btn.send:hover { color: var(--accent); border-color: var(--accent); }

                .status-toast {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    background: var(--grad-primary);
                    color: white;
                    padding: 18px 32px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.4);
                    z-index: 1000;
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    font-weight: 700;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 1024px) {
                    .monitoring-stats { grid-template-columns: 1fr; }
                    .monitoring-grid { grid-template-columns: 1fr; }
                }
                `
            }} />
        </div>
    );
};

export default Monitoring;
