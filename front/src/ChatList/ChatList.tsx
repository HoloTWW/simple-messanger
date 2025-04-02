import { Link } from "react-router-dom";

const generateArray = (length:number, max:number) => (
    [...new Array(length)]
      .map(() => Math.round(Math.random() * max))
  );
  

const ChatListItem = () =>{
    return(
<Link to={"@user"} className="w-100 btn btn-outline-secondary rounded-0 border-0 m-0 p-0 ps-2 py-2">
    <div className="row row-cols-2 w-100 ">
        <div className="col-2">
            <img className="rounded"  height={"60px"}  src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
        </div>
        <div className="col-10 ">
            <div className="row">
                <div className="col fs-5 text-truncate text-start">
                    username lalalalalalalal
                </div>
                
                <div className="col text-end">
                    timestamp
                </div>
            </div>
            <div className="row">
                <div className="col text-truncate text-start">
                    message very long message дыфвлыфврфрывфол
                </div>
                <div className="col text-end">
                    ch
                </div>
            </div>
        </div>
    </div>      
</Link>
)};


const ChatList = ()=>{
    const g = generateArray(20,25)
    return(<div className="ps-3">
    <ChatListItem/>
    {g.map((item,index)=>(<ChatListItem/>))} 
    
    </div>)
};

export default ChatList;