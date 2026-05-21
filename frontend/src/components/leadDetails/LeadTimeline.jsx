function LeadTimeline({ activities }) {
  return (
    <div className="card">
      <h3>Lead Timeline</h3>

      {activities?.map((activity) => (
        <div
          key={activity._id}
          className="timeline-item"
        >
          <p>{activity.action}</p>

          <small>
            {activity.performedBy}
          </small>
        </div>
      ))}
    </div>
  );
}

export default LeadTimeline;