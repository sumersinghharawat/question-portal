import { Paper } from "@mui/material";
import Header from "../../Shared-Component/header/Header";
import underconstruction from "../../../image/underconstruction.gif"


export default function UnderConstruction(){
    return (
        <div style={{backgroundColor:"#57b2ed"}}>
            <Header />
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",width:"98vw"}}>
                <div>
                <img style={{textAlign:"center"}} src={underconstruction} style={{width:"300px",height:"250px"}}/>
                <h1 style={{textAlign:"center"}}>Page in Under Construction</h1>
                </div>
            </div>
        </div>
    );
}
