
import NavBar from '../../components/NavBar';
import HallDetails from '../../components/hallDetails/hallDetails';
import { Grid } from '@mui/material';
import AdminSideBar from '../../components/adminSideBar/AdminSideBar';

let AssociateHomePage = () => {

    return (
        <>
            <Grid container spacing={2}>
            <Grid item xs={2}>
                  
                </Grid>
                <Grid item xs={10}>
                    <NavBar />
                </Grid>
                <Grid item xs={2}>
                    <AdminSideBar />
                </Grid>
                {/* <Grid item xs={1}>                   
                </Grid>                 */}
                <Grid item xs={10}>
                    <HallDetails />
                </Grid>
            </Grid>
        </>
    )
}

export default AssociateHomePage;