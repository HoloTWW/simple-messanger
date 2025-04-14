import { CSSProperties, useEffect, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import Sender from "./Sender";
import Recipient from "./Recipient";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { uri_dict } from "../../components/api";

interface MessageProps {
  username: string;
  timestamp: string;
  checked: boolean | null; // allow null for checked
  message: string;
  id: string; // Assuming you have an 'id' field in your message
  chatId: string; // Assuming you have a 'chatId' field in your message
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
      margin: windowWidth <= 1140 ? '0' : '0 20% 0 20%', 
    };

    const chatId = useSelector((state:RootState)=> state.app.selectedChatId); 

    const [chatContent,setChatContent] = useState<MessageProps[]>([]); // исправить
    
    const handleUpdateData = (data:MessageProps[])=>{ // дописать
      setChatContent(data);
    }

    useEffect(()=>{
      axios.post(uri_dict.chat,{chatId:chatId})
        .then((r)=>{handleUpdateData(r.data)})
        .catch((e)=>{console.log(e)})
    },[chatId])

    const ChatContent = ()=>{
      return(<>
      {chatContent.map((message)=>(
        <div key={message.id}>
        {message.checked === null ? (
          <Recipient
            username={message.username}
            timestamp={message.timestamp}
            message={message.message}
          />
        ) : (
          <Sender
            username={message.username}
            timestamp={message.timestamp}
            checked={message.checked}
            message={message.message}
          />
        )}
      </div>
      ))}
      </>)
    }

    return(
<div style={st} className="d-flex flex-column h-100 bg-secondary-subtle">
    <div className=" overflow-x-hidden flex-grow-1 d-flex flex-column-reverse">
      {chatId}
    <ChatContent/>
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
    <div className=" px-3 my-3 py-2 d-flex align-items-end bg-body-secondary rounded">
      <TextareaAutosize 
        style={{ transition: 'height 0.3s ease' }} 
        className="form-control flex-grow-1 overflow-hidden" />
      <button className="btn btn-primary ms-3">Send</button>
    </div>
</div>
)};

export default Chat;