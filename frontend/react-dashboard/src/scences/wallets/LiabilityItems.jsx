import React from 'react';
import { Box, Typography, List, ListItem, Avatar, useTheme, IconButton, Tooltip } from '@mui/material';
import { tokens } from '../../theme';
import CloseIcon from '@mui/icons-material/Close';
import financialApi from '../../data/financialApi';
import liabilityIcons from '../../icons/liabilityIcons';

const categoryIconMap = {
  40: 'mortgage',
  41: 'carLoan',
  42: 'creditCardDebt',
  43: 'studentLoan',
  44: 'medicalBills',
  45: 'personalLoan',
};

const LiabilityItems = ({ liabilities, onDeleteSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async (liabilityId) => {
    console.log('Liability Id:', liabilityId);
    try {
      const token = localStorage.getItem('authToken');
      await financialApi.deleteLiability(liabilityId, token); 
      console.log(`Liability with ID ${liabilityId} deleted successfully.`);
      onDeleteSuccess(liabilityId);
    } catch (error) {
      console.error(`Failed to delete liability with ID ${liabilityId}:`, error);
    }
  };

  return (
    <Box mt={2} width="100%" bgcolor={colors.custom[100]} borderRadius="8px" p={3} boxShadow={3}>
      <Typography variant="h4" gutterBottom display="flex" alignItems="center" mb={2} color={colors.orangeAccent[500]}>
        Liabilities
      </Typography>

      <Box
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <List>
          {liabilities.length === 0 ? (
            <Typography variant="body2" color="textSecondary" align="center">
              No liabilities recorded.
            </Typography>
          ) : (
            liabilities.map((liability) => {
              const iconId = categoryIconMap[liability.categoryId];
              const IconComponent = liabilityIcons[iconId] || null;

              return (
                <Box
                  key={liability.liabilityId}
                  mb={2}
                  p={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius="8px"
                  boxShadow={1}
                  bgcolor={colors.orangeAccent[700]}
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
                      backgroundColor: colors.orangeAccent[500],
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
                      {liability.amount.toFixed(2)}
                    </Typography>
                  </ListItem>

                  <IconButton
                    color="error"
                    size="large"
                    onClick={() => handleDelete(liability.liabilityId)}
                    sx={{
                      marginLeft: 'auto',
                      fontSize: 24,
                      color: 'white',
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
                  </IconButton>
                </Box>
              );
            })
          )}
        </List>
      </Box>
    </Box>
  );
};

export default LiabilityItems;
