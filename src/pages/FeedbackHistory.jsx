import React from 'react';
import { FEEDBACK_HISTORY } from '../data/dummyData';
import { CheckCircle, Calendar, Star, BookOpen, Download } from 'lucide-react';

const FeedbackHistory = () => {
    return (
        <div className="feedback-history-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Feedback History</h1>
                    <p className="page-subtitle">Track your previous submissions and evaluations.</p>
                </div>
                <button className="export-btn">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            <div className="history-container">
                {FEEDBACK_HISTORY.length > 0 ? (
                    <div className="history-table-wrapper">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Course Information</th>
                                    <th>Instructor</th>
                                    <th>Submission Date</th>
                                    <th>Rating Given</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FEEDBACK_HISTORY.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="course-cell">
                                                <div className="course-icon">
                                                    <BookOpen size={16} />
                                                </div>
                                                <span className="course-name">{item.courseName}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '600', color: '#475569' }}>{item.instructor}</td>
                                        <td>
                                            <div className="date-cell">
                                                <Calendar size={14} />
                                                <span>{item.date}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="rating-cell">
                                                <Star size={14} fill="#eab308" color="#eab308" />
                                                <span className="rating-val">{item.rating}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status-cell">
                                                <CheckCircle size={14} />
                                                <span>Submitted</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📂</div>
                        <h3>No history found</h3>
                        <p>You haven't submitted any feedback forms yet.</p>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .feedback-history-page {
                    animation: fadeIn 0.5s ease;
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

                .export-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: white;
                    color: #0f172a;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    border: 1px solid #e2e8f0;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .export-btn:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                }

                .history-container {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    overflow: hidden;
                }

                .history-table-wrapper {
                    overflow-x: auto;
                }

                .history-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .history-table th {
                    background: #f8fafc;
                    padding: 16px 24px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .history-table td {
                    padding: 20px 24px;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 15px;
                    color: #1e293b;
                }

                .history-table tr:last-child td {
                    border-bottom: none;
                }

                .course-cell {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .course-icon {
                    width: 32px;
                    height: 32px;
                    background: #eff6ff;
                    color: #3b82f6;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .course-name {
                    font-weight: 600;
                }

                .date-cell, .rating-cell, .status-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .rating-val {
                    font-weight: 700;
                }

                .status-cell {
                    color: #22c55e;
                    font-weight: 600;
                    background: #f0fdf4;
                    padding: 4px 12px;
                    border-radius: 99px;
                    display: inline-flex;
                }

                .empty-state {
                    padding: 80px;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }

                @media (max-width: 768px) {
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    .export-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}} />
        </div>
    );
};

export default FeedbackHistory;
