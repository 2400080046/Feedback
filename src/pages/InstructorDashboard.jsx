import React from 'react';
import { DASHBOARD_STATS, ANALYTICS_DATA, SENTIMENT_ANALYSIS, COURSES } from '../data/dummyData';
import { Star, TrendingUp, Users, BookOpen, Download, ArrowRight, MessageCircle, BarChart2 } from 'lucide-react';

const InstructorDashboard = () => {
  const stats = DASHBOARD_STATS.instructor;
  const maxVal = Math.max(...ANALYTICS_DATA.map(d => d.rating));

  return (
    <div className="instructor-space">
      {/* Top Stat Row */}
      <div className="stat-deck">
        <div className="deck-card">
          <div className="deck-icon gold"><Star size={24} /></div>
          <div className="deck-info">
            <h3>Avg. Class Rating</h3>
            <p>{stats.avgRating} / 5.0</p>
          </div>
        </div>
        <div className="deck-card">
          <div className="deck-icon blue"><Users size={24} /></div>
          <div className="deck-info">
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>
        </div>
        <div className="deck-card">
          <div className="deck-icon green"><TrendingUp size={24} /></div>
          <div className="deck-info">
            <h3>Participation</h3>
            <p>{stats.participation}</p>
          </div>
        </div>
      </div>

      <div className="instructor-grid">
        {/* Performance Trend Chart */}
        <div className="grid-item chart-panel">
          <div className="panel-header">
            <div className="header-text">
              <h3>Performance Trend</h3>
              <p>Monthly feedback aggregate</p>
            </div>
            <button className="download-cta"><Download size={16} /> Report</button>
          </div>
          <div className="visual-chart">
            {ANALYTICS_DATA.map((d, i) => (
              <div key={i} className="bar-wrapper">
                <div className="bar-fill" style={{ height: `${(d.rating / maxVal) * 100}%` }}>
                  <span className="tooltip">{d.rating}</span>
                </div>
                <span className="bar-tag">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis Side */}
        <div className="grid-item sentiment-panel">
          <h3>Student Sentiment Analysis</h3>
          <div className="sentiment-list">
            {SENTIMENT_ANALYSIS.map((s, i) => (
              <div key={i} className={`sentiment-card ${s.sentiment.toLowerCase()}`}>
                <div className="sent-top">
                  <div className="sent-meta">
                    <span className="sent-label">{s.sentiment}</span>
                    <span className="course-tag-mini">{s.course}</span>
                  </div>
                  <span className="sent-score">Score: {s.score}</span>
                </div>
                <p className="sent-text">"{s.text}"</p>
              </div>
            ))}
          </div>
          <button className="view-feedback-btn">
            Read All Comments <ArrowRight size={18} />
          </button>
        </div>

        {/* Question-wise Analysis Table */}
        <div className="grid-item full-width question-panel">
          <div className="panel-header">
            <h3>Question-wise Strength Analysis</h3>
            <p>Identifying specific improvement areas</p>
          </div>
          <div className="question-grid">
            {[
              { q: "Course Material Clarity", score: 4.8, status: 'Strong' },
              { q: "Explanation Complexity", score: 3.2, status: 'Needs Improvement' },
              { q: "Lab Support Quality", score: 4.5, status: 'Strong' },
              { q: "Deadline Reasonability", score: 4.0, status: 'Good' },
            ].map((item, i) => (
              <div key={i} className="q-card">
                <div className="q-info">
                  <p className="q-text">{item.q}</p>
                  <div className="q-bar-bg">
                    <div className="q-bar-fill" style={{ width: `${(item.score / 5) * 100}%` }}></div>
                  </div>
                </div>
                <div className="q-metrics">
                  <span className="q-score">{item.score}</span>
                  <span className={`q-status ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                .instructor-space { display: flex; flex-direction: column; gap: 32px; }
                
                .stat-deck { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
                .deck-card { background: white; padding: 32px; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 24px; }
                .deck-icon { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                .deck-icon.gold { background: #fffbeb; color: #f59e0b; }
                .deck-icon.blue { background: #eff6ff; color: #3b82f6; }
                .deck-icon.green { background: #f0fdf4; color: #10b981; }
                .deck-info h3 { font-size: 14px; color: #64748b; margin-bottom: 4px; }
                .deck-info p { font-size: 28px; font-weight: 800; color: #0f172a; }

                .instructor-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 32px; }
                .grid-item { background: white; padding: 32px; border-radius: 20px; border: 1px solid #e2e8f0; }
                .full-width { grid-column: span 2; }

                .panel-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
                .header-text h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
                .header-text p { font-size: 14px; color: #64748b; }

                .download-cta { background: #f1f5f9; border: none; padding: 8px 16px; border-radius: 10px; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .visual-chart { height: 250px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 20px; gap: 20px; }
                .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; height: 100%; justify-content: flex-end; }
                .bar-fill { width: 40px; background: linear-gradient(to top, #2563eb, #60a5fa); border-radius: 8px 8px 0 0; position: relative; cursor: pointer; transition: 0.3s; }
                .bar-fill:hover { transform: scaleX(1.1); filter: brightness(1.1); }
                .tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: #0f172a; color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; opacity: 0; }
                .bar-fill:hover .tooltip { opacity: 1; top: -35px; }
                .bar-tag { font-size: 12px; color: #94a3b8; font-weight: 600; }

                .sentiment-panel h3 { font-size: 16px; margin-bottom: 24px; }
                .sentiment-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
                .sentiment-card { padding: 16px; border-radius: 12px; border-left: 4px solid #ccc; background: #f8fafc; }
                .sentiment-card.positive { border-left-color: #22c55e; background: #f0fdf4; }
                .sentiment-card.neutral { border-left-color: #f59e0b; background: #fffbeb; }
                .sentiment-card.negative { border-left-color: #ef4444; background: #fef2f2; }
                .sent-meta { display: flex; align-items: center; gap: 8px; }
                .course-tag-mini { font-size: 10px; background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px; color: #64748b; }
                .sent-text { font-size: 14px; font-style: italic; color: #1e293b; line-height: 1.5; }
                
                .view-feedback-btn { width: 100%; padding: 14px; background: #f1f5f9; border: none; border-radius: 12px; color: #475569; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; }

                .question-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px; }
                .q-card { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #f1f5f9; }
                .q-info { flex: 1; }
                .q-text { font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 8px; }
                .q-bar-bg { height: 6px; background: #e2e8f0; border-radius: 3px; width: 80%; }
                .q-bar-fill { height: 100%; background: #2563eb; border-radius: 3px; }
                .q-metrics { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
                .q-score { font-size: 18px; font-weight: 800; color: #0f172a; }
                .q-status { font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px; }
                .strong { color: #15803d; background: #dcfce7; }
                .needs-improvement { color: #b91c1c; background: #fee2e2; }

                @media (max-width: 1024px) { .instructor-grid { grid-template-columns: 1fr; } .full-width { grid-column: span 1; } }
            `}} />
    </div>
  );
};

export default InstructorDashboard;
