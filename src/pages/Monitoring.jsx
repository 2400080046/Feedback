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

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 8px 16px;
                    border-radius: 99px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #0f172a;
                }

                .pulse {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
                }

                .monitoring-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .mon-card {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    padding: 32px;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }

                .icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .icon.purple { background: #f5f3ff; color: #8b5cf6; }
                .icon.orange { background: #fff7ed; color: #f97316; }
                .icon.red { background: #fef2f2; color: #ef4444; }

                .trend { font-size: 12px; font-weight: 700; color: #22c55e; background: #f0fdf4; padding: 4px 8px; border-radius: 6px; }
                .trend.neg { color: #ef4444; background: #fef2f2; }
                .badge { font-size: 11px; font-weight: 700; background: #0f172a; color: white; padding: 4px 8px; border-radius: 6px; }

                .mon-card h3 { font-size: 14px; color: #64748b; font-weight: 600; margin-bottom: 8px; }
                .mon-card .val { font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
                .mon-card .sub { font-size: 12px; color: #94a3b8; font-weight: 600; }

                .progress-mini { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
                .progress-mini div { height: 100%; background: #8b5cf6; border-radius: 3px; }

                .monitoring-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 32px;
                }

                .alert-panel, .course-status-panel {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    padding: 32px;
                }

                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .panel-header h3 { font-size: 18px; font-weight: 700; color: #0f172a; }

                .refresh-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }

                .alert-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 16px;
                    border-radius: 16px;
                    background: #f8fafc;
                    margin-bottom: 12px;
                    border: 1px solid #f1f5f9;
                }

                .alert-icon { color: #ef4444; }
                .alert-info { flex: 1; }
                .alert-info p { font-size: 14px; color: #1e293b; margin: 0; }
                .alert-info span { font-size: 11px; color: #94a3b8; font-weight: 600; }

                .status-table { width: 100%; border-collapse: collapse; text-align: left; }
                .status-table th { padding: 12px 16px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #f1f5f9; }
                .status-table td { padding: 20px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: middle; }

                .course-cell-stack { display: flex; flex-direction: column; gap: 2px; }
                .c-code { color: #0f172a; font-weight: 800; font-size: 14px; }
                .c-name { color: #64748b; font-size: 11px; font-weight: 600; }

                .instr-cell { color: #1e293b; font-weight: 700; }

                .progress-cell { display: flex; align-items: center; gap: 12px; }
                .table-progress { flex: 1; min-width: 80px; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
                .table-progress .fill { height: 100%; border-radius: 3px; }
                .fill.ok { background: #22c55e; }
                .fill.warn { background: #f59e0b; }
                .fill.critical { background: #ef4444; }
                .p-val { font-size: 12px; font-weight: 800; color: #0f172a; min-width: 35px; }

                .status { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 6px; 
                    font-size: 11px; 
                    font-weight: 800; 
                    padding: 6px 12px; 
                    border-radius: 99px; 
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status.ok { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }
                .status.warn { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
                .status.critical { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }

                .action-btns { display: flex; gap: 8px; }
                .act-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: #64748b;
                }
                .act-btn:hover { background: #f8fafc; color: #2563eb; border-color: #2563eb; transform: translateY(-1px); }
                .act-btn.bell:hover { color: #f59e0b; border-color: #f59e0b; }
                .act-btn.mail:hover { color: #8b5cf6; border-color: #8b5cf6; }
                .act-btn.send:hover { color: #ef4444; border-color: #ef4444; }

                .status-toast {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    background: #0f172a;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
                    z-index: 1000;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
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
