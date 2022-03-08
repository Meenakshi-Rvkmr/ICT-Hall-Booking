import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, } from '@mui/material';
import HallSidebar from '../../components/hallSideBar/HallSidebar';
import HallList from '../../components/hall_list/HallList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


const HallPage = () => {

  //State declaration for all the halls
  var [allHalls, setallHalls] = useState([]);
  let [offsetValue,setoffsetValue]=useState(0);
  let [totalDocs,settotalDocs]=useState(0);
  let [disablePrevBtn,setdisablePrevBtn]=useState(true);
  let [disableNextBtn,setdisableNextBtn]=useState(false);

    //Get the total count of documents
    useEffect(() => {
      const getTotalHalls = async () => {
        try {
           const response =await axios.get("/halls/counthall/all");
             settotalDocs(response.data);

             if (response.data <= 3){setdisableNextBtn(true);}      
             } catch (err) {
               console.log(err);
         }
      }
      getTotalHalls();    
    }, []);

  //Fetch the halls from the db
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response =await axios.get(`/halls/${offsetValue}/page`);
        setallHalls(response.data);
          } catch (err) {
      }
    }
    fetchHalls();
  }, [offsetValue]);

  //Previous and Next Button related functions
  const handlePrevious = () =>{
    let nextValue=offsetValue - 3;
    if(disableNextBtn===true){
      setdisableNextBtn(false);
    }
    
    if (nextValue===0){
      setdisablePrevBtn(true);
    }
    setoffsetValue(nextValue);  

  }

  const handleNext = (event) =>{
    let checkValue=offsetValue + 6;
    if(disablePrevBtn===true){
      setdisablePrevBtn(false);
    }
    let nextValue=offsetValue + 3;
    if (checkValue>=totalDocs){
      setdisableNextBtn(true);
    }
    setoffsetValue(nextValue);    
  }

  return (
    <>
      <Box sx={{background: 'linear-gradient(to right, #cfd9df 30%, #e2ebf0 90%)',p:5 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <HallList allHalls={allHalls} />
          </Grid>
          <Grid item xs={5}>
            <HallSidebar />
          </Grid>
        </Grid><br></br>

        <Box sx={{width: "52%",ml:'2em',display:'flex',justifyContent:'space-between',alignItems:'center',bgcolor:'transparent'}}>         
              <Button variant="outlined"  startIcon={<ArrowLeftIcon />} sx={{bgcolor:'white'}} disabled={disablePrevBtn} onClick={handlePrevious}>Previous</Button>
              <Button variant="outlined"  endIcon={<ArrowRightIcon />} sx={{bgcolor:'white'}} disabled={disableNextBtn} onClick={handleNext}>Next</Button>          
        </Box>  
      </Box>
    </>
  )
}

export default HallPage