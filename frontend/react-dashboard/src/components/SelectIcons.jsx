import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Avatar, Typography, ListItemIcon, useTheme } from '@mui/material';
import { tokens } from "../theme";

const SelectIcon = ({ icons, selectedIcon, onChange, disabled  ,type}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const avatarColor = (type) => {
    if (type === "expense") {
      return colors.redAccent[500];
    } else if (type === "income") {
      return colors.greenAccent[500];
    } else if (type === "asset") {
      return colors.blueAccent[500];
    } else if (type === "liability") {
      return colors.orangeAccent[500];
    }
  };
  

  return (
    <FormControl fullWidth disabled={disabled} >
      <InputLabel 
      id="icon-label"
      sx={{ 
      top: '-6px',  
      fontSize: '14px', 
      }}
      >
        Select Icon
        </InputLabel>
      <Select
        labelId="icon-label"
        name="iconId"
        value={selectedIcon}
        onChange={onChange}
        renderValue={(selected) => (
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                backgroundColor: avatarColor(type), 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,  
                height: 30, 
                marginRight: 1
              }}
            >
              {icons[selected] && React.createElement(icons[selected], { sx: { color: colors.white } })}
            </Avatar>
            <Typography
            sx = {{
                color: colors.grey[100]
            }}
            >
                {selected.charAt(0).toUpperCase() + selected.slice(1)}
            </Typography>
          </Box>
        )}
        MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
        sx={{ color: colors.grey[900] }}
      >
        {Object.entries(icons).map(([key, IconComponent]) => (
          <MenuItem key={key} value={key}>
            <Box 
              display="flex" 
              alignItems="center" 
              width="100%"
              sx={{ 
                padding: 1, 
                backgroundColor: colors.grey[800], 
                borderRadius: "8px",
                '&:hover': { backgroundColor: colors.grey[700] }
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: avatarColor(type), 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,  
                  height: 40, 
                  marginRight: 1
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
                  <IconComponent sx={{ color: colors.white }} />
                </ListItemIcon>
              </Avatar>
              <Typography sx={{ fontWeight: 'bold', color: colors.grey[100] }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectIcon;