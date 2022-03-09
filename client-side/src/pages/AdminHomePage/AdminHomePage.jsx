
import NavBar from '../../components/NavBar';
import HallDetails from '../../components/hallDetails/hallDetails';
import { Grid } from '@mui/material';
import AdminSideBar from '../../components/adminSideBar/AdminSideBar';
import Halls from '../../components/Halls';
import { useEffect, useState } from 'react';
import axios from "axios";
import AssociateDetails from '../../components/associateDetails/Associatedetails';

let AssociateHomePage = () => {
    var [allHalls, setallHalls] = useState([]);
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await axios.get("/halls");
                setallHalls(response.data);
            } catch (err) {
            }
        }
        fetchHalls();
    }, []);
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
               
                <Grid item xs={10} style={{ backgroundColor: "#efecec" }}>
                    <div style={{ padding: "10px" }}>
                    <HallDetails allHalls={allHalls} />
                    </div>
                    <br />
                    <div style={{ padding: "10px" }}>
                        <AssociateDetails />
                    </div>
                   
                </Grid>
            </Grid>
        </>
    )
}

export default AssociateHomePage;