import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

const UserMenu = ({ setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setAnchorEl(null);
    setIsAuthenticated(false);
    navigate("/login"); 
  };

  const handleNavigation = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <PersonOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/personal')}>
          <PersonIcon fontSize="small" sx={{ marginRight: '8px' }} />
          <Typography>Personal Information</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ marginRight: '8px' }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;