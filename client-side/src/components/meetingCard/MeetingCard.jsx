import { Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
let MeetingCard = ({meeting}) => {
  return (
    <>
      <Card variant="outlined" sx={{ boxShadow: 3 , marginRight:"10px"}}>
        <div style={{height:"10px", backgroundColor:"#64b5f6"}}></div>
        <CardContent>
          
          <Typography variant="h6" component="div" >
           Today's Meeting
          </Typography>
         <br/>
          <Typography variant="h5" sx={{ mb: 1.5, textAlign:"left"}}>
           {meeting?.title}
          </Typography>
          <Divider />
          <Typography variant="h7" component="div" sx={{textAlign:"left", fontWeight:"medium", padding:"10px"}} >
           When
          </Typography>
          <Typography variant="body2" sx={{textAlign:"left"}}>
            <AccessTimeTwoToneIcon sx={{color:"gray", paddingRight:"10px"}} />
           {meeting.DurationFrom} to {meeting.DurationTo}
          </Typography>
          <Divider/>
          <Typography variant="h7" component="div" sx={{textAlign:"left", fontWeight:"medium", padding:"10px"}} >
           Where
          </Typography>
          <Typography sx={{ fontSize: 14, textAlign:"left" }} color="text.secondary" gutterBottom>
           <LocationOnTwoToneIcon sx={{color:"blue",paddingRight:"10px"}}/>{meeting.HallName}
          </Typography>
         
        </CardContent>
        <CardActions>
          <Button size="small">View Calendar</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MeetingCard;
