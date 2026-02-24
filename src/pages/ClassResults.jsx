import React from 'react';
import { COURSES, ANALYTICS_DATA } from '../data/dummyData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { Award, Users, TrendingUp, BookOpen } from 'lucide-react';

const ClassResults = () => {
    // Mocking class-specific results based on COURSES
    const classResults = COURSES.slice(0, 5).map(course => ({
        code: course.code,
        name: course.name,
        instructor: course.instructor,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        participation: Math.floor(Math.random() * (95 - 70) + 70) + '%'
    }));

    return (
        <div className="class-results-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Class Results</h1>
                    <p className="page-subtitle">Visualizing institutional performance and student satisfaction.</p>
                </div>
            </div>

            <div className="stats-row">
                <div className="mini-card highlight-blue">
                    <div className="card-icon"><Users size={20} /></div>
                    <div className="card-data">
                        <span className="label">Class Participation</span>
                        <span className="value">88.4%</span>
                    </div>
                </div>
                <div className="mini-card highlight-purple">
                    <div className="card-icon"><Award size={20} /></div>
                    <div className="card-data">
                        <span className="label">Avg. Satisfaction</span>
                        <span className="value">4.6/5</span>
                    </div>
                </div>
                <div className="mini-card highlight-green">
                    <div className="card-icon"><TrendingUp size={20} /></div>
                    <div className="card-data">
                        <span className="label">Growth Rate</span>
                        <span className="value">+12%</span>
                    </div>
                </div>
            </div>

            <div className="results-grid">
                <div className="chart-panel">
                    <div className="panel-header">
                        <h3>Institutional Rating Overview</h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={ANALYTICS_DATA}>
                                <defs>
                                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-panel">
                    <div className="panel-header">
                        <h3>Course Comparison</h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={classResults}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="rating" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="table-panel">
                    <div className="panel-header">
                        <h3>Detailed Course Metrics</h3>
                    </div>
                    <div className="table-wrapper">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Instructor</th>
                                    <th>Participation</th>
                                    <th>Avg Rating</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classResults.map((result, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="course-cell-main">
                                                <span className="code-pill">{result.code}</span>
                                                <span className="name-text">{result.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '600', color: '#475569' }}>{result.instructor}</td>
                                        <td>{result.participation}</td>
                                        <td>
                                            <div className="rating-pill">
                                                {result.rating}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="status-tag">Completed</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .class-results-page {
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
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

                .stats-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .mini-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    padding: 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition);
                }
                
                .mini-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                }

                .card-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }

                .highlight-blue .card-icon { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
                .highlight-purple .card-icon { background: rgba(236, 72, 153, 0.1); color: var(--secondary); }
                .highlight-green .card-icon { background: rgba(6, 182, 212, 0.1); color: var(--accent); }

                .card-data {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .card-data .label {
                    font-size: 13px;
                    color: var(--text-secondary);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .card-data .value {
                    font-size: 24px;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.01em;
                }

                .results-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                .chart-panel, .table-panel {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                }

                .table-panel {
                    grid-column: 1 / -1;
                }

                .panel-header h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 32px;
                    letter-spacing: -0.01em;
                }

                .chart-container {
                    width: 100%;
                }

                .results-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .results-table th {
                    padding: 16px;
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    border-bottom: 2px solid var(--glass-border);
                    letter-spacing: 0.1em;
                }

                .results-table td {
                    padding: 24px 16px;
                    font-size: 15px;
                    color: var(--text-secondary);
                    border-bottom: 1px solid var(--glass-border);
                }

                .results-table tr:last-child td {
                    border-bottom: none;
                }

                .rating-pill {
                    background: var(--grad-primary);
                    color: white;
                    padding: 4px 14px;
                    border-radius: 100px;
                    display: inline-flex;
                    font-weight: 800;
                    font-size: 13px;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
                }

                .course-cell-main {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .code-pill {
                    background: rgba(139, 92, 246, 0.1);
                    color: var(--primary);
                    padding: 4px 10px;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 11px;
                    text-transform: uppercase;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .name-text {
                    font-weight: 800;
                    color: var(--text-main);
                    font-size: 15px;
                }

                .status-tag {
                    color: var(--success);
                    font-weight: 800;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .font-bold {
                    font-weight: 800;
                }

                @media (max-width: 1024px) {
                    .results-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}} />
        </div>
    );
};

export default ClassResults;
