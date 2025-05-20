import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import budgetApi from '../../data/budgetApi';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
import financialApi from '../../data/financialApi';
import getCategoryIdWithIcon from '../../utils/getCategoryWithId';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import AddExpenseIncomeForm from '../../components/AddExpenseIncomeForm';
import 'react-toastify/dist/ReactToastify.css';

const ManageBudget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState('');


  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedBudgets = await budgetApi.getBudgetsAvaiableByUserId(token);
          console.log('Fetched budgets:', fetchedBudgets);
          setBudgets(fetchedBudgets);
        }
      } catch (error) {
        console.error('Error fetching budgets:', error);
        toast.error('Failed to fetch budgets.');
      }
    };

    fetchBudgets();
  }, []);

  
  const handleBudgetChange = (event) => {
    const budgetId = event.target.value;
    console.log('Selected budget ID:', budgetId);
    setSelectedBudgetId(budgetId);
  };


 
  const handleAddExpenseIncome = async (formData) => {
    if (!selectedBudgetId) {
      toast.error('Please select a budget.');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
  
    try {
      
      const categoryId = await getCategoryIdWithIcon(formData.iconId, token);
     
  
      if (!categoryId) {
        toast.error('Invalid category selected.');
        return;
      }
  
      const payload = {
        userId,
        budgetId: parseInt(selectedBudgetId, 10),
        categoryId: parseInt(categoryId, 10),
        amount: parseFloat(formData.amount),
        description: formData.description,
      };
  
      console.log('Payload:', payload);
  
      if (formData.type === 'income') {
        const response = await financialApi.createIncome(payload, token);
        console.log('API Response (Income):', response.data);
        toast.success(response.data || 'Income added successfully!');
      } else {
        const response = await financialApi.createExpense(payload, token);
        console.log('API Response (Expense):', response.data);
        toast.success('Expense added successfully!');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    }
  };

  return (
    <Box m="20px">
     
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="BUDGET MANAGEMENT" subtitle="Welcome to your budget management" />
      </Box>
      <Box mt="20px">
        <FormControl fullWidth>
          <InputLabel 
            id="select-budget-label" 
            sx={{ top: '-8px', fontSize: '14px' }}
          >
            Select Budget
          </InputLabel>
          
          <Select
            labelId="select-budget-label"
            value={selectedBudgetId}
            onChange={handleBudgetChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Budget' }}
            sx={{ 
              backgroundColor: colors.custom[100],
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: '400',
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <MenuItem key={budget.budgetId} value={budget.budgetId}>
                  {budget.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No budgets available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <AddExpenseIncomeForm onSubmit={handleAddExpenseIncome} />
    </Box>
  );
};

export default ManageBudget;
