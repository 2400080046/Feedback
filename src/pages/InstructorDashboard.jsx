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
                .instructor-space { 
                  display: flex; 
                  flex-direction: column; 
                  gap: 32px; 
                  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .stat-deck { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
                .deck-card { 
                  background: var(--glass); 
                  padding: 32px; 
                  border-radius: 24px; 
                  border: 1px solid var(--glass-border); 
                  display: flex; 
                  align-items: center; 
                  gap: 24px; 
                  transition: var(--transition);
                }
                .deck-card:hover {
                  transform: translateY(-4px);
                  background: rgba(255, 255, 255, 0.05);
                  border-color: var(--primary);
                }
                
                .deck-icon { 
                  width: 64px; 
                  height: 64px; 
                  border-radius: 18px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }
                .deck-icon.gold { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
                .deck-icon.blue { background: rgba(6, 182, 212, 0.1); color: var(--secondary); }
                .deck-icon.green { background: rgba(16, 185, 129, 0.1); color: var(--success); }
                
                .deck-info h3 { font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
                .deck-info p { font-size: 32px; font-weight: 800; color: var(--text-main); }

                .instructor-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 32px; }
                .grid-item { 
                  background: var(--glass); 
                  padding: 32px; 
                  border-radius: 24px; 
                  border: 1px solid var(--glass-border); 
                  transition: var(--transition);
                }
                .full-width { grid-column: span 2; }

                .panel-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
                .header-text h3 { font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 4px; letter-spacing: -0.01em; }
                .header-text p { font-size: 14px; color: var(--text-secondary); }

                .download-cta { 
                  background: rgba(255, 255, 255, 0.03); 
                  border: 1px solid var(--glass-border); 
                  padding: 10px 20px; 
                  border-radius: 12px; 
                  font-weight: 700; 
                  color: var(--text-main); 
                  display: flex; 
                  align-items: center; 
                  gap: 8px; 
                  cursor: pointer; 
                  transition: var(--transition);
                }
                .download-cta:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--primary); }

                .visual-chart { height: 250px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 20px; gap: 20px; }
                .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; height: 100%; justify-content: flex-end; }
                .bar-fill { 
                  width: 40px; 
                  background: var(--grad-primary); 
                  border-radius: 10px 10px 0 0; 
                  position: relative; 
                  cursor: pointer; 
                  transition: var(--transition); 
                  box-shadow: 0 0 16px rgba(139, 92, 246, 0.2);
                }
                .bar-fill:hover { transform: scaleX(1.1); filter: brightness(1.2); box-shadow: 0 0 24px rgba(139, 92, 246, 0.4); }
                .tooltip { 
                  position: absolute; top: -30px; left: 50%; transform: translateX(-50%); 
                  background: var(--bg-card); color: var(--text-main); padding: 6px 12px; 
                  border-radius: 8px; font-size: 11px; opacity: 0; font-weight: 800;
                  border: 1px solid var(--glass-border);
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .bar-fill:hover .tooltip { opacity: 1; top: -45px; }
                .bar-tag { font-size: 12px; color: var(--text-muted); font-weight: 700; }

                .sentiment-panel h3 { font-size: 18px; margin-bottom: 24px; font-weight: 800; color: var(--text-main); }
                .sentiment-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
                .sentiment-card { 
                  padding: 20px; 
                  border-radius: 16px; 
                  border-left: 4px solid var(--text-muted); 
                  background: rgba(255, 255, 255, 0.02); 
                  border: 1px solid var(--glass-border);
                  border-left-width: 4px;
                }
                .sentiment-card.positive { border-left-color: var(--success); background: rgba(16, 185, 129, 0.03); }
                .sentiment-card.neutral { border-left-color: var(--warning); background: rgba(245, 158, 11, 0.03); }
                .sentiment-card.negative { border-left-color: var(--danger); background: rgba(239, 68, 68, 0.03); }
                .sent-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
                .sent-label { font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
                .course-tag-mini { font-size: 10px; background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; color: var(--text-muted); border: 1px solid var(--glass-border); }
                .sent-text { font-size: 14px; font-style: italic; color: var(--text-secondary); line-height: 1.6; }
                
                .view-feedback-btn { 
                  width: 100%; padding: 16px; 
                  background: rgba(255, 255, 255, 0.03); 
                  border: 1px solid var(--glass-border); 
                  border-radius: 12px; color: var(--text-main); font-weight: 700; 
                  display: flex; align-items: center; justify-content: center; gap: 12px; 
                  cursor: pointer; transition: var(--transition);
                }
                .view-feedback-btn:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--primary); color: var(--primary); }

                .question-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; }
                .q-card { 
                  display: flex; justify-content: space-between; align-items: center; 
                  padding: 24px; background: rgba(255, 255, 255, 0.02); 
                  border-radius: 16px; border: 1px solid var(--glass-border); 
                  transition: var(--transition);
                }
                .q-card:hover { border-color: var(--primary); background: rgba(255, 255, 255, 0.05); }
                .q-info { flex: 1; }
                .q-text { font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; }
                .q-bar-bg { height: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; width: 85%; overflow: hidden; }
                .q-bar-fill { height: 100%; background: var(--grad-primary); border-radius: 4px; box-shadow: 0 0 8px rgba(139, 92, 246, 0.3); }
                .q-metrics { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
                .q-score { font-size: 20px; font-weight: 800; color: var(--text-main); }
                .q-status { font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }
                .strong { color: var(--success); background: rgba(16, 185, 129, 0.1); }
                .needs-improvement { color: var(--danger); background: rgba(239, 68, 68, 0.1); }

                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) { .instructor-grid { grid-template-columns: 1fr; } .full-width { grid-column: span 1; } }
            `}} />
    </div>
  );
};

export default InstructorDashboard;
