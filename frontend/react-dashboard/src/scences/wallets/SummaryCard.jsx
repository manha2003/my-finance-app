import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const SummaryCard = ({ title, amount, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card 
    sx={{
        minWidth: 350,
        backgroundImage: `linear-gradient(to bottom right, ${colors.grey[800]}, ${colors.blueAccent[700]})`,
        padding: 2,
        borderRadius: 2,
        marginLeft:1,
        transition: 'transform 0.3s ease-in-out', 
        '&:hover': {
          transform: 'scale(1.05)', 
          boxShadow: `0 4px 20px ${colors.blueAccent[500]}`, 
        },
    }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
            {React.cloneElement(icon, { sx: { fontSize: 32, color: icon.props.sx.color } })}
          <Typography variant="h5" fontWeight="bold" ml={1} color={colors.blueAccent[300]}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" mt={1} color={colors.grey[100]}>
          ${amount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;