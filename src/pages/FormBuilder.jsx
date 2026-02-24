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

                .header-actions {
                    display: flex;
                    gap: 16px;
                }

                .preview-btn {
                    padding: 12px 24px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--text-secondary);
                    transition: var(--transition);
                }
                
                .preview-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--text-main);
                    border-color: var(--primary);
                }

                .save-btn {
                    padding: 12px 28px;
                    background: var(--grad-primary);
                    color: white;
                    border: none;
                    border-radius: 14px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: var(--transition);
                    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
                }
                
                .save-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4);
                    filter: brightness(1.1);
                }

                .builder-layout {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 32px;
                    align-items: start;
                }

                .form-canvas {
                    background: rgba(255, 255, 255, 0.01);
                    border: 2px dashed var(--glass-border);
                    border-radius: 32px;
                    padding: 40px;
                    min-height: 600px;
                }

                .canvas-header {
                    margin-bottom: 40px;
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    padding: 32px;
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
                }

                .form-title-input {
                    font-size: 28px;
                    font-weight: 800;
                    color: var(--text-main);
                    background: transparent;
                    border: none;
                    outline: none;
                    width: 100%;
                    margin-bottom: 8px;
                    letter-spacing: -0.01em;
                }
                
                .form-title-input::placeholder { color: var(--text-muted); }

                .form-desc-input {
                    font-size: 16px;
                    color: var(--text-secondary);
                    background: transparent;
                    border: none;
                    outline: none;
                    width: 100%;
                    resize: none;
                    font-family: inherit;
                    line-height: 1.5;
                }
                
                .form-desc-input::placeholder { color: var(--text-muted); }

                .builder-q-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                    margin-bottom: 24px;
                    display: flex;
                    gap: 20px;
                    transition: var(--transition);
                }

                .builder-q-card:hover { 
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-4px);
                }

                .q-drag-handle { color: var(--text-muted); cursor: grab; padding-top: 4px; opacity: 0.5; }

                .q-content { flex: 1; }

                .q-top-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }

                .q-number { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }

                .q-type-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--text-secondary);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 800;
                    border: 1px solid var(--glass-border);
                    text-transform: uppercase;
                }

                .q-text-input {
                    width: 100%;
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--text-main);
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid var(--glass-border);
                    padding-bottom: 12px;
                    outline: none;
                    margin-bottom: 24px;
                    transition: var(--transition);
                }
                
                .q-text-input::placeholder { color: var(--text-muted); }

                .q-text-input:focus { border-color: var(--primary); }

                .q-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .toggle { display: flex; align-items: center; gap: 12px; cursor: pointer; }
                .toggle .label { font-size: 14px; font-weight: 700; color: var(--text-secondary); }
                .toggle input { accent-color: var(--primary); width: 16px; height: 16px; }

                .q-action-btn { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border); color: var(--text-muted); padding: 10px; border-radius: 12px; cursor: pointer; transition: var(--transition); }
                .q-action-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--text-main); border-color: var(--primary); }
                .q-action-btn.delete:hover { color: var(--accent); background: rgba(244, 63, 94, 0.1); border-color: var(--accent); }

                .add-q-empty {
                    width: 100%;
                    padding: 48px;
                    background: rgba(255, 255, 255, 0.01);
                    border: 2px dashed var(--glass-border);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .add-q-empty:hover { background: rgba(255, 255, 255, 0.03); border-color: var(--primary); color: var(--primary); }
                .add-q-empty span { font-weight: 700; font-size: 15px; }

                .tool-card {
                    background: var(--glass);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    padding: 32px;
                    margin-bottom: 32px;
                }

                .tool-card h3 { font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 24px; letter-spacing: -0.01em; }

                .element-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }

                .element-btn {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 15px;
                    color: var(--text-secondary);
                    text-align: left;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .element-btn:hover { 
                    background: rgba(255, 255, 255, 0.05); 
                    border-color: var(--primary); 
                    color: var(--text-main);
                    transform: translateX(4px);
                }

                .settings-list { display: flex; flex-direction: column; gap: 20px; }
                .setting-item label { display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.1em; }
                .setting-item input, .setting-item select {
                    width: 100%;
                    padding: 14px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 14px;
                    color: var(--text-main);
                    font-weight: 600;
                    outline: none;
                    transition: var(--transition);
                    color-scheme: dark;
                }
                
                .setting-item input:focus, .setting-item select:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.06);
                }

                @media (max-width: 1200px) { .builder-layout { grid-template-columns: 1fr; } }
                `
            }} />
        </div>
    );
};

export default FormBuilder;
