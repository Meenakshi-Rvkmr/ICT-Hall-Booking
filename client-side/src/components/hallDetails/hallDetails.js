import React from "react";
import Halls from "../Halls";
import { Stack, Typography } from "@mui/material";

const halldetails = ({ allHalls }) => {
  return (
    <>
      <div style={{ backgroundColor: "" }}>       
        <Typography component="div" variant="h5" fontWeight='bold' sx={{paddingLeft:"10px"}}> 
        Hall Details
        </Typography>
        <br></br>
        <Stack direction="row" spacing={2}>
          {allHalls.map((hall, key)=>(
            <Halls hall={hall} key={key}/>
          ))}
          </Stack>
      </div>
    </>
  );
};

export default halldetails;
