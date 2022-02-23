import { Paper } from "@mui/material";
import react from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Error404() {

    return (<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",width:"100vw"}}>
        <Paper elevation={3} style={{padding:"5%"}}>
            <h2>Error Page 404</h2>
        </Paper>
    </div>);
}
