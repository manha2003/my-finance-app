import React, { useState } from 'react';
import { Box, Grid, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import WalletCard from './WalletCard';

const PaginatedWallets = ({id, wallets, onDeleteSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(wallets.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWallets = wallets.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box id={id}>
      {wallets.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color={colors.grey[600]}
          sx={{ mt: 4 }}
        >
          There is no wallet available.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {currentWallets.map((wallet) => (
              <Grid item xs={12} sm={6} md={4} key={wallet.id}>
                <WalletCard wallet={wallet}  onDeleteSuccess={onDeleteSuccess}/>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              sx={{
                backgroundColor: colors.grey[900],
                color: colors.blueAccent[300],
                borderColor: colors.blueAccent[300],
                '&:hover': {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  borderColor: colors.blueAccent[700],
                },
                '&:disabled': {
                  backgroundColor: colors.grey[800],
                  color: colors.grey[500],
                  borderColor: colors.grey[700],
                },
              }}
            >
              Previous
            </Button>
            <Typography variant="body1">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              sx={{
                backgroundColor: colors.grey[900],
                color: colors.blueAccent[300],
                borderColor: colors.blueAccent[300],
                '&:hover': {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  borderColor: colors.blueAccent[700],
                },
                '&:disabled': {
                  backgroundColor: colors.grey[800],
                  color: colors.grey[500],
                  borderColor: colors.grey[700],
                },
              }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PaginatedWallets;
