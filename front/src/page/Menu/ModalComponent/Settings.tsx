import React, { CSSProperties, useState } from "react";

interface SettingsProps{
    onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({onClose}) =>{

    const st:CSSProperties = {
        zIndex:1000,
        position: 'absolute',
        left: '50%',  // Position horizontally centered
        top: '10%',   // 10% from the top
        transform: 'translateX(-50%)', // Correct for left: 50% positioning
        width: '400px', // Specified width
        maxHeight:'80%',
        padding: '1rem', // optional, to give the content some space inside
    };

    const [username,setUsername] = useState<string>("testUsername");
    const [username_,setUsername_] = useState<string>("testUserna");

    const [name,setName] = useState<string>("testName");
    const [name_,setName_] = useState<string>("testName");

    const [lastName,setLastName] = useState<string>("testLastName");
    const [lastName_,setLastName_] = useState<string>("testLastName");

    const [email,setEmail] = useState<string>("testEmail@mail.com");
    const [email_,setEmail_] = useState<string>("testEmail@mail.com");
    

    const header:string = "Settings";
    
    const Content = () =>{
        return(<>
        <div className="row row-cols-2">
            <div className="col-4 pe-0">
                <div>
                    <img className="img-fluid rounded" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
                    <div className=" btn btn-sm btn-outline-primary d-block">
                        <label className="d-block" style={{cursor:"pointer"}} htmlFor="customAvatar" >Change</label>
                        <input id="customAvatar" type="file" className="form-control d-none"/>
                    </div>
                </div>
            </div>

            <div className="col text-start">
                <div className="fs-5">{name} {lastName}</div>
                <hr/>
                <div className="fs-6">@{username}</div>
            </div>
        </div>
        
        <hr/>

        <div className=" form-floating mb-2">
            <input type="text" id="blabla" placeholder={username} className="form-control" ></input>
            <label htmlFor="blabla">Username</label>
        </div>

        <div className=" form-floating mb-2">
            <input type="email" id="femail" placeholder={email} className="form-control" ></input>
            <label htmlFor="">Email</label>
        </div>

        <hr/>

        <div className=" form-floating mb-2">
            <input type="text" id="fname" placeholder={name} className="form-control" ></input>
            <label htmlFor="">Name</label>
        </div>

        <div className=" form-floating mb-2">
            <input type="text" id="flastname" placeholder={lastName} className="form-control" ></input>
            <label htmlFor="">Last Name</label>
        </div>

        </>)
    }

    return(
<div  style={st} className="bg-light-subtle rounded overflow-hidden">
    <div className="row">
        <div className="col">
        <h3>{header}</h3>
        </div>
        <div className="col-2">
            <button onClick={onClose} className="btn-close"></button>
        </div>
    </div>
    <hr/>
    <div style={{height:"40rem",overflowX: 'hidden',overflowY: 'auto',} }>
        <div className=" btn-group-vertica w-100">
             <Content/>
        </div>
    </div>
</div> 
)}

export default Settings;