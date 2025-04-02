
// me
const Sender = () =>{
    return(<>
<div className=" d-flex justify-content-start mb-2">
    <img  height={"60px"} className="rounded d-flex align-self-" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
    <div style={{maxWidth:"35%"}} className=" bg-primary-subtle p-2 ms-2 rounded ">
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
</div>
    </>)
}

// other
const Recipient = () =>{
    return(<>
<div className=" d-flex justify-content-start mb-2">
    <img  height={"60px"} className="rounded d-flex align-self-" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
    <div style={{maxWidth:"35%"}} className=" bg-secondary p-2 ms-2 rounded ">
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
    return(<div className="d-flex flex-column h-100">
    <div className=" overflow-x-hidden px-5 flex-grow-1 ">
    <Sender/>
    <Recipient/>
    <Sender/>
    <Sender/>
    <Sender/>
    <Recipient/>
    <Recipient/>
    <Sender/>
        {/* это примеры сообщений  */}
    </div>
    <div className="px-3 py-2 w-50">
        <input type="text" className=" form-control"/>
    </div>
    </div>)
}

export default Chat;