import React from "react";
import {Box,Typography} from '@mui/material';
import { red } from "@mui/material/colors";

const DisplayTimings=({times})=>{
    const temp = times.length;
    const msg = temp ==0?"No bookings":"Already booked";
    return(
        <Box>
            <Typography>{msg}</Typography>
            <br/>
           {times.map((time,key)=>(
               <><Box sx={{ p: 2, border: '1px dashed grey',bgcolor:red[400],borderRadius:"35px", color:"white", display:"flex",width:"25%"}} key={key}>
               {time.starttime}-{time.endtime} 
          </Box><br/>
               </>
                
           ))}
       </Box> 
    )
}
    
export default DisplayTimings;