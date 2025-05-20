import React, { useEffect, useState, useCallback } from 'react';
import { tokens } from "../../theme";
import { driver } from 'driver.js';
import { Button, Box, useTheme, MenuItem, FormControl, Select, Typography } from '@mui/material';
import Header from "../../components/Header";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import Popup from "../../components/Popup";
import BudgetForm from './BudgetForm';
import BudgetChart from './BudgetChart';
import walletApi from '../../data/walletApi';
import budgetApi from '../../data/budgetApi';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import BudgetItems from './BudgetItems';
import 'react-toastify/dist/ReactToastify.css';

const Budgets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [wallets, setWallets] = useState([]);

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: '#element1',
        popover: {
          title: 'Budget Overview',
          description: 'This is your budget overview section. It provides access to manage and analyze your budgets effectively, ensuring you are always on top of your financial plans.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element2',
        popover: {
          title: 'Add Budget Button',
          description: 'Click here to add a new budget. You can define its name, allocate funds, and associate it with a wallet for easy tracking.',
          side: "bottom",
          align: 'center'
        }
      },
      {
        element: '#element3',
        popover: {
          title: 'Budget Selector',
          description: 'Use this dropdown menu to select a specific budget. Once selected, detailed insights and a progress chart will be displayed below.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#element4',
        popover: {
          title: 'Budget Progress Chart',
          description: 'This chart visualizes your budget usage, showing the total amount, money spent, and days left to manage your finances effectively.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element5',
        popover: {
          title: 'Budget Items List',
          description: 'Here you can view, edit, or delete individual budget items, such as expenses or income entries, to keep your budget up-to-date.',
          side: "top",
          align: 'center'
        }
      },
      {
        popover: {
          title: 'Tour Completed!',
          description: 'You have now explored all the key features of the budget management interface. Start managing your budgets with ease!',
        }
      }
    ]
  });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const fetchedBudgets = await budgetApi.getBudgetsAvaiableByUserId(token);
          setBudgets(fetchedBudgets);
        }
      } catch (error) {
        
        toast.error('Failed to fetch budgets.');
      }
    };

    fetchBudgets();
  }, []);

 
  const refreshData = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User is not authenticated');

    
      const fetchedBudgets = await budgetApi.getBudgetsAvaiableByUserId(token);
      setBudgets(fetchedBudgets);
      if (selectedBudgetId) {
        const fetchedBudget = await budgetApi.getBudgetById(selectedBudgetId, token);
        setSelectedBudget(fetchedBudget);
      } else {
        setSelectedBudget(null);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data.');
    }
  }, [selectedBudgetId]);

  useEffect(() => {
    refreshData(); 
  }, [refreshData]);


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
        
        toast.error('Failed to fetch wallets.');
      }
    };

    fetchWallets();
  }, []);


  const handleAddBudget = async (budgetData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("User is not authenticated");
      }
    const response = await budgetApi.createBudget(budgetData, token);
    const message = response.data;
    const newBudget = response.data; 
      setBudgets([...budgets, newBudget]);
      setOpenPopup(false);

      toast.success(message);
      console.log("Budget Add:" ,budgetData);
    } catch (error) {
        toast.error(error.response.data);
      
    }
  };

  const handleDeleteSuccess = async () => {
    try {
      await refreshData();
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error('Error after delete:', error);
      toast.error('Failed to refresh data after delete.');
    }
  };


  const handleBudgetChange = async (event) => {
    const budgetId = event.target.value;
    setSelectedBudgetId(budgetId);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const fetchedBudget = await budgetApi.getBudgetById(budgetId, token);
      setSelectedBudget(fetchedBudget);
      console.log(fetchedBudget);
    } catch (error) {
   
      toast.error('Failed to fetch selected budget.');
    }
  };

  return (
    <Box id="element1" m="20px">
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="BUDGET OVERVIEW" subtitle="Welcome to your budget overview"/>

      </Box>

      

      <Box  display="flex" justifyContent="flex-end" mr="20px" >

        <Button
          id="element2"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 12px",
          }}
          onClick={() => setOpenPopup(true)}
        >
          Add Budget
        </Button>
        <Box ml={2}>
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

      <Popup  openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Add New Budget"}>
        <BudgetForm  onSubmit={handleAddBudget} wallets={wallets} />
      </Popup>
      <Box>
      <Box  m="20px 0px">
        <Box
          sx={{
            margin: '2px auto 0 auto',
            backgroundColor: colors.custom[100],
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Select
              id="element3"
              value={selectedBudgetId}
              onChange={handleBudgetChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Budget' }}
              sx={{
                backgroundColor: colors.custom[100],
                fontFamily: theme.typography.fontFamily,
                fontSize: '16px',
                fontWeight: '400',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, 
                    width: 250,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select Budget</em>
              </MenuItem>
              {budgets.map((budget) => (
                <MenuItem key={budget.budgetId} value={budget.budgetId}>
                  {budget.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedBudget ? (
            <BudgetChart id="element4" totalBudget={selectedBudget.totalAmount} moneySpent={selectedBudget.moneySpent} daysLeft={selectedBudget.daysLeft} width={1000} height={200} />
          ) : (
            <Typography variant="h6" align="center"
            sx={{ marginBottom: '32px' }}>
              Select a budget to view details.
            </Typography>
          )}
        </Box>
      </Box>
      </Box>
      
      <BudgetItems id="element5" selectedBudget={selectedBudget}  onDeleteSuccess={handleDeleteSuccess}/>
    </Box>
  );
};

export default Budgets;