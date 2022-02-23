import * as React from 'react';
import { Box } from "@mui/system";
import Header from "../../shared-components/header/Header";
import UserList from "./UserList";
import QuestionList from './QuestionList';
import { Button } from '@mui/material';

export default function User(){

    const [user,setUser] = React.useState("");
    const [showQuestion, setShowQuestion] = React.useState(false);
    return (
        <div>
            <Header />
            {!showQuestion &&
            <Box maxWidth={1200} margin={"2% auto"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2>View Users</h2>
                </div>
                <UserList showQuestion={(res)=>{
                    setShowQuestion(true);
                    setUser(res);
                }}/>
            </Box>}


            {showQuestion &&
            <Box maxWidth={1200} margin={"2% auto"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2>View Question</h2>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setShowQuestion(false);
                        setUser("");
                    }}>Go Back</Button>
                </div>
                <QuestionList userId={user} />
            </Box>}
        </div>
    );
}
