import React from 'react';
import {  Box, useTheme,  Typography, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import { tokens } from "../theme";
import assetIcons  from '../icons/assetIcons'; 

const assets = [
    { name: 'Real Estate', iconId: 'realEstate' },
    { name: 'Vehicles', iconId: 'vehicles' },
    { name: 'Stocks', iconId: 'stocks' },
    { name: 'Bonds', iconId: 'bonds' },
    { name: 'Crypto', iconId: 'crypto' },
    { name: 'Jewelry', iconId: 'jewelry' },
    { name: 'Art', iconId: 'art' },
    { name: 'Collectibles', iconId: 'collectibles' },
    
  ];


  const sortedAssets = assets.sort((a, b) => a.name.localeCompare(b.name));

  const AssetList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          maxWidth: '80%',
          backgroundColor: colors.blueAccent[900],
          borderRadius: "16px",
          gap: 1,
          
        }}
      >
        {sortedAssets.map((asset, index) => {
          const IconComponent = assetIcons[asset.iconId];
  
          return (
            
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '26%',   
                margin: 2
              }}
            >
              <Avatar 
              sx={{
                backgroundColor: colors.blueAccent[500], 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,  
                height: 60, 
              }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 'auto',
                    display: 'flex',  
                    
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                    >
                 
                <IconComponent sx={{ color: colors.white, transform: 'scale(1.3)' }} />
              
                </ListItemIcon>
              </Avatar>
              <ListItemText 
                primary={
                  <Typography 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: colors.grey[100] , 
                    margin : '8px',
                    fontSize: '0.9rem'
                    }}
                    >
                     {asset.name}
                  </Typography>
                } 
                
              />
            </Box>
          );
        })}
      </Box>
  
      
    );
  };

  export {AssetList, assets};