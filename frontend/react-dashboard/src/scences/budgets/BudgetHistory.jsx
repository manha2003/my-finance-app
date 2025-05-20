import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Pagination, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import FilterControls from '../../components/FilterControls';
import BudgetCard from './BudgetCard';
import Popup from '../../components/Popup';
import Header from '../../components/Header';
import budgetApi from '../../data/budgetApi';
import walletApi from '../../data/walletApi';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import BudgetEditForm from './BudgetEditForm';

const BudgetHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [budgets, setBudgets] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletLoading, setWalletLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [closureDate, setClosureDate] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [editBudget, setEditBudget] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [status, setStatus] = useState('');
  const itemsPerPage = 5;

  const fetchBudgets = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const fetchedBudgets = await budgetApi.getBudgetsByUserId(token);
      console.log("fetched" ,fetchedBudgets);
      setBudgets(fetchedBudgets.reverse());
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast.error('Failed to fetch budgets.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setShowSkeleton(true);
    const timeoutId = setTimeout(() => {
      fetchBudgets();
      setShowSkeleton(false);
    }, 1100);

    return () => clearTimeout(timeoutId);
  }, [fetchBudgets]);

  const handleDeleteSuccess = async () => {
    await fetchBudgets();
    toast.success(`Budget deleted successfully!`);
  };

  const handleEditClick = (budget) => {
    setEditBudget(budget); 
    setOpenPopup(true); 
  };


  const handleEditSubmit = async (updatedBudget) => {
    try {
      const token = localStorage.getItem('authToken');
      await budgetApi.updateBudget(editBudget.budgetId, updatedBudget, token);
    
      toast.success('Budget updated successfully!');
      setOpenPopup(false); 
      await fetchBudgets(); 
    } catch (error) {
      console.error('Error updating budget:', error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }
        const fetchedWallets = await walletApi.getWalletsByUserId(token);
 
        setWallets(fetchedWallets.map((wallet) => ({ id: wallet.name, label: wallet.name })));
      } catch (error) {
        console.error('Error fetching wallets:', error);
        toast.error('Failed to fetch wallets.');
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const filteredBudgets = budgets.filter((budget) => {
    const matchesText = budget.name.toLowerCase().includes(filterText.toLowerCase());
    const budgetClosureDate = dayjs(budget.closureDate, "DD-MM-YYYY");
    const budgetStartDate = dayjs(budget.startDate, "DD-MM-YYYY");
    const selectedStartDate = dayjs(startDate);
    const selectedClosureDate = dayjs(closureDate);   

    const matchesStartDate = startDate
    ? budgetStartDate.isAfter(selectedStartDate, 'day')
    : true;

    const matchesEndDate = closureDate
      ? budgetClosureDate.isBefore(selectedClosureDate.add(1, 'day'), 'day')
      : true;
    const matchesWallet = selectedWallet
    ? budget.walletName && budget.walletName.toLowerCase() === selectedWallet.toLowerCase()
    : true;
    const matchesStatus = status ? budget.status === status : true;

    return matchesText && matchesStartDate && matchesEndDate && matchesWallet && matchesStatus;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBudgets = filteredBudgets.slice(startIndex, startIndex + itemsPerPage).reverse();

  return (
    <Box m="20px">
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
        <Header title="BUDGET HISTORY" subtitle="Welcome to your budget history" />
      </Box>

      <FilterControls
        filterText={filterText}
        setFilterText={setFilterText}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        startDate={startDate}
        setStartDate={setStartDate}
        closureDate={closureDate}
        setClosureDate={setClosureDate}
        status={status}
        setStatus={setStatus}
        wallets={wallets}
        walletLoading={walletLoading}
      />
      
      {loading || showSkeleton ? (
        <Box
          sx={{
            maxHeight: '550px',
            overflowY: 'auto',
            padding: '8px',
            borderRadius: '12px',
            backgroundColor: colors.primary[400],
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {Array.from(new Array(5)).map((_, index) => (
            <Box key={index} sx={{ display: 'flex', gap: '16px', marginTop:'16px' }}>
              <Skeleton variant="rectangular" width={1100} height={200} sx={{ marginBottom: '8px', borderRadius: '12px' }} />
            </Box>
          ))}
        </Box>
      ) : filteredBudgets.length === 0 ? (
        <Box
          sx={{
            maxHeight: '550px',
            overflowY: 'auto',
            padding: '8px',
            borderRadius: '12px',
            backgroundColor: colors.primary[400],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography sx={{ fontSize: '1rem' }}>No budgets found.</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              maxHeight: '550px',
              overflowY: 'auto',
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: colors.primary[400],
            }}
          >
            {paginatedBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                colors={colors}
                sx={{ margin: '24px' }}
                onEditClick={() => handleEditClick(budget)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Pagination
            count={Math.ceil(filteredBudgets.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)} 
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1rem',
                padding: '10px',
              },
            }}
          />
          </Box>
        </>
      )}


      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Edit Budget">
        {editBudget && (
          <BudgetEditForm
            onSubmit={handleEditSubmit}
            budget={editBudget}
          />
        )}
      </Popup>
    </Box>
  );
};

export default BudgetHistory;
