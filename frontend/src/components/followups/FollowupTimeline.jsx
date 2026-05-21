function FollowupTimeline({
  followups
}) {
  return (
    <div className="card">
      <h3>
        Followup Timeline
      </h3>

      {followups.map((item) => (
        <div
          key={item._id}
          className="timeline-item"
        >
          <p>{item.note}</p>

          <small>
            {
              item.counselor
            }{' '}
            •{' '}
            {new Date(
              item.createdAt
            ).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default FollowupTimeline;