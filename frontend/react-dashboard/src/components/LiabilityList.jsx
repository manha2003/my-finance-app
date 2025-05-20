import React from 'react';
import {  Box, useTheme,  Typography, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import { tokens } from "../theme";
import liabilityIcons from '../icons/liabilityIcons';

const liabilities = [
    { name: 'Mortgage', iconId: 'mortgage' },
    { name: 'Car Loan', iconId: 'carLoan' },
    { name: 'Credit Card Debt', iconId: 'creditCardDebt' },
    { name: 'Student Loan', iconId: 'studentLoan' },
    { name: 'Medical Bills', iconId: 'medicalBills' },
    { name: 'Personal Loan', iconId: 'personalLoan' },
    
    
  ];


  const sortedLiabilities = liabilities.sort((a, b) => a.name.localeCompare(b.name));

  const LiabilityList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          maxWidth: '80%',
          backgroundColor: colors.orangeAccent[900],
          borderRadius: "16px",
          gap: 1,
          
        }}
      >
        {sortedLiabilities.map((liability, index) => {
          const IconComponent = liabilityIcons[liability.iconId];
  
          return (
            
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '26%',   
                margin: 2
              }}
            >
              <Avatar 
              sx={{
                backgroundColor: colors.orangeAccent[500], 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,  
                height: 60, 
              }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 'auto',
                    display: 'flex',  
                    
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                    >
                 
                
                    <IconComponent sx={{ color: colors.white, margin: '2px', transform: 'scale(1.3)' }} />

              
                </ListItemIcon>
              </Avatar>
              <ListItemText 
                primary={
                  <Typography 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: colors.grey[100] , 
                    margin : '8px',
                    fontSize: '0.9rem'
                    }}
                    >
                     {liability.name}
                  </Typography>
                } 
                
              />
            </Box>
          );
        })}
      </Box>
  
      
    );
  };

  export {LiabilityList, liabilities};