import DoubleCheckmark from "../../components/DoubleChekmark";
import Checkmark from "../../components/Checkmark";
import React from 'react';

interface RecipientProps{
    username:string;
    timestamp:string;
    message:string;
}

const Recipient:React.FC<RecipientProps> = ({username,timestamp,message}) =>{
    return(<>
<div className=" d-flex justify-content-start mb-2">
    <img  
        height={"45px"} 
        className="rounded " 
        src="/default/avatar.jpeg" 
        alt={"avatar.jpg"}/>
    <div style={{maxWidth:"50%"}} className="bg-secondary p-2 mx-2 rounded">
        <div className="d-flex align-items-center justify-content-start ">
            <div className="me-1">{timestamp}</div> 
            <div className="fw-bold ms-2">{username}</div> 
        </div>
        <hr className="p-1 m-0"></hr>
        <div className="d-flex justify-content-start">
            {message}
        </div>
    </div>   
</div>
    </>)
}

export default Recipient;