import React from 'react';
import { useTheme, Dialog, DialogTitle, DialogContent, Typography, Slide } from '@mui/material';
import { tokens } from '../theme';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog
      
      open={openPopup}
      onClose={() => setOpenPopup(false)}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: colors.custom[100],
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: colors.blueAccent[500], color: '#ffffff', marginBottom: '12px' }}>
        <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}