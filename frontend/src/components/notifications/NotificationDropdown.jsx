function NotificationDropdown({
  notifications
}) {
  return (
    <div className="notification-dropdown">
      {notifications.map((n) => (
        <div
          key={n._id}
          className="notification-item"
        >
          <h4>{n.title}</h4>

          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}

export default NotificationDropdown;