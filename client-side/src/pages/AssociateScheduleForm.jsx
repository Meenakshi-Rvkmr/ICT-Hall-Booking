import { Avatar, Button, Grid, Paper, TextField,Link } from "@mui/material";

import Stack from '@mui/material/Stack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React,{useState} from 'react';

const AppointmentForm = () => {

const paperStyle = { padding: 20, height: "90vh", width: 300,margin: "20px auto" };
const avatarStyle = { backgroundColor: "#1bbd7e" };
const marginTop = { marginTop: 15 };
const btstyle={margin:'8px 0' }

const [hall, setHall] = useState('');
const [datefrom, setdatefrom] = useState(null);
const [dateto,setdateto] = useState(null);
const [timefrom,settimefrom]=useState(null);
const [timeto,settimeto] = useState(null);

const handleChange = (event) => {
    setHall(event.target.value);
  };

return (
  <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <EventAvailableIcon />
        </Avatar>
        <h2> Schedule meeting</h2>
      </Grid>
      
      <TextField
        label="Title" placeholder="Enter title of meeting" fullWidth required />
      
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hall name</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={hall}
          label="Hall name" onChange={handleChange}>
          <MenuItem value={10}>Hall 1</MenuItem>
          <MenuItem value={20}>Hall 2</MenuItem>
          <MenuItem value={30}>Hall 3</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={3}>
      <DatePicker label="Date from" value={datefrom} style={marginTop}
        onChange={(newValue) => {setdatefrom(newValue);}}
        renderInput={(params) => <TextField {...params} />}
      />

    { <DatePicker
        label="Date To" value={dateto} style={marginTop}
        onChange={(newValue) => {setdateto(newValue);}}
        renderInput={(params) => <TextField {...params} />}
      /> }
    <TimePicker
        label="Time from" value={timefrom}
        onChange={(newValue) => {
          settimefrom(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    <TimePicker label="Time to" value={timeto}
        onChange={(newValue) => {
          settimeto(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
    </LocalizationProvider>

    <Link to="/monthView"> <Button type='submit' color='primary' variant="contained" style={btstyle} fullWidth>Submit</Button></Link>
    
      </Paper>
    </Grid>
  );
};
export default AppointmentForm;