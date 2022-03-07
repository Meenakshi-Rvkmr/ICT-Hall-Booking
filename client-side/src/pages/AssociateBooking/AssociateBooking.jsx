import React,{useState} from 'react';
import { AppBar,Avatar, Card, CardContent, Toolbar,Container,Grid,Paper, TextField, Typography,FormControl,Select,MenuItem,InputLabel,Box,Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import addDays from 'date-fns/addDays';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import isWeekend from 'date-fns/isWeekend';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TimePicker from '@mui/lab/TimePicker';
import axios from 'axios';
import moment from 'moment';
const userValue = localStorage.getItem("user") === "undefined" ? null : JSON.parse(localStorage.getItem("user"))

const AssociateBooking=()=> {
 
  const [title,setTitle] = useState('');
  const [hall, setHall] = useState('');
  const [date, setDate] = useState(new Date());
  let [starttime, setStarttime] = useState('');
  let [endtime,setEndtime] = useState('');
//use moments - format

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  let sTime = moment(starttime).format("h:mm:ss p")
  let eTime = moment(endtime).format("HH:mm:ss")
  console.log(sTime)
   const handleTitle = (event) =>{
       setTitle(event.target.value);
       console.log(title)     
   }

  const handleChange = (event) => {    
    setHall(event.target.value); 
    console.log(event.target.value)
    
  };

  const PostData= async () => {
    try {
      const response=await axios.post(`/api/schedule`, {
        title:title,hall:hall,date:date,starttime:starttime,endtime:endtime
      });
    } catch (err) {}
  }
  
   
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userValue.username}
              </Typography>
              <Typography variant="h6" component="div">
               {userValue._id}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Container fixed style={{ marginTop: "20px" }}>
          <Paper elevation={10}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Avatar style={{ backgroundColor: "#1bbd7e" }}>
                  <EventAvailableIcon />
                </Avatar>{" "}
              </Grid>
              <Grid item>
                <Typography variant="h3" color="green">
                  Schedule Meeting
                </Typography>
              </Grid>
            </Grid>

            <Card>
              <CardContent>
                <form>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="Title" name="title" 
                         placeholder="Title" value={title} onChange={handleTitle}
                        fullWidth
                        required
                      />
                      
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Hall
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="hall" 
                            label="Hall" value={hall} onChange={handleChange}                          
                            required
                          >
                            <MenuItem value="hall1">Hall 1</MenuItem>
                            <MenuItem value="hall2">Hall 2</MenuItem>
                            <MenuItem value="hall3">Hall 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        required
                      >
                        <StaticDatePicker
                          orientation="landscape"
                          openTo="day" name="date"
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 20)} 
                          shouldDisableDate={isWeekend}
                          value={date} 
                          onChange={(date) => {
                            setDate(date);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"  
                  >

        <LocalizationProvider dateAdapter={AdapterDateFns}>
    
            <Grid xs={12} sm={6} item >
            <TimePicker
          renderInput={(params) => <TextField {...params} />}
          value={starttime}
          label="Start time" name="starttime" 
          onChange={(starttime) => {
            setStarttime(starttime);
            console.log(starttime);
          }}
          minTime={new Date(0, 0, 0, 13,2)}
          maxTime={new Date(0, 0, 0, 18, 45)}
        />
        </Grid>
        <Grid xs={12} sm={6} item>
    <TimePicker
          renderInput={(params) => <TextField {...params} />}
          label="End time" name="endtime"
          value={endtime} 
          onChange={(endtime) => {
            setEndtime(endtime);
          }}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'hours' && timeValue % 2) {
              return true;
            }

            return false;
          }}
        />
        </Grid>
     
    </LocalizationProvider>
                    
                    <Grid xs={12} style={{ marginTop: "20px" }}>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth onClick={PostData}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </>
    );
}

export default AssociateBooking;