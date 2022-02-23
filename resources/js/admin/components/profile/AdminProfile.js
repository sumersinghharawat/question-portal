import * as React from 'react';
import { TextField,Button,Grid } from "@mui/material";
import Header from '../../shared-components/header/Header';
import RequestService from '../../../Service/RequestService';
import toastr from "toastr";
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const navigate = useNavigate();

    const request = new RequestService;

    const SubmitForm = ()=>{
        console.log("submit");
    }

    const [userName,setUserName] = React.useState('');
    const [userFullName,setUserFullName] = React.useState('');
    const [userEmail,setUserEmail] = React.useState('');

    React.useEffect(()=>{
        document.title = "Profile";

        if(!request.loginedInAdmin()){
            navigate("/admin/login");
        }

        require('./profile.css');

        request.getRequest("profile").then((res)=>{
            setUserName(res.data.data.username);
            setUserEmail(res.data.data.email);
            setUserFullName(res.data.data.fullname);

        }).catch((err)=>{

            if(err.response.status == 500){
                navigate("/admin/login");
            }
            console.log(err);
        });


    },[]);

    return (
        <div>
            <Header />
            <div className="main-profile">
                <div style={{display:"flex",flexDirection:"column"}}>
                    <Grid item xs={12} textAlign={"center"}>
                        <h1>Profile</h1>
                    </Grid>
                    <div style={{width:"100%",margin:10}}>
                        <TextField id="demo-helper-text-aligned" label="Full Name" disabled={true} value={userFullName} style={{width:"100%"}}/>
                    </div>
                    <div style={{width:"100%",margin:10}}>
                        <TextField id="demo-helper-text-aligned-no-helper" label="User Name" disabled={true} style={{width:"100%"}} value={userName}/>
                    </div>
                    <div style={{width:"100%",margin:10}}>
                        <TextField id="demo-helper-text-aligned-no-helper" label="Email" disabled={true} style={{width:"100%"}} value={userEmail}/>
                    </div>
                    <div style={{width:"100%",margin:10,textAlign:"center"}}>
                        <Button variant="contained" onClick={()=>{
                            toastr.error("Coming soon!");
                        }}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
