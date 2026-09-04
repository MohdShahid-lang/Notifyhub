// NotificationBell Component
import { useState, useEffect } from "react";
import NotificationDropdown from "./NotificationDropdown";
import notificationService from "../services/notificationService";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // Toggle dropdown
  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      fetchNotifications();
    }
  };

  // Handle notification updated - refresh unread count and notifications
  const handleNotificationUpdated = () => {
    fetchUnreadCount();
    fetchNotifications();
  };

  // Polling: Fetch unread count every 5 seconds
  useEffect(() => {
    // Fetch immediately
    fetchUnreadCount();

    // Set up polling interval
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".notification-bell")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="notification-bell" style={{ position: "relative" }}>
      <button
        onClick={handleBellClick}
        style={{
          backgroundColor: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          position: "relative",
          padding: 0,
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#ff4444",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setIsDropdownOpen(false)}
          onNotificationUpdated={handleNotificationUpdated}
        />
      )}
    </div>
  );
};

export default NotificationBell;
