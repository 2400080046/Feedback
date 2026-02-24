import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, School, ShieldCheck, ArrowRight, RefreshCw, Loader2, CheckCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        institution: '',
        role: 'student',
        captchaInput: ''
    });

    const [captchaCode, setCaptchaCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [shake, setShake] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const captchaRotations = useMemo(() => {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 30 - 15));
    }, [captchaCode]);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
        setFormData(prev => ({ ...prev, captchaInput: '' }));
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.institution) newErrors.institution = 'Please select your institution';
        if (!formData.role) newErrors.role = 'Please select an account role';

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
            newErrors.captcha = 'Security code is incorrect';
        }

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
            const result = register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                institution: formData.institution
            });

            if (result.success) {
                setIsSuccess(true);
                setTimeout(() => navigate('/login'), 2500);
            } else {
                setErrors({ general: result.message });
                setShake(true);
                setTimeout(() => setShake(false), 500);
                generateCaptcha();
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: '' });
        if (errors.general) setErrors({ ...errors, general: '' });
    };

    if (isSuccess) {
        return (
            <div className="register-container">
                <div className="register-card success-view">
                    <CheckCircle size={80} className="success-icon" />
                    <h2>{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account Created!</h2>
                    <p>Redirecting you to the login page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="register-container">
            <div className={`register-card ${shake ? 'animate-shake' : ''}`}>
                <form onSubmit={handleSubmit} className="academic-form">

                    {/* Full Name */}
                    <div className="input-field">
                        <label>FULL NAME</label>
                        <div className={`input-box ${errors.name ? 'error' : ''}`}>
                            <User size={20} />
                            <input
                                type="text"
                                placeholder="Jane Doe"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    {/* Institution */}
                    <div className="input-field">
                        <label>INSTITUTION</label>
                        <div className={`input-box ${errors.institution ? 'error' : ''}`}>
                            <School size={20} />
                            <select
                                value={formData.institution}
                                onChange={(e) => handleInputChange('institution', e.target.value)}
                            >
                                <option value="">Select Institution</option>
                                <option value="KL University">KL University</option>
                                <option value="IIT Bombay">IIT Bombay</option>
                                <option value="IIT Delhi">IIT Delhi</option>
                                <option value="NIT Trichy">NIT Trichy</option>
                                <option value="BITS Pilani">BITS Pilani</option>
                                <option value="SRM Institute">SRM Institute</option>
                                <option value="Vellore Institute of Technology">VIT Vellore</option>
                                <option value="Amity University">Amity University</option>
                                <option value="Anna University">Anna University</option>
                                <option value="Delhi University">Delhi University</option>
                            </select>
                        </div>
                        {errors.institution && <span className="error-msg">{errors.institution}</span>}
                    </div>

                    {/* Account Role Dropdown */}
                    <div className="input-field">
                        <label>ACCOUNT ROLE</label>
                        <div className={`input-box ${errors.role ? 'error' : ''}`}>
                            <ShieldCheck size={20} />
                            <select
                                value={formData.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                        {errors.role && <span className="error-msg">{errors.role}</span>}
                    </div>

                    {/* Email */}
                    <div className="input-field">
                        <label>EMAIL ADDRESS</label>
                        <div className={`input-box ${errors.email ? 'error' : ''}`}>
                            <Mail size={20} />
                            <input
                                type="email"
                                placeholder="jane@college.edu"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    {/* Password */}
                    <div className="input-field">
                        <label>PASSWORD</label>
                        <div className={`input-box ${errors.password ? 'error' : ''}`}>
                            <Lock size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                        </div>
                        {errors.password && <span className="error-msg">{errors.password}</span>}
                    </div>

                    {/* Captcha Section */}
                    <div className="captcha-section">
                        <label>SECURITY CHECK</label>
                        <div className="captcha-controls">
                            <div className="captcha-display">
                                {captchaCode.split('').map((char, i) => (
                                    <span key={i} style={{
                                        transform: `rotate(${captchaRotations[i]}deg)`,
                                        display: 'inline-block'
                                    }}>{char}</span>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="refresh-btn"
                                onClick={generateCaptcha}
                                title="Refresh Captcha"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                        <div className={`input-box ${errors.captcha ? 'error' : ''}`}>
                            <ShieldCheck size={20} />
                            <input
                                type="text"
                                placeholder="Enter Code"
                                value={formData.captchaInput}
                                onChange={(e) => handleInputChange('captchaInput', e.target.value)}
                            />
                        </div>
                        {errors.captcha && <span className="error-msg">{errors.captcha}</span>}
                    </div>

                    {/* General Errors (like Duplicate Email) */}
                    {errors.general && <div className="academic-alert">{errors.general}</div>}

                    <button type="submit" className="create-btn" disabled={isLoading}>
                        {isLoading ? <Loader2 className="spinner" /> : (
                            <>
                                Create Academic Account <ArrowRight size={20} />
                            </>
                        )}
                    </button>

                    <p className="footer-link">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </p>
                </form>

                {/* Bottom Toggles to show user they can switch roles */}
                <div className="bottom-toggles">
                    <button
                        type="button"
                        className={`role-pill ${formData.role === 'student' ? 'active' : ''}`}
                        onClick={() => handleInputChange('role', 'student')}
                    >
                        STUDENT
                    </button>
                    <button
                        type="button"
                        className={`role-pill ${formData.role === 'instructor' ? 'active' : ''}`}
                        onClick={() => handleInputChange('role', 'instructor')}
                    >
                        INSTRUCTOR
                    </button>
                    <button
                        type="button"
                        className={`role-pill ${formData.role === 'admin' ? 'active' : ''}`}
                        onClick={() => handleInputChange('role', 'admin')}
                    >
                        ADMIN
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .register-container {
          min-height: 100vh;
          background-color: var(--bg-main);
          background-image: var(--grad-mesh);
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          font-family: 'Inter', sans-serif;
        }

        .register-card {
          background: var(--glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          width: 100%;
          max-width: 480px;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .academic-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-field label, .captcha-section label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .input-box {
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

        .input-box:focus-within {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--glass-glow);
          transform: translateY(-1px);
        }

        .input-box.error {
          border-color: var(--danger);
          background: rgba(239, 68, 68, 0.05);
        }

        .input-box svg { color: var(--text-muted); transition: var(--transition); }
        .input-box:focus-within svg { color: var(--primary); }

        .input-box input, .input-box select {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-size: 15px;
          font-weight: 500;
        }

        .input-box select option {
          background: var(--bg-card);
          color: var(--text-main);
        }

        .captcha-section { display: flex; flex-direction: column; gap: 12px; }
        .captcha-controls { display: flex; gap: 12px; align-items: stretch; }
        .captcha-display {
          flex: 1; 
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1));
          border-radius: 12px; 
          min-height: 52px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 800; 
          color: var(--secondary); 
          letter-spacing: 8px;
          border: 1px solid var(--glass-border);
          text-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
        }

        .refresh-btn {
          width: 52px; height: 52px; 
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid var(--glass-border);
          border-radius: 12px; 
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); 
          transition: var(--transition);
        }

        .refresh-btn:hover { color: var(--primary); background: rgba(255, 255, 255, 0.08); transform: rotate(30deg); }

        .create-btn {
          background: var(--grad-primary);
          color: white; 
          height: 52px; 
          border-radius: 12px;
          font-weight: 800; 
          font-size: 15px; 
          display: flex; align-items: center;
          justify-content: center; gap: 8px; 
          transition: var(--transition); 
          margin-top: 8px;
          box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .create-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.4);
          filter: brightness(1.1);
        }
        
        .create-btn:disabled {
          opacity: 0.7;
          transform: none;
        }

        .footer-link { text-align: center; font-size: 14px; color: var(--text-secondary); }
        .footer-link a { color: var(--primary); font-weight: 700; transition: var(--transition); }
        .footer-link a:hover { color: var(--secondary); text-decoration: underline; }

        .bottom-toggles { 
          display: flex; 
          justify-content: center; 
          gap: 12px; 
          border-top: 1px solid var(--glass-border); 
          padding-top: 24px; 
        }
        
        .role-pill {
          padding: 8px 20px; 
          border-radius: 100px; 
          font-size: 11px; 
          font-weight: 800;
          color: var(--text-secondary); 
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid var(--glass-border);
          transition: var(--transition);
          letter-spacing: 0.05em;
        }
        
        .role-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }
        
        .role-pill.active { 
          background: var(--grad-primary); 
          color: white; 
          border: none;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .success-view { text-align: center; padding: 60px 40px; }
        .success-icon { color: var(--success); margin-bottom: 24px; filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.3)); }
        .error-msg { font-size: 12px; color: var(--danger); margin-top: 4px; font-weight: 500; }
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

        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}} />
        </div>
    );
};

export default Register;
