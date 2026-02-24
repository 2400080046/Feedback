import React from 'react';
import { INSTRUCTORS } from '../data/dummyData';
import { Trophy, Medal, Award, TrendingUp, Users, Star } from 'lucide-react';

const Rankings = () => {
    // Mocking rank data based on instructors
    const rankedInstructors = [...INSTRUCTORS].sort((a, b) => b.courses - a.courses).map((instr, idx) => ({
        ...instr,
        rank: idx + 1,
        rating: (Math.random() * (5 - 4.2) + 4.2).toFixed(1),
        participation: Math.floor(Math.random() * (98 - 85) + 85) + '%'
    }));

    return (
        <div className="rankings-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Institutional Rankings</h1>
                    <p className="page-subtitle">Recognizing excellence in teaching and student engagement across departments.</p>
                </div>
                <div className="rank-period">
                    <TrendingUp size={16} />
                    <span>Spring 2026 Rankings</span>
                </div>
            </div>

            <div className="top-three">
                {rankedInstructors.slice(0, 3).map((instr, idx) => (
                    <div key={instr.id} className={`rank-podium pos-${idx + 1}`}>
                        <div className="podium-badge">
                            {idx === 0 ? <Trophy size={32} /> : idx === 1 ? <Medal size={28} /> : <Award size={24} />}
                        </div>
                        <div className="podium-avatar">
                            {instr.name.charAt(0)}
                        </div>
                        <h3 className="podium-name">{instr.name}</h3>
                        <p className="podium-dept">{instr.dept}</p>
                        <div className="podium-stats">
                            <div className="p-stat">
                                <span className="p-val">{instr.rating}</span>
                                <span className="p-label">Rating</span>
                            </div>
                            <div className="p-sep"></div>
                            <div className="p-stat">
                                <span className="p-val">{instr.participation}</span>
                                <span className="p-label">Engagement</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rank-list-card">
                <div className="card-header">
                    <h3>Overall Faculty Rankings</h3>
                </div>
                <table className="ranks-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Faculty Member</th>
                            <th>Department</th>
                            <th>Course Load</th>
                            <th>Student Rating</th>
                            <th>Engagement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedInstructors.map(instr => (
                            <tr key={instr.id} className={instr.rank <= 3 ? 'top-rank' : ''}>
                                <td>
                                    <span className={`rank-number r-${instr.rank}`}>#{instr.rank}</span>
                                </td>
                                <td>
                                    <div className="faculty-cell">
                                        <div className="avatar-small">{instr.name.charAt(0)}</div>
                                        <span className="font-bold">{instr.name}</span>
                                    </div>
                                </td>
                                <td>{instr.dept}</td>
                                <td>{instr.courses} Modules</td>
                                <td>
                                    <div className="rating-cell">
                                        <Star size={14} fill="#eab308" color="#eab308" />
                                        <span>{instr.rating}</span>
                                    </div>
                                </td>
                                <td>{instr.participation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .rankings-page {
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
                    margin-bottom: 40px;
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

                .rank-period {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(34, 197, 94, 0.1);
                    color: var(--success);
                    padding: 10px 20px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 800;
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .top-three {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    gap: 32px;
                    margin-bottom: 64px;
                    padding-bottom: 24px;
                }

                .rank-podium {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 32px;
                    border: 1px solid var(--glass-border);
                    padding: 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: var(--transition);
                    position: relative;
                }

                .rank-podium:hover {
                    transform: translateY(-12px);
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
                }

                .pos-1 { 
                    width: 360px; 
                    z-index: 2; 
                    border: 2px solid #f59e0b; 
                    box-shadow: 0 0 30px rgba(245, 158, 11, 0.15); 
                }
                .pos-2 { width: 300px; order: -1; margin-bottom: -30px; border: 1px solid #94a3b8; }
                .pos-3 { width: 300px; margin-bottom: -30px; border: 1px solid #d97706; }

                .podium-badge {
                    margin-bottom: 24px;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                }

                .pos-1 .podium-badge { color: #f59e0b; }
                .pos-2 .podium-badge { color: #94a3b8; }
                .pos-3 .podium-badge { color: #d97706; }

                .podium-avatar {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 20px;
                    border: 1px solid var(--glass-border);
                }

                .podium-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .podium-dept {
                    font-size: 13px;
                    color: var(--text-muted);
                    font-weight: 700;
                    margin-top: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .podium-stats {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-top: 32px;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 14px 24px;
                    border-radius: 16px;
                    border: 1px solid var(--glass-border);
                }

                .p-stat {
                    display: flex;
                    flex-direction: column;
                }

                .p-val {
                    font-weight: 800;
                    color: var(--text-main);
                    font-size: 17px;
                }

                .p-label {
                    font-size: 11px;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                }

                .p-sep {
                    width: 1px;
                    height: 28px;
                    background: var(--glass-border);
                }

                .rank-list-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                }

                .rank-list-card .card-header {
                    padding: 32px;
                    border-bottom: 1px solid var(--glass-border);
                }

                .rank-list-card .card-header h3 {
                    margin: 0;
                    color: var(--text-main);
                    font-weight: 800;
                    font-size: 20px;
                }

                .ranks-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .ranks-table th {
                    padding: 20px 32px;
                    background: rgba(255, 255, 255, 0.01);
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid var(--glass-border);
                }

                .ranks-table td {
                    padding: 24px 32px;
                    border-bottom: 1px solid var(--glass-border);
                    font-size: 15px;
                    color: var(--text-secondary);
                    font-weight: 600;
                }

                .top-rank {
                    background: rgba(255, 255, 255, 0.01);
                }

                .rank-number {
                    font-weight: 900;
                    font-size: 15px;
                }

                .r-1 { color: #f59e0b; }
                .r-2 { color: #94a3b8; }
                .r-3 { color: #d97706; }

                .faculty-cell {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .avatar-small {
                    width: 36px;
                    height: 36px;
                    background: rgba(139, 92, 246, 0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: var(--primary);
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .rating-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 800;
                    color: var(--text-main);
                }

                .font-bold { font-weight: 800; color: var(--text-main); }

                @media (max-width: 1024px) {
                    .top-three { flex-direction: column; align-items: center; gap: 32px; }
                    .pos-1, .pos-2, .pos-3 { width: 100%; margin: 0; order: initial; }
                }
                `
            }} />
        </div>
    );
};

export default Rankings;
