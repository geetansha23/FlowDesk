import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Counselor'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'Counselor', label: 'Counselor', desc: 'Manage and follow up with leads' },
    { value: 'Admissions', label: 'Admissions', desc: 'Handle admissions and reports' },
    { value: 'Admin', label: 'Admin', desc: 'Full access to all features' },
  ];

  return (
    <div className="auth-wrapper">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <div className="auth-brand-icon">F</div>
            <div className="auth-brand-name">Flow<span>Desk</span></div>
          </div>

          <div>
            <h1 className="auth-headline">
              Your team.<br />
              <em>One platform.</em>
            </h1>
            <p className="auth-subtext" style={{ marginTop: '16px' }}>
              Give every counselor and admissions officer the tools they need. Real-time lead tracking, smart follow-ups, and role-based access — all in one place.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Role-based access for your whole team',
              'Real-time lead activity feed',
              'Automated follow-up reminders',
              'Conversion analytics & reports',
            ].map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text2)' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(34,208,122,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Create account</h2>
            <p>Join FlowDesk — it only takes a minute</p>
          </div>

          {error && (
            <div className="error-msg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon-wrap">
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@organization.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-icon-wrap" style={{ position: 'relative' }}>
                <span className="input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: '4px',
                    display: 'flex', alignItems: 'center'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {roles.map((r) => (
                  <label
                    key={r.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      border: `1px solid ${formData.role === r.value ? 'var(--brand-light)' : 'var(--border-strong)'}`,
                      borderRadius: 'var(--radius-sm)',
                      background: formData.role === r.value ? 'rgba(85,70,214,0.1)' : 'var(--bg3)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={formData.role === r.value}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--brand-light)', width: '15px', height: '15px', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{r.label}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }}></span>
                  Creating account…
                </span>
              ) : 'Create account'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;