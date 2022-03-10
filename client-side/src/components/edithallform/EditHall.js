import React,{useState} from 'react';
import { Button,Dialog,DialogActions,DialogContent,Typography } from '@mui/material';
import EditHallForm from './EditHallForm';

const EditHall = (props) => {
    
   const hall=props.hall; 

//=======================================================================================================================================

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        props.update(false);
    }; 

    function operationCompletion(statusOperation) {
    
        if(statusOperation==='success'){
            handleClose();
            alert("Successfully Updated.....");
            window.location.replace("/halls");
        }else{
            alert("Something went wrong...Please Try Again"); 
        }
      }


  return (
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
                <EditHallForm hall={hall} statusOperation={operationCompletion}/>
            </DialogContent>            

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
  )
}

export default EditHall;





