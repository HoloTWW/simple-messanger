import DoubleCheckmark from "../../components/DoubleChekmark";
import Checkmark from "../../components/Checkmark";

interface SenderProps{
    username:string;
    timestamp:string;
    checked:boolean;
    message:string;
}

const Sender:React.FC<SenderProps> = ({username,timestamp,checked,message}) =>{
    const CheckMessage = ()=>{
        let content = null; 
        if (checked === true){
            content = <DoubleCheckmark color={"currentColor"} size="5%"/>;
        }
        if (checked === false){
            content = <Checkmark color={"currentColor"} size="5%"/>;
        }

        return content;
    }
    return(<>
<div className=" d-flex justify-content-end mb-2">
    <div style={{maxWidth:"50%"}} className="bg-primary p-2 mx-2 rounded">
        <div className=" d-flex align-items-center justify-content-end ">
            <div className="fw-bold me-2">{username}</div> 
            <div className="ms-1">{timestamp}</div> 
            <CheckMessage />
        </div>
        <hr className="p-1 m-0"></hr>
        <div className="d-flex justify-content-end">
            {message}
        </div>
    </div>
    <img  
        height={"45px"} 
        className="rounded " 
        src="/default/avatar.jpeg" 
        alt={"avatar.jpg"}/>   
</div>
    </>)
}

export default Sender;