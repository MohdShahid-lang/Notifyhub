// Notification Service - API calls
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const notificationService = {
    // Get all notifications
    getNotifications: async () => {
        try {
            const response = await axios.get(`${API_URL}/notifications`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get unread notification count
    getUnreadCount: async () => {
        try {
            const response = await axios.get(`${API_URL}/notifications/unread-count`);
            return response.data.count;
        } catch (error) {
            throw error;
        }
    },

    // Mark single notification as read
    markNotificationAsRead: async (id) => {
        try {
            const response = await axios.patch(`${API_URL}/notifications/${id}/read`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Mark all notifications as read
    markAllNotificationsAsRead: async () => {
        try {
            const response = await axios.patch(`${API_URL}/notifications/read-all`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create new notification
    createNotification: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/notifications`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default notificationService;
