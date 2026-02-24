import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user.role === 'admin') navigate('/admin-dashboard');
        else if (user.role === 'instructor') navigate('/instructor-dashboard');
        else navigate('/student-dashboard');
      } else {
        setErrors({ general: 'Invalid credentials. Please check your email and password.' });
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="academic-container">
      <div className={`academic-card ${shake ? 'animate-shake' : ''}`}>
        <div className="academic-header">
          <div className="logo-badge">
            <GraduationCap size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to your academic account</p>
        </div>

        <form onSubmit={handleSubmit} className="academic-form">
          <div className="field-unit">
            <label>EMAIL ADDRESS</label>
            <div className={`academic-input-box ${errors.email ? 'error' : ''}`}>
              <Mail size={20} />
              <input
                type="email"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                  if (errors.general) setErrors({ ...errors, general: '' });
                }}
                required
              />
            </div>
            {errors.email && <span className="field-msg-err">{errors.email}</span>}
          </div>

          <div className="field-unit">
            <label>PASSWORD</label>
            <div className={`academic-input-box ${errors.password ? 'error' : ''}`}>
              <Lock size={20} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                  if (errors.general) setErrors({ ...errors, general: '' });
                }}
                required
              />
            </div>
            {errors.password && <span className="field-msg-err">{errors.password}</span>}
          </div>

          {errors.general && <div className="academic-alert">{errors.general}</div>}

          <button type="submit" className="academic-primary-btn" disabled={isLoading}>
            {isLoading ? <Loader2 className="spinner" /> : (
              <>
                Sign In to Account <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="academic-footer">
            Don't have an account? <Link to="/register">Create one here</Link>
          </p>
        </form>

        <div className="prototype-access">
          <div className="proto-divider">
            <span>PROTOTYPE QUICK ACCESS</span>
          </div>
          <div className="proto-buttons">
            <button
              type="button"
              className="proto-btn student"
              onClick={() => { setEmail('student@system.com'); setPassword('student123'); }}
            >
              Log in as Student
            </button>
            <button
              type="button"
              className="proto-btn instructor"
              onClick={() => { setEmail('instructor@system.com'); setPassword('instructor123'); }}
            >
              Log in as Instructor
            </button>
            <button
              type="button"
              className="proto-btn admin"
              onClick={() => { setEmail('admin@system.com'); setPassword('admin123'); }}
            >
              Log in as Admin
            </button>
          </div>
        </div>

        <div className="floating-toggles">
          <button
            type="button"
            className={`role-pill ${selectedRole === 'student' ? 'active' : ''}`}
            onClick={() => setSelectedRole('student')}
          >
            STUDENT
          </button>
          <button
            type="button"
            className={`role-pill ${selectedRole === 'instructor' ? 'active' : ''}`}
            onClick={() => setSelectedRole('instructor')}
          >
            INSTRUCTOR
          </button>
          <button
            type="button"
            className={`role-pill ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => setSelectedRole('admin')}
          >
            ADMIN
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .prototype-access {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .proto-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .proto-divider::before, .proto-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--glass-border);
        }

        .proto-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .proto-btn {
          padding: 8px 4px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.03);
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-secondary);
        }

        .proto-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--primary);
        }

        .proto-btn.student:hover { border-color: var(--success); color: var(--success); }
        .proto-btn.instructor:hover { border-color: var(--secondary); color: var(--secondary); }
        .proto-btn.admin:hover { border-color: var(--primary); color: var(--primary); }
        
        .academic-container {
          min-height: 100vh;
          background-color: var(--bg-main);
          background-image: var(--grad-mesh);
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
        }

        .academic-card {
          background: var(--glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          width: 100%;
          max-width: 480px;
          padding: 48px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .academic-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .logo-badge {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }

        .academic-header h1 {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
          letter-spacing: -0.02em;
        }

        .academic-header p {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .academic-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-unit {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-unit label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .academic-input-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          height: 52px;
          padding: 0 16px;
          gap: 12px;
          transition: var(--transition);
          border: 1px solid var(--glass-border);
        }

        .academic-input-box:focus-within {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--glass-glow);
          transform: translateY(-1px);
        }

        .academic-input-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-size: 15px;
          font-weight: 500;
        }

        .academic-input-box svg { color: var(--text-muted); transition: var(--transition); }
        .academic-input-box:focus-within svg { color: var(--primary); }

        .academic-primary-btn {
          background: var(--grad-primary);
          color: white;
          height: 52px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition);
          box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 8px;
        }

        .academic-primary-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.4);
          filter: brightness(1.1);
        }
        
        .academic-primary-btn:disabled {
          opacity: 0.7;
          transform: none;
        }

        .academic-footer {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .academic-footer a {
          color: var(--primary);
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition);
        }
        
        .academic-footer a:hover {
          color: var(--secondary);
          text-decoration: underline;
        }

        .floating-toggles {
          display: flex;
          justify-content: center;
          gap: 8px;
          border-top: 1px solid var(--glass-border);
          padding-top: 24px;
          margin-top: 16px;
        }

        .role-pill {
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          transition: var(--transition);
          letter-spacing: 0.05em;
        }

        .role-pill.active {
          background: var(--grad-primary);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .field-msg-err { font-size: 12px; color: var(--danger); margin-top: 4px; font-weight: 500; }
        .academic-alert { 
          padding: 12px; 
          background: rgba(239, 68, 68, 0.1); 
          border: 1px solid rgba(239, 68, 68, 0.2); 
          border-radius: 12px; 
          color: var(--danger); 
          font-size: 14px; 
          text-align: center; 
          font-weight: 500; 
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}} />
    </div>
  );
};

export default Login;
