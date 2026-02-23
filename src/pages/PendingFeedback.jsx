import React from 'react';
import { PENDING_FEEDBACK } from '../data/dummyData';
import { Clock, AlertCircle, ArrowRight, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const PendingFeedback = () => {
    return (
        <div className="pending-feedback-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Pending Feedback</h1>
                    <p className="page-subtitle">You have {PENDING_FEEDBACK.length} feedback forms waiting for your input.</p>
                </div>
                <div className="header-badge">
                    <Clock size={16} />
                    <span>Action Required</span>
                </div>
            </div>

            <div className="feedback-grid">
                {PENDING_FEEDBACK.length > 0 ? (
                    PENDING_FEEDBACK.map(item => (
                        <div key={item.id} className="feedback-card">
                            <div className="card-top">
                                <div className="course-info">
                                    <div className="course-icon">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h3 className="course-name">{item.courseName}</h3>
                                        <div className="instructor-info">
                                            <User size={14} />
                                            <span>{item.instructor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="deadline-status">
                                    <AlertCircle size={14} />
                                    <span>Due: {item.deadline}</span>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="status-indicator">
                                    <div className="dot"></div>
                                    <span>Active</span>
                                </div>
                                <Link to="/feedback" className="action-button">
                                    Start Evaluation
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🎉</div>
                        <h3>All caught up!</h3>
                        <p>No pending feedback forms at the moment.</p>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pending-feedback-page {
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

                .header-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #fff7ed;
                    color: #f97316;
                    padding: 8px 16px;
                    border-radius: 99px;
                    font-size: 13px;
                    font-weight: 600;
                    border: 1px solid #ffedd5;
                }

                .feedback-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 24px;
                }

                .feedback-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    padding: 24px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .feedback-card:hover {
                    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
                    border-color: #2563eb;
                    transform: translateY(-4px);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .course-info {
                    display: flex;
                    gap: 16px;
                }

                .course-icon {
                    width: 48px;
                    height: 48px;
                    background: #f1f5f9;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                }

                .course-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }

                .instructor-info {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #64748b;
                    font-size: 14px;
                    margin-top: 4px;
                }

                .deadline-status {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #ef4444;
                    background: #fef2f2;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 20px;
                    border-top: 1px dashed #e2e8f0;
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #22c55e;
                }

                .status-indicator .dot {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 0 3px #dcfce7;
                }

                .action-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #0f172a;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .action-button:hover {
                    background: #2563eb;
                    gap: 12px;
                }

                .empty-state {
                    grid-column: 1 / -1;
                    padding: 80px;
                    background: #f8fafc;
                    border: 2px dashed #e2e8f0;
                    border-radius: 24px;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }

                @media (max-width: 640px) {
                    .feedback-grid {
                        grid-template-columns: 1fr;
                    }
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                }
            `}} />
        </div>
    );
};

export default PendingFeedback;
