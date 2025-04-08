import { Link } from "react-router-dom";
import Checkmark from "../../components/Checkmark";
import DoubleCheckmark from "../../components/DoubleChekmark";
import { useState } from "react";

const generateArray = (length:number, max:number) => (
    [...new Array(length)]
      .map(() => Math.round(Math.random() * max))
  );

interface ChatListItemProps {
    username:string,
    message:string,
    timestamp:string,
    fromSender?:boolean | null,
};

const ChatListItem:React.FC<ChatListItemProps> = ({username,message,timestamp,fromSender}) =>{
    const [hover,setHover] = useState<boolean>(false);

    const CheckMessage = ()=>{
        let content = null; 
        if (fromSender === true){
            content = <DoubleCheckmark color={"currentColor"} size="85%"/>;
        }
        if (fromSender === false){
            content = <Checkmark color={"currentColor"} size="85%"/>;
        }

        return content;
    }

    return(
<Link to={"/chat/user"} className="w-100 btn btn-outline-secondary rounded-0 border-0 m-0 p-0 px-2 py-1">
    <div className="row row-cols-2">
        <div className="col-2 d-none d-xxl-block">
            <img className="rounded"  height={"60px"}  src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
        </div>
        <div className="col-auto col-lg-10 ">
            <div className="row ">
                <div className="col-8 fs-5 text-body-secondary text-truncate text-start">
                    {username}
                </div>
                <div className="col  p-0">
                    <div className="">
                        <CheckMessage/>
                    </div>
                </div>
                <div className="col-3">
                    {timestamp}
                </div>
            </div>
            <div className="row">
                <div className="col text-truncate text-start">
                    {message}
                </div>
                
            </div>
        </div>
    </div>      
</Link>
)};


const ChatList = ()=>{
    const g = generateArray(20,25)
    const [cheked,setChecked] = useState<boolean | null>(null);
    
    const handleReset = ()=>{
        setChecked(null);
    }

    const handleCheck = ()=>{
        if (cheked){
            setChecked(false);
        }
        if (cheked === false){
            setChecked(true);
        }
        else if(cheked === null){
            setChecked(true);
        }
    }
    return(<div>
        <button onClick={handleReset} className="btn btn-secondary">Reset</button>
        <button onClick={handleCheck} className="btn btn-primary">Test Check</button>
    {g.map((item,index)=>(
        <ChatListItem 
            username={"username loooooooooooooooooooon" + index} 
            message={"message loooooooooooooooooooooooonсячсчясчся" + index}
            timestamp={`${index}.03.2025`}
            fromSender={cheked}
            
            />))} 
    
    </div>)
};

export default ChatList;