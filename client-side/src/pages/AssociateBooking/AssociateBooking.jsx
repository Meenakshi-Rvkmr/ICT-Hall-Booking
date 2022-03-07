import React,{useState,useEffect} from 'react';
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
  const [allHalls,setallHalls] = useState([]) 
  const [minStarttime,setminStarttime] = useState(new Date());
  const [maxEndtime,setmaxEndtime] = useState(new Date());

    useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response =await axios.get("/halls");
        setallHalls(response.data);
        console.log(response.data);
          } catch (err) {
      }
    }
    fetchHalls();
  }, []);

  console.log(`halls- `,allHalls);

   const handleTitle = (event) =>{
       setTitle(event.target.value);
       console.log(title)     
   }

  const handleChange = (event) => {    
    setHall(event.target.value); 
    const result = allHalls.find( ({ _id }) => _id === event.target.value );
    
    const temp1 = moment(result.starttime).format("HH:mm");
    const temp2 = moment(result.endtime).format("HH:mm");
    const myArray1 = temp1.split(":");
    const myArray2 = temp2.split(":");
    // minTime={new Date(0, 0, 0, 8)}
    // maxTime={new Date(0, 0, 0, 18, 45)}
    console.log(`myArray1`,myArray1,`myArray2`,myArray2);

    setminStarttime(new Date(0, 0, 0, parseInt(myArray1[0])));
    setmaxEndtime(new Date(0, 0, 0, parseInt(myArray2[0]), parseInt(myArray2[1])));

    setStarttime(minStarttime)
  };

  const PostData= async () => {
    try {
      const response=await axios.post(`/bookings`, {
        associateName:userValue.username,ICTAKID:userValue._id,title:title,hall:hall,date:date,starttime:starttime,endtime:endtime     
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
                             {allHalls?.map((hall,key)=>(
                        <MenuItem key={key} value={hall._id}>{hall.name}</MenuItem>
                        ))}
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
          minTime={minStarttime}
          maxTime={maxEndtime}
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