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
        .academic-container {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
        }

        .academic-card {
          background: white;
          width: 100%;
          max-width: 480px;
          padding: 48px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
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
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .academic-header h1 {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .academic-header p {
          color: #64748b;
          font-size: 15px;
        }

        .academic-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .field-unit {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-unit label {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .academic-input-box {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 10px;
          height: 52px;
          padding: 0 16px;
          gap: 12px;
          transition: 0.2s ease;
        }

        .academic-input-box:focus-within {
          background: #e2e8f0;
        }

        .academic-input-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #1e293b;
          font-size: 15px;
          font-weight: 500;
        }

        .academic-input-box svg { color: #94a3b8; }

        .academic-primary-btn {
          background: #2563eb;
          color: white;
          height: 52px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }

        .academic-primary-btn:hover { background: #1d4ed8; }

        .academic-footer {
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .academic-footer a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: none;
        }

        .floating-toggles {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          position: absolute;
          bottom: 12px;
          right: 24px;
        }

        .role-pill {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          transition: 0.2s;
        }

        .role-pill.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .field-msg-err { font-size: 12px; color: #ef4444; margin-top: 4px; font-weight: 500; }
        .academic-alert { padding: 12px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; color: #ef4444; font-size: 14px; text-align: center; font-weight: 500; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}} />
    </div>
  );
};

export default Login;
