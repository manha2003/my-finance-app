import React from 'react';
import {  Box, useTheme,  Typography, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import { tokens } from "../theme";
import expenseIcons from '../icons/expenseIcons';  

const expenses = [
  { name: 'Bills', iconId: 'receipt' },
  { name: 'Car Maintenance', iconId: 'car' },
  { name: 'Credit Card Payment', iconId: 'creditCard' },
  { name: 'Drinks', iconId: 'localDrink' },
  { name: 'Electricity', iconId: 'electricBolt' },
  { name: 'Entertainment', iconId: 'theater' },
  { name: 'Fitness', iconId: 'fitness' },
  { name: 'Food', iconId: 'fastfood' },
  { name: 'Groceries', iconId: 'grocery' },
  { name: 'Health', iconId: 'hospital' },
  { name: 'Home', iconId: 'home' },
  { name: 'Internet', iconId: 'wifi' },
  { name: 'Music', iconId: 'musicNote' },
  { name: 'Pets', iconId: 'pet' },
  { name: 'Phone', iconId: 'phone' },
  { name: 'Repair', iconId: 'build' },
  { name: 'Shopping', iconId: 'shoppingCart' },
  { name: 'Sports', iconId: 'soccer' },
  { name: 'Travel', iconId: 'flight' },
  { name: 'Tuition', iconId: 'school' },
  { name: 'Wine & Bar', iconId: 'localBar' }
];

const sortedExpenses = expenses.sort((a, b) => a.name.localeCompare(b.name));

const ExpenseList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        maxWidth: '80%',
        backgroundColor: colors.redAccent[900],
        borderRadius: "16px",
        gap: 1,
        
      }}
    >
      {sortedExpenses.map((expense, index) => {
        const IconComponent = expenseIcons[expense.iconId];

        return (
          
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '25%',   
              margin: 2
            }}
          >
            <Avatar 
            sx={{
              backgroundColor: colors.redAccent[500], 
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
                <IconComponent sx={{ color: colors.white, margin: '2px', transform: 'scale(1.3)'}} />
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
                   {expense.name}
                </Typography>
              } 
              
            />
          </Box>
        );
      })}
    </Box>

    
  );
};

export {ExpenseList, expenses};