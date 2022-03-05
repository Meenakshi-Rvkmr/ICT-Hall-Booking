import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from "@mui/material";
//import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import { GroupingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  appointmentData,
  TodayButton,
  AppointmentTooltip,
  Resources,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

import AssociateSideBar from '../components/associateSideBar/AssociateSideBar';
import AssociateTopBar from '../components/associateTopBar/AssociateTopBar';

const CalenderViewPage = () => {

  const appointmentData = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2022, 2, 23, 9, 30),
      endDate: new Date(2022, 2, 23, 11, 30),
      location: "Room 1"
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2022, 2, 13, 12, 0),
      endDate: new Date(2022, 2, 13, 13, 0),
      location: "Room 2"
    }, {
      title: 'Conference Meeting',
      startDate: new Date(2022, 2, 15, 12, 0),
      endDate: new Date(2022, 2, 15, 13, 0),
      location: "Room 1"
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2022, 2, 26, 12, 0),
      endDate: new Date(2022, 2, 26, 13, 35),
      id: 4,
      location: 'Room 2',
    }, {
      title: 'New Brochures',
      startDate: new Date(2022, 2, 26, 14, 30),
      endDate: new Date(2022, 2, 26, 15, 45),
      id: 5,
      location: 'Room 2',
    }]
    const PREFIX = 'Demo';
    const classes = {
      icon: `${PREFIX}-icon`,
      textCenter: `${PREFIX}-textCenter`,
      firstRoom: `${PREFIX}-firstRoom`,
      secondRoom: `${PREFIX}-secondRoom`,
      thirdRoom: `${PREFIX}-thirdRoom`,
      header: `${PREFIX}-header`,
      commandButton: `${PREFIX}-commandButton`,
      apptContent: `${PREFIX}-apptContent`,
    };
    
    const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
      [`&.${classes.firstRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
      },
      [`&.${classes.secondRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
      },
      [`&.${classes.thirdRoom}`]: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
      },
      [`&.${classes.header}`]: {
        height: '260px',
        backgroundSize: 'cover',
      },
    }));

    const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
      [`&.${classes.firstRoom}`]: {
        backgroundcolor: 'green',
        borderRadius: '10px',
      },
      [`&.${classes.secondRoom}`]: {
        background: 'red',
        borderRadius: '10px',
      },
      [`&.${classes.appointment}`]: {
        borderRadius: '10px',
        '&:hover': {
          opacity: 0.6,
        },
      },
    }));
    
    const StyledIconButton = styled(IconButton)(() => ({
      [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
      },
    }));
    
    const StyledGrid = styled(Grid)(() => ({
      [`&.${classes.textCenter}`]: {
        textAlign: 'center',
      },
    }));
    
    const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
      [`&.${classes.icon}`]: {
        color: palette.action.active,
      },
    }));
    
    const StyledAppointmentTooltipCommandButton = styled(AppointmentTooltip.CommandButton)(() => ({
      [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
      },
    }));
    const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
      [`&.${classes.apptContent}`]: {
        '&>div>div': {
          whiteSpace: 'normal !important',
          lineHeight: 1.2,
        },
      },
    }));
    
    const getClassByLocation = (classes, location) => {
      if (location === 'Room 1') return classes.firstRoom;
      if (location === 'Room 2') return classes.secondRoom;
      if (location === 'Room 2') return classes.secondRoom;
      return classes.thirdRoom;
    };

    
    const Header = (({
      children, appointmentData, ...restProps
    }) => (
      <StyledAppointmentTooltipHeader
        {...restProps}
        className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
        appointmentData={appointmentData}    />    
    ));
    
    const Content = (({
      children, appointmentData, ...restProps
    }) => (
      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
          <StyledGrid item xs={2} className={classes.textCenter}>
            <StyledRoom className={classes.icon} />
          </StyledGrid>
          <Grid item xs={10}>
            <span>{appointmentData.location}</span>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    ));
    
    const CommandButton = (({
      ...restProps
    }) => (
      <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
    ));

    const Appointment = (({ children, data, ...restProps }) => (
      <StyledAppointmentsAppointment
        {...restProps}
        className={classNames(getClassByLocation(classes, data.location), classes.header)}
      />
    ));
    // const AppointmentContent = (({children, data, ...restProps }) => (
    //   <StyledAppointmentsAppointmentContent {...restProps} className={classes.apptContent} />
    // ));
  const [data, setData] = useState(appointmentData);
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
        <Paper sx={{ boxShadow: 3, margin: "10px", marginTop: "0px", }}>
          <Scheduler data={data} views={["workWeek"]} >
            <ViewState
              defaultCurrentDate={today}
            />                    
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showCloseButton
          />
          </Scheduler>
        </Paper>
      </Grid>
    </Grid>
  </>
  );
}
export default CalenderViewPage;


