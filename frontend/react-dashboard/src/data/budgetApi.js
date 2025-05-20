import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Budget";

const budgetApi = {
  createBudget: async (budgetData, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}?userId=${userId}`, budgetData, config);
      return response;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  },

  getBudgetsByUserId: async (token) => {
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

  getBudgetsAvaiableByUserId: async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(`${API_URL}/Avaiable/User/${userId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      throw error;
    }
  },


  getBudgetById: async (id, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  },

  importExpensesIncomes: async (selectedBudgetId, selectedFile, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

    
  
      const formData = new FormData();
      formData.append("file", selectedFile); 
  
      console.log("Submitting import with:", { selectedBudgetId, selectedFile, userId });
  
    
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
  
     
      const response = await axios.post(
        `${API_URL}/Import?userId=${userId}&budgetId=${selectedBudgetId}`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      console.error('Error when importing expenses/incomes:', error);
      throw error;
    }
  },


  updateBudget: async (budgetId, budgetUpdateData, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { userId },
      };

      const response = await axios.put(`${API_URL}/${budgetId}`, budgetUpdateData, config, {
       
      });
      return response.data;
    } catch (error) {
      console.error('Error updating budget:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },


  deleteBudget: async (budgetId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/${budgetId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting budget:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },


};


export default budgetApi;