import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from "@mui/material";
//import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import AssociateSideBar from './AssociateSideBar';
import AssociateTopBar from './AssociateTopBar';
import MeetingCard from './MeetingCard';

const CalenderView =()=> {

    const appointments = [
        {
          title: 'Website Re-Design Plan',
          startDate: new Date(2018, 6, 23, 9, 30),
          endDate: new Date(2018, 6, 23, 11, 30),
        }, {
          title: 'Book Flights to San Fran for Sales Trip',
          startDate: new Date(2018, 6, 23, 12, 0),
          endDate: new Date(2018, 6, 23, 13, 0),
        }]

    const [data,setData] = useState(appointments);
    const today = new Date();
    //const monthNames = [ "January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
  
    
    
    return (<>
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <AssociateTopBar />
        </Grid>
        <Grid item xs={2}>
          <AssociateSideBar />
        </Grid>
        <Grid item xs={8}></Grid>
      <Paper sx={{marginLeft:"30px"}}>

      {/* <Toolbar>
            <DateRangeTwoToneIcon sx={{color:"blueviolet", fontSize:"40px"}}/>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "left" }} >
                {monthNames[today.getMonth()]} {today.getFullYear()}
              </Typography>
    </Toolbar> */}

        <Scheduler data={data} >
          <ViewState currentDate={today}/>
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>

      </Paper>
     
        <Grid item xs={2}>
          <MeetingCard />
        </Grid>
    </Grid>
      </>
    );
  }
export default CalenderView;


