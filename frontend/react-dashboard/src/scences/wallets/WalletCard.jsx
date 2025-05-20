import React , {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Box , Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import walletApi from '../../data/walletApi';
import financialApi from '../../data/financialApi';

const WalletCard = ({ wallet , onDeleteSuccess}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [transaction, setTransaction] = useState([]);



  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await walletApi.deleteWallet(wallet.walletId, token); 
      onDeleteSuccess(wallet.walletId); 
    } catch (error) {
   
      console.error('Error deleting wallet', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedTransaction = await financialApi.getMostRecentTransactionByWalletId(token, wallet.walletId);
          setTransaction(fetchedTransaction);
          console.log(fetchTransaction);
        }
      } catch (error) {
        
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransaction();
  }, [wallet.walletId]);

  return (
    <>
    <Card
      sx={{

        backgroundImage: `linear-gradient(to bottom right, ${colors.grey[800]}, ${colors.blueAccent[700]})`,
        borderRadius: '12px',
        boxShadow: 2,
        p: 2,
        '&:hover': {
          transform: 'scale(1.06)',
          transition: 'transform 0.4s ease',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <AccountBalanceWalletOutlined sx={{ color: colors.blueAccent[400], fontSize: '32px' }} />
          <Typography variant="h5" fontWeight="bold" color={colors.blueAccent[300]}>
            {wallet.name}
          </Typography>
        </Box>
        <Typography variant="h5" color={colors.grey[200]} mt={1}>
          Balance: ${wallet.value}
        </Typography>
        <Typography variant="body1" color={colors.grey[400]} mt={2}>
          Recent Transactions:
        </Typography>
          {transaction && transaction.amount ? (
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2">{transaction.date}</Typography>
            <Typography  variant="body1">${transaction.amount}</Typography>
          </Box>
        ) : (
          <Typography variant="body2" color={colors.grey[500]} mt={1}>
            No recent transaction available.
          </Typography>
        )}
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end', 
            alignItems: 'flex-end',    
            marginTop:'12px'
          }}
        >
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
            Do you want to delete this wallet? 
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

export default WalletCard;