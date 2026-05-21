function ActivityFeed({
  activities
}) {
  return (
    <div className="card">
      <h3>Activity Feed</h3>

      {activities?.map(
        (activity) => (
          <div
            key={activity._id}
            className="activity-item"
          >
            <p>
              {activity.action}
            </p>

            <small>
              {
                activity.performedBy
              }
            </small>
          </div>
        )
      )}
    </div>
  );
}

export default ActivityFeed;