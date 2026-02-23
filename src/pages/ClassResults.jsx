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
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
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

                .stats-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .mini-card {
                    background: white;
                    padding: 20px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    border: 1px solid #e2e8f0;
                }

                .card-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .highlight-blue .card-icon { background: #eff6ff; color: #2563eb; }
                .highlight-purple .card-icon { background: #f5f3ff; color: #8b5cf6; }
                .highlight-green .card-icon { background: #f0fdf4; color: #22c55e; }

                .card-data {
                    display: flex;
                    flex-direction: column;
                }

                .card-data .label {
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 500;
                }

                .card-data .value {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                }

                .results-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                .chart-panel, .table-panel {
                    background: white;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                }

                .table-panel {
                    grid-column: 1 / -1;
                }

                .panel-header h3 {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 24px;
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
                    padding: 12px 16px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    border-bottom: 1px solid #f1f5f9;
                }

                .results-table td {
                    padding: 16px;
                    font-size: 14px;
                    color: #1e293b;
                    border-bottom: 1px solid #f1f5f9;
                }

                .results-table tr:last-child td {
                    border-bottom: none;
                }

                .rating-pill {
                    background: #0f172a;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 99px;
                    display: inline-flex;
                    font-weight: 700;
                    font-size: 13px;
                }

                .course-cell-main {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .code-pill {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 2px 8px;
                    border-radius: 6px;
                    font-weight: 800;
                    font-size: 11px;
                    text-transform: uppercase;
                    border: 1px solid #dbeafe;
                }

                .name-text {
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 14px;
                }

                .status-tag {
                    color: #22c55e;
                    font-weight: 600;
                    background: #f0fdf4;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                }

                .font-bold {
                    font-weight: 700;
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
