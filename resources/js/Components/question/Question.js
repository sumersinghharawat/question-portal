import { Alert, Box, Button, FormControl, FormLabel, Grid, Paper, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Header from "../../Shared-Component/header/Header";
import RequestService from "../../Service/RequestService";
import toastr from "toastr";
import validator from 'validator';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Question(){

    const request = new RequestService;
    const navigate = new useNavigate();

    const [questionPaper,setQuestionPaper] = useState(true);
    const [todayQuestion,setTodayQuestion] = useState({});
    const [todayAnswer,setTodayAnswer] = useState("");
    const [todayQuestionHints,setTodayQuestionHints] = useState([]);
    const [todayQuestionShowHints,setTodayQuestionShowHints] = useState(0);

    useEffect(()=>{
        request.getRequest('get-today-question').then((res)=>{
            console.log(res);
            if(res.data.data == null){
                setTodayQuestion(res.data.data.question);
                return;
            }

            if(res.data.data.question_answer){
                setQuestionPaper(false);
                setTodayQuestion(res.data.data.question);
                setTodayAnswer(res.data.data.question_answer);
                setTodayQuestionHints(res.data.data.hints);
            }else{
                setTodayQuestion(res.data.data);
                setTodayQuestionHints(res.data.data.hints);
                setTodayQuestionShowHints(res.data.data.usedHints);
            }
        }).catch((err)=>{

            setTodayQuestion(null);
            console.log(err.response.status);
            console.log("err");
        });
    },[]);

    const showHint = (e) =>{
        if(parseInt(todayQuestionShowHints)+1 == e){
            setTodayQuestionShowHints(parseInt(e));
            toastr.success("You choosed hint number "+":"+(parseInt(todayQuestionShowHints)+1));
        }else{
            toastr.error("Please choose hint number "+":"+(parseInt(todayQuestionShowHints)+1));
            return;
        }

        updateUserQuestion();
    }

    const updateUserQuestion = () => {
        console.log(todayAnswer);
        console.log(todayQuestionShowHints);
        console.log(todayQuestion.id);

        request.postRequest('submit-question',{
            question_id:todayQuestion.id,
            question_answer:todayAnswer,
            question_used_hints:parseInt(todayQuestionShowHints)+1,
        }).then((res)=>{
            return true;
        }).catch((err)=>{
            console.log(err);
        })
    }

    const submitAnswer = () => {
        if(validator.isEmpty(todayAnswer)){
            toastr.error("Please enter the answer");
            return
        }

        updateUserQuestion();

        toastr.success("Thank you for submit your answer.");

        setQuestionPaper(false);
    }

    return (
        <div>
            <Header />
            <div>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} maxWidth={700} margin={"0 auto"}>
                    {todayQuestion != null?false:true &&
                        <h4>No Question for Today.</h4>
                    }
                    {todayQuestion == null?false:true && <div>
                    {questionPaper && <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", margin:"5%"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} textAlign={"center"}>
                            <h2>Your today's question here.</h2>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <p>
                                {todayQuestion.question}
                            </p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField id="outlined-multiline-static" label="Answer" multiline rows={4} placeholder="Write answer here..." fullWidth={true} value={todayAnswer} onChange={(e)=>{
                                setTodayAnswer(e.target.value);
                            }}/>
                        </Grid>
                        <Grid item xs={12} md={12} marginTop={"50px"}>
                            <b>Do you want to use hint?</b>
                        </Grid>
                        {
                        todayQuestionHints.map((items,index)=>{
                            console.log(items.viewd);
                            return (
                            (todayQuestionShowHints>=items.question_hint_number?true:false || items.viewd == true?true:false)?
                                <Grid item xs={12} md={4} key={index}>
                                    <Item>
                                        {items.question_hint}
                                    </Item>
                                </Grid>
                                :
                                <Grid item xs={12} md={4} key={index} onClick={()=>{showHint(items.question_hint_number)}}>
                                    <Item>
                                        {items.question_hint_number}
                                    </Item>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                        <div style={{width:"100%",marginTop:50,textAlign:"center"}}>
                            <Button variant="contained" onClick={submitAnswer}>Submit</Button>
                        </div>
                    </div>
                    }

                    {!questionPaper && <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", margin:"5%"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} textAlign={"center"}>
                            <h2>Your today's question here.</h2>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <p>
                                {todayQuestion.question}
                            </p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <b>{todayAnswer}</b>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <p>Correct Answer is :- <b severity="success">{todayQuestion.answer}</b></p>
                        </Grid>
                        {todayQuestionHints.length == 0?false:true &&
                        <Grid item xs={12} md={12} marginTop={"50px"}>
                            <b>Do you want to use hint?</b>
                        </Grid>
                        }
                        {
                        todayQuestionHints.map((items,index)=>{
                            console.log(items.viewd);
                            return (
                                <Grid item xs={12} md={4} key={index}>
                                    <Item>
                                        {items.question_hint}
                                    </Item>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                    {questionPaper && <div style={{width:"100%",marginTop:50,textAlign:"center"}}>
                            <Button variant="contained" onClick={submitAnswer}>Submit</Button>
                        </div>}
                    </div>
                    }
                    </div>
                    }
                </Box>
            </div>
        </div>
    );
}
