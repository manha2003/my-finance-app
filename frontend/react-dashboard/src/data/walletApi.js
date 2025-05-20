import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Wallets";

const walletApi = {

  createWallet: async (walletData, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}?userId=${userId}`, walletData, config);
      return response;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  },
    getWalletsBalanceByUserId: async (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios.get(`${API_URL}/User/Balance/${userId}`, config);
            console.log("Balance fetched successfully:", response.data); 
            return response.data;

        } catch (error) {
            console.error("Error fetching wallet balance:", error.response ? error.response.data : error.message);
            throw new Error("Failed to fetch wallet balance");
        }
    },

    getWalletsByUserId: async (token) => {
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
          console.error(error.response.data);
          throw error;
        }
      },

      getWalletById: async (id, token) => {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
    
        const response = await axios.get(`${API_URL}/${id}`, config);
        return response.data;
      },

      deleteWallet: async (walletId, token) => {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
    
          const response = await axios.delete(`${API_URL}/${walletId}`, config);
          return response.status; 
        } catch (error) {
          console.error('Error deleting wallet:', error.response?.data || error.message);
          throw error.response?.data || error.message;
        }
      },


};

export default walletApi;
