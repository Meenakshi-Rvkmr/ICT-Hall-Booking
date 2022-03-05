import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const AssociateDetails = () => {
    return (
        <div>
        <Card sx={{ maxWidth: 1000}}>
        <div style={{ width: '100%',height:'100%',
                  padding: '5px',backgroundColor:'#FFFDD0' }}>
                       <h3 style={{ width: '100%',
                  paddingLeft: '10px',color:"blue" }}>Associate Details</h3>


        <Card sx={{ maxWidth: 400 }} style={{ width: '100%',  
                  padding: '15px' ,margin:'10px'}}>
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

     
        
      </CardActionArea>
      </Card> 
      </div>
      </Card>
        </div>
    );
};

export default AssociateDetails;

