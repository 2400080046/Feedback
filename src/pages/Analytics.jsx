import React from 'react';
import { ANALYTICS_DATA, COURSES } from '../data/dummyData';
import { Calendar, Filter, Download, ArrowUpRight } from 'lucide-react';

const Analytics = () => {
  const maxRating = Math.max(...ANALYTICS_DATA.map(d => d.rating));

  return (
    <div className="analytics-page">
      <div className="toolbar glass">
        <div className="filters">
          <button className="filter-pill active">Semester 1, 2024</button>
          <button className="filter-pill">All Courses</button>
          <button className="filter-pill"><Filter size={16} /> Filters</button>
        </div>
        <div className="actions">
          <button className="icon-btn-outline"><Calendar size={18} /></button>
          <button className="download-btn"><Download size={18} /> Export PDF</button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card glass">
          <div className="chart-header">
            <h3>Feedback Rating Trend</h3>
            <span className="trend-label positive"><ArrowUpRight size={14} /> +15%</span>
          </div>
          <div className="bar-chart">
            {ANALYTICS_DATA.map((data, index) => (
              <div key={index} className="bar-group">
                <div
                  className="bar"
                  style={{ height: `${(data.rating / maxRating) * 100}%` }}
                >
                  <div className="bar-tooltip">{data.rating}</div>
                </div>
                <span className="bar-label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-list glass">
          <h3>Top Performing Categories</h3>
          <div className="category-items">
            {[
              { label: 'Teaching Quality', value: '4.8/5.0', progress: 96 },
              { label: 'Course Material', value: '4.5/5.0', progress: 90 },
              { label: 'Assignment Clarity', value: '4.2/5.0', progress: 84 },
              { label: 'Support & Guidance', value: '4.6/5.0', progress: 92 },
            ].map((cat, i) => (
              <div key={i} className="category-item">
                <div className="category-info">
                  <span>{cat.label}</span>
                  <span>{cat.value}</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: `${cat.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="report-table-container glass">
        <h3>Detailed Course Analytics</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Total Feedback</th>
              <th>Avg Rating</th>
              <th>Participation</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map(course => (
              <tr key={course.id}>
                <td><strong>{course.code}</strong></td>
                <td style={{ color: '#475569', fontWeight: '600' }}>{course.name}</td>
                <td>{course.instructor}</td>
                <td>145</td>
                <td>
                  <div className="rating-pill">4.7</div>
                </td>
                <td>
                  <div className="participation-cell">
                    <span>92%</span>
                    <div className="mini-progress"><div style={{ width: '92%' }}></div></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .analytics-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 2rem;
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toolbar {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .filters {
          display: flex;
          gap: 0.75rem;
        }

        .filter-pill {
          padding: 0.6rem 1.4rem;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid var(--glass-border);
          transition: var(--transition);
        }

        .filter-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--primary);
        }

        .filter-pill.active {
          background: var(--grad-primary);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .actions {
          display: flex;
          gap: 1rem;
        }

        .icon-btn-outline {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        
        .icon-btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--primary);
          border-color: var(--primary);
        }

        .download-btn {
          padding: 0 1.5rem;
          background: var(--grad-primary);
          color: white;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          font-size: 0.875rem;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
        }
        
        .download-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card, .stats-list, .report-table-container {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          padding: 2.25rem;
          transition: var(--transition);
        }

        .chart-card {
          height: 400px;
          display: flex;
          flex-direction: column;
        }

        .chart-header h3, .stats-list h3, .report-table-container h3 {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .trend-label {
          font-size: 0.875rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 6px 14px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .trend-label.positive { 
          color: var(--success); 
          background: rgba(16, 185, 129, 0.1);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.1);
        }

        .bar-chart {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 1rem;
          gap: 1.25rem;
        }

        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          height: 100%;
          justify-content: flex-end;
        }

        .bar {
          width: 100%;
          max-width: 42px;
          background: var(--grad-primary);
          border-radius: 10px 10px 0 0;
          position: relative;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 0 16px rgba(139, 92, 246, 0.15);
        }

        .bar:hover {
          filter: brightness(1.2);
          transform: scaleX(1.1);
          box-shadow: 0 0 24px rgba(139, 92, 246, 0.3);
        }

        .bar-tooltip {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-card);
          color: var(--text-main);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0;
          pointer-events: none;
          border: 1px solid var(--glass-border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: var(--transition);
        }

        .bar:hover .bar-tooltip {
          opacity: 1;
          top: -45px;
        }

        .bar-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .category-items {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .category-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .progress-bg {
          height: 10px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .progress-fill {
          height: 100%;
          background: var(--grad-primary);
          border-radius: 100px;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
        }

        .report-table-container {
          margin-top: 1rem;
        }

        .report-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .report-table th {
          padding: 1.25rem 1rem;
          border-bottom: 2px solid var(--glass-border);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .report-table td {
          padding: 1.75rem 1rem;
          border-bottom: 1px solid var(--glass-border);
          font-size: 0.925rem;
          color: var(--text-secondary);
        }

        .report-table td strong {
            color: var(--text-main);
            font-weight: 800;
        }

        .rating-pill {
          width: fit-content;
          padding: 0.4rem 1.25rem;
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.875rem;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .participation-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .participation-cell span {
            font-weight: 800;
            color: var(--text-main);
            width: 40px;
        }

        .mini-progress {
          width: 100px;
          height: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .mini-progress div {
          height: 100%;
          background: var(--secondary);
          border-radius: 100px;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default Analytics;
