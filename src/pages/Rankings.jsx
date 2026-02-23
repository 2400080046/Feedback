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
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
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

                .rank-period {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #f0fdf4;
                    color: #16a34a;
                    padding: 8px 16px;
                    border-radius: 99px;
                    font-size: 13px;
                    font-weight: 700;
                }

                .top-three {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    gap: 24px;
                    margin-bottom: 48px;
                    padding-bottom: 24px;
                }

                .rank-podium {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    padding: 32px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: 0.3s;
                    position: relative;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }

                .rank-podium:hover {
                    transform: translateY(-8px);
                    border-color: #2563eb;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }

                .pos-1 { width: 320px; z-index: 2; border: 2px solid #f59e0b; }
                .pos-2 { width: 280px; order: -1; margin-bottom: -20px; border: 1px solid #cbd5e1; }
                .pos-3 { width: 280px; margin-bottom: -20px; border: 1px solid #d97706; }

                .podium-badge {
                    margin-bottom: 20px;
                }

                .pos-1 .podium-badge { color: #f59e0b; }
                .pos-2 .podium-badge { color: #64748b; }
                .pos-3 .podium-badge { color: #d97706; }

                .podium-avatar {
                    width: 64px;
                    height: 64px;
                    background: #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: 800;
                    color: #1e293b;
                    margin-bottom: 16px;
                    border: 1px solid #e2e8f0;
                }

                .podium-name {
                    font-size: 18px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }

                .podium-dept {
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 700;
                    margin-top: 4px;
                    text-transform: uppercase;
                }

                .podium-stats {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-top: 24px;
                    background: #f8fafc;
                    padding: 12px 20px;
                    border-radius: 12px;
                    border: 1px solid #f1f5f9;
                }

                .p-stat {
                    display: flex;
                    flex-direction: column;
                }

                .p-val {
                    font-weight: 800;
                    color: #0f172a;
                    font-size: 15px;
                }

                .p-label {
                    font-size: 11px;
                    color: #64748b;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .p-sep {
                    width: 1px;
                    height: 24px;
                    background: #e2e8f0;
                }

                .rank-list-card {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }

                .rank-list-card .card-header {
                    padding: 24px 32px;
                    border-bottom: 1px solid #f1f5f9;
                    background: #fff;
                }

                .rank-list-card .card-header h3 {
                    margin: 0;
                    color: #0f172a;
                    font-weight: 800;
                }

                .ranks-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .ranks-table th {
                    padding: 16px 32px;
                    background: #f8fafc;
                    font-size: 12px;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    border-bottom: 1px solid #e2e8f0;
                }

                .ranks-table td {
                    padding: 20px 32px;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 14px;
                    color: #1e293b;
                    font-weight: 500;
                }

                .top-rank {
                    background: #fff;
                }

                .rank-number {
                    font-weight: 800;
                    font-size: 14px;
                }

                .r-1 { color: #f59e0b; }
                .r-2 { color: #64748b; }
                .r-3 { color: #d97706; }

                .faculty-cell {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .avatar-small {
                    width: 32px;
                    height: 32px;
                    background: #f1f5f9;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: #1e293b;
                    border: 1px solid #e2e8f0;
                }

                .rating-cell {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 800;
                    color: #0f172a;
                }

                .font-bold { font-weight: 700; color: #0f172a; }

                @media (max-width: 1024px) {
                    .top-three { flex-direction: column; align-items: center; gap: 20px; }
                    .pos-1, .pos-2, .pos-3 { width: 100%; margin: 0; order: initial; }
                }
                `
            }} />
        </div>
    );
};

export default Rankings;
