import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const BudgetUsageBarChart = ({ budgets }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  const data = budgets.slice(-6) 
    .map((budget) => ({
      budgetName: budget.name,
      totalAmount: budget.totalAmount,
      moneySpent: budget.moneySpent,
    }));

  return (
    <ResponsiveBar
      data={data}
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
      }}
      keys={["totalAmount", "moneySpent"]}
      indexBy="budgetName"
      margin={{ top: 40, right: 120, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) =>
        id === "moneySpent" ? colors.redAccent[500] : colors.greenAccent[500]
      }
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 6,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Budgets",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in budget: ${e.indexValue}`
      }
    />
  );
};

export default BudgetUsageBarChart;
