// Navbar Component
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#ffffff",
        padding: "15px 30px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        NotifyHub
      </h1>
      <NotificationBell />
    </nav>
  );
};

export default Navbar;
