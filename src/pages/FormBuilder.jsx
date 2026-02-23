import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Settings2, Eye, Save, Type, List, Hash } from 'lucide-react';

const FormBuilder = () => {
    const [questions, setQuestions] = useState([
        { id: '1', text: 'How would you rate the instructor\'s knowledge?', type: 'scale', required: true },
        { id: '2', text: 'Any additional comments?', type: 'text', required: false }
    ]);

    const addQuestion = (type) => {
        const newQ = {
            id: Date.now().toString(),
            text: '',
            type: type,
            required: true
        };
        setQuestions([...questions, newQ]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    return (
        <div className="form-builder-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Feedback Form Builder</h1>
                    <p className="page-subtitle">Design and deploy custom evaluation forms for current academic sessions.</p>
                </div>
                <div className="header-actions">
                    <button className="preview-btn"><Eye size={18} /> Preview Form</button>
                    <button className="save-btn"><Save size={18} /> Publish Form</button>
                </div>
            </div>

            <div className="builder-layout">
                <div className="builder-main">
                    <div className="form-canvas">
                        <div className="canvas-header">
                            <input type="text" className="form-title-input" defaultValue="End-Semester Feedback 2026" />
                            <textarea className="form-desc-input" placeholder="Add a description for the students..." defaultValue="Please provide honest feedback to help us improve the learning experience."></textarea>
                        </div>

                        <div className="questions-canvas">
                            {questions.map((q, idx) => (
                                <div key={q.id} className="builder-q-card">
                                    <div className="q-drag-handle"><GripVertical size={20} /></div>
                                    <div className="q-content">
                                        <div className="q-top-row">
                                            <span className="q-number">Question {idx + 1}</span>
                                            <div className="q-type-badge">
                                                {q.type === 'scale' ? <Hash size={14} /> : <Type size={14} />}
                                                <span>{q.type.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            className="q-text-input"
                                            placeholder="Enter your question here..."
                                            defaultValue={q.text}
                                        />
                                        <div className="q-options">
                                            <label className="toggle">
                                                <input type="checkbox" defaultChecked={q.required} />
                                                <span className="slider"></span>
                                                <span className="label">Required</span>
                                            </label>
                                            <div className="actions">
                                                <button className="q-action-btn"><Settings2 size={16} /></button>
                                                <button onClick={() => removeQuestion(q.id)} className="q-action-btn delete"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="add-q-empty" onClick={() => addQuestion('scale')}>
                            <Plus size={24} />
                            <span>Click to add a new question</span>
                        </button>
                    </div>
                </div>

                <div className="builder-sidebar">
                    <div className="tool-card">
                        <h3>Elements</h3>
                        <div className="element-grid">
                            <button onClick={() => addQuestion('scale')} className="element-btn">
                                <Hash size={20} />
                                <span>Rating Scale</span>
                            </button>
                            <button onClick={() => addQuestion('text')} className="element-btn">
                                <Type size={20} />
                                <span>Text Area</span>
                            </button>
                            <button className="element-btn">
                                <List size={20} />
                                <span>Multiple Choice</span>
                            </button>
                        </div>
                    </div>

                    <div className="tool-card">
                        <h3>Form Settings</h3>
                        <div className="settings-list">
                            <div className="setting-item">
                                <label>Target Audience</label>
                                <select>
                                    <option>All Students</option>
                                    <option>Final Year Only</option>
                                </select>
                            </div>
                            <div className="setting-item">
                                <label>Expiry Date</label>
                                <input type="date" defaultValue="2026-05-30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .form-builder-page {
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

                .header-actions {
                    display: flex;
                    gap: 12px;
                }

                .preview-btn {
                    padding: 10px 20px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #475569;
                }

                .save-btn {
                    padding: 10px 24px;
                    background: #2563eb;
                    color: white;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .builder-layout {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 32px;
                    align-items: start;
                }

                .form-canvas {
                    background: #f8fafc;
                    border: 2px dashed #e2e8f0;
                    border-radius: 24px;
                    padding: 40px;
                    min-height: 600px;
                }

                .canvas-header {
                    margin-bottom: 40px;
                    background: white;
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                }

                .form-title-input {
                    font-size: 24px;
                    font-weight: 800;
                    color: #0f172a;
                    border: none;
                    outline: none;
                    width: 100%;
                    margin-bottom: 8px;
                }

                .form-desc-input {
                    font-size: 14px;
                    color: #64748b;
                    border: none;
                    outline: none;
                    width: 100%;
                    resize: none;
                    font-family: inherit;
                }

                .builder-q-card {
                    background: white;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                    margin-bottom: 20px;
                    display: flex;
                    gap: 16px;
                    transition: 0.2s;
                }

                .builder-q-card:hover { border-color: #2563eb; }

                .q-drag-handle { color: #cbd5e1; cursor: grab; padding-top: 4px; }

                .q-content { flex: 1; }

                .q-top-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }

                .q-number { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }

                .q-type-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: #f1f5f9;
                    color: #475569;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .q-text-input {
                    width: 100%;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                    border: none;
                    border-bottom: 2px solid #f1f5f9;
                    padding-bottom: 8px;
                    outline: none;
                    margin-bottom: 24px;
                }

                .q-text-input:focus { border-color: #2563eb; }

                .q-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .toggle { display: flex; align-items: center; gap: 10px; cursor: pointer; }
                .toggle .label { font-size: 13px; font-weight: 600; color: #64748b; }

                .q-action-btn { background: none; border: none; color: #94a3b8; padding: 8px; border-radius: 8px; cursor: pointer; }
                .q-action-btn:hover { background: #f1f5f9; color: #0f172a; }
                .q-action-btn.delete:hover { color: #ef4444; background: #fef2f2; }

                .add-q-empty {
                    width: 100%;
                    padding: 32px;
                    background: white;
                    border: 2px dashed #cbd5e1;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    color: #94a3b8;
                    cursor: pointer;
                    transition: 0.2s;
                }

                .add-q-empty:hover { background: #f8fafc; border-color: #2563eb; color: #2563eb; }

                .tool-card {
                    background: white;
                    border-radius: 24px;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                    margin-bottom: 24px;
                }

                .tool-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 20px; }

                .element-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

                .element-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #475569;
                    text-align: left;
                }

                .element-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }

                .settings-list { display: flex; flex-direction: column; gap: 16px; }
                .setting-item label { display: block; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px; }
                .setting-item input, .setting-item select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    outline: none;
                }

                @media (max-width: 1200px) { .builder-layout { grid-template-columns: 1fr; } }
                `
            }} />
        </div>
    );
};

export default FormBuilder;
