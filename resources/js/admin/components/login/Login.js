import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toastr from "toastr";
import validator from 'validator';
import RequestService from "../../../Service/RequestService";
import { useNavigate } from "react-router-dom";
import Header from "../../shared-components/header/Header";



export default function LoginForm() {
    var request = new RequestService;
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loggedIn,setLoggedIn] = useState(request.loginedInAdmin());

    useEffect(() => {
        require('./login.css');

        setLoggedIn(loggedIn);
        if(loggedIn){
            navigate("/admin");
        }

    },[]);

    const Validations = () => {
        if(validator.isEmpty(email)){
            return [true,'Email empty'];
        }

        if(validator.isEmpty(password)){
            return [true,'Password empty'];
        }

        if(!validator.isEmail(email)){
            return [true,'Invalid email'];
        }
        return false;
    }

    const submitForm = ()=>{
        if(Validations()[0]){
            toastr.error(Validations()[1]);
            return
        }

        request.postRequest('login',{
            email: email,
            password: password
        })
          .then((response)=> {

            if(response.data.data.user.role != "admin"){
                toastr.error("Invalid details.");
                return
            }

            toastr.success('Login successfully');

            let token = response.data.data.token;

            localStorage.setItem('admin_token',"Bearer "+token);

            navigate("/admin");

        })
          .catch((error)=> {
            toastr.error(error.response.data.message);
        });


    }

    return (
        <div>
        <Box className="main-section">
        <form>
            <Grid className="login-form" container spacing={2}>
                <Grid item xs={12}>
                <h1>Login Form</h1>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Email" type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                </Grid>

                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Password" type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <Button variant="contained" color="primary" onClick={submitForm}>
                    Submit
                </Button>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                    <Link to="/admin/forgotpassword" style={{textDecoration:"none",color:"#1976d2"}}>
                        <p>Forgot Password</p>
                    </Link>
                </Grid>
            </Grid>
        </form>
      </Box></div>);
}
