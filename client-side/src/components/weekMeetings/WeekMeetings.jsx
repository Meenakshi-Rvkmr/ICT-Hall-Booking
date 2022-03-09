import { Grid, Paper, Toolbar, Typography } from "@mui/material";
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import MeetingCard from "../../components/meetingCard/MeetingCard";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const userValue = localStorage.getItem("user") === "undefined" ? null : JSON.parse(localStorage.getItem("user"))
let WeekMeetings = () => {
    const [schedulerData, setSechedulerData] = useState([]);
    const [meeting, setMeeting] = useState({})
    const username = userValue.username;
    useEffect(() => {
        const fetchBookings = async () => {
            let response = await axios.get(`/bookings?/username=${username}`);
            let data = response.data.map((booking) => {
                // let date = new Date(booking.BookingDate);
                // let startTime = parseInt(booking.DurationFrom[0]);
                // let endTime = parseInt(booking.DurationTo[0] + booking.DurationTo[1]);
                return {
                    startDate: new Date(booking.starttime),
                    endDate: new Date(booking.endtime),
                    title: booking.title,
                    HallName: booking.hall,
                };
            });
            setSechedulerData(data);
            let todaymeeting = data.find((item) => {
                let date = new Date(item.starttime)
                if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0))
                    return item;
            });
            setMeeting(todaymeeting)
        };
        fetchBookings();
    }, []);

    const today = new Date();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return (
        <>
        <Grid container spacing={3}>
        <Grid item xs={9}>
                <Paper sx={{ marginLeft: "30px", boxShadow: 3 }}>
                    <Toolbar>
                        <DateRangeTwoToneIcon
                            sx={{ color: "blueviolet", fontSize: "40px" }}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, textAlign: "left" }}
                        >
                            {monthNames[today.getMonth()]} {today.getFullYear()}
                        </Typography>
                    </Toolbar>
                    <Scheduler data={schedulerData}>
                        <WeekView startDayHour={9} endDayHour={19} cellDuration={60} />
                        <Appointments />
                        <AppointmentTooltip showCloseButton={true} />
                    </Scheduler>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <MeetingCard meeting={meeting} />
            </Grid>
        </Grid>
           
        </>
    )
}

export default WeekMeetings;