import React, { useState } from 'react';
import { COURSES, FEEDBACK_QUESTIONS } from '../data/dummyData';
import { Send, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const FeedbackForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="feedback-success glass">
        <div className="success-icon">
          <CheckCircle2 size={64} color="var(--success)" />
        </div>
        <h2>Thank You!</h2>
        <p>Your feedback has been submitted successfully. Your voice helps us improve the learning experience.</p>
        <button onClick={() => { setSubmitted(false); setStep(1); setSelectedCourse(''); setResponses({}); }} className="primary-btn">
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="form-steps">
        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>1. Select Course</div>
        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>2. Evaluation</div>
        <div className={`step-item ${step >= 3 ? 'active' : ''}`}>3. Review</div>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form glass">
        {step === 1 && (
          <div className="step-content animate-fade-in">
            <h2>Choose a course to evaluate</h2>
            <p className="subtitle">Select the course you want to provide feedback for.</p>
            <div className="course-selection-grid">
              {COURSES.map(course => (
                <div
                  key={course.id}
                  className={`selectable-course ${selectedCourse === course.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <div className="check-mark"></div>
                  <span className="code">{course.code}</span>
                  <span className="name">{course.name}</span>
                </div>
              ))}
            </div>
            <div className="step-actions">
              <button
                type="button"
                className="primary-btn"
                disabled={!selectedCourse}
                onClick={() => setStep(2)}
              >
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content animate-fade-in">
            <h2>Course Evaluation</h2>
            <p className="subtitle">Rate your experience using the scale below (1-5).</p>

            <div className="questions-list">
              {FEEDBACK_QUESTIONS.map(q => (
                <div key={q.id} className="question-item">
                  <p className="question-text">{q.text}</p>
                  {q.type === 'scale' ? (
                    <div className="rating-scale">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`rating-btn ${responses[q.id] === val ? 'active' : ''}`}
                          onClick={() => handleRating(q.id, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      placeholder="Write your feedback here..."
                      className="feedback-textarea"
                      onChange={(e) => handleRating(q.id, e.target.value)}
                    ></textarea>
                  )}
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button type="button" className="secondary-btn" onClick={() => setStep(1)}>
                <ChevronLeft size={18} /> Back
              </button>
              <button type="button" className="primary-btn" onClick={() => setStep(3)}>
                Review <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content animate-fade-in">
            <h2>Review your feedback</h2>
            <p className="subtitle">Please confirm the details before submitting.</p>

            <div className="review-summary">
              <div className="summary-item">
                <span className="label">Selected Course:</span>
                <span className="value">{COURSES.find(c => c.id === selectedCourse)?.name}</span>
              </div>
              <div className="summary-item">
                <span className="label">Questions Answered:</span>
                <span className="value">{Object.keys(responses).length} / {FEEDBACK_QUESTIONS.length}</span>
              </div>
            </div>

            <div className="step-actions">
              <button type="button" className="secondary-btn" onClick={() => setStep(2)}>
                <ChevronLeft size={18} /> Back
              </button>
              <button type="submit" className="primary-btn submit-btn">
                Submit Feedback <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </form>

      <style dangerouslySetInnerHTML={{
        __html: `
        .feedback-container {
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 2rem;
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          padding: 0 1rem;
        }

        .step-item {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 800;
          position: relative;
          padding-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: var(--transition);
        }

        .step-item.active {
          color: var(--primary);
        }

        .step-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--grad-primary);
          border-radius: 99px;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .feedback-form {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 48px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.3);
        }

        .step-content h2 { 
            font-size: 28px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 8px; 
            letter-spacing: -0.01em;
        }
        
        .subtitle { 
            color: var(--text-secondary); 
            margin-bottom: 40px;
            font-size: 16px;
        }

        .course-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .selectable-course {
          padding: 28px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .selectable-course:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-4px);
          border-color: var(--primary);
        }

        .selectable-course.selected {
          border-color: var(--primary);
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
        }
        
        .selectable-course.selected::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 4px; height: 100%;
          background: var(--grad-primary);
        }

        .selectable-course .code {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .selectable-course .name {
          font-weight: 800;
          color: var(--text-main);
          font-size: 16px;
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 48px;
          margin-bottom: 40px;
        }

        .question-item {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .question-text {
          font-weight: 800;
          color: var(--text-main);
          font-size: 18px;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .rating-scale {
          display: flex;
          gap: 16px;
        }

        .rating-btn {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          transition: var(--transition);
          border: 1px solid var(--glass-border);
        }

        .rating-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--primary);
        }

        .rating-btn.active {
          background: var(--grad-primary);
          color: white;
          transform: scale(1.1);
          border: none;
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }

        .feedback-textarea {
          width: 100%;
          min-height: 160px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          color: var(--text-main);
          font-family: inherit;
          font-size: 16px;
          resize: vertical;
          outline: none;
          transition: var(--transition);
        }

        .feedback-textarea:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px var(--glass-glow);
        }

        .step-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--glass-border);
        }

        .primary-btn {
          padding: 14px 32px;
          background: var(--grad-primary);
          color: white;
          border-radius: 14px;
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
          border: none;
          box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.3);
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 20px 30px -10px rgba(139, 92, 246, 0.4);
        }

        .primary-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          box-shadow: none;
        }

        .secondary-btn {
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          border-radius: 14px;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--glass-border);
          transition: var(--transition);
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--primary);
        }

        .review-summary {
          background: rgba(255, 255, 255, 0.02);
          padding: 32px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
          border: 1px solid var(--glass-border);
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item .label { color: var(--text-secondary); font-size: 15px; font-weight: 600; }
        .summary-item .value { font-weight: 800; color: var(--text-main); font-size: 16px; }

        .feedback-success {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          text-align: center;
          padding: 80px 48px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.4);
        }

        .success-icon {
          margin-bottom: 8px;
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
          animation: scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default FeedbackForm;
