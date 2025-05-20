import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BudgetUsageBarChart from "./BudgetUsageBar";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Header from "../../components/Header";
import LineChart from "./LineChart";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useState, useEffect } from "react";
import RecentTransactions from "./RecentTransaction";
import budgetApi from "../../data/budgetApi";
import { GrMoney } from "react-icons/gr";
import StatBox from "../../components/StatBox";
import financialApi from "../../data/financialApi";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [budgets, setBudgets] = useState([]);
  const [budgetsUsage, setbudgestUsage] = useState([])

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: '#element1',
        popover: {
          title: 'Dashboard Section',
          description: 'This section displays the most recent budgets, providing details on usage and remaining balance. Hover over the icons to see more information.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element2',
        popover: {
          title: 'Recent Budget Card',
          description: 'Each card represents a budget with the remaining balance, usage percentage, and an icon indicating its status.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#element3',
        popover: {
          title: 'Financial Summary',
          description: 'Here, you can see your total expenses and total income in a visually clear format. Use this data to track your financial progress.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#element4',
        popover: {
          title: 'Recent Transactions',
          description: 'This section lists your most recent transactions. It categorizes each transaction by type and provides a clear breakdown of amounts.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element5',
        popover: {
          title: 'Budget Usage Bar Chart',
          description: 'The bar chart provides a comparison between total budgeted amounts and the money spent across multiple budgets.',
          side: "top",
          align: 'start'
        }
      },
      {
        popover: {
          title: 'Congratualtion!',
          description: 'You are now familiar with the dashboard features. Start managing your finances effectively and stay on top of your budget.'
        }
      }
    ]  
  });
  


  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await budgetApi.getBudgetsAvaiableByUserId(token);
        setBudgets(response.slice(-4)); 
        setbudgestUsage(response.slice(-6));
      } catch (error) {
        console.error("Error fetching budgets:", error);
        toast.error("Failed to fetch budgets.");
      }
    };

    fetchBudgets();
  }, []);




  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const transactions = await financialApi.getAllIncomesExpensesByUserId(token);

        
        const totalExpenses = transactions
          .filter((transaction) => transaction.type === "Expense")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalIncomes = transactions
          .filter((transaction) => transaction.type === "Income")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        setTotalExpense(totalExpenses);
        setTotalIncome(totalIncomes);
      } catch (error) {
        console.error("Error fetching financial summary:", error);
        toast.error("Failed to fetch financial summary.");
      }
    };

    fetchFinancialSummary();
  }, []);


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
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
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

    
      <Box
        id="element1"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {budgets.map((budget) => {
        const usagePercentage = (budget.moneySpent / budget.totalAmount) * 100;
        const progress = budget.moneySpent / budget.totalAmount; 
        
        return (

          <Box
            id="element2"
            
            key={budget.budgetId}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`$${(budget.totalAmount - budget.moneySpent).toFixed(2)}`}
              subtitle={budget.name}
              progress={progress.toFixed(2)}
              increase={`${usagePercentage.toFixed(0)}% used`}
              icon={
                <GrMoney
                  style={{
                    color:
                      usagePercentage > 100
                        ? colors.redAccent[500]
                        : colors.greenAccent[600],
                    fontSize: "36px",
                  }}
                />
              }
            />
          </Box>
          );
        })}


        {/* ROW 2 */}
        <Box
        id="element3"
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        sx={{ height: '300px', padding: '20px' }}
      >
        <Box 
          
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
            Total Expense
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.redAccent[500]}
            >
               ${totalExpense}
            </Typography>
          </Box>

          <Box marginRight="30px">
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
            Total Income
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              ${totalIncome}
            </Typography>
          </Box>

         
        </Box>
    
        <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
      </Box>
      
        <RecentTransactions id="element4"/>

        {/* ROW 3 */}

      <Box
        gridColumn="span 12" 
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ padding: "30px 30px 0 30px" }}
        >
          Budget Usage
        </Typography>
        <Box id="element5" height="280px" mt="-20px"> 
          <BudgetUsageBarChart budgets={budgetsUsage} />
        </Box>
      </Box>

        
 
      </Box>
    </Box>
  );
};

export default Dashboard;
