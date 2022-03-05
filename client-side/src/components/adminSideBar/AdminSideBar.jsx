import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import { pink } from "@mui/material/colors";
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

let AdminSideBar = () => {
  const drawerWidth = window.innerWidth * 0.17;

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: 3,
          },
        }}
        variant="permanent"
        anchor="left"
      >
       
        <Toolbar/>
        <br />
        <List>
          <ListItem
            button
            key="View Associates"
            sx={{  padding: "15px" }}
            component={Link} to="/associates" 
          >
            <ListItemIcon>
            <Avatar sx={{bgcolor:"green"}}> <PersonTwoToneIcon /></Avatar>
            </ListItemIcon>
            <ListItemText primary="View Associates" sx={{color:"green"}} />
          </ListItem>
         
          <ListItem
            button
            key="Booking Requests"
            sx={{  padding: "15px" }}
            component={Link} to="/admincalendar"
          >
            <ListItemIcon>
            <Avatar sx={{bgcolor:"#1976d2"}}> <EventNoteTwoToneIcon /></Avatar>
            </ListItemIcon>
            <ListItemText primary="Booking Requests" sx={{color:"#1976d2"}}/>
          </ListItem>
         
          <ListItem
            button
            key="Schedule a Meeting"
            sx={{  padding: "15px"}}
          >
            <ListItemIcon>
            <Avatar sx={{bgcolor:pink[500]}}> <EventAvailableIcon /></Avatar>           
            </ListItemIcon>
            <ListItemText primary="Schedule a Meeting" sx={{color:pink[500]}}/>
          </ListItem>
          <ListItem
            button
            key="View Halls"
            sx={{  padding: "15px", marginBottom: "1px" }}
            component={Link}
            to="/halls"
          >
            <ListItemIcon>
            <Avatar sx={{bgcolor:"#7d047e"}}> <MeetingRoomTwoToneIcon /></Avatar>   
            </ListItemIcon>
            <ListItemText primary="View Halls" sx={{color:"#7d047e"}} component={Link} to="/halls"/>
          </ListItem>
         
        </List>
      </Drawer>
    </>
  );
};

export default AdminSideBar;
