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
import validation from './Validation';

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
  const [formErrors, setFormErrors] = useState({});
  //useEffect -1 
    useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response =await axios.get("/halls");
        setallHalls(response.data);
        setHall(response.data[0].name)
        timeSettings(response.data[0]);        
          } catch (err) {
      }
    }
    fetchHalls();
  }, []);

//useEffect 2
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        let mdate = moment(date).format("DD/MM/YYYY")
        const response =await axios.get(`/bookings/search/${hall}/?mdate=${mdate}`); 
        
        let i,arr=[],s_time,e_time;

      for(i = 0;i<response.data.length;i++){

      s_time = moment(response.data[i].starttime).format('hh:mm a')
      e_time = moment(response.data[i].endtime).format('hh:mm a')

     arr.push({"starttime":s_time,"endtime":e_time})
    }   
    
    setTimes(arr);
    } catch (err) {
      }
    }
    fetchHalls();
  }, [hall,date]);


   const handleTitle = (event) =>{
       setTitle(event.target.value);        
   }

  const handleChange = (event) => {    
    setHall(event.target.value); 
    let result = allHalls.find( ({ name }) => name === event.target.value );   
    timeSettings(result);
  };
  //Setting the Time Pickers
   const timeSettings=(elementObj)=>{
   
    const temp1 = moment(elementObj.starttime).format("HH:mm");
    const temp2 = moment(elementObj.endtime).format("HH:mm");
    
    const myArray1 = temp1.split(":");
    const myArray2 = temp2.split(":");
    let time1,time2;
    time1=parseInt(myArray1[0]);
    time2=parseInt(myArray1[1]);
    setminStarttime(new Date(0, 0, 0,time1 ,time2));

    setStarttime(new Date(0, 0, 0,time1 ,time2))
    setEndtime(new Date(0, 0, 0,time1 ,time2))

    time1=parseInt(myArray2[0]);
    time2=parseInt(myArray2[1]);
    setmaxEndtime(new Date(0, 0, 0,time1,time2));   
   }

  //on submitting the form, this happens
  const PostData= async (event) => {
    event.preventDefault();
    try {

      let temp1 = moment(date).format('DD/MM/YYYY');
      let tempArray= temp1.split("/");
      tempArray[1]--;
      starttime.setDate(tempArray[0]);
      starttime.setMonth(tempArray[1]);
      starttime.setFullYear(tempArray[2]);

      endtime.setDate(tempArray[0]);
      endtime.setMonth(tempArray[1]);
      endtime.setFullYear(tempArray[2]);

      var obj = {title:title,hall:hall,date:temp1,starttime:starttime,endtime:endtime}  
        setFormErrors(validation(obj))
      //validate();
    //   const response=await axios.post(`/bookings`, {
    //     associateName:userValue.username,ICTAKID:userValue._id,title:title,hall:hall,date:temp1,starttime:temp2,endtime:temp3     
    //   });
    //  setHall(response.data.hall);
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
                <form onSubmit={PostData}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Title" name="title" 
                         placeholder="Title" value={title} onChange={handleTitle} error={formErrors.showtitle}
                         //helperText={formErrors.title}
                        fullWidth
                      />
                      <Typography sx={{fontSize:"15px",color:"red"}}>{formErrors.title}</Typography>   
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Hall
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="hall" 
                            label="Hall" value={hall} onChange={handleChange}  error={formErrors.showhall}
                            //helperText={formErrors.hall}                          
                            required
                          >
                             {allHalls?.map((hall,key)=>(
                        <MenuItem key={key} value={hall.name}>{hall.name}</MenuItem>
                        ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Typography sx={{fontSize:"15px",color:"red"}}>{formErrors.hall}</Typography>
                      
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                          //error={formErrors.showdate}
                          sx={{marginTop:"10px"}}
                          onChange={(newValue) => {
                            setDate(newValue); 
                          }}
                          renderInput={(params) => <TextField {...params}  helperText={formErrors.date} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
    
          <Grid item xs={12} sm={6} >
            <TimePicker
          renderInput={(params) => <TextField {...params}/>}
          value={starttime}
          label="Start time" name="starttime" required
          //error={formErrors.showstarttime} 
          onChange={(starttime) => {
            setStarttime(starttime); 
          }}
          minTime={minStarttime}
          maxTime={maxEndtime}
        />
        <Typography>{formErrors.starttime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
    <TimePicker 
          renderInput={(params) => <TextField {...params}/>}
          label="End time" name="endtime" required
         // error={formErrors.showendtime}
          value={endtime} 
          onChange={(endtime) => {
            setEndtime(endtime);
          }}
        minTime={minStarttime}
        maxTime={maxEndtime}
        />
        <Typography>{formErrors.endtime}</Typography>
        </Grid>
     
    </LocalizationProvider>
                    
                    <Grid xs={12} style={{ marginTop: "20px" }}>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth 
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