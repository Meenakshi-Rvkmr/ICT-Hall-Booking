// import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Meetings from './Meetings';


const Halls = () => {

    // const[hallinfo,sethallinfo]=useState([]);

    // useEffect(()=>{
    //     const fetchData= async()=>{
    //          const result= await fetch(`/api/articles`)
    //          const body=await result.json()
    //          sethallinfo(body)  
             
    //     }
    //     fetchData()
    // },[])

    return (
        <>
        
        <Card sx={{ maxWidth: 1000}}>
      
      <div style={{ width: '100%',height:'100%',
                padding: '5px',backgroundColor:'#FFFDD0' }}>
                      <h3 style={{ width: '100%',
                paddingLeft: '10px',color:"blue" }}>Hall Details</h3>

      <Card sx={{ maxWidth: 855 }} style={{ width: '100%',  
                padding: '10px' ,margin:'10px'}}>
    <CardActionArea>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

     <Meetings/>
      
    </CardActionArea>
    </Card>
    </div>
   
   
  </Card>

      
    

        </>
      

    );
};

export default Halls;