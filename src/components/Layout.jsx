import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  LogOut,
  User,
  Bell,
  Home,
  History,
  MessageSquare,
  Settings,
  FileText,
  Users,
  Layers,
  PieChart,
  PlusCircle,
  Download,
  Trophy
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentNav = [
    { title: 'Dashboard', path: '/student-dashboard', icon: Home },
    { title: 'Pending Feedback', path: '/pending-feedback', icon: ClipboardList },
    { title: 'Feedback History', path: '/feedback-history', icon: History },
    { title: 'Class Results', path: '/class-results', icon: PieChart },
    { title: 'Profile', path: '/profile', icon: Settings },
  ];

  const instructorNav = [
    { title: 'Dashboard', path: '/instructor-dashboard', icon: LayoutDashboard },
    { title: 'Course Analytics', path: '/course-analytics', icon: BarChart3 },
    { title: 'Student Comments', path: '/comments', icon: MessageSquare },
    { title: 'Rankings', path: '/rankings', icon: Trophy },
    { title: 'Reports', path: '/performance', icon: Download },
  ];

  const adminNav = [
    { title: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { title: 'Form Builder', path: '/form-builder', icon: PlusCircle },
    { title: 'User Management', path: '/user-management', icon: Users },
    { title: 'Global Analytics', path: '/analytics', icon: Layers },
    { title: 'Monitoring', path: '/monitoring', icon: FileText },
  ];

  const navItems =
    user?.role === 'admin' ? adminNav :
      user?.role === 'instructor' ? instructorNav :
        studentNav;

  return (
    <div className="academic-app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">
            <span className="logo-mark">F</span>
            <span className="logo-name">FeedbackPro</span>
          </div>
        </div>

        <nav className="nav-container">
          <div className="nav-label">MAIN MENU</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="proto-mode-badge">
            <div className="badge-dot"></div>
            <span>Prototype Active</span>
          </div>
          <button onClick={handleLogout} className="logout-action">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="main-viewport">
        <header className="navbar">
          <div className="nav-left">
            <h2 className="page-title">
              {navItems.find(i => i.path === location.pathname)?.title || 'Institutional View'}
            </h2>
          </div>

          <div className="nav-right">
            <button className="nav-icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <div className="divider"></div>

            <div className="account-summary">
              <div className="account-text">
                <p className="account-name">{user?.name}</p>
                <p className="account-role">{user?.role}</p>
              </div>
              <div className="account-avatar">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="viewport-content">
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
                .academic-app {
                    display: flex;
                    height: 100vh;
                    background: #f8fafc;
                }

                .sidebar {
                    width: 280px;
                    background: #ffffff;
                    border-right: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    padding: 24px;
                }

                .logo-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 40px;
                }

                .logo-mark {
                    width: 36px;
                    height: 36px;
                    background: #2563eb;
                    color: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 20px;
                }

                .logo-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                }

                .nav-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .nav-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #94a3b8;
                    margin-bottom: 12px;
                    letter-spacing: 0.1em;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #64748b;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 14px;
                    border-radius: 10px;
                    transition: all 0.2s;
                }

                .nav-link:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }

                .nav-link.active {
                    background: #2563eb;
                    color: white;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                }

                .logout-action {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #f43f5e;
                    background: transparent;
                    border: none;
                    width: 100%;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    margin-top: auto;
                    border-radius: 10px;
                }

                .logout-action:hover {
                    background: #fff1f2;
                }

                .proto-mode-badge {
                    margin-bottom: 12px;
                    background: #f0fdf4;
                    border: 1px solid #dcfce7;
                    padding: 8px 12px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #16a34a;
                    letter-spacing: 0.02em;
                }

                .badge-dot {
                    width: 6px;
                    height: 6px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.6; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .main-viewport {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .navbar {
                    height: 80px;
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 0 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .page-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0f172a;
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .nav-icon-btn {
                    position: relative;
                    background: transparent;
                    color: #64748b;
                    border: none;
                    cursor: pointer;
                }

                .notification-dot {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 6px;
                    height: 6px;
                    background: #f43f5e;
                    border-radius: 50%;
                    border: 2px solid white;
                }

                .divider {
                    width: 1px;
                    height: 32px;
                    background: #e2e8f0;
                }

                .account-summary {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .account-text {
                    text-align: right;
                }

                .account-name {
                    font-size: 14px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }

                .account-role {
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
                    text-transform: capitalize;
                }

                .account-avatar {
                    width: 40px;
                    height: 40px;
                    background: #2563eb;
                    color: white;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                }

                .viewport-content {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                }
            `}} />
    </div>
  );
};

export default Layout;
