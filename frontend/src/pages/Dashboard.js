import { useEffect, useState } from 'react';
import API from '../services/api';
import StatsCard from '../components/StatsCard';
import Loader from '../components/Loader';
import socket from '../socket';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get('/dashboard/stats');
      setStats(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  useEffect(() => {
    socket.on('leadCreated', () => fetchStats());
    return () => socket.off('leadCreated');
  }, []);

  if (loading) return <Loader />;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const convRate = stats?.conversionRate || 0;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '4px', fontWeight: '500' }}>
              {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
            </p>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Monitor leads, admissions and counselor performance in real time.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text2)' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px rgba(34,208,122,0.5)', animation: 'pulse-green 2s infinite', display: 'inline-block' }}></span>
              Live updates active
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '13px' }} onClick={fetchStats}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-msg" style={{ marginBottom: '20px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      {stats && (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            <StatsCard
              title="Total Leads"
              value={stats.totalLeads || 0}
              accentColor="#5546D6"
              accentDim="rgba(85,70,214,0.15)"
              change="+12%"
              changeDir="up"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              }
            />
            <StatsCard
              title="Counselors"
              value={stats.counselors || 0}
              accentColor="#00D1FF"
              accentDim="rgba(0,209,255,0.1)"
              change="Active"
              changeDir="neutral"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              }
            />
            <StatsCard
              title="Admissions Team"
              value={stats.admissions || 0}
              accentColor="#B48EFF"
              accentDim="rgba(180,142,255,0.12)"
              change="Active"
              changeDir="neutral"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              }
            />
            <StatsCard
              title="Admitted Leads"
              value={stats.admitted || 0}
              accentColor="#22D07A"
              accentDim="rgba(34,208,122,0.1)"
              change="+5% this week"
              changeDir="up"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              }
            />
            <StatsCard
              title="Pending Follow-ups"
              value={stats.pendingFollowups || 0}
              accentColor="#FF8A3D"
              accentDim="rgba(255,138,61,0.1)"
              change="Needs attention"
              changeDir="warn"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              }
            />
          </div>

          {/* Widgets */}
          <div className="dashboard-widgets">
            {/* Conversion Rate Card */}
            <div className="card">
              <h3>
                <span className="card-title-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </span>
                Conversion Rate
              </h3>

              <div className="conversion-display">
                <div className="conversion-number">
                  {convRate}<span>%</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '4px' }}>
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>
                    ↑ On track
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>vs 18% last month</span>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', marginBottom: '6px' }}>
                  <span>0%</span>
                  <span>Target: 30%</span>
                  <span>100%</span>
                </div>
                <div className="conversion-bar">
                  <div
                    className="conversion-bar-fill"
                    style={{ width: `${Math.min(convRate, 100)}%` }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '2px' }}>Leads</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>{stats.totalLeads || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '2px' }}>Admitted</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--green)' }}>{stats.admitted || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '2px' }}>Follow-ups</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--orange)' }}>{stats.pendingFollowups || 0}</div>
                </div>
              </div>
            </div>

            {/* System Status Card */}
            <div className="card">
              <h3>
                <span className="card-title-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </span>
                System Status
              </h3>

              <div className="status-row">
                <div className="status-item">
                  <span className="status-label">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span>
                    CRM Core
                  </span>
                  <span className="status-val" style={{ fontSize: '12px', color: 'var(--green)' }}>Operational</span>
                </div>
                <div className="status-item">
                  <span className="status-label">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span>
                    Real-time Sync
                  </span>
                  <span className="status-val" style={{ fontSize: '12px', color: 'var(--green)' }}>Connected</span>
                </div>
                <div className="status-item">
                  <span className="status-label">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span>
                    Notifications
                  </span>
                  <span className="status-val" style={{ fontSize: '12px', color: 'var(--green)' }}>Active</span>
                </div>
                <div className="status-item">
                  <span className="status-label">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block' }}></span>
                    Follow-ups Due
                  </span>
                  <span className="status-val" style={{ fontSize: '12px', color: 'var(--yellow)' }}>
                    {stats.pendingFollowups || 0} pending
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text3)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px rgba(34,208,122,0.5)', animation: 'pulse-green 2s infinite', display: 'inline-block' }}></span>
                All systems operational · Updated just now
              </div>
            </div>
          </div>
        </>
      )}

      {!stats && !error && (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <div className="empty-title">No data yet</div>
          <div className="empty-desc">Stats will appear once your team starts adding leads.</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;