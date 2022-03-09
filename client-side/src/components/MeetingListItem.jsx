import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import { Avatar, Card, ListItemText, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import { DataGrid } from '@mui/x-data-grid';

const MeetingListItem = () => {

    const columns = [
        { field: 'Icon', headerName: '', width: 90 },
        {
            field: 'title',
            headerName: 'Meeting Name',
            width: 150,
        },
        {
            field: 'lastName',
            headerName: 'Booked By',
            width: 150,
        },
        {
            field: 'startDate',
            headerName: 'Booking Date',
            width: 110,
        }   
        
    ];

    const rows = [
        {
            title: 'Website Re-Design Plan',
            startDate: new Date(2022, 2, 23, 9, 30),
            endDate: new Date(2022, 2, 23, 11, 30),
            location: "Room 1"
          }, {
            title: 'Book Flights to San Fran for Sales Trip',
            startDate: new Date(2022, 2, 13, 12, 0),
            endDate: new Date(2022, 2, 13, 13, 0),
            location: "Room 2"
          }, {
            title: 'Conference Meeting',
            startDate: new Date(2022, 2, 15, 12, 0),
            endDate: new Date(2022, 2, 15, 13, 0),
            location: "Room 1"
          }, {
            title: 'Final Budget Review',
            startDate: new Date(2022, 2, 26, 12, 0),
            endDate: new Date(2022, 2, 26, 13, 35),
            id: 4,
            location: 'Room 2',
          }, {
            title: 'New Brochures',
            startDate: new Date(2022, 2, 26, 14, 30),
            endDate: new Date(2022, 2, 26, 15, 45),
            id: 5,
            location: 'Room 2',
          }]
    return (
        <>
            <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
        </>
    )
}
export default MeetingListItem