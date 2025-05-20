import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import budgetApi from '../../data/budgetApi';

const BudgetCard = ({ budget, colors, onEditClick, onDeleteSuccess, sx }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  
  const handleEdit = () => {
    onEditClick(budget); 
  };

  
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await budgetApi.deleteBudget(budget.budgetId, token); 
      onDeleteSuccess(budget.budgetId); 
    } catch (error) {
   
      console.error('Error deleting budget:', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const getStatusColor = (status) => {
    if (status === "Exceeded") {
      return colors.redAccent[500];
    } else if (status === "Completed") {
      return colors.grey[500];
    } else if (status === "Active") {
      return colors.greenAccent[500];
    }else if (status === "Future"){
      return colors.orangeAccent[500];
    }
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          marginBottom: '10px',
          borderRadius: '12px',
          width: '95%',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
          },
          ...sx,
        }}
      >
        <Box
          sx={{
            width: '20px',
            backgroundColor: getStatusColor(budget.status),
            borderRadius: '12px 0 0 12px',
          }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {budget.name}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Total Amount: ${budget.totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Start Date: {budget.startDate}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Closure Date: {budget.closureDate}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Wallet: {budget.walletName || 'N/A'}
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: colors.greenAccent[500],
                '&:hover': { backgroundColor: colors.greenAccent[700] },
              }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                backgroundColor: colors.redAccent[500],
                '&:hover': { backgroundColor: colors.redAccent[700] },
              }}
              onClick={handleOpen}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
      
 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{ color: colors.redAccent[500], fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          Delete Budget
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="delete-dialog-description"
            sx={{ color: colors.grey[200] }}
          >
            Do you want to delete this budget? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              color: colors.grey[100],
              backgroundColor: colors.greenAccent[500],
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={loading}
            sx={{
              color: colors.grey[100],
              backgroundColor: colors.redAccent[500],
              '&:hover': {
                backgroundColor: colors.redAccent[700],
              },
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default BudgetCard;
