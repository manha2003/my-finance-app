
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import {jwtDecode} from 'jwt-decode';
import BudgetCharts from "../budgets/BudgetChart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryIcon from '@mui/icons-material/History';
import PreviewIcon from '@mui/icons-material/Preview';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import { GrTransaction } from "react-icons/gr";
import WalletIcon from '@mui/icons-material/Wallet';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import SavingsSharpIcon from '@mui/icons-material/SavingsSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [openData, setOpenData] = useState(true);
  const [openPages, setOpenPages] = useState(true);
  const [openCharts, setOpenCharts] = useState(true);
  const [openSettings, setSettings] = useState(true);
  const [username, setUsername] = useState('');


  const handleClickData = () => {
    setOpenData(!openData);
  };

  const handleClickPages = () => {
    setOpenPages(!openPages);
  };

  const handleClickCharts = () => {
    setOpenCharts(!openCharts);
  };

  const handleClickSettings = () => {
    setSettings(!openSettings);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setUsername(decodedToken.unique_name || 'User'); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Smart Money
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/4604286.png`}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.greenAccent[400]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username}
                </Typography>
                
              </Box>
            </Box>
          )}

          
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Transactions"
              to="/transactions"
              icon={<GrTransaction />}
              selected={selected}
              setSelected={setSelected}
            />                 
          

            <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 4px 5px 20px", display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleClickData}
              >
                {isCollapsed ? (
                <SavingsSharpIcon sx = {{m: "15px 0px 15px 9px", display: 'flex', alignItems: 'center'}}/> 
                ) : (
                <>
                  <SavingsSharpIcon sx={{ mr: 2 }}  /> Budget Management
                  {openData ? <ExpandLessOutlinedIcon sx={{ ml: 'auto' }} /> : <ExpandMoreOutlinedIcon sx={{ ml: 'auto' }} />}
                </>
              )}
                
              </Typography>
              <Collapse in={openData }>
                <Box>
                  
                  <Item
                    title="Budget Overview"
                    to="/budgets"
                    icon={<PreviewIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Budget History"
                    to="/budgets/history"
                    icon={<HistoryIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Expenses/Incomes"
                    to="budgets/invoices"
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Collapse>
            </Box>

            



            <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 4px 5px 20px", display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleClickPages}
              >
              {isCollapsed ? (
                <PriceChangeOutlinedIcon sx = {{m: "15px 0 15px 9px", display: 'flex', alignItems: 'center'}}/> 
                ) : (
                <>
                  <CategoryIcon sx={{ mr: 2 }}  /> Category
                  {openPages ? <ExpandLessOutlinedIcon sx={{ ml: 'auto' }} /> : <ExpandMoreOutlinedIcon sx={{ ml: 'auto' }} />}
                </> 
              )}
              </Typography>
              <Collapse in={openPages}>
                <Box>
                  <Item
                    title="Category"
                    to="/category"
                    icon={<PriceChangeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  
                  
                </Box>
              </Collapse>
            </Box>

            <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 4px 5px 20px", display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleClickCharts}
              >
                {isCollapsed ? (
                <AccountBalanceWalletIcon sx = {{m: "15px 0 15px 9px", display: 'flex', alignItems: 'center'}}/> 
                ) : (
                <>
                  <AccountBalanceWalletIcon sx={{ mr: 2 }}  /> Your Wallet
                  {openCharts ? <ExpandLessOutlinedIcon sx={{ ml: 'auto' }} /> : <ExpandMoreOutlinedIcon sx={{ ml: 'auto' }} />}
                </> 
              )}
              </Typography>
              <Collapse in={openCharts}>
                <Box>
                  <Item
                    title="Wallet Overview"
                    to="/wallets"
                    icon={<PreviewIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Wallet Management"
                    to="/wallets/walletmanage"
                    icon={<WalletIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  
                </Box>
              </Collapse>
            </Box>

            <Box>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 4px 5px 20px", display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleClickSettings}
              >
                {isCollapsed ? (
                <SettingsIcon sx = {{m: "15px 0 15px 9px", display: 'flex', alignItems: 'center'}}/> 
                ) : (
                <>
                  <AccessAlarmIcon sx={{ mr: 2 }}  /> Reminder
                  {openSettings ? <ExpandLessOutlinedIcon sx={{ ml: 'auto' }} /> : <ExpandMoreOutlinedIcon sx={{ ml: 'auto' }} />}
                </> 
              )}
              </Typography>
              <Collapse in={openSettings}>
                <Box>
                  
                  <Item
                    title="Calendar"
                    to="/calendar"
                    icon={<CalendarTodayIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  
                 
                  
                </Box>
                <Box>
                  <BudgetCharts width= {100} height={50}></BudgetCharts>
                  </Box>
              </Collapse>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;