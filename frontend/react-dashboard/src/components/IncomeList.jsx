import React from 'react';
import { Box, useTheme, ListItemIcon, ListItemText, Typography , Avatar} from "@mui/material";
import { tokens } from "../theme";
import incomeIcons from '../icons/incomeIcons';  // Import the income icons

const incomes = [
  { name: 'Salary', iconId: 'salary' },
  { name: 'Freelance Work', iconId: 'freelance' },
  { name: 'Investments', iconId: 'investment' },
  { name: 'Gift', iconId: 'gift' },
  { name: 'Bonus', iconId: 'bonus' },
  { name: 'Rental Income', iconId: 'rental' },
  { name: 'Savings Interest', iconId: 'savings' },
  { name: 'Dividend', iconId: 'dividend' },
  { name: 'Commission', iconId: 'commission' },
  { name: 'Side Business', iconId: 'business' },
  
];

const sortedIncomes = incomes.sort((a, b) => a.name.localeCompare(b.name));

const IncomeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        maxWidth: '80%',
        backgroundColor: colors.greenAccent[900],
        borderRadius: "16px",
        gap: 2, 
      }}
    >
      {sortedIncomes.map((income, index) => {
        const IconComponent = incomeIcons[income.iconId];

        return (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '26%',
              margin: 2,   
              
            }}
          >
            <Avatar 
              sx={{
                backgroundColor: colors.greenAccent[500], 
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
                <IconComponent sx={{ color: colors.white, margin: '2px' , transform: 'scale(1.3)'}} /> 
              </ListItemIcon>
            </Avatar>
            <ListItemText 
              primary={
                <Typography 
                sx={{ 
                  fontWeight: 'bold', 
                  color: colors.grey[100], 
                  margin: '8px',
                  fontSize: '0.9rem' 
                  }}
                  >
                  {income.name}
                </Typography>
              } 
            />
          </Box>
        );
      })}
    </Box>
  );
};

export  {IncomeList, incomes};