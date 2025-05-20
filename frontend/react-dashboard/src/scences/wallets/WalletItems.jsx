import React from 'react';
import { Box} from '@mui/material';
import AssetItems from './AssetItems';
import LiabilityItems from './LiabilityItems';


const WalletItems = ({ selectedWallet , onDeleteSuccess}) => {
  

  const { assets, liabilities } = selectedWallet;

  return (
    <Box mt={2} >
      
     

      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={2}
        width="100%"
      >
        <Box flex={1} maxWidth="50%">
          <AssetItems assets={assets} onDeleteSuccess={onDeleteSuccess}/>
        </Box>
        <Box flex={1} maxWidth="50%">
          <LiabilityItems liabilities={liabilities} onDeleteSuccess={onDeleteSuccess}/>
        </Box>
      </Box>

    </Box>
  );
};

export default WalletItems;