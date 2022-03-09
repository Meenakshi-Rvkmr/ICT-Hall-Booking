import * as React from 'react'
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
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import AdminSideBar from '../components/adminSideBar/AdminSideBar';
import NavBar from '../components/NavBar';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AdminCalenderViewPage = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
        let response = await axios.get("/bookings");
        let data = response.data.map((booking) => {
            // let date = new Date(booking.BookingDate);
            // let startTime = parseInt(booking.DurationFrom[0]);
            // let endTime = parseInt(booking.DurationTo[0] + booking.DurationTo[1]);
            return {
                startDate: new Date(booking.starttime),
                endDate: new Date(booking.endtime),
                title: booking.title,
                hall: booking.hall,
            };
        });
        setAppointmentData(data);        
    };
    fetchBookings();
}, []);
  
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
    
    const getClassByhall = (classes, hall) => {
      if (hall === 'Meeting Room 1') return classes.firstRoom;
      if (hall === 'Conference Hall 1') return classes.secondRoom;
      if (hall === 'Room 2') return classes.secondRoom;
      return classes.thirdRoom;
    };

    
    const Header = (({
      children, appointmentData, ...restProps
    }) => (
      <StyledAppointmentTooltipHeader
        {...restProps}
        className={classNames(getClassByhall(classes, appointmentData.hall), classes.header)}
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
            <span>{appointmentData.hall}</span>
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
        className={classNames(getClassByhall(classes, data.hall), classes.header)}
      />
    ));
    // const AppointmentContent = (({children, data, ...restProps }) => (
    //   <StyledAppointmentsAppointmentContent {...restProps} className={classes.apptContent} />
    // ));
  
  const today = new Date();
  //const monthNames = [ "January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];



  return (<>
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <AdminSideBar />
      </Grid>
      <Grid item xs={10}>
        <NavBar />
        <br></br>
        <Paper sx={{ boxShadow: 3, margin: "10px", marginTop: "0px", }}>
          <Scheduler data={appointmentData} views={["workWeek"]} >
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
export default AdminCalenderViewPage;


