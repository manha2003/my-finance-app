import React, { useState, useEffect } from 'react';
import { Button,Typography, MenuItem, Box, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import budgetApi from '../../data/budgetApi';

import { ToastContainer, toast, Bounce } from 'react-toastify';

const ImportBudgetForm = ({ onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(''); 

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedBudgets = await budgetApi.getBudgetsAvaiableByUserId(token);
          setBudgets(fetchedBudgets);
        }
      } catch (error) {
        
        toast.error('Failed to fetch budgets.');
      }
    };

    fetchBudgets();
  }, []);

  const handleBudgetChange = (event) => {
    setSelectedBudgetId(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async () => {
    

    if (!selectedBudgetId) {
      toast.error('Please select a budget.');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }
    const token = localStorage.getItem('authToken');
    

   
    try {
      const response = await budgetApi.importExpensesIncomes(selectedBudgetId, selectedFile, token);
      toast.success(response);
      
      setTimeout(() => {
        onSubmit(); 
      }, 2500);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      toast.error(error.response.data);
    }
   
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ width: '450px', margin: '0 auto' }}>
      <ToastContainer position="top-right" autoClose={2000} transition={Bounce} />
      
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
      
      <Button
        variant="contained"
        component="label"
        sx={{ backgroundColor: colors.custom[100], color: colors.grey[100] }}
      >
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {fileName && (
        <Typography variant="h5" sx={{ color: colors.grey[300], fontStyle: 'italic' }}>
          Selected file: {fileName}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedBudgetId || !selectedFile} 
        sx={{
            backgroundColor: '#4caf50', 
            color: '#ffffff', 
            '&:hover': {
                backgroundColor: '#45a049', 
            },
            
        }}
      >
        Submit
      </Button>

     
    </Box>
  );
};

export default ImportBudgetForm;