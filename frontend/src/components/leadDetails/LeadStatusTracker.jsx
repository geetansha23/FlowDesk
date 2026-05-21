function LeadStatusTracker({ status }) {
  const stages = [
    'New',
    'Interested',
    'Applied',
    'Admitted'
  ];

  return (
    <div className="card">
      <h3>Status Tracker</h3>

      <div className="status-tracker">
        {stages.map((stage) => (
          <div
            key={stage}
            className={
              stage === status
                ? 'active-stage'
                : 'stage'
            }
          >
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadStatusTracker;