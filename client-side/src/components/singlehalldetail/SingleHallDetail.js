import React,{useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia, Grid, Toolbar, IconButton,  } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleHallDetail = (props) => {

  const hall = props.value;
  const [updateMode,setupdateMode]=useState(false);

  const noImage = "https://redthread.uoregon.edu/files/large/affd16fd5264cab9197da4cd1a996f820e601ee4.jpg";
  const PF = "http://localhost:5000/hallimages/";

  const imageSource = hall.hallimg ? (PF+hall.hallimg) : noImage;

  const capacityTypography = (hall.capacity <= 16) ? hall.capacity + " seater room" : hall.capacity + " seats ";

  var date1 = new Date(hall.starttime);
  var date2 = new Date(hall.endtime);
  
  const timeAvailableTypography = "Available : " + formatAMPM(date1) + " to " + formatAMPM(date2);

  function formatAMPM(date) {
    var strTime = moment(date).format('hh:mm A');
    return strTime;
  }

  //===============Hall deletion operation===========================
  const handleDelete=async()=>{
    var proceed = window.confirm("Are you sure to delete this hall permanently?");
      if (proceed) {
        //proceed
        try {
          await axios.delete(`/halls/${hall._id}`);

          try{
            await axios.delete(`/hall/deleteimage/${hall.hallimg}`);
          }catch(err){}

          window.location.replace("/halls");
        } catch (err) {}
      } 
  }

  //================Hall Update Operation===========================
  const handleUpdate=()=>{
    setupdateMode(true);
    console.log("update");
  }


  return (
    <Card sx={{ mt: "10px", boxShadow: 3 }}>
      <CardContent >
        <Grid container item spacing={2}>
          <Grid item xs={4}>

            <CardMedia
              component="img"
              image={imageSource}
              alt="Live from space album cover"
              height="100%"
            />
          </Grid>
          <Grid item xs={8}>
              <Toolbar  disableGutters={false}  sx={{ float: "right",}}>
                <IconButton  aria-label="edit" onClick={handleUpdate}>
                  <EditTwoToneIcon fontSize='small'  sx={{ color: "#64b5f6" }} />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Toolbar>
            <Typography component="div" variant="h5" fontWeight='bold'>
              {hall.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {hall.address}
            </Typography>
            <Typography variant="h7" component="div" lineHeight={4}>
              {timeAvailableTypography}
            </Typography>
            <Typography variant="h6" component="div">
              {capacityTypography}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SingleHallDetail;