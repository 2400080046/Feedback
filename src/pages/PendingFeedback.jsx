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

                .header-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(245, 158, 11, 0.1);
                    color: var(--warning);
                    padding: 10px 20px;
                    border-radius: 99px;
                    font-size: 13px;
                    font-weight: 800;
                    border: 1px solid rgba(245, 158, 11, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .feedback-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 24px;
                }

                .feedback-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 32px;
                    transition: var(--transition);
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                }

                .feedback-card:hover {
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
                    border-color: var(--primary);
                    transform: translateY(-8px);
                    background: rgba(255, 255, 255, 0.05);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .course-info {
                    display: flex;
                    gap: 20px;
                }

                .course-icon {
                    width: 56px;
                    height: 56px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    border: 1px solid var(--glass-border);
                }

                .course-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .instructor-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-secondary);
                    font-size: 14px;
                    margin-top: 6px;
                    font-weight: 600;
                }

                .deadline-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--accent);
                    background: rgba(244, 63, 94, 0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 800;
                    border: 1px solid rgba(244, 63, 94, 0.2);
                    text-transform: uppercase;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 24px;
                    border-top: 1px solid var(--glass-border);
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    font-weight: 800;
                    color: var(--success);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .status-indicator .dot {
                    width: 10px;
                    height: 10px;
                    background: var(--success);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--success);
                    position: relative;
                }
                
                .status-indicator .dot::after {
                    content: '';
                    position: absolute;
                    width: 100%; height: 100%;
                    background: inherit;
                    border-radius: inherit;
                    animation: pulse-sm 2s infinite;
                }
                
                @keyframes pulse-sm {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(3); opacity: 0; }
                }

                .action-button {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--grad-primary);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: var(--transition);
                    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
                }

                .action-button:hover {
                    box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4);
                    transform: translateX(4px);
                    filter: brightness(1.1);
                }

                .empty-state {
                    grid-column: 1 / -1;
                    padding: 100px 40px;
                    background: var(--glass);
                    border: 2px dashed var(--glass-border);
                    border-radius: 32px;
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
