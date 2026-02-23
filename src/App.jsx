import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import FeedbackForm from './pages/FeedbackForm';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import PendingFeedback from './pages/PendingFeedback';
import FeedbackHistory from './pages/FeedbackHistory';
import ClassResults from './pages/ClassResults';
import StudentComments from './pages/StudentComments';
import Rankings from './pages/Rankings';
import FormBuilder from './pages/FormBuilder';
import UserManagement from './pages/UserManagement';
import Monitoring from './pages/Monitoring';

import './styles/global.css';

// New Support Views (Mocked for now)
const Placeholder = ({ title }) => (
    <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#0f172a' }}>{title} Module</h2>
        <p>This institutional module is actively processing data for your session.</p>
        <div style={{ marginTop: '32px', padding: '40px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '400px', margin: '32px auto' }}>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', marginBottom: '12px' }}></div>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', width: '60%', marginBottom: '12px' }}></div>
            <div style={{ height: '8px', background: '#2563eb', borderRadius: '4px', width: '40%' }}></div>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Student Routes */}
                    <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><Layout><StudentDashboard /></Layout></ProtectedRoute>} />
                    <Route path="/pending-feedback" element={<ProtectedRoute allowedRoles={['student']}><Layout><PendingFeedback /></Layout></ProtectedRoute>} />
                    <Route path="/feedback-history" element={<ProtectedRoute allowedRoles={['student']}><Layout><FeedbackHistory /></Layout></ProtectedRoute>} />
                    <Route path="/class-results" element={<ProtectedRoute allowedRoles={['student']}><Layout><ClassResults /></Layout></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}><Layout><Profile /></Layout></ProtectedRoute>} />
                    <Route path="/feedback" element={<ProtectedRoute allowedRoles={['student']}><Layout><FeedbackForm /></Layout></ProtectedRoute>} />

                    {/* Instructor Routes */}
                    <Route path="/instructor-dashboard" element={<ProtectedRoute allowedRoles={['instructor']}><Layout><InstructorDashboard /></Layout></ProtectedRoute>} />
                    <Route path="/course-analytics" element={<ProtectedRoute allowedRoles={['instructor']}><Layout><Analytics /></Layout></ProtectedRoute>} />
                    <Route path="/performance" element={<ProtectedRoute allowedRoles={['instructor']}><Layout><Analytics /></Layout></ProtectedRoute>} />
                    <Route path="/comments" element={<ProtectedRoute allowedRoles={['instructor']}><Layout><StudentComments /></Layout></ProtectedRoute>} />
                    <Route path="/rankings" element={<ProtectedRoute allowedRoles={['instructor']}><Layout><Rankings /></Layout></ProtectedRoute>} />

                    {/* Admin Routes */}
                    <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
                    <Route path="/form-builder" element={<ProtectedRoute allowedRoles={['admin']}><Layout><FormBuilder /></Layout></ProtectedRoute>} />
                    <Route path="/user-management" element={<ProtectedRoute allowedRoles={['admin']}><Layout><UserManagement /></Layout></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute allowedRoles={['admin']}><Layout><Analytics /></Layout></ProtectedRoute>} />
                    <Route path="/monitoring" element={<ProtectedRoute allowedRoles={['admin']}><Layout><Monitoring /></Layout></ProtectedRoute>} />

                    {/* Default Redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
