import React, { useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const BudgetEditForm = ({ onSubmit, budget }) => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: budget?.name || '',
      totalAmount: budget?.totalAmount || '',
      startDate: budget?.startDate ? dayjs(budget.startDate, "DD/MM/YYYY") : null,
      closureDate: budget?.closureDate ? dayjs(budget.closureDate, "DD/MM/YYYY") : null,
    },
  });

  useEffect(() => {
    if (budget) {
      setValue('name', budget.name);
      setValue('totalAmount', budget.totalAmount);
      setValue('startDate', budget.startDate ? dayjs(budget.startDate, "DD/MM/YYYY") : null);
      setValue('closureDate', budget.closureDate ? dayjs(budget.closureDate, "DD/MM/YYYY") : null);
    }
  }, [budget, setValue]);

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: dayjs(data.startDate).format('DD/MM/YYYY'),
      closureDate: dayjs(data.closureDate).format('DD/MM/YYYY'),
    };

    onSubmit(formattedData); 
  };

  const startDate = watch('startDate');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: '450px', margin: '0 auto' }}>
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
            name="closureDate"
            control={control}
            rules={{
              required: 'Closure Date is required',
              validate: {
                notNull: (value) => value !== null || 'Closure Date cannot be null',
                afterStartDate: (value) =>
                  value && startDate && dayjs(value).isAfter(dayjs(startDate)) || 'Closure Date must be after Start Date',
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
                    error={!!errors.closureDate}
                    helperText={errors.closureDate?.message}
                  />
                )}
              />
            )}
          />
        </Box>

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

export default BudgetEditForm;