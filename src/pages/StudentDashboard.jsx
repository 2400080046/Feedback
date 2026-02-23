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
                }

                .overview-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                }

                .stat-card {
                    background: white;
                    padding: 24px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 1px solid #e2e8f0;
                }

                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-icon.pending { background: #fff7ed; color: #f97316; }
                .stat-icon.submitted { background: #f0fdf4; color: #22c55e; }
                .stat-icon.attendance { background: #eff6ff; color: #3b82f6; }

                .stat-text {
                    display: flex;
                    flex-direction: column;
                }

                .stat-label {
                    font-size: 14px;
                    color: #64748b;
                    font-weight: 500;
                }

                .stat-value {
                    font-size: 24px;
                    font-weight: 800;
                    color: #0f172a;
                }

                .dashboard-main-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 32px;
                }

                .content-panel {
                    background: white;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .panel-header {
                    padding: 24px;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .panel-header h3 {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                }

                .view-all {
                    font-size: 13px;
                    color: #2563eb;
                    font-weight: 600;
                    text-decoration: none;
                }

                .pending-list, .history-list {
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .pending-item {
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #f1f5f9;
                }

                .course-title {
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 14px;
                }

                .instructor-sub {
                    font-size: 12px;
                    color: #64748b;
                    margin-top: 2px;
                }

                .item-action {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 8px;
                }

                .deadline-badge {
                    font-size: 11px;
                    font-weight: 700;
                    color: #ef4444;
                    background: #fef2f2;
                    padding: 4px 8px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .submit-btn {
                    background: #0f172a;
                    color: white;
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: 0.2s;
                }

                .submit-btn:hover { background: #2563eb; }

                .history-item {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #f1f5f9;
                }

                .history-item:last-child { border-bottom: none; }

                .history-course {
                    font-weight: 600;
                    color: #334155;
                    font-size: 14px;
                }

                .history-instr {
                    font-size: 11px;
                    color: #64748b;
                    font-weight: 600;
                    margin-top: 1px;
                }
                
                .history-date {
                    font-size: 12px;
                    color: #94a3b8;
                    margin-top: 2px;
                }

                .score-ring {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 2px solid #22c55e;
                    color: #22c55e;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 13px;
                }

                @media (max-width: 1024px) {
                    .dashboard-main-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}} />
    </div>
  );
};

export default StudentDashboard;
