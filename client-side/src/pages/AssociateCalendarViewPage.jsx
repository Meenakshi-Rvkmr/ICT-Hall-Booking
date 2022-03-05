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
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import AssociateSideBar from '../components/associateSideBar/AssociateSideBar';
import AssociateTopBar from '../components/associateTopBar/AssociateTopBar';

const CalenderViewPage = () => {

  const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2022, 3, 23, 9, 30),
      endDate: new Date(2022, 3, 23, 11, 30),
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2022, 4, 23, 12, 0),
      endDate: new Date(2022, 4, 23, 13, 0),
    }]

  const [data, setData] = useState(appointments);
  const today = new Date();
  //const monthNames = [ "January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];



  return (<>
    <Grid container spacing={3}>
     <Grid item xs={2}>
        <AssociateSideBar />
      </Grid>
      <Grid item xs={10}>
      <AssociateTopBar />
      <br></br>
        <Paper sx={{boxShadow:3, margin:"10px", marginTop:"0px"}}>
        <Scheduler  data={appointments} >
          <ViewState
            defaultCurrentDate={today}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip/>
        </Scheduler>
        </Paper>
      </Grid>
    </Grid>
  </>
  );
}
export default CalenderViewPage;


