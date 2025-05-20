import React from 'react';
import { Box, Typography, List, ListItem, Avatar, useTheme, IconButton, Tooltip } from '@mui/material';
import { tokens } from '../../theme';
import CloseIcon from '@mui/icons-material/Close';
import financialApi from '../../data/financialApi';
import assetIcons from '../../icons/assetIcons';

const categoryIconMap = {
  32: 'realEstate',
  33: 'vehicles',
  34: 'stocks',
  35: 'bonds',
  36: 'crypto',
  37: 'jewelry',
  38: 'art',
  39: 'collectibles',
};

const AssetItems = ({ assets, onDeleteSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async (assetId) => {
    console.log('Asset Id:', assetId);
    try {
      const token = localStorage.getItem('authToken');
      await financialApi.deleteAsset(assetId, token); 
      console.log(`Asset with ID ${assetId} deleted successfully.`);
      onDeleteSuccess(assetId);
    } catch (error) {
      console.error(`Failed to delete asset with ID ${assetId}:`, error);
    }
  };

  return (
    <Box mt={2} width="100%" bgcolor={colors.custom[100]} borderRadius="8px" p={3} boxShadow={3}>
      <Typography variant="h4" gutterBottom display="flex" alignItems="center" mb={2} color={colors.blueAccent[500]}>
        Assets
      </Typography>

      <Box
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        <List>
          {assets.length === 0 ? (
            <Typography variant="body2" color="textSecondary" align="center">
              No assets recorded.
            </Typography>
          ) : (
            assets.map((asset) => {
              const iconId = categoryIconMap[asset.categoryId];
              const IconComponent = assetIcons[iconId] || null;

              return (
                <Box
                  key={asset.assetId}
                  mb={2}
                  p={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius="8px"
                  boxShadow={1}
                  bgcolor={colors.blueAccent[700]}
                  sx={{
                    transition: '0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      boxShadow: 3,
                      backgroundColor: colors.grey[800],
                    },
                  }}
                >
                  <Tooltip 
                   title={
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: '#fff', 
                      }}
                    >
                      {iconId.charAt(0).toUpperCase() + iconId.slice(1)}
                    </Typography>
                  }>
                    <Avatar
                      sx={{
                        backgroundColor: colors.blueAccent[500],
                        marginRight: '16px',
                        width: 48,
                        height: 48,
                        cursor: 'pointer',
                      }}
                    >
                      {IconComponent && <IconComponent sx={{ color: 'white', fontSize: 24 }} />}
                    </Avatar>
                  </Tooltip>

                  <ListItem>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="textPrimary"
                    >
                      {asset.amount.toFixed(2)}
                    </Typography>
                  </ListItem>

                  <IconButton
                    color="error"
                    size="large"
                    onClick={() => handleDelete(asset.assetId)}
                    sx={{
                      marginLeft: 'auto',
                      fontSize: 24,
                      color: 'white',
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
                  </IconButton>
                </Box>
              );
            })
          )}
        </List>
      </Box>
    </Box>
  );
};

export default AssetItems;
