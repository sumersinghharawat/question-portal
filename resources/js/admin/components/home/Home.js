import { Link, Button, Grid, TextField, Paper, styled, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../shared-components/header/Header";
import RequestService from "./../../../Service/RequestService";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Home() {

    const request = new RequestService;
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(request.loginedInAdmin());
    const [totalQuestion,setTotalQuestion] = useState(0);
    const [totalUsers,setTotalUsers] = useState(0);

    useEffect(() => {
        setLoggedIn(request.loginedInAdmin());
        if(!loggedIn){
            navigate("/admin/login")
        }


        request.getRequest('view-question').then((res)=>{

            setTotalQuestion(res.data.data.length);
        }).catch((err)=>{
            console.log(err);
        });


        request.getRequest('view-users').then((res)=>{

            setTotalUsers(res.data.data.length);
        }).catch((err)=>{
            console.log(err);
        });

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

  const question = () => {
      navigate("/admin/question");
  }

  const user = () => {
    navigate("/admin/users");
  }


    const WelcomeDashBoard = () => {

        return (
            <div>
                <div style={{marginTop:50}}>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={spacing} marginBottom={2}>
                                <Grid item style={{cursor:"pointer"}}  onClick={question}>
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
                                        Total Questions
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            {totalQuestion}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item style={{cursor:"pointer"}} onClick={user}>
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
                                        Total Users
                                        </Typography>
                                        <Typography component="p" variant="h4">
                                            {totalUsers}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
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
                                        navigate("/admin/login");
                                    }}>Login Now</Button>
                                </Item>
                            </Grid>
                        </Grid>
                        }
                </div>
            </div>
        </div>
  );
}
