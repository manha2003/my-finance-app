import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Users";

const userApi = {
    updateUser: async (userData) => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.put(`${API_URL}/Update`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; 
      } catch (error) {
        
        console.error('Error updating user:', error.response?.data || error.message);
        throw error.response?.data || error.message;
      }
    },
    getUserByUserName: async (token) => {
        try {
          const decodedToken = jwtDecode(token);
          const userName = decodedToken.unique_name;
    
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
    
          const response = await axios.get(`${API_URL}/${userName}`, config);
          return response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
          throw error;
        }
      },

  };
  
  export default userApi;