import React,{useState, useHistory} from 'react';
import { AppBar,Avatar, Card, CardContent, Toolbar,Container,Grid,Paper, TextField, Typography,FormControl,Select,MenuItem,InputLabel,Box,Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import addDays from 'date-fns/addDays';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import isWeekend from 'date-fns/isWeekend';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TimePicker from '@mui/lab/TimePicker';

const AssociateBooking=()=> {
  //const history = useHistory();
  const [title,setTitle] = useState('');
  const [hall, setHall] = useState('');
  const [date, setDate] = useState(new Date());
  const [starttime, setStarttime] = useState(new Date('2020-01-01 12:00'));
  const [endtime,setEndtime] = useState(new Date('2020-01-01 12:00'));

   const handleTitle = (event) =>{
       setTitle(event.target.value);
       console.log(title)     
   }

  const handleChange = (event) => {    
    setHall(event.target.value); 
    console.log(event.target.value)
    
  };

  const PostData = async(e)=>{
    e.preventDefault();

    const res = await fetch("/scheduleRoutes",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          title,hall,date,starttime,endtime
        })
      });

      const data = await res.json();
      if(res.status === 422 || !data ){
        window.alert("UnSuccessful booking");
        console.log('UnSuccessful booking')
      }
      else{
        window.alert("Successful booking");
        console.log('Successful booking')
        //history.push('/calendarview')
      }
  }
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Associate name
              </Typography>
              <Typography variant="h6" component="div">
                ICTAK ID
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
                <form method='POST'>
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