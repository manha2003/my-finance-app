import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Categories";

const categoryApi = {
    getCategoriesByUserId: async (token) => {
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
          console.error('Error fetching budgets:', error);
          throw error;
        }
      },
};

export default categoryApi;