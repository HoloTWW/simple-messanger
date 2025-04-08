import { CSSProperties, useEffect, useState } from "react"

// me
const Sender = () =>{
    return(<>
<div className=" d-flex justify-content-end mb-2">
    <div style={{maxWidth:"60%"}} className=" bg-primary-subtle p-2 mx-2 rounded ">
        <div className="d-flex justify-content-between">
            <span className=" fw-bold">senderName</span>
            <span>
                <span className="px-2">ch</span>
                <span className="px-2">timestamp</span> 
            </span>
        </div>
        <hr className="p-1 m-0"></hr>
        <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
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
        margin: windowWidth <= 1140 ? '0' : '0 10% 0 10%',  // Адаптивный отступ
        // Другие стили
      };
    return(
<div style={st} className="d-flex flex-column h-100">
    <div className=" overflow-x-hidden px-5 flex-grow-1">
    <Recipient/>
    <Sender/>
        {/* это примеры сообщений  */}
    </div>
    <div className=" px-3 py-2 input-group">
        <textarea rows={1} className=" form-control"/>
        <button className="btn btn-outline-primary">Send</button>
    </div>
</div>
)};

export default Chat;