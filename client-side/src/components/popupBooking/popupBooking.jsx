import * as React from 'react';
import {Avatar,Button,Box,Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    window.location.replace("/calendar");
  };

  return (
      <>
    
      <Dialog
        open={open} maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        
          <DialogContentText id="alert-dialog-description">

          <Box sx={{display:"inline-block",alignItems:"center"}}>
                <Avatar style={{ backgroundColor: "#1bbd7e" }}>
                <CheckCircleIcon />
                </Avatar>
              
                <Typography variant="h6" color="green">
                Congragulations.Your booking is confirmed.
                </Typography>
                </Box>  
          
          </DialogContentText>
        </DialogContent>

        <DialogActions>  
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>

      </Dialog>
      </>
  );
}

export default AlertDialog;