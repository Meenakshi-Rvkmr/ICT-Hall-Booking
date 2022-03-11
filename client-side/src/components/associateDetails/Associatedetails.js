import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper, Stack } from "@mui/material";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import { fontSize } from "@mui/system";
import axios from "axios";

const AssociateDetails = () => {
  const [userCount, setUserCount] = useState(0);
  const [hallCount, setHallCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(async () => {
    // await axios.get('/users').then((res) => {
    //   setUserCount(res.data.length);
    // });
    const fetchBookings = async () => {
      let response = await axios.get(`/bookings`);
      let data = response.data;
      setBookingCount(data.length);      
  };
  const fetchAssociates = async () => {
    let response = await axios.get(`/Associates`);
    let data = response.data;
    setUserCount(data.length);      
};
const fetchHalls = async () => {
  let response = await axios.get(`/halls`);
  let data = response.data;
  setHallCount(data.length);      
};
  fetchBookings();
  fetchAssociates();
  fetchHalls();
  }, []);
  return (
    <>
      <Stack direction="row" spacing={4} style={{padding:"10px", marginLeft:"10px"}}>
        <Paper elevation={3} sx={{ padding: "10px", backgroundColor:"#4db6ac"}}>
          <Typography component="div" variant="h5" fontWeight="bold" sx={{ paddingLeft: "10px" }} >
            Associates Registered
          </Typography>         
           <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: "10px" }}>
           <GroupRoundedIcon sx={{ fontSize: "70px", paddingRight: "20px" }}/>
           {userCount}
          </Typography> 
        </Paper>
        <Paper elevation={3} sx={{ padding: "10px", backgroundColor:"#e57373" }}>
        <Typography component="div" variant="h5" fontWeight="bold" sx={{ paddingLeft: "10px" }} >
            Halls Available
          </Typography>         
           <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: "10px" }}>
           <MeetingRoomRoundedIcon sx={{ fontSize: "70px", paddingRight: "20px" }}/>
            {hallCount}
          </Typography> 
        </Paper>
        <Paper elevation={3} sx={{ padding: "10px", backgroundColor:"#aed581" }}>
        <Typography component="div" variant="h5" fontWeight="bold" sx={{ paddingLeft: "10px" }} >
            Meetings Booked
          </Typography>         
           <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: "10px" }}>
           <EventAvailableRoundedIcon sx={{ fontSize: "70px", paddingRight: "20px" }}/>
            {bookingCount}
          </Typography> 
        </Paper>
      </Stack>
    </>
  );
};

export default AssociateDetails;
