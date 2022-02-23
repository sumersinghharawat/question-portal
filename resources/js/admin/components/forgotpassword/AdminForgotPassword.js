import { Button, Grid, TextField } from "@mui/material";
import toastr from "toastr";
import validator from 'validator';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RequestService from "../../../Service/RequestService";
import Header from "../../shared-components/header/Header";
require("./forgotpassword.css");

export default function AdminForgotPassword() {

    var request = new RequestService;
    const navigate = useNavigate();

    const [email,setEmail] = useState("");

    const submitForm = (event) =>{

        if(Validations()[0]){
            toastr.error(Validations()[1]);
            return
        }

        request.postRequest('forgotpassword',{
            email: email
        })
          .then((response)=> {
            toastr.success('Email sent!');

        })
          .catch((error)=> {
            toastr.error(error.response.data.message);
        });



        event.preventDefault();
    }

    const Validations = () => {
        if(validator.isEmpty(email)){
            return [true,'Email empty'];
        }

        if(!validator.isEmail(email)){
            return [true,'Invalid email'];
        }
        return false;
    }

    return (
        <div>
            <Header />
            <div className="main-forgotpassword">
                <form  onSubmit={e => { e.preventDefault(); }}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <Grid item xs={12} textAlign={"center"}>
                            <h1>Forgot Password</h1>
                        </Grid>
                        <div style={{width:"100%",margin:10}}>
                            <TextField id="demo-helper-text-aligned-no-helper" onSubmit={submitForm} onChange={(e)=>{
                                setEmail(e.target.value);
                            }} label="Email" style={{width:"100%"}}/>
                        </div>
                        <div style={{width:"100%",margin:10,textAlign:"center"}}>
                            <Button type="button" variant="contained" onClick={submitForm}>Submit</Button>
                        </div>
                        <Grid item xs={12} style={{ paddingLeft:0,textAlign:"center"}}>
                            <Link to="/admin/login" style={{textDecoration:"none",color:"#1976d2"}}>
                                <p>Login</p>
                            </Link>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    );
}
