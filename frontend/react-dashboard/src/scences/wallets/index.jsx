import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, useTheme } from '@mui/material';
import {  TrendingUp, TrendingDown, AddCircleOutline  } from '@mui/icons-material';
import { driver } from 'driver.js';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { tokens } from '../../theme';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popup from '../../components/Popup';
import walletApi from '../../data/walletApi';
import WalletForm from './WalletForm';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import SummaryCard from './SummaryCard';
import PaginatedWallets from './PaginatedWallets';
import Header from '../../components/Header';

const WalletOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [balance, setBalance] =useState([]);
  const [wallets, setWallets] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: '#element1',
        popover: {
          title: 'Wallet Overview',
          description: 'This section provides a complete overview of your wallets. Manage your finances and track balances effortlessly.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element2',
        popover: {
          title: 'Add Wallet Button',
          description: 'Click this button to add a new wallet. Define its name and details to start tracking its balance.',
          side: "bottom",
          align: 'center'
        }
      },
      {
        element: '#element3',
        popover: {
          title: 'Summary Cards',
          description: 'This section shows a quick financial summary, including your total balance, assets, and liabilities at a glance.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#element4',
        popover: {
          title: 'Wallet List',
          description: 'Here, you can view a paginated list of your wallets. Edit or delete individual wallets as needed to keep your data up-to-date.',
          side: "left",
          align: 'start'
        }
      },
      {
        popover: {
          title: 'Congratulations!',
          description: 'You now understand the key features of the Wallet Overview. Start managing your wallets effectively and achieve your financial goals!',
        }
      }
    ]  
  });


  const handleAddWallet = async (walletData) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Wallet Data:" , walletData);
      const response = await walletApi.createWallet(walletData, token);

      toast.success(response.data);
      
      setOpenPopup(false); 
      await fetchWallets();
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast.error("Failed to create wallet.");
    }
  };

  
  

  const fetchWallets = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const fetchedWallets = await walletApi.getWalletsByUserId(token);
      setWallets(fetchedWallets);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      toast.error('Failed to fetch wallets.');
    } 
  }, []);

  const handleDeleteSuccess = async () => {
    await fetchWallets();
    toast.success(`Wallet deleted successfully!`);
  };


  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedWallets = await walletApi.getWalletsByUserId(token);
          setWallets(fetchedWallets);
          console.log("Fetched Wallets:", fetchedWallets);
        }
      } catch (error) {
        
        toast.error('Failed to fetch budgets.');
      }
    };

    fetchWallets();
  }, []);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedBalance = await walletApi.getWalletsBalanceByUserId(token);
          setBalance(fetchedBalance);
          console.log(fetchBalance);
        }
      } catch (error) {
        
        toast.error(error);
      }
    };

    fetchBalance();
  }, []);

 
  

  return (
    <Box id="element1" m="20px">
         <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="WALLET OVERVIEW" subtitle="Welcome to your wallet" />
        </Box>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
        <Box display="flex" justifyContent="flex-end" gap={1} mr="100px" mb="20px">
          <Button id="element2" variant="contained" sx={{ backgroundColor: colors.blueAccent[700], color: '#fff' }} onClick={() => setOpenPopup(true)}>
            <AddCircleOutline sx={{ mr: 1 }} /> Add Wallet
          </Button>
          <Box >
            <Button
              sx={{
                backgroundColor: colors.grey[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",

              }}
              onClick={() => driverObj.drive()}
            >
              <QuestionMarkIcon sx={{ mr: "10px" }} />
              Tour Guide
            </Button>
        </Box>
                
        </Box>

        <Box sx={{  backgroundColor: colors.grey[50], minHeight: '100vh' }}>

      
            <Box id="element3" display="flex" justifyContent="space-between" alignItems="center" mb={4} marginLeft={4}>
                <Box display="flex" gap={2}>
                <SummaryCard title="Total Balance" amount={balance.balance}
                icon={<AccountBalanceIcon  
                  sx={{ color: colors.greenAccent[500] 

                  }} />} />
                <SummaryCard title="Total Assets" amount= {balance.totalAssets} icon={<TrendingUp sx={{ color: colors.greenAccent[500] }} />} />
                <SummaryCard title="Total Liabilities" amount={balance.totalLiabilities} icon={<TrendingDown sx={{ color: colors.redAccent[500] }} />} />
                </Box>
            </Box>

            
            <PaginatedWallets id="element4" wallets={wallets} onDeleteSuccess={handleDeleteSuccess}/>

            
            
        </Box>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Add New Wallet"}>
          <WalletForm onSubmit={handleAddWallet} />
        </Popup>

    </Box>
  );
};



export default WalletOverview;