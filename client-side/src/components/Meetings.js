import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MeetingListItem from "./MeetingListItem";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import moment from "moment";
import { blue } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
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

const Meetings = ({ meetings }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "Icon",
      headerName: "",
     
      width: 90,
      renderCell: (params) => {
        return (
          <Avatar style={{backgroundColor:blue[200]}}><VideocamRoundedIcon/></Avatar>
        );
      },
    },
    {
      field: "title",
      headerName: "Meeting Name",
      headerClassName: 'super-app-theme--header',
      flex:1,
    },
    {
      field: "associateName",
      headerName: "Booked By",
      headerClassName: 'super-app-theme--header',
      flex:1,
    },
    {
      field: "date",
      headerName: "Booking Date",
      headerClassName: 'super-app-theme--header',
      flex:1,
    },
    {
      field: "time",
      headerName: "Booking Time",
      headerClassName: 'super-app-theme--header',
      flex:1,
    },
  ];

  const rows = meetings.map((meeting) => ({
    id: meeting._id,
    title: meeting.title,
    hall: meeting.hall,
    date: meeting.date,
    associateName: meeting.associateName,
    starttime: moment(new Date(meeting.starttime)).format("DD/MM/YYYY"),
    time:
      moment(new Date(meeting.starttime)).format("h:mm A") +
      " - " +
      moment(new Date(meeting.endtime)).format("h:mm A"),
  }));
  return (
    <div>
      <Button onClick={handleOpen}>Meetings</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"md"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Meetings Scheduled in {meetings[0]?.hall}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Box
              sx={{
                height: 400,
                width: 1,
                "& .super-app-theme--header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />{" "}
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Meetings;
