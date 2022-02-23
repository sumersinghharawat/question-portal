import { Button, Grid, Link, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestService from "../../../Service/RequestService";
import Header from "../../shared-components/header/Header";
import toastr from "toastr";
import validator from 'validator';

export default function AdminChangePassword(){

    var request = new RequestService;
    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [conPassword,setConPassword] = useState("");

    useEffect(() => {

        require('./changepassword.css');


        const query = new URLSearchParams(window.location.search);

        const token = query.get('token');
        if(token){
            localStorage.setItem('admin_token',"Bearer "+token);
            navigate("/admin/changepassword");
        }

        let loggedIn = localStorage.getItem('admin_token')?true:false;

        if(!loggedIn){
            navigate("/admin");
        }
    });

    const Validations = () => {
        if(validator.isEmpty(password)){
            return [true,'Password empty'];
        }
        if(validator.isEmpty(conPassword)){
            return [true,'Password empty'];
        }
        if(!validator.equals(password,conPassword)){
            return [true,'Password not Match'];
        }
        return false;
    }

    const submitForm = ()=>{
        if(Validations()[0]){
            toastr.error(Validations()[1]);
            return
        }

        request.postRequest('changepassword',{
            password: password,
            password_confirmation: conPassword
        })
          .then((response)=> {
            toastr.success('Password Changed');

            navigate("/admin");

        })
          .catch((error)=> {
            if(err.response.status == 500){
                navigate("/login");
            }
            toastr.error(error.response.data.message);
        });


    }

    return (
        <div>
        <Header />
        <Box className="main-changepassword">
        <form>
            <Grid className="login-form" container spacing={2} style={{margin:"auto",textAlign:"center"}}>
                <Grid item xs={12}>
                <h1>Change Password</h1>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Password" type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <TextField label="Confirm Password" type="password" value={conPassword} onChange={(e)=>{
                    setConPassword(e.target.value);
                }}/>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft:0}}>
                <Button variant="contained" color="primary" onClick={submitForm}>
                    Submit
                </Button>
                </Grid>
                { !request.loginedIn && <Grid item xs={12} style={{ paddingLeft:0}}>
                    <Link to="/register" style={{textDecoration:"none",color:"#1976d2"}}>
                        <p>Register Now</p>
                    </Link>
                    <Link to="/forgotpassword" style={{textDecoration:"none",color:"#1976d2"}}>
                        <p>Forgot Password</p>
                    </Link>
                </Grid>}
            </Grid>
        </form>
      </Box></div>);
}
