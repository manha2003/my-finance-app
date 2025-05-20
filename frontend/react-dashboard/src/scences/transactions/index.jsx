import React, { useEffect, useState } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import financialApi from '../../data/financialApi'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getBackgroundColor = (type) => {
    let backgroundColor;
    switch (type) {
      case "Income":
        backgroundColor = colors.greenAccent[500];
        break;
      case "Expense":
        backgroundColor = colors.redAccent[500];
        break;
      case "Asset":
        backgroundColor = colors.blueAccent[500];
        break;
      case "Liability":
        backgroundColor = colors.orangeAccent[500];
        break;
      default:
        backgroundColor = "#F5F5F5"; 
    }
    return backgroundColor;
  };

  const columns = [
    { 
      field: "transactionId", 
      headerName: "Transaction ID", 
      flex: 0.5,
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: colors.grey[100],
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { 
      field: "categoryName", 
      headerName: "Category Name", 
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: colors.primary[200],
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "budgetName",
      headerName: "Budget Name",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "1rem",
            color: colors.grey[100],
            fontWeight: "600",
          }}
        >
          {params.value || ""} 
        </Typography>
      ),
    },
    {
      field: "walletName",
      headerName: "Wallet Name",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "1rem",
            color: colors.blueAccent[200],
            fontWeight: "600",
          }}
        >
          {params.value || ""} 
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "1rem",
            color: colors.greenAccent[500],
            fontWeight: "700",
          }}
        >
          {`$${params.value.toFixed(2)}`}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "1rem",
            color: colors.grey[200],
            fontWeight: "500",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
       
  
        return (
          <Box
            sx={{
              backgroundColor : getBackgroundColor(params.row.type),
              color: colors.grey[100],
              borderRadius: '12px',
              marginTop: '4px',
              padding: '4px 8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '80px', 
              maxWidth: '100px',
              height: '30px', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
             
              
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: colors.grey[100],
            fontWeight: "400",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }
        
        const fetchedTransactions = await financialApi.getTransactionsByUserId(token);
        console.log("fetched: ", fetchedTransactions);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  return (
    <Box m="20px">
      <ToastContainer />
      <Header
        title="TRANSACTIONS"
        subtitle="List of your transactions"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            fontSize:"0.8rem",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
           
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
         
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transactions}
          columns={columns}
          getRowId={(row) => row.transactionId}
          loading={loading}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
