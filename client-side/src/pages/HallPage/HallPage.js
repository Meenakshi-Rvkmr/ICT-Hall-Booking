import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import { Box, Grid, Stack, } from '@mui/material';
import HallSidebar from '../../components/hallSideBar/HallSidebar';
import HallList from '../../components/hall_list/HallList';


const HallPage = () => {

  //State declaration for all the posts
  var [allHalls, setallHalls] = useState([]);

  //Search property in path to know the username if any
  //const {search}=useLocation();

  //Fetch the posts from the db
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        //const response =await axios.get("/halls");
        // setallHalls(response.data);
        let data = [
          {
            name: "Conference Hall 1",
            capacity: 100,
            halltype: "Conference",
            address:"Ground Floor, Wing A"
          },
          {
            name: "Conference Hall 2",
            capacity: 100,
            halltype: "Conference",
            address:"Ground Floor, Wing B"
          }
        ]
        setallHalls(data);
      } catch (err) {
      }
    }
    fetchHalls();
  }, []);

  const gridStyles = {
    backgroundImage:
      'linear-gradient(to left,#F0F2F0,#000C40);',
    p: 10,
  }
  return (
    <>
      <Box {...gridStyles}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <HallList allHalls={allHalls} />
          </Grid>
          <Grid item xs={5}>
            <HallSidebar />
          </Grid>
        </Grid>

        {/* <Paper  w='50%' ml={'4em'} alignItems='center' justifyContent={'center'} h='16'>
              <Button mr={'3'} leftIcon={<ArrowBackIcon />}>Previous</Button>
              <Button ml={'3'} rightIcon={<ArrowForwardIcon />}>Next</Button>             
          </Paper>          */}
      </Box>
    </>
  )
}

export default HallPage