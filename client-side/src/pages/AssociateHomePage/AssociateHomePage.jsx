
import { Box, Grid} from "@mui/material";
import AssociateSideBar from "../../components/associateSideBar/AssociateSideBar";
import AssociateTopBar from "../../components/associateTopBar/AssociateTopBar";
import WeekMeetings from "../../components/weekMeetings/WeekMeetings";

let AssociateHomePage = () => {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <AssociateTopBar />
        </Grid>
        <Grid item xs={2} >
          <AssociateSideBar />
        </Grid>
        <Grid item xs={10} sx={{ flexGrow: 1, pt: 3 }}>
         <WeekMeetings/>
        </Grid>
        
      </Grid>
      </Box>
    </>
  );
};

export default AssociateHomePage;
