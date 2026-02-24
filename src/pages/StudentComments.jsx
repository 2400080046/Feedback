import React, { useState } from 'react';
import { SENTIMENT_ANALYSIS, COURSES } from '../data/dummyData';
import { Search, Filter, MessageSquare, Star, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

const StudentComments = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mocking more comments for a richer view
    const comments = [
        ...SENTIMENT_ANALYSIS,
        { text: "Assignments were a bit long but very informative.", sentiment: "Positive", score: 0.85, course: "CS101", instructor: "Dr. Rajesh Kumar", student: "Aarav Sharma" },
        { text: "The grading feedback could be more detailed.", sentiment: "Neutral", score: 0.55, course: "DS201", instructor: "Prof. Sunita Rao", student: "Ananya Iyer" },
        { text: "Excellent practical demonstrations in the lab sessions.", sentiment: "Positive", score: 0.98, course: "AI301", instructor: "Dr. Amit Shah", student: "Vihaan Gupta" },
    ];

    const filteredComments = comments.filter(c =>
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.course && c.course.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="comments-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Student Comments</h1>
                    <p className="page-subtitle">Deep dive into qualitative feedback from your students.</p>
                </div>
                <div className="search-bar">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search comments or courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="comments-layout">
                <div className="comments-sidebar">
                    <div className="filter-card">
                        <h3>Sentiment Breakdown</h3>
                        <div className="sentiment-stat">
                            <div className="stat-row">
                                <span className="label positive">Positive</span>
                                <span className="val">74%</span>
                            </div>
                            <div className="stat-bar"><div className="fill positive" style={{ width: '74%' }}></div></div>
                        </div>
                        <div className="sentiment-stat">
                            <div className="stat-row">
                                <span className="label neutral">Neutral</span>
                                <span className="val">18%</span>
                            </div>
                            <div className="stat-bar"><div className="fill neutral" style={{ width: '18%' }}></div></div>
                        </div>
                        <div className="sentiment-stat">
                            <div className="stat-row">
                                <span className="label negative">Negative</span>
                                <span className="val">8%</span>
                            </div>
                            <div className="stat-bar"><div className="fill negative" style={{ width: '8%' }}></div></div>
                        </div>
                    </div>
                </div>

                <div className="comments-feed">
                    {filteredComments.map((comment, idx) => (
                        <div key={idx} className={`comment-card ${comment.sentiment.toLowerCase()}`}>
                            <div className="card-top">
                                <div className="student-info">
                                    <div className="avatar-mini">
                                        {(comment.student || 'Anonymous').charAt(0)}
                                    </div>
                                    <div>
                                        <p className="name">{comment.student || 'Anonymous Student'}</p>
                                        <div className="tags-row">
                                            <span className="course-tag-new">
                                                {comment.course ? (
                                                    <>{comment.course} - {COURSES.find(c => c.code === comment.course)?.name}</>
                                                ) : 'Global Feedback'}
                                            </span>
                                            <span className="instructor-tag">
                                                By: {comment.instructor || 'Unassigned'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sentiment-badge">
                                    {comment.sentiment === 'Positive' ? <ThumbsUp size={14} /> :
                                        comment.sentiment === 'Negative' ? <ThumbsDown size={14} /> :
                                            <MessageCircle size={14} />}
                                    <span>{comment.sentiment}</span>
                                </div>
                            </div>
                            <p className="comment-body">"{comment.text}"</p>
                            <div className="card-footer">
                                <div className="score-label">AI Analysis Score: <strong>{comment.score}</strong></div>
                                <button className="action-link">Apply AI Insights</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .comments-page {
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

                .search-bar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    padding: 12px 20px;
                    border-radius: 14px;
                    width: 320px;
                    backdrop-filter: blur(12px);
                    transition: var(--transition);
                }
                
                .search-bar:focus-within {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.06);
                    box-shadow: 0 0 0 4px var(--glass-glow);
                }

                .search-bar input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: var(--text-main);
                    font-size: 15px;
                    width: 100%;
                    font-weight: 600;
                }
                
                .search-bar input::placeholder { color: var(--text-muted); }
                .search-bar svg { color: var(--text-muted); }

                .comments-layout {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 32px;
                }

                .filter-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                    position: sticky;
                    top: 24px;
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
                }

                .filter-card h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: var(--text-main);
                    margin-bottom: 24px;
                    letter-spacing: -0.01em;
                }

                .sentiment-stat {
                    margin-bottom: 20px;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .stat-bar {
                    height: 8px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .fill {
                    height: 100%;
                    border-radius: 4px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
                }

                .fill.positive { background: var(--success); }
                .fill.neutral { background: var(--warning); }
                .fill.negative { background: var(--danger); }

                .label.positive { color: var(--success); }
                .label.neutral { color: var(--warning); }
                .label.negative { color: var(--danger); }

                .comments-feed {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .comment-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                    transition: var(--transition);
                }

                .comment-card:hover {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .student-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .avatar-mini {
                    width: 44px;
                    height: 44px;
                    background: rgba(139, 92, 246, 0.1);
                    color: var(--primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 16px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }

                .student-info .name {
                    font-weight: 800;
                    color: var(--text-main);
                    font-size: 16px;
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .tags-row {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-top: 4px;
                }

                .course-tag-new {
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--secondary);
                }

                .instructor-tag {
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--text-muted);
                }

                .sentiment-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .positive .sentiment-badge { background: rgba(34, 197, 94, 0.1); color: var(--success); border: 1px solid rgba(34, 197, 94, 0.2); }
                .neutral .sentiment-badge { background: rgba(245, 158, 11, 0.1); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.2); }
                .negative .sentiment-badge { background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); }

                .comment-body {
                    font-size: 16px;
                    color: var(--text-secondary);
                    font-style: italic;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    padding: 0 4px;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 24px;
                    border-top: 1px solid var(--glass-border);
                }

                .score-label {
                    font-size: 13px;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                
                .score-label strong { color: var(--text-secondary); font-weight: 800; }

                .action-link {
                    background: transparent;
                    border: none;
                    color: var(--primary);
                    font-weight: 800;
                    font-size: 14px;
                    cursor: pointer;
                    transition: var(--transition);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .action-link:hover { color: var(--secondary); transform: translateX(4px); }

                @media (max-width: 1024px) {
                    .comments-layout { grid-template-columns: 1fr; }
                    .filter-card { position: relative; top: 0; margin-bottom: 24px; }
                    .search-bar { width: 100%; margin-top: 16px; }
                    .page-header { flex-direction: column; align-items: stretch; }
                }
                `
            }} />
        </div>
    );
};

export default StudentComments;
