import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAssociate.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateAssociate from "../../components/create-Associate.component";
import EditAssociate from "../../components/edit-Associate.component";
import AssociateList from "../../components/Associate-list.component";
import { Grid } from "@mui/material";
import AdminSideBar from "../../components/adminSideBar/AdminSideBar";
import AssociateNavBar from "../../components/AssociateNavBar";
function ViewAssociates() {
  // window.open("http://localhost:3001")

  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#efecec" }}>
      <Grid item xs={2}>
        <AdminSideBar />
      </Grid>
      <Grid item xs={10} alignItems="center" justifyContent="center">
        <AssociateNavBar />
        <AssociateList/>
      </Grid>
    </Grid>
  );
}

export default ViewAssociates;
