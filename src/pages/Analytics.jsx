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
          animation: fadeIn 0.5s ease-out;
        }

        .toolbar {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .filters {
          display: flex;
          gap: 0.75rem;
        }

        .filter-pill {
          padding: 0.5rem 1.25rem;
          background: #f1f5f9;
          color: #475569;
          border-radius: 99px;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .filter-pill.active {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .actions {
          display: flex;
          gap: 1rem;
        }

        .icon-btn-outline {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #64748b;
        }

        .download-btn {
          padding: 0 1.5rem;
          background: #0f172a;
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card, .stats-list, .report-table-container {
          background: white;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 2rem;
        }

        .chart-card {
          height: 400px;
          display: flex;
          flex-direction: column;
        }

        .chart-header h3, .stats-list h3, .report-table-container h3 {
          font-size: 1.125rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .trend-label {
          font-size: 0.875rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 4px 10px;
          border-radius: 99px;
        }

        .trend-label.positive { 
          color: #059669; 
          background: #ecfdf5;
        }

        .bar-chart {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 1rem;
          gap: 1rem;
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
          max-width: 48px;
          background: linear-gradient(180deg, #6366f1 0%, #a855f7 100%);
          border-radius: 8px 8px 0 0;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bar:hover {
          filter: brightness(1.1);
          transform: scaleX(1.05);
        }

        .bar-tooltip {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          background: #0f172a;
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0;
          pointer-events: none;
        }

        .bar:hover .bar-tooltip {
          opacity: 1;
        }

        .bar-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
        }

        .category-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .category-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e293b;
        }

        .progress-bg {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #2563eb;
          border-radius: 4px;
        }

        .report-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .report-table th {
          padding: 1rem;
          border-bottom: 2px solid #f1f5f9;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .report-table td {
          padding: 1.5rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.875rem;
          color: #1e293b;
        }

        .report-table td strong {
            color: #0f172a;
            font-weight: 800;
        }

        .rating-pill {
          width: fit-content;
          padding: 0.35rem 1rem;
          background: #f0fdf4;
          color: #16a34a;
          border-radius: 99px;
          font-weight: 800;
          font-size: 0.875rem;
        }

        .participation-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .participation-cell span {
            font-weight: 700;
            color: #475569;
        }

        .mini-progress {
          width: 80px;
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
        }

        .mini-progress div {
          height: 100%;
          background: #2563eb;
          border-radius: 3px;
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
