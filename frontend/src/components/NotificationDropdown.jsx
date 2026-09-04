// NotificationDropdown Component
import NotificationItem from "./NotificationItem";
import notificationService from "../services/notificationService";

const NotificationDropdown = ({
  notifications,
  onClose,
  onNotificationUpdated,
}) => {
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllNotificationsAsRead();
      onNotificationUpdated();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    // Update local state - mark notification as read
    onNotificationUpdated();
  };

  return (
    <div
      className="notification-dropdown"
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        width: "400px",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1000,
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
          Notifications
        </h3>
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontSize: "12px",
              textDecoration: "underline",
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#999",
            }}
          >
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={handleMarkNotificationAsRead}
              onUpdated={onNotificationUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
