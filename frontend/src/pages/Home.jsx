// Home Page Component
import { useState } from "react";
import notificationService from "../services/notificationService";

const Home = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const notificationTypes = ["message", "order", "system", "promotion"];

  const handleCreateTestNotification = async () => {
    try {
      setCreating(true);
      setError(null);

      const randomType =
        notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

      const newNotification = {
        title: "Test Notification",
        message: `This is a test notification created at ${new Date().toLocaleTimeString()}`,
        type: randomType,
      };

      await notificationService.createNotification(newNotification);
      setSuccess(
        "Test notification created! Check the notification bell in 5 seconds.",
      );

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (error) {
      console.error("Error creating test notification:", error);
      setError("Failed to create test notification");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#333" }}>Welcome to NotifyHub</h2>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          NotifyHub is a real-time notification center that keeps you updated
          with important messages, orders, and system notifications. The
          notification bell in the top-right will show you the number of unread
          notifications and automatically update every 5 seconds through
          polling.
        </p>

        <h3 style={{ color: "#333", marginTop: "30px" }}>Features:</h3>
        <ul style={{ color: "#666", lineHeight: "1.8" }}>
          <li>Real-time notification updates using polling</li>
          <li>Mark notifications as read individually or all at once</li>
          <li>Unread notification badge that updates automatically</li>
          <li>Organized notification dropdown with different types</li>
          <li>No page refresh required for updates</li>
        </ul>

        <h3 style={{ color: "#333", marginTop: "30px" }}>How It Works:</h3>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          The application polls the backend every 5 seconds to check for new
          notifications. When new notifications are created, they automatically
          appear in your notification bell without requiring a page refresh.
          Click the bell icon to see all notifications.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            onClick={handleCreateTestNotification}
            disabled={creating}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              cursor: creating ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              opacity: creating ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!creating) e.target.style.backgroundColor = "#0056b3";
            }}
            onMouseLeave={(e) => {
              if (!creating) e.target.style.backgroundColor = "#007bff";
            }}
          >
            {creating ? "Creating..." : "✚ Create Test Notification"}
          </button>

          {success && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                backgroundColor: "#d4edda",
                color: "#155724",
                borderRadius: "6px",
                border: "1px solid #c3e6cb",
              }}
            >
              ✓ {success}
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "6px",
                border: "1px solid #f5c6cb",
              }}
            >
              ✕ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
