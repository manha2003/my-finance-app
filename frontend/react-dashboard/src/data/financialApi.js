import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const API_URL = "https://localhost:7142/api/Financial";

const financialApi = {
  createIncome: async (incomeData, token) => {
    try {
      

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`${API_URL}/Incomes`, incomeData, config);
      return response;
    } catch (error) {
      console.error('Error adding income:', error);
      throw error;
    }
  },

  deleteIncome: async (incomeId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/Incomes/${incomeId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting Income:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  createExpense: async (expenseData, token) => {
    try {
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('Sending expense data to API:', expenseData); 
      const response = await axios.post(`${API_URL}/Expenses`, expenseData, config);
      console.log('Expense response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  deleteExpense: async (expenseId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/Expenses/${expenseId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting Expense:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  createAsset: async (assetData, token) => {
    try {
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('Sending asset data to API:', assetData); 
      const response = await axios.post(`${API_URL}/Assets`, assetData, config);
      console.log('Asset response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error adding asset:', error);
      throw error;
    }
  },

  deleteAsset: async (assetId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/Assets/${assetId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting asset:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  createLiability: async (liabilityData, token) => {
    try {
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('Sending liability data to API:', liabilityData); 
      const response = await axios.post(`${API_URL}/Liabilities`, liabilityData, config);
      console.log('Liability response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error adding liability:', error);
      throw error;
    }
  },

  deleteLiability: async (liabilityId, token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(`${API_URL}/Liabilities/${liabilityId}`, config);
      return response.status; 
    } catch (error) {
      console.error('Error deleting liability:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  getMostRecentTransactionByWalletId: async (token, walletId) => {
    try {
     
      

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(`${API_URL}/Transactions/MostRecent/WalletOrBudget/${walletId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getRecentTransactionsByUserId: async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(`${API_URL}/Transactions/Recent/User/${userId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },


  getTransactionsByUserId: async (token) => {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
    
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
    
          const response = await axios.get(`${API_URL}/Transactions/User/${userId}`, config);
          return response.data;
        } catch (error) {
          console.error('Error fetching budgets:', error);
          throw error;
        }
      },

      getAllIncomesExpensesByUserId: async (token) => {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
    
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
    
          const response = await axios.get(`${API_URL}/Transactions/IncomesExpenses/User/${userId}`, config);
          return response.data;
        } catch (error) {
          console.error('Error fetching transactions:', error);
          throw error;
        }
      },


};

export default financialApi;