import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ()=>{

    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const [valid,setValid] = useState(true);
    
    const styleContainer = {
        width:"100%",
        maxWidth:"330px",
        padding:"15px",
        margin: "10% auto"
    }

    const label:string = "Sign In";
    const label_login:string = "Login";
    const label_pswd:string = "Password";

    const v_default:string = "form-control";
    const v_invalid:string = "form-control is-invalid";

    // const {login} = useAuth();
    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent) => {
        navigate('/main');
        // console.log(username);
        // console.log(password);
        // e.preventDefault();
        // const success = await login(username, password);
        // if (success) {
            
        // }
    };


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
            <input onChange={(value)=>setUsername(value.target.value)} className={valid ? v_default : v_invalid } type="text"/>
        </div>
        <div className="my-2">
            <label>{label_pswd}</label>
            <input onChange={(value)=>setPassword(value.target.value)} className= {valid ? v_default : v_invalid } type="password"/>
        </div>
        <Link to={"/auth/sign-up"}>Or sign up?</Link>
        <div className="mt-4 row mx-auto">
            <button onClick={handleOnSubmit} className="btn btn-primary">Sign In</button>
        </div>
        { !valid ? <label className="text-danger fw-semibold">Incorrect login or password, try again</label> : null}
    </div>
    
    
</div>
    </>)
};



export default SignIn;