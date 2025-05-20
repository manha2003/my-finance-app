import React from 'react';
import { Box, Typography, Divider} from '@mui/material';
import IncomeItems from '../../components/IncomeItems';
import ExpenseItems from '../../components/ExpenseItems';


const BudgetItems = ({ id, selectedBudget , onDeleteSuccess}) => {
  if (!selectedBudget) {
    return (
      <Typography variant="h6" align="center" style={{ marginBottom: '16px' }}>
        Select a budget to view income and expenses.
      </Typography>
    );
  }

  const { incomes, expenses } = selectedBudget;

  return (
    <Box id={id} mt={2} >
      <Typography variant="h5" align="center" gutterBottom>
        Income and Expenses for Budget {selectedBudget.name}
      </Typography>
      <Divider
      sx={{ 
        height: 2,
        width: '80%',  
        margin: '16px auto'
      }}  />

      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={2}
        width="100%"
      >
        <Box flex={1} maxWidth="50%">
          <IncomeItems incomes={incomes} onDeleteSuccess={onDeleteSuccess}/>
        </Box>
        <Box flex={1} maxWidth="50%">
          <ExpenseItems expenses={expenses} onDeleteSuccess={onDeleteSuccess}/>
        </Box>
      </Box>

    </Box>
  );
};

export default BudgetItems;