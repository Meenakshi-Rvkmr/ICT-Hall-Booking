import React from "react";
import Box from '@mui/material/Box';

const DisplayTimings=({times})=>{
    return(
       <div>
           {times.map(time=>{
                <Box component="span" sx={{ p: 2, border: '1px dashed grey'}} bgcolor="red" color="white">
                     {time.starttime}-{time.endtime} 
                </Box>
            })}
       </div> 
    )
}

export default DisplayTimings;