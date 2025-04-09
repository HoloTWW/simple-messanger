import { CSSProperties, useEffect, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import Sender from "./Sender";
import Recipient from "./Recipient";

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
    <div className=" overflow-x-hidden flex-grow-1 d-flex flex-column-reverse">
    <Sender 
        username={"Me"} 
        timestamp={"19.02.2025 22:44"} 
        checked={false}
        message="my final message, goodbye... "/>
    <Recipient
        username={"Someone"} 
        timestamp={"19.02.2025 22:41"} 
        message="queres?"/>
    
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