// NotificationItem Component
import notificationService from "../services/notificationService";

const NotificationItem = ({ notification, onMarkAsRead, onUpdated }) => {
  const handleClick = async () => {
    if (!notification.isRead) {
      try {
        await notificationService.markNotificationAsRead(notification._id);
        onMarkAsRead(notification._id);
        onUpdated(); // Trigger re-fetch of unread count
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  // Get time since notification was created
  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div
      className={`notification-item ${notification.isRead ? "read" : "unread"}`}
      onClick={handleClick}
      style={{
        padding: "15px",
        borderBottom: "1px solid #e0e0e0",
        cursor: notification.isRead ? "default" : "pointer",
        backgroundColor: notification.isRead ? "#fff" : "#f9f9f9",
        transition: "background-color 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0 0 5px 0",
              fontWeight: notification.isRead ? "400" : "600",
              color: "#333",
            }}
          >
            {notification.title}
          </h4>
          <p
            style={{
              margin: "5px 0",
              color: "#666",
              fontSize: "14px",
            }}
          >
            {notification.message}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
              fontSize: "12px",
              color: "#999",
            }}
          >
            <span
              style={{
                backgroundColor: "#f0f0f0",
                padding: "4px 8px",
                borderRadius: "4px",
                textTransform: "capitalize",
              }}
            >
              {notification.type}
            </span>
            <span>{getTimeAgo(notification.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
