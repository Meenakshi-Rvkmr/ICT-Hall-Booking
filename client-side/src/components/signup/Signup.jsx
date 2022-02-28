import React from "react";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik, Field, Form, Error, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { FormHelperText } from "@material-ui/core";
// import Checkbox from "@mui/material/Checkbox";

const Signup = () => {
  const paperStyle = { padding: 20, width: 280, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 8 };
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    ictakId: "",
    phoneNumber: "",
    Password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Its too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    ictakId: Yup.string().required("Required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid phone number")
      .min(10, "Phone number length should be 10")
      .required("Required"),
    Password: Yup.string()
      .min(8, "Password minimum length should be 6")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password")], "Password not matched")
      .required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            {" "}
            Please fill this form to create an account!
          </Typography>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                style={marginTop}
                fullWidth
                label="Name"
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                name="email"
                style={marginTop}
                fullWidth
                label="Email"
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl component="fieldset" style={marginTop}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <Field
                  as={RadioGroup}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="gender" />
              </FormHelperText>
              <Field
                as={TextField}
                name="ictakId"
                style={marginTop}
                fullWidth
                label="ICTAK ID"
                helperText={<ErrorMessage name="ictakId" />}
              />
              <Field
                as={TextField}
                name="phoneNumber"
                style={marginTop}
                fullWidth
                label="Phone Number"
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <Field
                as={TextField}
                name="Password"
                style={marginTop}
                fullWidth
                label="Password"
                helperText={<ErrorMessage name="Password" />}
              />
              <Field
                as={TextField}
                type="password"
                name="confirmPassword"
                style={marginTop}
                fullWidth
                label="Confirm Password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              {/* <FormControlLabel control={<Checkbox name="checkedA" />} label="" /> */}
              <Button
                style={marginTop}
                type="submit"
                variant="contained"
                color="primary"
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};
export default Signup;
