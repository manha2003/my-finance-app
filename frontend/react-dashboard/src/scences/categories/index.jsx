import React, { useState } from 'react';
import { tokens } from "../../theme";
import { Button, Box, useTheme} from '@mui/material';
import Header from "../../components/Header";
import { ExpenseList } from '../../components/ExpenseList';
import  {AssetList}  from '../../components/AssetList';
import  {LiabilityList}  from '../../components/LiabilityList';
import {IncomeList} from '../../components/IncomeList';
import Popup from '../../components/Popup';
import AddIcon from '@mui/icons-material/Add';
import CategoryForm from '../../components/CategoryForm';

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedType, setSelectedType] = useState('Expense');
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => setOpenPopup(true);
 

  const handleAddCategory = ({ categoryName, selectedIcon }) => {
    console.log(`Adding custom ${selectedType}:`, categoryName, 'with icon:', selectedIcon)
    setOpenPopup(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CATEGORY" subtitle="Manage your categories" />
      </Box>

      <Box display="flex" justifyContent="flex-start" alignItems="center" mb="4px">
        <Box>
          <Button 
            variant="contained" 
            onClick={() => setSelectedType('Expense')} 
            sx={{ backgroundColor: colors.redAccent[500], maxWidth:'20%',  marginRight: "1px" }}
          >
            Expenses
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setSelectedType('Income')} 
            sx={{ backgroundColor: '#4caf50', marginRight: "1px" }}
          >
            Incomes
          </Button>

          <Button 
            variant="contained" 
            onClick={() => setSelectedType('Asset')} 
            sx={{ backgroundColor: colors.blueAccent[500], marginRight: "1px" }}
          >
            Assets
          </Button>

          <Button 
            variant="contained" 
            onClick={() => setSelectedType('Liability')} 
            sx={{ backgroundColor: colors.orangeAccent[500], marginRight: "1px" }}
          >
            Liabilities
          </Button>
          
        </Box>

        {/* <Button
          variant="outlined"
          onClick={handleOpenPopup}
          startIcon={<AddIcon />}
          sx={{marginLeft:58, backgroundColor: colors.blueAccent[500], color: '#fff' }}
        >
          Add Custom Category
        </Button> */}
      </Box>

     
      <Box>
        {selectedType === 'Expense' && <ExpenseList />}
        {selectedType === 'Income' && <IncomeList />}
        {selectedType === 'Asset' && <AssetList />}
        {selectedType === 'Liability' && <LiabilityList />}
        
      </Box>

    
      <Popup
        title={`Add Custom Category`}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CategoryForm selectedType={selectedType} onSubmit={handleAddCategory} />
      </Popup>
    </Box>
  );
};

export default Categories;