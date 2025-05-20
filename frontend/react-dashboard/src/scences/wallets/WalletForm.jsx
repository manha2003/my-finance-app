import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const WalletForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const onFormSubmit = (data) => {
    onSubmit(data); 
    reset(); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ width: "450px", margin: "0 auto" }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Wallet name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Wallet Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="value"
        control={control}
        rules={{
          required: "Initial amount is required",
          validate: (value) =>
            parseFloat(value) > 0 || "Amount must be greater than zero",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Initial Amount"
            type="number"
            fullWidth
            error={!!errors.value}
            helperText={errors.value?.message}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onFormSubmit)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default WalletForm;