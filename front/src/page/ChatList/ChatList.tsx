// ChatList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setSelectedChatId } from '../../store'; // Укажите правильный путь
import Checkmark from "../../components/Checkmark";
import DoubleCheckmark from "../../components/DoubleChekmark";

interface ChatListItemProps {
    username:string,
    message:string,
    timestamp:string,
    fromSender?:boolean | null,
    selected:boolean;
    chatId: string; // Добавил id
};

const ChatListItem:React.FC<ChatListItemProps> = ({username,message,timestamp,fromSender,selected, chatId}) =>{
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

    const st = "w-100 btn btn-outline-secondary rounded-0 border-0 m-0 p-0 px-2 py-1 ";
    const st_active = st + " active"

    return(
<Link to={`/chat/${username}`} className={selected ? st_active: st }>
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


const ChatList = () => {
    const dispatch = useDispatch();
    const currentFolderId = useSelector((state: RootState) => state.app.currentFolderId);
    const chatListItems = useSelector((state: RootState) => state.app.chatListItems);
    const selectedChatId = useSelector((state:RootState)=>state.app.selectedChatId);

  // Фильтруем чаты по выбранной папке
    const filteredChatListItems = currentFolderId
        ? chatListItems.filter((chat) => chat.folderId === currentFolderId)
        : chatListItems;

    const handleChatClick = (chatId: string) => {
        dispatch(setSelectedChatId(chatId));
    };

 return (
    <div>
      {filteredChatListItems.map((item) => (
        <div key={item.id} onClick={() => handleChatClick(item.id)}>
            <ChatListItem
              username={item.username}
              message={item.message}
              timestamp={item.timestamp}
              fromSender={item.fromSender}
              selected={selectedChatId === item.id ? true : false}
              chatId={item.id}
            />
        </div>

      ))}
    </div>
  );
};

export default ChatList;