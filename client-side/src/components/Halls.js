// import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia, Stack } from "@mui/material";
import Meetings from "./Meetings";
import moment from 'moment';
import { useEffect, useState } from "react";
import axios from "axios";

const Halls = ({ hall }) => {
  const [meeting, setMeeting] = useState([])
   
    useEffect(() => {
        const fetchBookings = async () => {
            let response = await axios.get(`/bookings?hallname=${hall.name}`);
            let data = response.data;
            setMeeting(data);
            
        };
        fetchBookings();
    }, []);
  const noImage ="https://redthread.uoregon.edu/files/large/affd16fd5264cab9197da4cd1a996f820e601ee4.jpg";
  const PF = "http://localhost:5000/hallimages/";

  const imageSource = hall.hallimg ? PF + hall.hallimg : noImage;

  const capacityTypography =
    hall.capacity <= 16
      ? hall.capacity + " seater room"
      : hall.capacity + " seats ";

  var date1 = new Date(hall.starttime);
  var date2 = new Date(hall.endtime);

  const timeAvailableTypography =
    "Available : " + formatAMPM(date1) + " to " + formatAMPM(date2);

  function formatAMPM(date) {
    var strTime = moment(date).format("hh:mm A");
    return strTime;
  }
  return (
    <>
      <Card sx={{ boxShadow: 3 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageSource}
            alt="no image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {hall.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hall.address}
              <br></br>
              {timeAvailableTypography}
            </Typography>
          </CardContent>
          <Meetings meetings={meeting} />
        </CardActionArea>
      </Card>
    </>
  );
};

export default Halls;
