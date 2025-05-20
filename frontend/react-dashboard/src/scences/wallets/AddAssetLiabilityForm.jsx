import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import SelectIcon from '../../components/SelectIcons';
import assetIcons from '../../icons/assetIcons';
import liabilityIcons from '../../icons/liabilityIcons';
import { toast } from 'react-toastify';

const AddAssetLiabilityForm = ({ onSubmit = async () => {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    type: '',
    iconId: '',
    description: '',
    amount: '',
  });

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
     
      setFormData({ type: '', iconId: '', description: '', amount: '' });
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error('An error occurred while adding Asset/Liability.');
    }
  };

  const icons = formData.type === 'asset' ? assetIcons : liabilityIcons;

  return (
    <Box  p="16px" sx={{  borderRadius: '8px' }}>
      

      {/* Type Selection */}
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
            <MenuItem value="asset">Asset</MenuItem>
            <MenuItem value="liability">Liability</MenuItem>
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
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '8px 10px',
        }}
        onClick={handleFormSubmit}
      >
        Add {formData.type === 'asset' ? 'Asset' : 'Liability'}
      </Button>
    </Box>
  );
};

export default AddAssetLiabilityForm;
