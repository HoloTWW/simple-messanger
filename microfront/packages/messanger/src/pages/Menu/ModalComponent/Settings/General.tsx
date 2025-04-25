import { useState } from "react";

const General = ()=>{
    const [username,setUsername] = useState<string>("testUsername");
    const [username_,setUsername_] = useState<string>("testUserna");

    const [name,setName] = useState<string>("testName");
    const [name_,setName_] = useState<string>("testName");

    const [lastName,setLastName] = useState<string>("testLastName");
    const [lastName_,setLastName_] = useState<string>("testLastName");

    const [email,setEmail] = useState<string>("testEmail@mail.com");
    const [email_,setEmail_] = useState<string>("testEmail@mail.com");
    return(
<>
<div className="row row-cols-2">
    <div className="col-4 pe-0">
        <div>
            <img className="img-fluid rounded" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
            <div className=" btn btn-sm btn-outline-primary d-block mt-1">
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

<hr/>
<div className="d-grid gap-1">
    <button className="btn btn-primary ">Save</button>
</div>
</>)}

export default General;