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

                .export-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--glass);
                    color: var(--text-main);
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    border: 1px solid var(--glass-border);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .export-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                }

                .history-container {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
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
                    background: rgba(255, 255, 255, 0.01);
                    padding: 20px 24px;
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid var(--glass-border);
                }

                .history-table td {
                    padding: 24px;
                    border-bottom: 1px solid var(--glass-border);
                    font-size: 15px;
                    color: var(--text-secondary);
                }

                .history-table tr:last-child td {
                    border-bottom: none;
                }

                .course-cell {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .course-icon {
                    width: 36px;
                    height: 36px;
                    background: rgba(139, 92, 246, 0.1);
                    color: var(--primary);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .course-name {
                    font-weight: 700;
                    color: var(--text-main);
                }

                .date-cell, .rating-cell, .status-cell {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                }

                .rating-val {
                    font-weight: 800;
                    color: var(--text-main);
                }

                .status-cell {
                    color: var(--success);
                    font-weight: 800;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    display: inline-flex;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .empty-state {
                    padding: 100px 40px;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 64px;
                    margin-bottom: 24px;
                    opacity: 0.5;
                }
                
                .empty-state h3 {
                    font-size: 20px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 8px;
                }
                
                .empty-state p {
                    color: var(--text-secondary);
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
