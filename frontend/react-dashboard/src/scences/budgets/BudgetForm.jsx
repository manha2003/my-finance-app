import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const BudgetForm = ({ onSubmit, wallets, id }) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      totalAmount: '',
      walletId: null, 
      startDate: null,
      endDate: null,
    },
  });

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: dayjs(data.startDate).format('DD/MM/YYYY'),
      endDate: dayjs(data.endDate).format('DD/MM/YYYY'),
    };

    onSubmit(formattedData);
    reset(); 
  };

  const startDate = watch('startDate');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box  display="flex" flexDirection="column" gap={2} sx={{ width: '450px', margin: '0 auto' }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="totalAmount"
          control={control}
          rules={{
            required: 'Total Amount is required',
            validate: (value) => value > 0 || 'Amount must be greater than 0',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Total Amount"
              type="number"
              fullWidth
              error={!!errors.totalAmount}
              helperText={errors.totalAmount?.message}
            />
          )}
        />

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: 'Start Date is required',
              validate: (value) => value !== null || 'Start Date cannot be null',
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start Date"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{
              required: 'End Date is required',
              validate: {
                notNull: (value) => value !== null || 'End Date cannot be null',
                afterStartDate: (value) =>
                  value && startDate && dayjs(value).isAfter(dayjs(startDate)) ||
                  'End Date must be after Start Date',
              },
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="End Date"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                  />
                )}
              />
            )}
          />
        </Box>

        <Controller
          name="walletId"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Wallet"
              select
              fullWidth
              error={!!errors.walletId}
              helperText={errors.walletId?.message}
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {wallets.map((wallet) => (
                <MenuItem key={wallet.walletId} value={wallet.walletId}>
                  {wallet.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button
          variant="contained"
          fontWeight="bold"
          color="primary"
          onClick={handleSubmit(onFormSubmit)}
        >
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default BudgetForm;
