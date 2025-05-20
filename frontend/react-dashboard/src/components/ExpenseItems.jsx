import React from 'react';
import { Box, Typography, List, ListItem, Divider, Avatar, useTheme,  IconButton, Tooltip} from '@mui/material';
import { tokens } from '../theme';
import CloseIcon from '@mui/icons-material/Close';
import financialApi from '../data/financialApi';
import expenseIcons from '../icons/expenseIcons'; 


const categoryIconMap = {
  1: 'fastfood',
  2: 'localDrink',
  3: 'electricBolt',
  4: 'receipt',
  5: 'home',
  6: 'car',
  7: 'grocery',
  8: 'flight',
  9: 'hospital',
  10: 'school',
  11: 'soccer',
  12: 'theater',
  13: 'phone',
  14: 'wifi',
  15: 'fitness',
  16: 'creditCard',
  17: 'build',
  18: 'pet',
  19: 'shoppingCart',
  20: 'musicNote',
  21: 'localBar',
};

const ExpenseItems = ({ expenses, onDeleteSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async (expenseId) => {
    console.log("Expense Id:", expenseId)
    try {
      const token = localStorage.getItem('authToken');
      await financialApi.deleteExpense(expenseId, token);
      console.log(`Expense with ID ${expenseId} deleted successfully.`);
      onDeleteSuccess(expenseId);
     
    } catch (error) {
      console.error(`Failed to delete expense with ID ${expenseId}:`, error);
    }
  };

  return (
    <Box mt={2} width="100%" bgcolor={colors.custom[100]} borderRadius="8px" p={3} boxShadow={3}>
      <Typography variant="h5" gutterBottom display="flex" alignItems="center" mb={2} color="red">
        Expenses
      </Typography>

      <Box
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <List>
          {expenses.length === 0 ? (
            <Typography variant="body2" color="textSecondary" align="center">
              No expenses recorded.
            </Typography>
          ) : (
            Object.entries(
             expenses.reduce((acc, expense) => {
                const date = new Date(expense.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                if (!acc[date]) acc[date] = [];
                acc[date].push(expense);
                return acc;
              }, {})
            ).map(([date, expenseGroup]) => (
              <Box key={date} mb={4}>
                <Typography variant="h6" color={colors.grey[300]} gutterBottom>
                  {date}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {expenseGroup.map((expense) => {
                  const iconId = categoryIconMap[expense.categoryId];
                  const IconComponent = expenseIcons[iconId] || null;

                  return (
                    <Box
                      key={expense.expenseId}
                      mb={2}
                      p={2}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="8px"
                      boxShadow={1}
                      bgcolor="#f64747"
                      sx={{
                        transition: '0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          boxShadow: 3,
                          backgroundColor: colors.grey[800],
                        },
                      }}
                    >
                       <Tooltip 
                        title={
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            color: '#fff', 
                          }}
                        >
                          {iconId.charAt(0).toUpperCase() + iconId.slice(1)}
                        </Typography>
                      }>
                      <Avatar
                        sx={{
                          backgroundColor: colors.redAccent[500],
                          marginRight: '16px',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {IconComponent && <IconComponent sx={{ color: 'white', fontSize: 24 }} />}
                      </Avatar>
                      </Tooltip>

                      <ListItem>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ display: 'flex', alignItems: 'center' }}
                          color="textPrimary"
                        >
                          {expense.amount.toFixed(2)}
                        </Typography>
                      </ListItem>

                      <IconButton
                        color="error"
                        size="large"
                        onClick={() => handleDelete(expense.expenseId)}
                        sx={{ marginLeft: 'auto',
                              fonsize: 24,
                              color:'white' }}
                      >
                        <CloseIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ExpenseItems;
