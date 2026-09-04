# NotifyHub – Real-Time Notification Center

A beginner-friendly MERN Stack project that demonstrates real-time notifications using polling with read/unread notification management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [How Polling Works](#how-polling-works)
- [How Read/Unread Works](#how-readunread-works)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Testing Polling](#testing-polling)
- [Example API Requests](#example-api-requests)

## Project Overview

NotifyHub is a real-time notification center where users can:

- View notifications in a dropdown from a notification bell
- See the count of unread notifications
- Mark individual notifications as read
- Mark all notifications as read at once
- Automatically receive new notifications through polling (every 5 seconds)

The application uses polling instead of WebSockets to keep the implementation simple and beginner-friendly.

## Features

✓ **Real-Time Polling** - Automatic updates every 5 seconds without page refresh  
✓ **Unread Badge** - Visual badge showing the count of unread notifications  
✓ **Mark as Read** - Mark notifications individually or all at once  
✓ **Notification Types** - Organize notifications by type (message, order, system, promotion)  
✓ **Responsive UI** - Clean, mobile-friendly interface  
✓ **No WebSockets** - Uses simple HTTP polling instead  
✓ **Easy Testing** - Built-in "Create Test Notification" button

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS** - Styling (no CSS frameworks)

## Folder Structure

```
notification-center/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   │
│   ├── controllers/
│   │   └── notificationController.js # Business logic
│   │
│   ├── models/
│   │   └── Notification.js          # MongoDB schema
│   │
│   ├── routes/
│   │   └── notificationRoutes.js    # API endpoints
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js       # Error handling
│   │
│   ├── .env                         # Environment variables
│   ├── server.js                    # Server entry point
│   └── package.json                 # Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── NotificationBell.jsx # Bell with badge and polling
│   │   │   ├── NotificationDropdown.jsx # Dropdown menu
│   │   │   └── NotificationItem.jsx # Individual notification item
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main page with test button
│   │   │
│   │   ├── services/
│   │   │   └── notificationService.js # API calls
│   │   │
│   │   ├── App.jsx                  # Main component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   │
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── .env                         # Environment variables
│   └── package.json                 # Dependencies
│
└── README.md                        # This file
```

## Architecture

NotifyHub follows the **MVC (Model-View-Controller)** architecture for the backend:

### Backend Flow

```
HTTP Request
    ↓
Route (/api/notifications/...)
    ↓
Controller (notificationController.js)
    ↓
Model (Notification.js - MongoDB)
    ↓
Response (JSON)
```

### Frontend Flow

```
User Interface (React Components)
    ↓
Services (notificationService.js - HTTP calls)
    ↓
Backend API
    ↓
MongoDB
```

## API Endpoints

### 1. Get All Notifications

```
GET /api/notifications
```

**Response:**

```json
[
  {
    "_id": "64abc123...",
    "title": "New Message",
    "message": "You received a new message.",
    "type": "message",
    "isRead": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

### 2. Get Unread Count

```
GET /api/notifications/unread-count
```

**Response:**

```json
{
  "count": 3
}
```

### 3. Mark Notification as Read

```
PATCH /api/notifications/:id/read
```

**Example:**

```
PATCH /api/notifications/64abc123/read
```

**Response:**

```json
{
  "message": "Notification marked as read"
}
```

### 4. Mark All as Read

```
PATCH /api/notifications/read-all
```

**Response:**

```json
{
  "message": "All notifications marked as read"
}
```

### 5. Create Notification

```
POST /api/notifications
```

**Request Body:**

```json
{
  "title": "New Order",
  "message": "Your order has been placed successfully.",
  "type": "order"
}
```

**Response:**

```json
{
  "_id": "64abc123...",
  "title": "New Order",
  "message": "Your order has been placed successfully.",
  "type": "order",
  "isRead": false,
  "createdAt": "2024-01-15T10:35:00Z"
}
```

## Notification Types

- **message** - User messages and communications
- **order** - Order-related notifications
- **system** - System notifications
- **promotion** - Promotional and marketing notifications

## How Polling Works

### Polling Mechanism

The frontend uses **setInterval()** to automatically fetch the unread count every **5 seconds**:

```javascript
// In NotificationBell.jsx
useEffect(() => {
  fetchUnreadCount(); // Fetch immediately

  // Fetch again every 5 seconds
  const interval = setInterval(() => {
    fetchUnreadCount();
  }, 5000);

  // Cleanup when component unmounts
  return () => clearInterval(interval);
}, []);
```

### Why Polling?

- ✓ Simple to implement
- ✓ No complex infrastructure needed
- ✓ Works in all browsers
- ✓ Beginner-friendly
- ✗ Slightly less real-time than WebSockets
- ✗ More server requests (but still minimal)

### Polling Flow

```
Second 0:  GET /api/notifications/unread-count → 3 unread
Second 5:  GET /api/notifications/unread-count → 3 unread
Second 10: GET /api/notifications/unread-count → 4 unread (new notification!)
           🔔 3 → 🔔 4 (badge updates automatically)
```

### Important: Cleanup

The polling interval **must be cleared** when the component unmounts to prevent memory leaks:

```javascript
return () => clearInterval(interval); // Cleanup function
```

## How Read/Unread Works

### Read/Unread States

Each notification has an `isRead` property:

- **Unread** (`isRead: false`):
  - Bold title
  - Light background
  - Clickable (can be marked as read)
- **Read** (`isRead: true`):
  - Normal title
  - White background
  - Not clickable

### Marking as Read

#### Individual Notification

When you click an unread notification:

1. **Frontend** calls `PATCH /api/notifications/:id/read`
2. **Backend** sets `isRead = true` in MongoDB
3. **Frontend** updates the UI immediately
4. **Unread count** decreases by 1 (next polling cycle)

```javascript
// NotificationItem.jsx
const handleClick = async () => {
  if (!notification.isRead) {
    await notificationService.markNotificationAsRead(notification._id);
    onMarkAsRead(notification._id); // Update UI
    onUpdated(); // Refresh unread count
  }
};
```

#### All Notifications

When you click "Mark all as read":

1. **Frontend** calls `PATCH /api/notifications/read-all`
2. **Backend** sets ALL `isRead = true` in MongoDB
3. **Frontend** refreshes the notification list
4. **Unread count** becomes 0

```javascript
// NotificationDropdown.jsx
const handleMarkAllAsRead = async () => {
  await notificationService.markAllNotificationsAsRead();
  onNotificationUpdated(); // Refresh everything
};
```

## Setup Instructions

### Prerequisites

Before you start, make sure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)

### 1. Clone or Download Project

```bash
cd d:\NotifyHub
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB

#### Option A: Local MongoDB

Make sure MongoDB is running on your computer:

```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

Update `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notifyhub
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notifyhub?retryWrites=true&w=majority
```

### 4. Insert Sample Data

Create a file `backend/seed.js`:

```javascript
require("dotenv").config();
const mongoose = require("mongoose");
const Notification = require("./models/Notification");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing notifications
    await Notification.deleteMany({});

    // Insert sample notifications
    const notifications = [
      {
        title: "Welcome to NotifyHub",
        message: "Welcome to your notification center.",
        type: "system",
        isRead: false,
      },
      {
        title: "New Order",
        message: "Your order has been confirmed.",
        type: "order",
        isRead: false,
      },
      {
        title: "New Message",
        message: "You have received a new message.",
        type: "message",
        isRead: true,
      },
    ];

    await Notification.insertMany(notifications);
    console.log("Sample data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
```

Run:

```bash
node seed.js
```

### 5. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 6. Configure Frontend API URL

Update `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

## Running the Project

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

You should see:

```
  VITE v4.3.9  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Access the Application

Open your browser and go to:

```
http://localhost:5173
```

You should see NotifyHub with the notification bell in the top-right corner.

## Testing Polling

### Step 1: Open the Application

Go to `http://localhost:5173` and look at the notification bell.

### Step 2: Create Test Notification

Click the **"✚ Create Test Notification"** button on the home page.

You should see:

```
✓ Test notification created! Check the notification bell in 5 seconds.
```

### Step 3: Watch Polling in Action

Within **5 seconds**, the notification bell badge should update:

```
🔔 0  →  🔔 1
```

No page refresh needed!

### Step 4: Click Bell to View

Click the bell to see the new notification:

```
- Test Notification
  This is a test notification created at 10:30:45 AM
  5 seconds ago
```

### Step 5: Mark as Read

Click the notification to mark it as read. The unread count decreases:

```
🔔 1  →  🔔 0
```

## Example API Requests

### Using Curl

#### Get All Notifications

```bash
curl http://localhost:5000/api/notifications
```

#### Get Unread Count

```bash
curl http://localhost:5000/api/notifications/unread-count
```

#### Mark as Read

```bash
curl -X PATCH http://localhost:5000/api/notifications/64abc123/read
```

#### Mark All as Read

```bash
curl -X PATCH http://localhost:5000/api/notifications/read-all
```

#### Create Notification

```bash
curl -X POST http://localhost:5000/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Message",
    "message": "You have a new message",
    "type": "message"
  }'
```

### Using Postman

1. **Get All Notifications**
   - Method: GET
   - URL: `http://localhost:5000/api/notifications`

2. **Get Unread Count**
   - Method: GET
   - URL: `http://localhost:5000/api/notifications/unread-count`

3. **Mark as Read**
   - Method: PATCH
   - URL: `http://localhost:5000/api/notifications/:id/read`
   - Replace `:id` with an actual notification ID

4. **Mark All as Read**
   - Method: PATCH
   - URL: `http://localhost:5000/api/notifications/read-all`

5. **Create Notification**
   - Method: POST
   - URL: `http://localhost:5000/api/notifications`
   - Body (JSON):
   ```json
   {
     "title": "Your Title",
     "message": "Your message",
     "type": "system"
   }
   ```

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**

- Make sure MongoDB is running
- Check your `MONGO_URI` in `.env`
- For MongoDB Atlas, ensure IP is whitelisted

### Issue: "CORS error" in browser console

**Solution:**

- Make sure backend is running on `http://localhost:5000`
- Check `frontend/.env` has correct `VITE_API_URL`

### Issue: Frontend shows "No notifications"

**Solution:**

- Run `node seed.js` to insert sample data
- Or click "Create Test Notification" button

### Issue: Polling not updating

**Solution:**

- Open browser DevTools (F12)
- Check Network tab - should see requests every 5 seconds
- Check Console for errors
- Make sure backend is running

## Learning Outcomes

By completing this project, you will learn:

✓ How to build a full-stack MERN application  
✓ MVC architecture on the backend  
✓ RESTful API design  
✓ MongoDB and Mongoose basics  
✓ React hooks (useState, useEffect)  
✓ Polling and real-time updates  
✓ CORS configuration  
✓ Environment variables  
✓ Error handling  
✓ Clean code practices

## Code Quality

- **No TypeScript** - Pure JavaScript for simplicity
- **No Redux** - Simple React hooks for state management
- **No complex libraries** - Minimal dependencies
- **Clear naming** - Easy-to-understand variable names
- **Comments** - Helpful explanations in code
- **MVC structure** - Organized backend code
- **Responsive design** - Works on desktop and mobile

## Future Enhancements

Ideas to extend this project:

1. **Add User Authentication** - Log in with username/password
2. **Multiple Users** - Each user has their own notifications
3. **Socket.IO** - Replace polling with WebSockets for true real-time
4. **Notifications API** - Send notifications from external services
5. **Email Notifications** - Notify users via email
6. **Notification Categories** - Filter by notification type
7. **Delete Notifications** - Remove old notifications
8. **Database Cleanup** - Auto-delete notifications after 30 days
9. **Admin Dashboard** - View all notifications in the system
10. **Dark Mode** - Toggle between light and dark themes

## License

ISC

## Support

For questions or issues, please refer to the code comments and documentation above.

**Happy coding!** 🚀
#   N o t i f y h u b  
 