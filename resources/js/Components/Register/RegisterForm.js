import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import toastr from "toastr";
import validator from 'validator';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequestService from "../../Service/RequestService";
import Header from "../../Shared-Component/header/Header";
import './register.css';

export default function LoginForm() {

    const [fullName,setFullName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [conpassword,setConPassword] = useState("");
    var request = new RequestService;
    const navigate = useNavigate;

    const Validations = () => {
        if(validator.isEmpty(fullName)){
            return [true,'Full name empty'];
        }

        if(validator.isEmpty(email)){
            return [true,'Email empty'];
        }

        if(!validator.isEmail(email)){
            return [true,'Invalid email'];
        }

        if(validator.isEmpty(userName)){
            return [true,'Username empty'];
        }

        if(validator.isEmpty(password)){
            return [true,'Password empty'];
        }

        if(validator.isEmpty(conpassword)){
            return [true,'Confirm Password empty'];
        }

        if(!validator.equals(conpassword,password)){
            return [true,'Password and Confirm Password not match'];
        }


        return false;
    }


    const submitForm = ()=>{

        if(Validations()[0]){
            toastr.error(Validations()[1]);
            return
        }

        request.postRequest('register', {
            username: userName,
            fullname: fullName,
            email: email,
            password: password,
            password_confirmation: conpassword
        })
        .then(function (response) {
            toastr.success('Registration successfully');

            setFullName("");
            setEmail("");
            setUserName("");
            setPassword("");
            setConPassword("");

            navigate("/login");
        })
          .catch(function (error) {
            console.log(error);

            if(error.response){
                if(error.response.data.errors.password){
                    toastr.error(error.response.data.errors.password[0]);
                }

                if(error.response.data.errors.email){
                    toastr.error(error.response.data.errors.email);
                }
            }
        });


    }

    return (
        <div>
        <Header />
        <Box className="main-section">
        <form>
            <Grid className="register-form" container spacing={2}>
                <Grid item xs={12}>
                <h1>Register Form</h1>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Full Name" type="text" value={fullName} onChange={(e)=>{
                    setFullName(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Email" type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="User Name" type="text" value={userName} onChange={(e)=>{
                    setUserName(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Password" type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Confirm Password" type="password" value={conpassword} onChange={(e)=>{
                    setConPassword(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <Button variant="contained" color="primary" onClick={submitForm}>
                    Submit
                </Button>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                    <Link to="/login" style={{textDecoration:"none",color:"#1976d2"}}>
                        <p>Login Now</p>
                    </Link>
                    <Link to="/forgotpassword" style={{textDecoration:"none",color:"#1976d2"}}>
                        <p>Forgot Password</p>
                    </Link>
                </Grid>
            </Grid>
        </form>
      </Box>
      </div>
  );
}
