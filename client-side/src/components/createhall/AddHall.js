import React, { useState } from 'react';
import { Box, Button, Paper, Typography, } from '@mui/material';
//import addhall_theme from './AddHallTheme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const AddHall = () => {

  const [addBtnClicked, setaddBtnClicked] = useState(false);

  const handleAddClicked = () => {
    let value = !addBtnClicked;
    setaddBtnClicked(value);
  }

  return (
    <Box flexDirection={'column'}>
      
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleAddClicked}>
          Add Hall
        </Button>

    </Box>


  )
}

export default AddHall;


