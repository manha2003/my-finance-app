import React, { useState, useEffect} from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import financialApi from '../../data/financialApi';

import moment from "moment";


const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState([]);

  // Function to process API data
  const processChartData = (transactions) => {
    const monthlyData = {};

   
    for (let i = 1; i <= 12; i++) {
      const monthName = moment(i, "M").format("MMM");
      monthlyData[monthName] = { Income: 0, Expense: 0 };
    }

    
    transactions.forEach((transaction) => {
      const month = moment(transaction.date, "Do MMM YYYY").format("MMM");
      const type = transaction.type; 
      monthlyData[month][type] += transaction.amount;
    });

    
    const incomeData = {
      id: "Income",
      color: colors.greenAccent[500],
      data: Object.keys(monthlyData).map((month) => ({
        x: month,
        y: monthlyData[month].Income,
      })),
    };

    const expenseData = {
      id: "Expense",
      color: colors.redAccent[500],
      data: Object.keys(monthlyData).map((month) => ({
        x: month,
        y: monthlyData[month].Expense,
      })),
    };

    setChartData([incomeData, expenseData]);
    
  };


  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const transactions = await financialApi.getAllIncomesExpensesByUserId(token);
      processChartData(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
    fetchData();
  }, []);


  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} 
      margin={{ top: 60, right: 110, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      
      axisLeft={{
        orient: "left",
        tickValues: 5, 
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", 
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
