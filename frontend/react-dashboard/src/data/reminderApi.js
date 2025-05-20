import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Reminders";

const reminderApi = {

  createReminder: async (reminderData, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}?userId=${userId}`, reminderData, config);
      return response;
    } catch (error) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  },

  getAllReminders: async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
  
      const response = await axios.get(`${API_URL}/User/${userId}`, config);
      return response.data; 
    } catch (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }
  },

  deleteReminder: async (reminderId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/${reminderId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting reminder:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

};

export default reminderApi;