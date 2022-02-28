import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Paper, Typography, Container, Box, Chip, Button } from '@mui/material';
import sidebar_theme from './SidebarTheme';
import source from '../../assets/images/sidebar_bkg.jpg';
import { textAlign } from '@mui/system';

const Sidebar = () => {

  //State variable for categories
  const [hallTypes, sethallTypes] = useState([]);

  //Fetch the categories from db
  useEffect(() => {
    const fetchHallTypes = async () => {
      // const response = await axios.get("/halltypes");
      // sethallTypes(response.data);
      let data = [{name:"Meeting"},{name:"Conference"}]
      sethallTypes(data)
    };
    fetchHallTypes();
  }, [])


  const styles = {
    paperContainer: {
        backgroundImage: `url(${source})`,
        backgroundSize : "cover",
        height:"100%",
        
        boxShadow:3,
        padding:"10px"
    }
};

  return (
    <Paper style={styles.paperContainer} >
      <Typography sx={sidebar_theme("Title1")}>Hall Info</Typography>
      <Typography sx={sidebar_theme("HallInfo")}>
        Rooms come equipped with booking management software,
        depending on the needs of the company that owns them.
        Our facility provides furniture, overhead projectors, stage lighting,
        and a sound system.Typically a medium to large office or post-secondary
        educational facility that we provide as follows.</Typography>
      <Container sx={sidebar_theme("Container1")}>
        <Box sx={{p:"4", background:"#ffffffad",}}>
          <Typography sx={sidebar_theme("SubTitle1")}>Halls Available</Typography>
          <Box display="flex" width="100% ">
        {hallTypes.map((htype, key) => (           
            <Button variant="contained" key={key} color="info" sx={{margin:"10px",padding:"10px", borderRadius:"50%"}}>{htype.name}</Button>
           
          ))}
        </Box>
        </Box>
        
        

        <Paper sx={sidebar_theme("Paper2")} >
          
        </Paper>

      </Container>
    </Paper>
  )
}

export default Sidebar;