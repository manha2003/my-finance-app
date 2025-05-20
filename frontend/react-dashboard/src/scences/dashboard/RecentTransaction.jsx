import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import financialApi from "../../data/financialApi";

const RecentTransactions = ({id}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const fetchedTransactions = await financialApi.getRecentTransactionsByUserId(token);
          setTransactions(fetchedTransactions);
        }
      } catch (error) {
        console.error("Failed to fetch recent transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Box
      id={id} 
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      p="15px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.custom[100]}`}
      
        pb="10px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recent Transactions
        </Typography>
      </Box>
      {transactions.length === 0 ? (
        <Typography color={colors.grey[100]} align="center" p="20px">
          No recent transactions found.
        </Typography>
      ) : (
        transactions.map((transaction) => (
          <Box
            key={transaction.transactionId}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="10px"
            borderBottom={`4px solid ${colors.custom[100]}`}
            
          >
            <Box width="33%">
              <Typography
                color={colors.greenAccent[500]}
                variant="h6"
                fontWeight="600"
                noWrap
              >
                {transaction.categoryName}
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="body2"
                noWrap
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {transaction.description}
              </Typography>
            </Box>
            <Box
              width="20%"
              textAlign="center"
              color={colors.grey[100]}
              fontSize="0.9rem"
            >
              {transaction.date}
            </Box>
            <Box
              width="30%"
              backgroundColor={getBackgroundColor(transaction.type)}
              p="5px 10px"
              borderRadius="4px"
              textAlign="center"
              color={colors.grey[100]}
              fontWeight="bold"
            >
              ${transaction.amount.toFixed(2)}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default RecentTransactions;