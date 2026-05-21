import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Dashboard',
  '/leads': 'Leads',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  const currentTitle = pageTitles[location.pathname] || 'FlowDesk';

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifications = [
    { id: 1, text: 'New lead assigned to you', time: '2m ago', unread: true },
    { id: 2, text: 'Follow-up reminder: Rahul Sharma', time: '1h ago', unread: true },
    { id: 3, text: 'Lead status updated by Admin', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 className="navbar-title">{currentTitle}</h2>
      </div>

      <div className="nav-right">
        {/* Notification Bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="nav-icon-btn"
            onClick={() => setShowNotif(!showNotif)}
            style={{ position: 'relative' }}
            title="Notifications"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--red)',
                border: '1.5px solid var(--bg2)',
              }} />
            )}
          </button>

          {showNotif && (
            <div className="notification-dropdown">
              <div className="notif-header">
                Notifications
                <span style={{ background: 'rgba(85,70,214,0.15)', color: 'var(--brand-light)', borderRadius: '99px', padding: '2px 8px', fontSize: '11px' }}>
                  {unreadCount} new
                </span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="notif-item">
                  {n.unread && <span className="notif-dot" />}
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '3px', color: n.unread ? 'var(--text)' : 'var(--text2)' }}>{n.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <button
                  onClick={() => setShowNotif(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-light)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: '600' }}
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        {/* User pill */}
        {user && (
          <>
            <div className="nav-user">
              <div className="nav-avatar">{initials}</div>
              <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text2)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;