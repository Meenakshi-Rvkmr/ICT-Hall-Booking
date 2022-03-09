import React from "react";
import Button from "@mui/material/Button";
// import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MeetingListItem from "./MeetingListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Meetings = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Meetings</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Meetings Scheduled in HallName</DialogTitle>
        <DialogContent >       
          <Paper>
            {/* <Scheduler style={{width:"100%"}} >
              <WeekView startDayHour={9} endDayHour={19} cellDuration={60}/>
              <Appointments />
            </Scheduler> */}
            <MeetingListItem/>
          </Paper>     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default Meetings;
