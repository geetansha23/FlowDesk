import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavIcon = ({ d, d2, circle, rect, polyline, path2 }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d && <path d={d} />}
    {d2 && <path d={d2} />}
    {path2 && <path d={path2} />}
    {circle && <circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
    {rect && <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={rect.rx} />}
    {polyline && <polyline points={polyline} />}
  </svg>
);

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const storedUser = user || JSON.parse(localStorage.getItem('user') || '{}');
  const initials = storedUser?.name
    ? storedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    {
      to: '/',
      label: 'Dashboard',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      to: '/leads',
      label: 'Leads',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
  ];

  const adminLinks = [
    {
      to: '/reports',
      label: 'Reports',
      roles: ['Admin', 'Admissions'],
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
  ];

  const bottomLinks = [
    {
      to: '/settings',
      label: 'Settings',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      )
    },
  ];

  const roleConfig = {
    Admin: { label: 'Admin', className: '' },
    Admissions: { label: 'Admissions', className: 'admissions' },
    Counselor: { label: 'Counselor', className: 'counselor' },
  };

  const currentRole = roleConfig[storedUser?.role] || roleConfig.Counselor;

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">F</div>
        <div className="sidebar-logo-text">Flow<span>Desk</span></div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="sidebar-section-label">Main</div>

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}

        {adminLinks
          .filter(link => link.roles.includes(storedUser?.role))
          .map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
            >
              {link.icon}
              {link.label}
            </Link>
          ))
        }

        <div className="sidebar-section-label" style={{ marginTop: '8px' }}>Account</div>

        {bottomLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>

      {/* Role Badge */}
      <div className={`role-badge ${currentRole.className}`}>
        {currentRole.label}
      </div>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={handleLogout} title="Click to sign out">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{storedUser?.name || 'User'}</div>
            <div className="user-role">Sign out</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;