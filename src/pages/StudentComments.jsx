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
                    margin-bottom: 32px;
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

                .search-bar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 10px 20px;
                    border-radius: 12px;
                    width: 320px;
                }

                .search-bar input {
                    border: none;
                    outline: none;
                    color: #0f172a;
                    font-size: 14px;
                    width: 100%;
                }

                .comments-layout {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 32px;
                }

                .filter-card {
                    background: white;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                    position: sticky;
                    top: 24px;
                }

                .filter-card h3 {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }

                .sentiment-stat {
                    margin-bottom: 16px;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 6px;
                }

                .stat-bar {
                    height: 6px;
                    background: #f1f5f9;
                    border-radius: 3px;
                }

                .fill {
                    height: 100%;
                    border-radius: 3px;
                }

                .fill.positive { background: #22c55e; }
                .fill.neutral { background: #f59e0b; }
                .fill.negative { background: #ef4444; }

                .label.positive { color: #22c55e; }
                .label.neutral { color: #f59e0b; }
                .label.negative { color: #ef4444; }

                .comments-feed {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .comment-card {
                    background: white;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                    transition: 0.2s;
                }

                .comment-card:hover {
                    box-shadow: 0 10px 20px -10px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .student-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .avatar-mini {
                    width: 36px;
                    height: 36px;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 14px;
                }

                .student-info .name {
                    font-weight: 700;
                    color: #0f172a;
                    font-size: 14px;
                    margin: 0;
                }

                .tags-row {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    margin-top: 2px;
                }

                .course-tag-new {
                    font-size: 11px;
                    font-weight: 700;
                    color: #2563eb;
                }

                .instructor-tag {
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                }

                .sentiment-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    border-radius: 99px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .positive .sentiment-badge { background: #f0fdf4; color: #22c55e; }
                .neutral .sentiment-badge { background: #fffbeb; color: #f59e0b; }
                .negative .sentiment-badge { background: #fef2f2; color: #ef4444; }

                .comment-body {
                    font-size: 15px;
                    color: #1e293b;
                    font-style: italic;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 16px;
                    border-top: 1px dashed #f1f5f9;
                }

                .score-label {
                    font-size: 12px;
                    color: #64748b;
                }

                .action-link {
                    background: none;
                    border: none;
                    color: #2563eb;
                    font-weight: 600;
                    font-size: 13px;
                    cursor: pointer;
                }

                @media (max-width: 1024px) {
                    .comments-layout { grid-template-columns: 1fr; }
                    .filter-card { position: relative; top: 0; }
                }
                `
            }} />
        </div>
    );
};

export default StudentComments;
