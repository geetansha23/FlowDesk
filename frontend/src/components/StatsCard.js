function StatsCard({ title, value, accentColor, accentDim, icon, change, changeDir }) {
  const changeColor = {
    up: 'var(--green)',
    down: 'var(--red)',
    warn: 'var(--orange)',
    neutral: 'var(--text3)',
  }[changeDir || 'neutral'];

  const changeArrow = {
    up: '↑',
    down: '↓',
    warn: '⚠',
    neutral: '',
  }[changeDir || 'neutral'];

  return (
    <div
      className="stat-card"
      style={{ '--accent-color': accentColor, '--accent-dim': accentDim }}
    >
      {icon && (
        <div className="stat-card-icon" style={{ color: accentColor, background: accentDim }}>
          {icon}
        </div>
      )}
      <div className="stat-card-label">{title}</div>
      <div className="stat-value">{value ?? '—'}</div>
      {change && (
        <div className="stat-change" style={{ color: changeColor }}>
          {changeArrow && <span>{changeArrow}</span>}
          {change}
        </div>
      )}
    </div>
  );
}

export default StatsCard;