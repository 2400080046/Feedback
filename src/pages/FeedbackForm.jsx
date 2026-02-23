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
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          padding: 0 1rem;
        }

        .step-item {
          font-size: 14px;
          color: #94a3b8;
          font-weight: 600;
          position: relative;
          padding-bottom: 8px;
        }

        .step-item.active {
          color: #2563eb;
        }

        .step-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #2563eb;
          border-radius: 99px;
        }

        .feedback-form {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .step-content h2 { 
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px; 
        }
        
        .subtitle { 
            color: #64748b; 
            margin-bottom: 32px;
            font-size: 15px;
        }

        .course-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .selectable-course {
          padding: 24px;
          background: #f8fafc;
          border-radius: 16px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .selectable-course:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        .selectable-course.selected {
          border-color: #2563eb;
          background: #eff6ff;
        }

        .selectable-course .code {
          font-size: 12px;
          font-weight: 800;
          color: #2563eb;
          text-transform: uppercase;
        }

        .selectable-course .name {
          font-weight: 700;
          color: #1e293b;
          font-size: 15px;
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 40px;
        }

        .question-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .question-text {
          font-weight: 700;
          color: #1e293b;
          font-size: 16px;
          line-height: 1.5;
        }

        .rating-scale {
          display: flex;
          gap: 12px;
        }

        .rating-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f1f5f9;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          transition: all 0.2s;
        }

        .rating-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .rating-btn.active {
          background: #0f172a;
          color: white;
          transform: scale(1.1);
        }

        .feedback-textarea {
          width: 100%;
          min-height: 140px;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #0f172a;
          font-family: inherit;
          font-size: 15px;
          resize: vertical;
          outline: none;
          transition: all 0.2s;
        }

        .feedback-textarea:focus {
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .step-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .primary-btn {
          padding: 12px 24px;
          background: #2563eb;
          color: white;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .primary-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .secondary-btn {
          padding: 12px 24px;
          background: #f1f5f9;
          color: #475569;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .secondary-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .review-summary {
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item .label { color: #64748b; font-size: 14px; }
        .summary-item .value { font-weight: 700; color: #0f172a; }

        .feedback-success {
          background: white;
          text-align: center;
          padding: 60px 40px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .success-icon {
          margin-bottom: 8px;
          animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default FeedbackForm;
