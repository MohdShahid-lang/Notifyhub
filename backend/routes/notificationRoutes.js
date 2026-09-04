// Notification Routes
const express = require('express');
const router = express.Router();
const {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    createNotification
} = require('../controllers/notificationController');

// GET all notifications
router.get('/', getNotifications);

// GET unread notification count
router.get('/unread-count', getUnreadCount);

// PATCH mark single notification as read
router.patch('/:id/read', markAsRead);

// PATCH mark all notifications as read
router.patch('/read-all', markAllAsRead);

// POST create new notification
router.post('/', createNotification);

module.exports = router;
