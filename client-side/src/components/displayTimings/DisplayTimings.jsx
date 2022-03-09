import React from "react";
import {Box,Typography} from '@mui/material';

const DisplayTimings=({times})=>{
    const temp = times.length;
    const msg = temp ==0?"No bookings":"Already booked";
    return(
        <Box>
            <Typography>{msg}</Typography>
            
           {times.map((time,key)=>(
                <Box sx={{ p: 2, border: '1px dashed grey',bgcolor:"red", color:"white", display:"flex",width:"25%"}} key={key}>
                     {time.starttime}-{time.endtime} 
                </Box>
           ))}
       </Box> 
    )
}

export default DisplayTimings;