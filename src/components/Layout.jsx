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
                    background-color: var(--bg-main);
                    background-image: var(--grad-mesh);
                    background-attachment: fixed;
                    color: var(--text-main);
                    font-family: 'Inter', sans-serif;
                }

                .sidebar {
                    width: 280px;
                    background: var(--glass);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-right: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    padding: 32px 24px;
                    position: relative;
                    z-index: 50;
                }

                .logo-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 48px;
                }

                .logo-mark {
                    width: 36px;
                    height: 36px;
                    background: var(--grad-primary);
                    color: white;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 20px;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
                }

                .logo-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.5px;
                }

                .nav-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .nav-label {
                    font-size: 10px;
                    font-weight: 800;
                    color: var(--text-muted);
                    margin-bottom: 16px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 18px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    border-radius: 12px;
                    transition: var(--transition);
                    border: 1px solid transparent;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-main);
                    transform: translateX(4px);
                }

                .nav-link.active {
                    background: var(--grad-primary);
                    color: white;
                    box-shadow: 0 8px 16px rgba(139, 92, 246, 0.25);
                    border: none;
                }

                .logout-action {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 18px;
                    color: var(--accent);
                    background: rgba(244, 63, 94, 0.05);
                    border: 1px solid rgba(244, 63, 94, 0.1);
                    width: 100%;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    margin-top: 24px;
                    border-radius: 12px;
                    transition: var(--transition);
                }

                .logout-action:hover {
                    background: var(--accent);
                    color: white;
                    transform: translateY(-2px);
                }

                .proto-mode-badge {
                    margin-bottom: 12px;
                    background: rgba(16, 185, 129, 0.05);
                    border: 1px solid rgba(16, 185, 129, 0.1);
                    padding: 8px 12px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--success);
                    letter-spacing: 0.02em;
                }

                .badge-dot {
                    width: 6px;
                    height: 6px;
                    background: var(--success);
                    border-radius: 50%;
                    box-shadow: 0 0 8px var(--success);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.6; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .main-viewport {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                }

                .navbar {
                    height: 80px;
                    background: rgba(15, 23, 42, 0.3);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--glass-border);
                    padding: 0 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 40;
                }

                .page-title {
                    font-size: 22px;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .nav-icon-btn {
                    position: relative;
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--text-secondary);
                    border: 1px solid var(--glass-border);
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                }
                
                .nav-icon-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--primary);
                }

                .notification-dot {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 8px;
                    height: 8px;
                    background: var(--accent);
                    border-radius: 50%;
                    border: 2px solid var(--bg-card);
                    box-shadow: 0 0 8px var(--accent);
                }

                .divider {
                    width: 1px;
                    height: 24px;
                    background: var(--glass-border);
                }

                .account-summary {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 6px 12px;
                    border-radius: 12px;
                    transition: var(--transition);
                    cursor: pointer;
                }
                
                .account-summary:hover {
                    background: rgba(255, 255, 255, 0.03);
                }

                .account-text {
                    text-align: right;
                }

                .account-name {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--text-main);
                    margin: 0;
                }

                .account-role {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--text-muted);
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .account-avatar {
                    width: 42px;
                    height: 42px;
                    background: var(--grad-primary);
                    color: white;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 18px;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
                }

                .viewport-content {
                    flex: 1;
                    padding: 40px;
                    overflow-y: auto;
                }
                
                .viewport-content::-webkit-scrollbar {
                    width: 6px;
                }
                .viewport-content::-webkit-scrollbar-thumb {
                    background: var(--glass-border);
                    border-radius: 10px;
                }
            `}} />
    </div>
  );
};

export default Layout;
