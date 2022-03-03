import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import {  Button, Grid, Paper, TextField, Typography,Box,ButtonBase,IconButton  } from "@mui/material";
import { InputLabel,Select,MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import validation from './validation';


//---------Customize Styling---------------
const paperStyle = {
    height: "74vh",
    borderRadius: "15px",
  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
//-----------------------------------------

//Global Variables
let sendRequestValues={};

var now = new Date();
var dateString = moment(now).format('YYYY-MM-DD');
var starttimeString = "";
var endtimeString = "";
var assignValues = {};
var hallimgFilename="";
const addImageSource="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png";

const CreateHallForm = (props) => {

//=========================Time Variables and associated functions================================
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

//=======================================================================================================================================


//========================Halltypes Decalration and fecthing it from API=====================================
const [hallTypes,setHallTypes] = useState([]);


//-----Fetch Api for Hall Types--------
useEffect(()=>{
    const fetchHallTypes= async () => {
      const response = await axios.get("/halltypes");
      setHallTypes(response.data); 
    };
    fetchHallTypes();
  },[])

//=======================================================================================================================================


//=================================Input Variables declartion and functions==================================================

var [inputValues,setinputValues]=useState(assignValues);
var [imageSource,setimageSource]=useState(addImageSource);
var [imageFile,setimageFile]=useState(null);


const valueEntered=(event)=>{
    let { name, value } = event.target; //destructuring
    
    setinputValues({ ...inputValues, [name]: value });
    setisSubmit(false);
  };

  const handleUploadClick=(event)=>{    
    var file = event.target.files[0];
    if(file){
      setimageFile(file);
      var url = URL.createObjectURL(file);
      setimageSource(url);
    }
  };

  const handleDeleteImage=()=>{
    if(imageSource!==addImageSource){
      setimageSource(addImageSource);
    }
  }

  
//State to verify success on submit
const [isSubmit,setisSubmit]=useState(false);

//State declaration for all the error messages
var [errorMessages,seterrorMessages]= useState({});

  //Manage from getting refreshed
  const handleSubmit=(event)=>{
    event.preventDefault();
    seterrorMessages(validation(inputValues,timeValues));    
    setisSubmit(true);
    if (imageFile) {
      hallimgFilename = Date.now() + imageFile.name;
    }
    sendRequestValues=senddataobject();
  };


//Submit
useEffect(()=>{
  if(Object.keys(errorMessages).length===0 && isSubmit){
    const AddHall=async()=>{
      try {
          if (imageFile) {
            const data =new FormData();
            data.append("name", hallimgFilename);
            data.append("file", imageFile);            
            try {
              await axios.post("/upload/hallimages", data);
            } catch (err) {

            }
          }

          const response=await axios.post(`/halls`, sendRequestValues);
          if(response.data){ 

            
            props.statusOperation("success");
          }

      }catch (err) { 
        setisSubmit(false); 
        props.statusOperation("error");
      }
        
     };
    AddHall();
  }
},[errorMessages,isSubmit]);

const senddataobject=()=>{
  console.log(hallimgFilename);
  const validValues={
    address: inputValues.address,
    capacity: parseInt(inputValues.capacity),
    hallimg: hallimgFilename,
    halltype: inputValues.halltype,
    name: inputValues.name,
    starttime: new Date(dateString+' '+timeValues.starttime).toISOString(),
    endtime: new Date(dateString+' '+timeValues.endtime).toISOString()
  };
  return validValues;
  
};

//=======================================================================================================================================

  return (
    <Grid mt={2}>
        <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
                
                <Box component={'form'} sx={{ m:3,width:'85%' }}
                     onSubmit={handleSubmit}                  
                >   

                  <Grid ml={1} container spacing={1}>
                    <Grid item xs={12} container alignItems={'end'} justifyContent='end' sx={{pr:'12px'}}>
                      <IconButton size='small' onClick={handleDeleteImage}>
                        <DeleteIcon  fontSize='1px'/>                        
                      </IconButton>
                    </Grid>
                      <Grid item xs={8} container direction="column" spacing={2}>
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
                      </Grid>
                      <Grid item xs={3} container direction="column">                          
                         
                          <input
                          accept="image/*"                          
                          type="file" 
                          id="btn-upload" 
                          name="btn-upload"
                          style={{ display: 'none' }}
                          onChange={handleUploadClick}/>  

                           <label htmlFor='btn-upload'>  
                           <ButtonBase variant='contained' component='span' sx={{ width: 128, height: 128,border: '3px solid #9e9e9e',borderRadius:'5px' }}>
                              <Img alt="complex" src={imageSource}/>                       
                          </ButtonBase>  
                          </label>      
                                                                             
                      </Grid>                    
                  </Grid>

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