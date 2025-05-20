import React from 'react';
import { Box, Typography, List, ListItem, Divider, Avatar, useTheme,  IconButton, Tooltip } from '@mui/material';
import { tokens } from '../theme';
import CloseIcon from '@mui/icons-material/Close';
import financialApi from '../data/financialApi';
import incomeIcons from '../icons/incomeIcons'; // Replace with your actual income icon mapping

const categoryIconMap = {
  22: 'salary',
  23: 'freelance',
  24: 'investment',
  25: 'gift',
  26: 'bonus',
  27: 'rental',
  28: 'savings',
  29: 'dividend',
  30: 'commission',
  31: 'business',
  32: 'realEstate',
};

const IncomeItems = ({ incomes, onDeleteSuccess}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handleDelete = async (incomeId) => {
    console.log("Income Id:", incomeId)
    try {
      const token = localStorage.getItem('authToken');
      await financialApi.deleteIncome(incomeId, token);
      console.log(`Income with ID ${incomeId} deleted successfully.`);
      onDeleteSuccess(incomeId);
     
    } catch (error) {
      console.error(`Failed to delete income with ID ${incomeId}:`, error);
    }
  };

  return (
    <Box mt={2} width="100%" bgcolor={colors.custom[100]} borderRadius="8px" p={3} boxShadow={3}>
      <Typography variant="h5" gutterBottom display="flex" alignItems="center" mb={2} color="green">
        Incomes
      </Typography>

      <Box
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <List>
          {incomes.length === 0 ? (
            <Typography variant="body2" color="textSecondary" align="center">
              No incomes recorded.
            </Typography>
          ) : (
            Object.entries(
              incomes.reduce((acc, income) => {
                const date = new Date(income.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                if (!acc[date]) acc[date] = [];
                acc[date].push(income);
                return acc;
              }, {})
            ).map(([date, incomeGroup]) => (
              <Box key={date} mb={4}>
                <Typography variant="h6" color={colors.grey[300]} gutterBottom>
                  {date}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {incomeGroup.map((income) => {
                  const iconId = categoryIconMap[income.categoryId];
                  const IconComponent = incomeIcons[iconId] || null;

                  return (
                    <Box
                      key={income.incomeId}
                      mb={2}
                      p={2}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="8px"
                      boxShadow={1}
                      bgcolor="#4caf50"
                      sx={{
                        transition: '0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
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
                          backgroundColor: colors.greenAccent[500],
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
                          {income.amount.toFixed(2)}
                        </Typography>
                      </ListItem>
                      
                      <IconButton
                        color="error"
                        size="large"
                        onClick={() => handleDelete(income.incomeId)}
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

export default IncomeItems;
