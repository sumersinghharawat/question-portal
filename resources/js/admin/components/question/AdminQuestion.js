import { useEffect, useState } from "react";
import Header from "../../shared-components/header/Header";
import AddQuestion from "./AddQuestion";
import ViewQuestion from "./ViewQuestion";


export default function AdminQuestion(){

    const [addQuestion,setAddQuestion] = useState(false);
    const [addQuestionId,setAddQuestionId] = useState(false);

    useEffect(()=>{
        document.title = "Question";
    },[]);

    return (
        <div>
            <Header />
            {!addQuestion && <ViewQuestion changePage={()=>{
                setAddQuestion(true);
            }} id={(id)=>{
                setAddQuestionId(id);
            }}/>}
            {addQuestion && <AddQuestion  changePage={()=>{
                setAddQuestion(false);
            }} id={addQuestionId} />}
        </div>
    );
}
