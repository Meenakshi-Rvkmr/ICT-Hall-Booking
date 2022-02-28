import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import {  Button, Grid, Paper, TextField, Typography,Box,  } from "@mui/material";
import { InputLabel,Select,MenuItem } from "@mui/material";
import validation from './validation';


//---------Customize Styling---------------
const paperStyle = {
    height: "84vh",
    borderRadius: "15px",
  };
//-----------------------------------------

//Global Variables
let sendRequestValues={};

var now = new Date();
var dateString = moment(now).format('YYYY-MM-DD');
var starttimeString = "";
var endtimeString = "";
var assignValues = {};


const CreateHallForm = (props) => {

  if(props.ID===""){
    starttimeString=moment(now).format('HH:mm');
    endtimeString=moment(now).format('HH:mm');
    assignValues={name:'',address:'',halltype:'',capacity:0}
  }

  const [timeValues, settimeValues] = useState({starttime:starttimeString ,endtime:endtimeString});

  const findAmPm=(timeString)=>{
    const chkTime=timeString.slice(0, 2);
    const ampm = ((chkTime >= 12) ? 'PM' : 'AM');
    return ampm;
  };

  const [timeAmPm, settimeAmPm] = useState({starttime:findAmPm(timeValues.starttime) ,endtime:findAmPm(timeValues.endtime)}); 
  
  const timeValueEntered=(event)=>{
    let { name, value } = event.target;
    settimeValues({ ...timeValues, [name]: value });
    settimeAmPm({ ...timeAmPm, [name]: findAmPm(value)});
    setisSubmit(false);
  };


//--State declaration for halltypes
const [hallTypes,setHallTypes] = useState([]);


//-----Fetch Api for Hall Types--------
useEffect(()=>{
    const fetchHallTypes= async () => {
      const response = await axios.get("/halltypes");
      setHallTypes(response.data); 
    };
    fetchHallTypes();
  },[])

//State declaration for all the input variables
var [inputValues,setinputValues]=useState(assignValues);

//For storing the values entered
const valueEntered=(event)=>{
    let { name, value } = event.target; //destructuring
    if(name==='capacity')
    {value=parseInt(value);}
    setinputValues({ ...inputValues, [name]: value });
    setisSubmit(false);
  };

  
//State to verify success on submit
const [isSubmit,setisSubmit]=useState(false);

//State declaration for all the error messages
var [errorMessages,seterrorMessages]= useState({});

  //Manage from getting refreshed
  const handleSubmit=(event)=>{
    event.preventDefault();
    seterrorMessages(validation(inputValues,timeValues));    
    setisSubmit(true);
    sendRequestValues=senddataobject();
  };


//Submit
useEffect(()=>{
  if(Object.keys(errorMessages).length===0 && isSubmit){
    const AddHall=async()=>{
      console.log("response.data");
      try {
          const response=await axios.post(`/halls`, sendRequestValues);
          if(response.data){ props.statusOperation="Success";}
      }catch (err) { setisSubmit(false); }
        props.statusOperation="Error";
     };
    AddHall();
  }
},[errorMessages,isSubmit]);

const senddataobject=()=>{
  const validValues={
    address: inputValues.address,
    capacity: inputValues.capacity,
    hallimg: "",
    halltype: inputValues.halltype,
    name: inputValues.name,
    starttime: new Date(dateString+'T'+timeValues.starttime+'Z'),
    endtime: new Date(dateString+'T'+timeValues.endtime+'Z')
  };
  return validValues;
};


  return (
    <Grid mt={2}>
        <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <br></br>
                <Typography component={'h2'} mx={4} mt={1}
                            sx={{letterSpacing: "2px",fontWeight:"600",borderTop:'1px solid black',borderBottom:'1px solid black'}}>
                Hall</Typography>
                <Box component={'form'} sx={{ m:3,width:'75%' }} 
                     onSubmit={handleSubmit}                  
                >
                    <TextField 
                        label="Name*"  sx={{ mt:2 }}
                        placeholder="Name of the Hall"
                        name='name'
                        autoFocus
                        fullWidth
                        size="small"
                        error={errorMessages.name? true : false}
                        value={inputValues.name}
                        onChange={valueEntered}
                        />
                        <Box height={10}  sx={{ mb:2 }}>
                            <Typography textAlign={'left'} pl={1} sx={{fontSize:'9px',color:'red'}}>
                              {errorMessages.name}
                            </Typography>
                        </Box>
                        
                    <TextField
                        label="Address*"
                        name='address'
                        multiline
                        rows="2"
                        fullWidth
                        size="small"
                        error={errorMessages.name? true : false}
                        value={inputValues.address}
                        onChange={valueEntered}
                        /> 
                        <Box height={10} sx={{ mb:2 }}>
                              <Typography textAlign={'left'} px={1} sx={{fontSize:'9px',color:'red'}}>
                                {errorMessages.address}
                              </Typography>
                        </Box>

                    <Box
                        sx={{
                        display: 'flex',
                        }}
                     >
                       
                        <Select
                        id="select-id" sx={{ width: '57%', mr:'12px' }}
                        name='halltype'
                        size="small"
                        defaultValue={hallTypes.length !==0 ? hallTypes[0].name : ""}
                        value={inputValues.halltype}
                        onChange={valueEntered}                        
                        label='Hall Type'
                    >
                        {/* <MenuItem value=''><em>None</em></MenuItem> */}
                        {hallTypes?.map((halltype,key)=>(
                        <MenuItem key={key} value={halltype.name} sx={{textTransform:'capitalize'}}>{halltype.name}</MenuItem>
                        ))}
                        </Select>
                         <TextField style ={{width: '35%'}}
                            label="Capacity"
                            name='capacity'
                            type='number'
                            size="small"
                            inputProps={{min:0}}
                            value={inputValues.capacity}
                            onChange={valueEntered}
                        /><Typography component={'span'} fontSize={'10px'} 
                                   ml={1}  mt={2}>Seats</Typography>
                    </Box> <br></br>

                    <InputLabel align='left' id="timelabel">Time Available*</InputLabel>
                    <Box
                        labelid='timelabel'
                        height={'65px'}
                        alignItems='center'
                        justifyContent={'center'}
                        sx={{
                        display: 'flex',
                        border: '1px solid grey',
                        borderRadius:'5px'
                        }}
                     >
                        <TextField style ={{width: '30%'}} mt='2px'
                            variant='filled'
                            label="From"
                            name='starttime'
                            type='time'
                            size="small"
                            value={timeValues.starttime}
                            onChange={timeValueEntered}
                        /><Typography component={'span'} fontSize={'12px'} lineHeight={'1px'}
                                       mx={1}  mt={3}>{timeAmPm.starttime}</Typography>
                         <TextField  style ={{width: '30%'}}
                            variant='filled'
                            label="To" 
                            name='endtime'
                            type='time'
                            size="small"
                            value={timeValues.endtime}
                            onChange={timeValueEntered}
                        /><Typography component={'span'} fontSize={'12px'} lineHeight={'1px'}
                                   ml={1}  mt={3}>{timeAmPm.endtime}</Typography>
                    </Box>
                      <Box height={10}>
                            <Typography textAlign={'left'} px={1} sx={{fontSize:'9px',color:'red'}}>
                              {errorMessages.time}
                            </Typography>
                      </Box>
                    <br></br>

                    <Button type='submit' color='primary' variant="contained" 
                            ml='2px' fullWidth>Add</Button>

                </Box>
            </Grid>
        </Paper>
    </Grid>
  )
}

export default CreateHallForm;