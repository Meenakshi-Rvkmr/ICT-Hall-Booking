import React, { useState } from 'react';
import { Box, Button,Dialog,DialogActions,DialogContent,Typography } from '@mui/material';
//import addhall_theme from './AddHallTheme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateHallForm from '../createhallform/CreateHallForm';


const AddHall = () => {

  const [open, setOpen] = useState(false);
  const [statusOperation, setstatusOperation] = useState("");

  function operationCompletion(statusOperation) {

    setstatusOperation(statusOperation);

    if(statusOperation==='success'){
        alert("Hall is Successfully Created") ; 
        handleClose();
        setstatusOperation("");
        window.location.replace("/");
    }else{
        alert("Something went wrong...Please Try Again"); 
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  }; 

  return (
    <>
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleClickOpen}>
          Add Hall
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogContent>
                 <Typography component={'h2'} mx={4} mt={1} textAlign='center'
                            sx={{letterSpacing: "2px",fontWeight:"600",borderTop:'1px solid black',borderBottom:'1px solid black'}}>
                Hall</Typography>
               <CreateHallForm ID={""} statusOperation={operationCompletion}/>
            </DialogContent>            

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
     </Dialog>
    </>  

  )
}

export default AddHall;


