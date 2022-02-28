import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Context } from "../../context/Context";
const LoginPage = () => {
    //Styles
    const paperStyle = { padding: 20, height: "70vh", width: 280, margin: "20px auto", };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const marginTop = { marginTop: 15 };
    const btstyle = { margin: "8px 0" };
    //States
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);
    const [formErrors, setFormErrors] = useState({});
    //manage submit click
    const [isSubmit, setIsSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validation());
        setIsSubmit(true);
        setShowAlert(false);
    };

    const validation = () => {
        let errors = {};
        if (!userRef.current.value) {
            errors.username = "Username is required";
            errors.showuser = true;
        }
        if (!passwordRef.current.value) {
            errors.showpassword = true;
            errors.password = "Password is required"
        }
        else if (passwordRef.current.value.length < 3) {
            errors.showpassword = true;
            errors.password = "Password should have minimum 3 characters"
        }
        return errors;
    }
    useEffect(async () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch({ type: "LOGIN_START" });
            try {
                const res = await axios.post("/user/login", {
                    username: userRef.current.value,
                    password: passwordRef.current.value,
                });
                console.log(res.data);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                alert("Login Successful!");
                window.location.replace("/userHome");
            } catch (error) {
                dispatch({ type: "LOGIN_FAILURE" });
                setShowAlert(true);
            }
        }
    }, [formErrors]);
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2> Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username" placeholder="Enter username" fullWidth error={formErrors.username}
                        inputRef={userRef} helperText={formErrors.showuser}
                    />
                    <TextField
                        label="Password" style={marginTop} placeholder="Enter password" type="password"
                        fullWidth error={formErrors.showpassword} helperText={formErrors.password} inputRef={passwordRef}
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember me" style={{ textAlign: "left", width: "100%" }}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btstyle}
                        fullWidth >
                        Sign in
                    </Button>
                    <Typography>
                        <Link href="#" underline="hover">  Forgot Password ?</Link>
                    </Typography>
                </form>
                <br />
                {showAlert &&  <Alert severity="error">Something went wrong!!</Alert>}
               
            </Paper>
        </Grid>
    );
};
export default LoginPage;
