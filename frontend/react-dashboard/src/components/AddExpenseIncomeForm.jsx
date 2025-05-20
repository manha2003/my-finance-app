import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, useTheme } from '@mui/material';
import { tokens } from '../theme';
import AddIcon from '@mui/icons-material/Add';
import Popup from './Popup';
import ImportBudgetForm from '../scences/budgets/ImportBudgetForm';
import DownloadIcon from '@mui/icons-material/Download';
import expenseIcons from '../icons/expenseIcons';
import 'react-toastify/dist/ReactToastify.css';
import incomeIcons from '../icons/incomeIcons';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SelectIcon from './SelectIcons';
import { toast } from 'react-toastify';

const AddExpenseIncomeForm = ({ onSubmit = async () => {}  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    iconId: '',
    description: '',
    amount: '',
  });

  const handleGuideClick = () => {
    window.open('/ImportGuideFile.csv', '_blank'); 
  };

 
  const icons = formData.type === 'expense' ? expenseIcons : incomeIcons;

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleFormSubmit = async () => {
    const { type, description, amount } = formData;
    
    if (!type || !amount || !description) {
      toast.error('All fields are required.');
      return;
    }
  
    try {
      console.log('Submitting form data:', formData);
  
      await onSubmit(formData);
      toast.success('Expense/Income added successfully!');
      setFormData({ type: '', iconId: '', description: '', amount: '' });
     
  
      
     
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred while adding Expense/Income.');
   
    }
  };
  

  return (
    <Box mt="20px" p="16px" sx={{ backgroundColor: colors.custom[100], borderRadius: '8px' }}>
       <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Typography variant="h6" color={colors.grey[100]} fontSize="16px" fontWeight="bold">
          Add Expense / Income
        </Typography>
        <Button variant="contained"
        startIcon={<QuestionMarkIcon />}
        onClick={handleGuideClick}
        
        sx={{
          backgroundColor: colors.grey[500],
          '&:hover': {
            backgroundColor: colors.primary[700],
          },
        }}
        >
          Import Guide
        </Button>
      </Box>

     
        

      
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Import Budget">
        <ImportBudgetForm onSubmit={() => setOpenPopup(false)} />
      </Popup>

      <Box display="flex" gap={2} mb={2}>
       
        <FormControl fullWidth>
          <InputLabel id="type-label" sx={{ top: '-8px', fontSize: '14px' }}>
            Type
          </InputLabel>
          <Select
            labelId="type-label"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            sx={{
              backgroundColor: colors.custom[100],
              color: colors.grey[100],
              height: 48,
              display: 'flex',
              alignItems: 'center',
              '& .MuiSelect-select': {
                padding: '8px 14px',
              },
              '& fieldset': {
                borderColor: colors.grey[400],
              },
            }}
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
        </FormControl>

      
        <SelectIcon
          icons={icons}
          selectedIcon={formData.iconId}
          onChange={handleInputChange}
          disabled={!formData.type}
          type={formData.type}
        />
      </Box>

      <Box display="flex" gap={2} mb={2}>
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          value={formData.description}
          onChange={handleInputChange}
          sx={{ mb: 2, backgroundColor: colors.custom[100], color: colors.grey[900] }}
        />

      
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          variant="outlined"
          type="number"
          value={formData.amount}
          onChange={handleInputChange}
          sx={{ mb: 2, backgroundColor: colors.custom[100], color: colors.grey[900] }}
        />
      </Box>

      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          marginLeft: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '8px 10px',
        }}
        onClick={handleFormSubmit}
      >
        Add {formData.type === 'expense' ? 'Expense' : 'Income'}
      </Button>

   
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        sx={{
          backgroundColor: '#CB9DF0',
          color: colors.grey[100],
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '8px 10px',
          marginLeft: '12px',
        }}
        onClick={() => setOpenPopup(true)}
      >
        Import Budget
      </Button>

     
    </Box>
  );
};

export default AddExpenseIncomeForm;
