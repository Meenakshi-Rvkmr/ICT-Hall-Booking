import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AdminSideBar from "./adminSideBar/AdminSideBar";
import AssociateNavBar from "./AssociateNavBar";
import { Grid, Paper } from "@mui/material";

export default class CreateAssociate extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeIctakid = this.onChangeIctakid.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: "",
      email: "",
      ictakid: "",
      phone: "",
      password: "",
    };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeIctakid(e) {
    this.setState({ ictakid: e.target.value });
  }
  onChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const AssociateObject = {
      name: this.state.name,
      email: this.state.email,
      ictakid: this.state.ictakid,
      phone: this.state.phone,
      password: this.state.password,
    };
    axios
      .post("/Associates/create-Associate", AssociateObject)
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      email: "",
      ictakid: "",
      phone: "",
      password: "",
    });
  }

  render() {
    return (
      <>
        <Grid container spacing={2} sx={{ backgroundColor: "#efecec" }}>
          <Grid item xs={2}>
            <AdminSideBar />
          </Grid>
          <Grid item xs={10} alignItems="center" justifyContent="center">
            <AssociateNavBar />
            <Paper
              elevation={3}
              sx={{
                margin: "10%",
                padding: "10px",
                maxWidth: "50%",
                marginTop: "20px",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </Form.Group>

                  <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </Form.Group>

                  <Form.Group controlId="Itcakid">
                    <Form.Label>ICTAK-ID</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={this.state.ictakid}
                      onChange={this.onChangeIctakid}
                    />
                  </Form.Group>
                  <Form.Group controlId="Phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                    />
                  </Form.Group>
                  <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    size="lg"
                    block="block"
                    type="submit"
                    className="mt-4"
                  >
                    Add Associates
                  </Button>
                </Form>
              </div>
            </Paper>
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Associate added Successfully!!!
              </Alert>
            </Snackbar> */}
          </Grid>
        </Grid>
      </>
    );
  }
}
