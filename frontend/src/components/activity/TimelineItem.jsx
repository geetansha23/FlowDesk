function TimelineItem({ item }) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>

      <div>
        <p>{item.action}</p>

        <small>
          {new Date(
            item.createdAt
          ).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default TimelineItem;