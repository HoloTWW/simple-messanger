import React, { useState } from "react";

const SignUp = ()=>{

    const [login,setLogin] = useState<string>();
    const [password,setPassword] = useState<string>();

    const [valid,setValid] = useState(false);
    
    const styleContainer = {
        width:"100%",
        maxWidth:"330px",
        padding:"15px",
        margin: "10% auto"
    }

    const label:string = "Sign Up";
    const label_login:string = "Login";
    const label_email:string = "Email";
    const label_pswd:string = "Password";
    const label_confpswd:string = "Confirm password";
    const label_remember = "Remember me?";


    const v_default:string = "form-control";
    const v_invalid:string = "form-control is-invalid";

    const handleOnSubmit = () =>{
        
    }


    return (<>
<div style={styleContainer} className="border border-2 rounded-3 bg-secondary-subtle">
    <div className="text-center">
        <img className="rounded border border-1" src="/default/avatar.jpeg" alt={"avatar.jpeg"} height={"75px"} width={"75px"}/>
        <h1> {label}</h1>
    </div>

    <hr/>

    <div>
        <div className="my-2 mt-3">
            <label>{label_login}</label>
            <input className={valid ? v_default : v_invalid }  type="text"/>
        </div>
        <div className="my-2 mt-3">
            <label>{label_email}</label>
            <input className={valid ? v_default : v_invalid }  type="email"/>
        </div>
        <div className="my-2">
            <label>{label_pswd}</label>
            <input className= {valid ? v_default : v_invalid } type="password"/>
        </div>
        <div className="my-2">
            <label>{label_confpswd}</label>
            <input className= {valid ? v_default : v_invalid } type="password"/>
        </div>

        <div className="mt-4 row mx-auto">
            <button className="btn btn-primary">Sign Up</button>
            <span className="mt-2 form-check mx-auto">
                <input className=" form-check-input" type="checkbox"/>
                <label className=" form-check-label">{label_remember}</label>
            </span>
        </div>
        { !valid ? <label className="text-danger fw-semibold">Incorrect login or password, try again</label> : null}
    </div>
</div>
    </>)
};



export default SignUp;