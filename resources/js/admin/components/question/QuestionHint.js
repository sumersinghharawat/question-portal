import * as React from 'react';
import { Box, Button, Fab, Paper, TextField } from "@mui/material";
import toastr from 'toastr';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import RequestService from '../../../Service/RequestService';

export default function QuestionHint(props){

    const [inputBox,setInputBox] = React.useState([{label:"Hint 1",value:""}]);
    // const [inputHintIndex,setInputHintIndex] = React.useState("");
    const request = new RequestService;

    const removeElement = (index) => {
        var array = [...inputBox];
        if (index !== -1) {
            array.splice(index, 1);
            setInputBox(array);
        }
    }

    const EnterHints = (key,value) => {
        var array = [...inputBox];
        array[key].value = value;
        setInputBox(array);
    }

    let inputBoxs = [];

    React.useEffect(()=>{

        let questionId = props.questionId;
        let array = [];
        if(questionId){
            request.getRequest('view-question-hint/'+questionId).then((res)=>{
                res.data.data.map((item,index)=>{
                    console.log(array);
                    array.push({label:"hint",value:item.question_hint});
                });

                setInputBox(array);

            }).catch((err)=>{
                console.log(err);
            });
        }

        setInputBox(inputBoxs);
    },[]);


    return (
        <Paper style={{padding:"1%",width:"100%",justifyContent: "center",textAlign: "center",display: "flex",flexDirection: "column",alignContent: "center",alignItems: "center"}} elevation={0 }>
        <div>
            <Fab color="primary" aria-label="add" onClick={()=>{
                let count = inputBox.length;
                let check = false;
                if(count < 3){

                    inputBox.map((item)=>{
                        if(item.value == null || item.value == ""){
                            toastr.error("Enter Question hint in Blank");
                            check = true;
                        }
                    })
                    if(check){
                        return;
                    }
                    inputBoxs.push(...inputBox,{label:"Hint" ,value:""});
                    setInputBox(inputBoxs);
                }else{
                    toastr.error("Sorry, Hint length only 3");
                }

            }} size={"small"}>
                <AddIcon />
            </Fab> Click here for add Hint.
        </div>
        {
        inputBox.map((item,index)=>{

            props.hints(inputBox);

            return (
                <div style={{margin: "1% 0%",display: "flex",alignItems:"center"}}>
                    <TextField id="outlined-basic" label={item.label} id={'hint-'+index} variant="outlined" onChange={(e)=>{
                        EnterHints(index,e.target.value);
                    }} value={item.value} key={index} />
                    <Fab color="primary" aria-label="add" value={index} style={{ margin:"0% 1%" }} onClick={()=>{
                        removeElement(index);
                    }} size={"small"}>
                        <ClearIcon />
                    </Fab>
                </div>

            );
        })}
    </Paper>
    );

}
