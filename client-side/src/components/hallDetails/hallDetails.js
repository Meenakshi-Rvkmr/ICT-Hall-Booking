import React from 'react';
import Grid from '@mui/material/Grid';
import Associatedetails from '../associateDetails/Associatedetails';
import Halls from '../Halls';

const halldetails = () => {

  return (
    <>       
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Halls />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Associatedetails />
          </Grid>
        </Grid>
     
    </>
  );
};

export default halldetails;