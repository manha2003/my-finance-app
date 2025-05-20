import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone'; 

dayjs.extend(utc);
dayjs.extend(timezone);

const ReminderForm = ({ onSubmit , defaultValues}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
     
  });

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      reminderDateTime: dayjs(data.reminderDateTime).format(), 
    };

    onSubmit(formattedData);
    reset(defaultValues);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: '450px', margin: '0 auto' }}>
  
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

       
        <Controller
          name="message"
          control={control}
          rules={{
            required: 'Message is required', 
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              fullWidth
              multiline
              rows={3}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />

       
        <Controller
          name="reminderDateTime"
          control={control}
          rules={{
            required: 'Reminder date & time is required',
          }}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="Reminder Date & Time"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.reminderDateTime}
                  helperText={errors.reminderDateTime?.message}
                />
              )}
            />
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

export default ReminderForm;
