import React from 'react';
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

    const [chatContent,setChatContent] = useState<MessageProps[]>([]); 
    
    const handleUpdateData = (data:MessageProps[])=>{
      setChatContent(data);
    };

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
    
    // textarea

    const [message,setMessage] = useState<string>("");
    const handleOnChangeMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
      setMessage(e.target.value);
    }

    const handleSendMessage = ()=>{
      axios.post(uri_dict.chat_send,{chatId:chatId,message:message})
        .then((r)=>{
          const newMessage: MessageProps = r.data;

          // Append the new message to the existing chatContent
          setChatContent((prevChatContent) => [newMessage,...prevChatContent]);

          // Clear the input field
          setMessage('');
        })
        .catch((e)=>console.log(e))
    };

    return(
<div style={st} className="d-flex flex-column h-100 bg-secondary-subtle">
  <div className=" bg-secondary">
    {/* <span>Current chat: {chatId}, cur message: {message}</span> */}
  </div>
    <div className=" overflow-x-hidden flex-grow-1 d-flex flex-column-reverse">
      {chatContent.length > 0 ? <ChatContent/>:<span className=" text-muted">No messages, be first to start chatting (^_^)</span>} 
    </div>
    <div className=" w-100 px-3 my-3 py-2 d-flex align-items-end bg-body-secondary rounded">
    <TextareaAutosize
        value={message}
        onChange={(e)=>handleOnChangeMessage(e)} 
        style={{ transition: 'height 0.3s ease' }} 
        className="form-control flex-grow-1 overflow-hidden" />
      <button onClick={()=>handleSendMessage()} className="btn btn-primary ms-3">Send</button>
    </div>
</div>
)};

export default Chat;