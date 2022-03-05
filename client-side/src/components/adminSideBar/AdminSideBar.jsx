import {
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
              boxShadow: 3
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          
          <List>
            <ListItem button key="Add Associate" sx={{boxShadow: 2, padding:"15px", marginBottom:"1px"}}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Add Associate" />
            </ListItem>
            <Divider />
            <ListItem button key="Booking Requests" sx={{boxShadow: 2, padding:"15px", marginBottom:"1px"}}>
              <ListItemIcon>
                <CalendarViewDayIcon />
              </ListItemIcon>
              <ListItemText primary="Booking Requests" />
            </ListItem>
            <Divider />
            <ListItem button key="Schedule a Meeting" sx={{boxShadow: 2, padding:"15px", marginBottom:"1px"}}>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Schedule a Meeting" />
            </ListItem>
            <ListItem button key="View Halls" sx={{boxShadow: 2, padding:"15px", marginBottom:"1px"}} component={Link} to="/halls">
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="View Halls" />
            </ListItem>
            <Divider />
          </List>
        </Drawer>
      </>
    );
  };
  
  export default AdminSideBar;
  