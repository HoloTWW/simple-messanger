import { CSSProperties, useEffect, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';
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
        <div className="d-flex align-items-end justify-content-end ">
            <div className="fw-bold me-2">{username}</div> 
            <div className="ms-1">{timestamp}</div> 
            <CheckMessage />
        </div>
        <hr className="p-1 m-0"></hr>
        <div className="d-flex justify-content-end">
            {message}
        </div>
    </div>
    <img  height={"60px"} className="rounded d-flex align-self-" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>   
</div>
    </>)
}

// other
const Recipient = () =>{
    
    return(<>
<div className=" d-flex justify-content-start mb-2 ">
    <img  height={"60px"} className="rounded d-flex align-self-" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
    <div style={{maxWidth:"60%"}} className=" bg-secondary p-2 mx-2 rounded ">
        <div className="d-flex justify-content-between">
            <span className=" fw-bold">recipientName</span>
            <span>
                <span className="px-2">ch</span>
                <span className="px-2">timestamp</span> 
            </span>
        </div>
        <hr className="p-1 m-0"></hr>
        <div>
        Lorem Ipsum is simply dummy text of the printing 
        </div>
    </div>   
</div>
    </>)
}


const Chat = () =>{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Очистка при размонтировании компонента
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const st = {
        margin: windowWidth <= 1140 ? '0' : '0 20% 0 20%',  // Адаптивный отступ
        // Другие стили
      };
    return(
<div style={st} className="d-flex flex-column h-100 bg-secondary-subtle">
    <div className=" overflow-x-hidden px-5 flex-grow-1 d-flex flex-column-reverse">
    <Recipient/>
    <Sender 
        username={"Me"} 
        timestamp={"19.02.2025 22:44"} 
        checked={false}
        message="my final message, goodbye..."/>
        {/* это примеры сообщений  */}
    </div>
    <div className="px-3 my-3 py-2 d-flex align-items-end bg-body-secondary rounded">
      <TextareaAutosize 
        style={{ transition: 'height 0.3s ease' }} 
        className="form-control flex-grow-1" />
      <button className="btn btn-primary ms-3">Send</button>
    </div>
</div>
)};

export default Chat;