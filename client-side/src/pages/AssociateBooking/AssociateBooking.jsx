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
import DisplayTimings from '../../components/displayTimings/DisplayTimings';

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
  const [times,setTimes] = useState([]) //for storing start and endtimes

  //useEffect -1 
    useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response =await axios.get("/halls");
        setallHalls(response.data);
        setHall(response.data[0].name)
       // console.log(response.data);
          } catch (err) {
      }
    }
    fetchHalls();
  }, []);

//useEffect 2
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response =await axios.get(`/bookings/search/${hall}/?date=${date}`);
        
        console.log(`response.data`,response.data);

        let i,arr=[],s_time,e_time;

      for(i = 0;i<response.data.length;i++){

      s_time = moment(response.data[i].starttime).format('hh:mm a')
      e_time = moment(response.data[i].endtime).format('hh:mm a')

     arr.push({"starttime":s_time,"endtime":e_time})
    }   
    console.log(arr)
    setTimes(arr);

          } catch (err) {
      }
    }
    fetchHalls();
  }, [hall,date]);

  //console.log(`halls- `,allHalls);

   const handleTitle = (event) =>{
       setTitle(event.target.value);
       //console.log(title)     
   }

  const handleChange = (event) => {    
    setHall(event.target.value); 
    const result = allHalls.find( ({ name }) => name === event.target.value );
    
    const temp1 = moment(result.starttime).format("HH:mm");
    const temp2 = moment(result.endtime).format("HH:mm");
    const myArray1 = temp1.split(":");
    const myArray2 = temp2.split(":");
   
    console.log(`myArray1`,myArray1,`myArray2`,myArray2);

    setminStarttime(new Date(0, 0, 0, parseInt(myArray1[0])));
    setmaxEndtime(new Date(0, 0, 0, parseInt(myArray2[0]), parseInt(myArray2[1])));

    setStarttime(minStarttime)
    setEndtime(minStarttime)
  };

  //on submitting the form, this happens
  const PostData= async (event) => {
    event.preventDefault();
    try {
      let temp1 = moment(date).format('DD/MM/YYYY');
      
      const response=await axios.post(`/bookings`, {
        associateName:userValue.username,ICTAKID:userValue._id,title:title,hall:hall,date:temp1,starttime:starttime,endtime:endtime     
      });
     
    } catch (err) {}
  }

  //for displaying timings on side
  const DispalyBookings=async (selecteddate)=>{
    let tempDate = moment(selecteddate).format('DD/MM/YYYY')

    const response = await axios.get(`/bookings/?date=${tempDate}`);
    //console.log(`date`,response.data)

    
    //console.log(times);  
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
                        <MenuItem key={key} value={hall.name}>{hall.name}</MenuItem>
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
                            DispalyBookings(date)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid xs={12} sm={6} item>
                      <DisplayTimings times={times}/>
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
        minTime={minStarttime}
        maxTime={maxEndtime}
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