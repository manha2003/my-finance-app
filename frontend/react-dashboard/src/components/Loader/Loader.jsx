
import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa";
import './Loader.css'; 


const randomTips= [
  "Allocate money for essentials, savings, and leisure, ensuring it's within your income.",
  "Define short-term and long-term financial objectives to guide your spending habits.",
  "Allocate 50% for needs, 30% for wants, and 20% for savings or debt repayment.",
  "Make spending decisions thoughtfully, avoiding unnecessary items.",
  "Save up in advance for significant purchases or upcoming costs.",
];

const Loader = () => {

  const theme = useTheme(); 
  const colors = tokens(theme.palette.mode);
  const [randomTip, setRandomTip] = useState("");


  useEffect(() => {
    
    const randomTip = randomTips[Math.floor(Math.random() * randomTips.length)];
    setRandomTip(randomTip);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  return (
    <div className ="loader-container" style={{ backgroundColor: colors.blueAccent[900] }}>
      <div className="loader-title" >
            Smart Money
        </div>
      <div className="loader">
       
        <div className="loader__image">
          <div className="loader__coin">
            <RiMoneyDollarCircleLine
             size={70}  
             color='#50C878'/>
          </div>
          <div className="loader__hand">
            <FaHandHolding
            size={90}  
            color={'#50C878'}/>
          </div>
        </div>
      </div>
  
      <div className="loader-tips" style={{ color: colors.grey[400], fontSize: '16px' }}>
      Tip: {randomTip}
      </div>
    </div>
  );
};

export default Loader;