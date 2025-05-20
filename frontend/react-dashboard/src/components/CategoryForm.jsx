import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import expenseIcons from '../icons/expenseIcons';
import incomeIcons from '../icons/incomeIcons'; 
import assetIcons from '../icons/assetIcons'; 
import liabilityIcons from '../icons/liabilityIcons'; 

const CategoryForm = ({ selectedType, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

 
  const iconsMap = {
    Expense: expenseIcons,
    Income: incomeIcons,
    Asset: assetIcons,
    Liability: liabilityIcons,
  };

  const iconOptions = iconsMap[selectedType] || {};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit({ categoryName, selectedIcon });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        fullWidth
        name="categoryName"
        label={`Enter Category Name`}
        variant="outlined"
        required
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Icon</InputLabel>
        <Select
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
          label="Select Icon"
          required
        >
          {Object.entries(iconOptions).map(([key, IconComponent]) => (
            <MenuItem key={key} value={key}>
              <Box display="flex" alignItems="center">
                <IconComponent sx={{ mr: 1 }} />
                {key}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        type="submit"
        sx={{ backgroundColor: colors.blueAccent[500], color: '#fff' }}
      >
        Add {selectedType}
      </Button>
    </form>
  );
};

export default CategoryForm;