import React from "react";
import {Box,Typography} from '@mui/material';
import { red } from "@mui/material/colors";

const DisplayTimings=({times})=>{
    const temp = times.length;
    const msg = temp ==0?"No bookings":"Already booked";
    let nInc=1;
    return(
        <Box>
            <Typography>{msg}</Typography>
            <br/>
           {times.map((time1)=>(
               <Box key={nInc++} sx={{ p: 2, border: '1px dashed grey',bgcolor:red[400],borderRadius:"35px", color:"white", display:"flex",width:"25%"}} >
               {time1.starttime}-{time1.endtime} 
          </Box>                
           ))}
       </Box> 
    )
}
    
export default DisplayTimings;