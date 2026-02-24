import React from 'react';
import { DASHBOARD_STATS, PENDING_FEEDBACK, FEEDBACK_HISTORY } from '../data/dummyData';
import { ClipboardList, CheckCircle, Clock, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const stats = DASHBOARD_STATS.student;

  return (
    <div className="student-dashboard">
      {/* Quick Overview Section */}
      <div className="overview-row">
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-label">Pending Forms</span>
            <span className="stat-value">{stats.pendingFeedback}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon submitted">
            <CheckCircle size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-label">Feedback Submitted</span>
            <span className="stat-value">{stats.feedbackSubmitted}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon attendance">
            <Calendar size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-label">Attendance Rank</span>
            <span className="stat-value">{stats.attendance}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        {/* Pending Section */}
        <div className="content-panel">
          <div className="panel-header">
            <h3>Pending Feedback Status</h3>
            <Link to="/pending-feedback" className="view-all">View All</Link>
          </div>
          <div className="pending-list">
            {PENDING_FEEDBACK.map(item => (
              <div key={item.id} className="pending-item">
                <div className="item-info">
                  <p className="course-title">{item.courseName}</p>
                  <p className="instructor-sub">Instructor: {item.instructor}</p>
                </div>
                <div className="item-action">
                  <div className="deadline-badge">
                    <AlertCircle size={14} />
                    Ends: {item.deadline}
                  </div>
                  <Link to="/feedback" className="submit-btn">
                    Submit <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="content-panel">
          <div className="panel-header">
            <h3>Feedback History</h3>
            <Link to="/feedback-history" className="view-all">View History</Link>
          </div>
          <div className="history-list">
            {FEEDBACK_HISTORY.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-info">
                  <p className="history-course">{item.courseName}</p>
                  <p className="history-instr">{item.instructor}</p>
                  <p className="history-date">Submitted on: {item.date}</p>
                </div>
                <div className="history-score">
                  <div className="score-ring">
                    {item.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                .student-dashboard {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .overview-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                }

                .stat-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    padding: 24px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition);
                }
                
                .stat-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                    box-shadow: 0 12px 24px -8px rgba(139, 92, 246, 0.2);
                }

                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }

                .stat-icon.pending { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
                .stat-icon.submitted { background: rgba(16, 185, 129, 0.1); color: var(--success); }
                .stat-icon.attendance { background: rgba(6, 182, 212, 0.1); color: var(--secondary); }

                .stat-text {
                    display: flex;
                    flex-direction: column;
                }

                .stat-label {
                    font-size: 13px;
                    color: var(--text-secondary);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 800;
                    color: var(--text-main);
                }

                .dashboard-main-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 32px;
                }

                .content-panel {
                    background: var(--glass);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .panel-header {
                    padding: 24px 32px;
                    border-bottom: 1px solid var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.01);
                }

                .panel-header h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.01em;
                }

                .view-all {
                    font-size: 13px;
                    color: var(--primary);
                    font-weight: 700;
                    text-decoration: none;
                    transition: var(--transition);
                }
                
                .view-all:hover { color: var(--secondary); text-decoration: underline; }

                .pending-list, .history-list {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .pending-item {
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition);
                }
                
                .pending-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                }

                .course-title {
                    font-weight: 700;
                    color: var(--text-main);
                    font-size: 15px;
                }

                .instructor-sub {
                    font-size: 13px;
                    color: var(--text-secondary);
                    margin-top: 2px;
                }

                .item-action {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 10px;
                }

                .deadline-badge {
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--accent);
                    background: rgba(244, 63, 94, 0.1);
                    padding: 4px 10px;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    text-transform: uppercase;
                }

                .submit-btn {
                    background: var(--grad-primary);
                    color: white;
                    text-decoration: none;
                    padding: 8px 18px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: var(--transition);
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
                }

                .submit-btn:hover { 
                    transform: translateY(-2px); 
                    box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
                    filter: brightness(1.1);
                }

                .history-item {
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--glass-border);
                }

                .history-item:last-child { border-bottom: none; }

                .history-course {
                    font-weight: 700;
                    color: var(--text-main);
                    font-size: 15px;
                }

                .history-instr {
                    font-size: 12px;
                    color: var(--text-secondary);
                    font-weight: 600;
                    margin-top: 2px;
                }
                
                .history-date {
                    font-size: 12px;
                    color: var(--text-muted);
                    margin-top: 4px;
                }

                .score-ring {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    color: var(--success);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 14px;
                    box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
                }

                @media (max-width: 1024px) {
                    .dashboard-main-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
    </div>
  );
};

export default StudentDashboard;
