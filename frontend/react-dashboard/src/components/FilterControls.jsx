import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FilterControls = ({
  filterText,
  setFilterText,
  selectedWallet,
  setSelectedWallet,
  startDate,
  setStartDate,
  closureDate,
  setClosureDate,
  status,
  setStatus,
  wallets,
}) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" sx={{ marginBottom: 2 }}>
      <TextField
        label="Filter by name"
        variant="outlined"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ flex: 1 }}
      />

      <TextField
        label="Status"
        variant="outlined"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ flex: 1 }}
      >
        <MenuItem value=""><em>All</em></MenuItem>
        <MenuItem value="Exceeded">Exceeded</MenuItem>
        <MenuItem value="Future">Future</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>

      <TextField
        label="Wallet"
        variant="outlined"
        select
        value={selectedWallet}
        onChange={(e) => setSelectedWallet(e.target.value)}
        sx={{ flex: 1 }}
      >
        <MenuItem value=""><em>All</em></MenuItem>
        {wallets.map((wallet) => (
          <MenuItem key={wallet.id} value={wallet.id}>
            {wallet.label}
          </MenuItem>
        ))}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          sx={{ flex: 1 }}
        />
        <DatePicker
          label="End Date"
          value={closureDate}
          onChange={(date) => setClosureDate(date)}
          sx={{ flex: 1 }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default FilterControls;