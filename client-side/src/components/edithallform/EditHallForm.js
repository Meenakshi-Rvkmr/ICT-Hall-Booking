import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import {  Button, Grid, TextField, Typography,Box,ButtonBase,IconButton  } from "@mui/material";
import { InputLabel,Select,MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import validation from './validation';

//---------Customize Styling---------------
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
var hallimgFilename="";
const addImageSource="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png";

const EditHallForm = (props) => {

  const hall = props.hall;
  
  const PF = (hall.hallimg) ? `http://localhost:5000/hallimages/${hall.hallimg}` : addImageSource;
 
  const [inputValues,setinputValues]=useState({name: hall.name,address: hall.address,halltype: "",capacity: hall.capacity});
  
  
  var [imageSource,setimageSource]=useState(PF);
  var [imageFile,setimageFile]=useState(null);
 
//========================Halltypes Decalration and fecthing it from API=====================================
const [hallTypes,setHallTypes] = useState([]);


//-----Fetch Api for Hall Types--------
useEffect(()=>{
    const fetchHallTypes= async () => {
      const name="halltype"
      const response = await axios.get("/halltypes");
      setHallTypes(response.data);  
      setinputValues({ ...inputValues, [name]: hall.halltype });           
    };
    fetchHallTypes();
  },[])

//=======================================================================================================================================
     
      
//=============Time Declaration and converion======================================================
  const [timeValues, settimeValues] = useState({starttime: moment(hall.starttime).format('HH:mm:ss'),endtime: moment(hall.endtime).format('HH:mm:ss')});

  const findAmPm=(timeValue)=>{
        const chkTime=timeValue.slice(0, 2);
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

//=================================Input Variables declartion and functions==================================================
    
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
      hall.hallimg="";
      
    }
  }

  //======================State to verify success on submit=================================================
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
          const UpdateHall=async()=>{            
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
                  console.log(sendRequestValues)
                const response = await axios.put(`/halls/${hall._id}`, sendRequestValues);
                if(response.data){       
                  props.statusOperation("success");
                }
      
            }catch (err) { 
              setisSubmit(false); 
              props.statusOperation("error");
            }
              
           };
           UpdateHall();
        }
      },[errorMessages,isSubmit]);
      
      const senddataobject=()=>{
        //console.log(hallimgFilename);
        if (!imageFile) {
          hallimgFilename = hall.hallimg;
        }
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
                              error={errorMessages.address? true : false}
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
                                ml='2px' fullWidth>Update</Button>
    
                    </Box>
                </Grid>
  )
}

export default EditHallForm;
