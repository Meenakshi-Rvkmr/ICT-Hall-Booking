import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {Link} from "react-router-dom"
import { green,blue, purple } from "@mui/material/colors";

let AssociateSideBar = () => {
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
            boxShadow: 3
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <br></br>
        <List>
          <ListItem button key="Upcoming Events" sx={{padding:"15px"}} component={Link} to="/userHome">
            <ListItemIcon>
            <Avatar sx={{bgcolor:green[800]}}> <EventIcon /></Avatar>
              
            </ListItemIcon>
            <ListItemText primary="Upcoming Events" sx={{color:green[800]}}/>
          </ListItem>
          
          <ListItem button key="Booking Requests" sx={{padding:"15px"}} component={Link} to="/calendar">
            <ListItemIcon>
            <Avatar sx={{bgcolor:blue[500]}}> <CalendarViewDayIcon /></Avatar>              
            </ListItemIcon>
            <ListItemText primary="Booking Requests" sx={{color:blue[500]}}/>
          </ListItem>
          
          <ListItem button key="Schedule a Meeting" sx={{padding:"15px"}} component={Link} to="/schedule">
            <ListItemIcon>
            <Avatar sx={{bgcolor:purple[800]}}> < EventAvailableIcon /> </Avatar>             
            </ListItemIcon>
            <ListItemText primary="Schedule a Meeting" sx={{color:purple[800]}}/>
          </ListItem>        
          
        </List>
      </Drawer>
    </>
  );
};

export default AssociateSideBar;
