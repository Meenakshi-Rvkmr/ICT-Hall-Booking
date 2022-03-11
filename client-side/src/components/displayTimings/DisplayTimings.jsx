import React from "react";
import {Box,Typography} from '@mui/material';
import { red } from "@mui/material/colors";

const DisplayTimings=({times})=>{
    const temp = times.length;
    const msg = temp ==0?"No bookings":"Already booked";
    let nInc=1;
    return(
        <>
        <Typography>{msg}</Typography>
        <Box>
 
            <br/>
           {times.map((time1)=>(
               <Box key={nInc++} sx={{ p: 2, border: '1px solid red[400]',bgcolor:red[400],borderRadius:"20px", color:"white", display:"inline-block",width:"31%",marginBottom:"10px",marginLeft:"5px"}} >
               {time1.starttime}-{time1.endtime} 
                 </Box>          
           ))}
       </Box> 
       </>
    )
}
    
export default DisplayTimings;