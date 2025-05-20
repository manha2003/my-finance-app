import React, { useState, useEffect , useCallback } from "react";
import Header from "../../components/Header";
import walletApi from "../../data/walletApi";
import financialApi from "../../data/financialApi";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import {jwtDecode} from 'jwt-decode';
import Popup from "../../components/Popup";
import getCategoryIdWithIcon from "../../utils/getCategoryWithId";
import AddAssetLiabilityForm from "./AddAssetLiabilityForm";
import WalletItems from "./WalletItems";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WalletManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [wallets, setWallets] = useState([]);
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const fetchedWallets = await walletApi.getWalletsByUserId(token);
          setWallets(fetchedWallets);
          console.log("Fetched Wallets:", fetchedWallets);
        }
      } catch (error) {
        console.error("Error fetching wallets:", error);
        toast.error("Failed to fetch wallets.");
      }
    };

    fetchWallets();
  }, []);

  
  const handleWalletChange = async(event) => {
    const walletId = event.target.value;
    console.log("Selected Wallet ID:", walletId);
    setSelectedWalletId(walletId);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const fetchedWallet = await walletApi.getWalletById(walletId, token);
      setSelectedWallet(fetchedWallet);
      console.log(fetchedWallet);
    } catch (error) {
   
      toast.error('Failed to fetch selected wallet.');
    }
  };
  

  const handleAddAssetLiability = async (formData) => {
    if (!selectedWalletId) {
      toast.error("Please select a wallet.");
      return;
    }
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    try {
      const categoryId = await getCategoryIdWithIcon(formData.iconId, token);

      if (!categoryId) {
        toast.error("Invalid category selected.");
        return;
      }

      const payload = {
        userId,
        walletId: selectedWalletId, 
        categoryId: parseInt(categoryId, 10),
        amount: parseFloat(formData.amount),
        description: formData.description,
      };

      console.log("Payload:", payload);

      if (formData.type === "asset") {
        const response = await financialApi.createAsset(payload, token);
        console.log("API Response (Asset):", response.data);
        toast.success( "Asset added successfully!");
      } else if (formData.type === "liability") {
        const response = await financialApi.createLiability(payload, token);
        console.log("API Response (Liability):", response.data);
        toast.success("Liability added successfully!");
      }
      const updatedWallet = await walletApi.getWalletById(selectedWalletId, token);
      setSelectedWallet(updatedWallet);
      
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const handleDeleteSuccess = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedWallets = await walletApi.getWalletsByUserId(token);
      setWallets(updatedWallets);
      if(selectedWallet){
      const fetchedWallet = await walletApi.getWalletById(selectedWalletId, token);
      setSelectedWallet(fetchedWallet);
      toast.success('Item deleted successfully!');
      }else{
        setSelectedWallet(null);
      }
     
      
    } catch (error) {
      console.error('Error after delete:', error);
      toast.error('Failed to refresh data after delete.');
    }
  };


  const handleOpenPopup = (title) => {
    setPopupTitle(title);
    setOpenPopup(true);
  };



  return (
    <Box m="20px">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.palette.mode === "dark" ? "dark" : "light"}
        transition={Bounce}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="WALLET MANAGEMENT" subtitle="Welcome to your wallet management" />
      </Box>

      <Box mt={4}>
        <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenPopup("Add New Item")}
              sx={{
                minWidth: "150px",
                marginRight: "20px",
                backgroundColor: colors.blueAccent[500],
                color: "#fff",
              }}
            >
              Add Items
            </Button>
          </Box>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title={popupTitle}>
          <AddAssetLiabilityForm onSubmit={handleAddAssetLiability} />
        </Popup>

        <FormControl fullWidth>
          <Select
            value={selectedWalletId || ""}
            onChange={handleWalletChange}
            displayEmpty
            sx={{
              backgroundColor: colors.custom[100],
              fontFamily: theme.typography.fontFamily,
              fontSize: "16px",
              fontWeight: "400",
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
            
              
            
          >
            <MenuItem value="" disabled>
              Select a Wallet
            </MenuItem>
            {wallets.map((wallet) => (
              <MenuItem key={wallet.walletId} value={wallet.walletId}>
                {wallet.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedWallet ? (
        <Box >
         
            <WalletItems selectedWallet={selectedWallet}  onDeleteSuccess={handleDeleteSuccess}/>
         
        </Box>
      ) : (
        <Typography variant="h6" align="center" sx={{ marginTop: "32px" }}>
          Select a wallet to view details.
        </Typography>
      )}
    </Box>
  );
};

export default WalletManagement;
