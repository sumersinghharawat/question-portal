import * as React from 'react';
import { Box, Button, Fab, Paper, Switch, TextField } from "@mui/material";
import toastr from 'toastr';
import QuestionHint from './QuestionHint';
import RequestService from '../../../Service/RequestService';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

export default function AddQuestion(props){

    const questionId = props.id?props.id:0;

    const request = new RequestService;
    const navigate = new useNavigate();

    const [question,setQuestion] = React.useState("");
    const [answer,setAnswer] = React.useState("");
    const [questionStatus,setQuestionStatus] = React.useState(true);
    const [hints,setHints] = React.useState([]);

    React.useEffect(()=>{

        setQuestion("");
        setAnswer("");
        setQuestionStatus(true);
        setHints([]);

        if(questionId){
            request.getRequest('view-question/'+questionId).then((res)=>{

                setQuestion(res.data.data.question);
                setAnswer(res.data.data.answer);
                setQuestionStatus(res.data.data.status?true:false);
            }).catch((err)=>{
                console.log(err);
            });
        }
    },[]);

    const submitForm = () => {

        if(validator.isEmpty(question)){
            toastr.error("Please enter question!");
            return ;
        }
        if(validator.isEmpty(answer)){
            toastr.error("Please enter answer!");
            return ;
        }
        console.log(question);
        console.log(answer);
        console.log(answer);
        console.log(hints);
        console.log(questionStatus);

        toastr.warning("Please wait...");
        request.postRequest(questionId?'update-question/'+questionId:'add-question',{question:question,answer:answer}).then((res)=>{
            let id = res.data.data.id;
            console.log(id);
            if(hints.length != 0){
                hints.map((item,index)=>{
                    console.log(item.value);

                    request.postRequest('add-question-hint',{
                        question_hint_number:index+1,
                        question_id:id,
                        question_hint:item.value
                    }).then((res)=>{

                    }).catch((err)=>{
                        console.log(err);
                    })
                })
            }
            toastr.success(questionId?'Question updated!':'Question added!');
            // props.changePage(false);
        }).catch((err)=>{
            console.log(err);
            toastr.error('Question not added!');
        });


    }

    return (
        <Box maxWidth={1200} margin={"2% auto"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2>Add Questions</h2>
                <Button variant="contained" color="primary"  onClick={()=>{
                    props.changePage(false);
                }}>View Question</Button>
            </div>
            <Paper style={{padding:"5%", textAlign:"center"}}>
                <div style={{padding:"1%"}}>
                    <TextField id="outlined-basic" label="Question?" variant="outlined" onChange={(e)=>{
                        setQuestion(e.target.value);
                    }} value={question}/>
                </div>
                <div style={{padding:"1%"}}>
                    <TextField id="outlined-basic" label="Answer" variant="outlined" onChange={(e)=>{
                        setAnswer(e.target.value);
                    }} value={answer}/>
                </div>
                <div style={{padding:"1%"}}>
                    <Switch checked={questionStatus?true:false} onChange={()=>{
                        setQuestionStatus(!questionStatus);
                    }} inputProps={{ 'aria-label': 'controlled' }}/> Status
                </div>
                <QuestionHint hints={(hint)=>{
                    setHints(hint);
                }} questionId={questionId}/>
                <div style={{padding:"1%"}}>
                    <Button variant='contained' onClick={submitForm}>Submit</Button>
                </div>
            </Paper>
        </Box>
        );
}
