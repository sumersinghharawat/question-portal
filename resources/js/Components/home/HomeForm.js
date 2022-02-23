import { Link, Button, Grid, TextField, Paper, styled, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestService from "../../Service/RequestService";
import Header from "../../Shared-Component/header/Header";
import './home.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function HomeForm() {

    const request = new RequestService;
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState('');
    const [products,setProducts] = useState([]);


    useEffect(() => {
        setLoggedIn(request.loginedIn());
        // if(!loggedIn){
        //     navigate("/login")
        // }
        // viewData();
        document.title = "Question Portal";

    },[]);



    // const viewData = ()=>{
    //         request.getRequest('view-product')
    //       .then((response)=> {
    //         setProducts(response.data.data);
    //         return response.data;
    //     })
    //       .catch((error)=> {
    //         toastr.error(error.response.data.message);
    //     });
    //     console.log("Data Loaded!");
    // }
    const [spacing, setSpacing] = React.useState(2);

    const handleChange = (event) => {
      setSpacing(Number(event.target.value));
    };

    const jsx = `
  <Grid container spacing={${spacing}}>
  `;

  function preventDefault(event) {
    event.preventDefault();
  }

    const WelcomeDashBoard = () => {

        return (
            <div>
                <h2>Welcome</h2>
                <Button  variant="contained" onClick={()=>{
                    navigate("/question");
                }}>Today Question?</Button>
                {/* <div style={{marginTop:50}}>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={spacing}>
                                <Grid item>
                                    <Paper
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                        elevation={2}
                                        sx={{
                                        height: 140,
                                        width: 300
                                        }}
                                    >
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Total Question
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            10
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                        elevation={2}
                                        sx={{
                                        height: 140,
                                        width: 300
                                        }}
                                    >
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Pending Question
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            10
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                        elevation={2}
                                        sx={{
                                        height: 140,
                                        width: 300
                                        }}
                                    >
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Complete Question
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            10
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                        elevation={2}
                                        sx={{
                                        height: 140,
                                        width: 300
                                        }}
                                    >
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Total Score
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            10
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div> */}
            </div>
        );
    }

    return (
        <div className="main-section-home">
            <Header />
            <div style={{padding:"2%",display:"flex",alignItems:"center",width:"96%"}}>
                <div style={{padding: "5%",textAlign:"center",width:"90%"}}>
                        <h1>Question Portal</h1>
                        {loggedIn &&  <WelcomeDashBoard />}
                        {!loggedIn && <Grid spacing={2} container>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <p>Login for Today question.</p>
                                    <Button variant="contained" onClick={()=>{
                                        navigate("/login");
                                    }}>Login Now</Button>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <p>Register for Daily question.</p>
                                    <Button variant="contained" onClick={()=>{
                                        navigate("/register");
                                    }}>Register Now</Button>
                                </Item>
                            </Grid>
                        </Grid>
                        }
                </div>
            </div>
        </div>
  );
}
