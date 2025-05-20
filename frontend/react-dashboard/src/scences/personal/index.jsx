import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, useTheme, Paper } from '@mui/material';
import { tokens } from '../../theme';
import {jwtDecode} from 'jwt-decode';
import Header from '../../components/Header';
import userApi from '../../data/userApi';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import walletApi from '../../data/walletApi';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInformation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [walletLoading, setWalletLoading] = useState(true);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const fetchedUserName = decoded.unique_name ; 
          setUserName(fetchedUserName);
          
     
          const userDetails = await userApi.getUserByUserName(token);
          console.log("User details:", userDetails);
          
          setUserData({
            firstName: userDetails.firstName || "",
            lastName: userDetails.lastName || "",
            email: userDetails.email || "",
            phone: userDetails.phoneNumber || "",
            address: userDetails.address || "",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Failed to fetch user details.");
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedWallets = await walletApi.getWalletsByUserId(token);
          setWallets(fetchedWallets);
        }
      } catch (error) {
        console.error('Error fetching wallets:', error);
        toast.error('Failed to fetch wallets. Please try again later.');
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWallets();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.unique_name); 
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Failed to decode token.');
      }
    }
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const payload = {
        userName, 
        firstName: userData.firstName || "", 
        lastName: userData.lastName || "",
        phoneNumber: userData.phone || "", 
        address: userData.address || "",
      };
     
      console.log("Payload ", payload);
      await userApi.updateUser(payload);
      toast.success('User updated successfully!');
    } catch (error) {
      
      toast.error(`${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(balance);
  };

  return (
    <Box m="20px">
      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />
      <Header title="Personal Information" subtitle="Manage your details and wallets" />

      <Box display="flex" gap={4} mt={4}>
      
        <Box
          flex={1}
          component={Paper}
          p={3}
          elevation={4}
          sx={{
            borderRadius: '12px',
            backgroundImage: `linear-gradient(to bottom right, ${colors.blueAccent[500]}, ${colors.greenAccent[500]})`,
          }}
        >
          <Typography variant="h4" mb={3} color="#ffffff" fontWeight="bold">
            Personal Information
          </Typography>
          {['firstName', 'lastName', 'email', 'phone', 'address'].map((field, index) => (
            <TextField
              key={field}
              label={field.replace(/^\w/, (c) => c.toUpperCase()).replace(/([A-Z])/g, ' $1')}
              name={field}
              value={userData[field]}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              disabled={field === 'email'}
              multiline={field === 'address'}
              rows={field === 'address' ? 2 : 1}
              sx={{
                backgroundColor: colors.custom[100],
                borderRadius: '8px',
                mb: index === 4 ? 0 : 2,
                '& .MuiInputLabel-root': { 
                  marginBottom: '10px', 
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
              
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleSaveChanges}
            sx={{
              mt: 3,
              width: '100%',
              padding: '10px 0',
              backgroundColor: colors.greenAccent[500],
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '8px',
              '&:hover': { backgroundColor: colors.blueAccent[800] },
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>

        <Box
          flex={1}
          component={Paper}
          p={3}
          elevation={4}
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            borderRadius: '12px',
            backgroundImage: `linear-gradient(to bottom right, ${colors.greenAccent[500]}, ${colors.blueAccent[500]})`,
          }}
        >
          <Typography variant="h4" mb={3} color="#ffffff" fontWeight="bold">
            Your Wallets
          </Typography>
          {walletLoading ? (
            <Typography color="#ffffff">Loading wallets...</Typography>
          ) : wallets.length === 0 ? (
            <Typography color="#ffffff">No wallets available.</Typography>
          ) : (
            wallets.map((wallet) => (
              <Box
                key={wallet.walletId}
                display="flex"
                alignItems="center"
                mb={2}
                p={2}
                sx={{
                  backgroundColor: colors.custom[100],
                  borderRadius: '12px',
                  gap: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <AccountBalanceWalletOutlined
                  aria-label="Wallet Icon"
                  sx={{
                    color: colors.blueAccent[700],
                    fontSize: '36px',
                    mr: 2,
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="600" color={colors.blueAccent[700]} sx={{ mb: 0.5 }}>
                    {wallet.name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[500]} fontSize="0.875rem">
                    Balance: {formatBalance(wallet.value)}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
