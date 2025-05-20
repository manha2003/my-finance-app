import React, { useEffect, useState } from "react";
import { useTheme, Typography, Box, Divider } from "@mui/material";
import { tokens } from "../../theme";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const BudgetCharts = ({ id,totalBudget, moneySpent, daysLeft, width, height }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [percentageSpent, setPercentageSpent] = useState(0); 
  const [displayedBudget, setDisplayedBudget] = useState(0);
  const [displayedSpent, setDisplayedSpent] = useState(0);
  const [displayedRemaining, setDisplayedRemaining] = useState(0);
  const [displayedDaysLeft, setDisplayedDaysLeft] = useState(0);

  useEffect(() => {
    const targetPercentage = (moneySpent / totalBudget) * 100;
    const remainingMoney = totalBudget - moneySpent;

       const percentageInterval = setInterval(() => {
      setPercentageSpent((prev) => {
        if (prev >= targetPercentage) {
          clearInterval(percentageInterval);
          return targetPercentage;
        }
        return Math.min(prev + 1, targetPercentage);
      });
    }, 30);

    
    const budgetInterval = setInterval(() => {
      setDisplayedBudget((prev) => {
        if (prev >= totalBudget) {
          clearInterval(budgetInterval);
          return totalBudget;
        }
        return Math.min(prev + Math.ceil(totalBudget / 50), totalBudget);
      });
    }, 30);

    const spentInterval = setInterval(() => {
      setDisplayedSpent((prev) => {
        if (prev >= moneySpent) {
          clearInterval(spentInterval);
          return moneySpent;
        }
        return Math.min(prev + Math.ceil(moneySpent / 50), moneySpent);
      });
    }, 30);

    const remainingInterval = setInterval(() => {
      setDisplayedRemaining((prev) => {
        if (prev >= remainingMoney) {
          clearInterval(remainingInterval);
          return remainingMoney;
        }
        return Math.min(prev + Math.ceil(remainingMoney / 50), remainingMoney);
      });
    }, 30);

    const daysInterval = setInterval(() => {
      setDisplayedDaysLeft((prev) => {
        if (prev >= daysLeft) {
          clearInterval(daysInterval);
          return daysLeft;
        }
        return Math.min(prev + 1, daysLeft);
      });
    }, 30);

    
    return () => {
      clearInterval(percentageInterval);
      clearInterval(budgetInterval);
      clearInterval(spentInterval);
      clearInterval(remainingInterval);
      clearInterval(daysInterval);
    };
  }, [moneySpent, totalBudget, daysLeft]); 

  return (
    <Box id={id} position="relative" display="inline-block" textAlign="center">
      <Stack
        sx={{
          height: "auto",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "30px",
        }}
      >
        <Gauge
          width={width}
          height={height}
          value={percentageSpent} 
          startAngle={-90}
          endAngle={90}
          innerRadius={150}
          outerRadius={180}
          sx={{
           
            [`& .${gaugeClasses.valueArc}`]: {
              fill: percentageSpent >= 100 ? 'red' : '#52b202',
            },
          }}
          text={() => ``} 
        />

        <Box position="absolute" top="50%" left="44%" transform="translate(-50%, -50%)">
          <Typography
            variant="h3"
            fontSize="40px"
            component="div"
            color={percentageSpent >= 100 ? 'red' : '#52b202'} 
          >
            {displayedRemaining.toFixed(2)}
          </Typography>
        </Box>

        <Box position="absolute" top="40%" left="42%" transform="translate(-50%, -50%)">
          <Typography variant="h4" component="div" color={colors.grey[400]}>
            Money allowed to spend
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: "4px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body1" fontSize="16px" color={colors.grey[100]}>
              {displayedBudget >= 1000 ? (displayedBudget / 1000).toFixed(1) + 'K' : displayedBudget.toFixed(2)}
            </Typography>
            <Typography variant="body1" color={colors.grey[400]}>Total Budget</Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ backgroundColor: "grey" }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body1" fontSize="16px" color={colors.grey[100]}>
              {displayedSpent >= 1000 ? (displayedSpent / 1000).toFixed(1) + 'K' : displayedSpent.toFixed(2)}
            </Typography>
            <Typography variant="body1" color={colors.grey[400]}>Money Spent</Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ backgroundColor: "grey" }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body1" fontSize="16px" color={colors.grey[100]}>
              {displayedDaysLeft}
            </Typography>
            <Typography variant="body1" color={colors.grey[400]}>Days Left</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default BudgetCharts;