import React, { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";

interface ListItem {
    username:string;
    name:string;
    last_date: string;
};

interface ListItemProps {
    item: ListItem;
}

const ListItem: React.FC<ListItemProps> = ({item}) =>{
    return(<>
    <Link style={{zIndex:"1000"}} to={ `@`+ item.username} className="btn btn-outline-light text-start border-0 rounded-0 w-100">
        <div className="row row-cols-2">
            <div className="col-3">
                <img  className=" img-fluid rounded" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
            </div>
            <div className="col-9 ">
                <div className=" text-truncate fs-5">
                    {item.name} 
                </div>
                <div className="fs-6 text-secondary">
                    {item.last_date}
                </div>
            </div>
        </div>
    </Link>
    </>)
};

interface ContactListProps {
    onClose: () => void;
};

const ContactList:React.FC<ContactListProps> = ({onClose}) =>{

    const st:CSSProperties = {
        zIndex:1000,
        position: 'absolute',
        left: '50%',  // Position horizontally centered
        top: '10%',   // 10% from the top
        transform: 'translateX(-50%)', // Correct for left: 50% positioning
        width: '400px', // Specified width
        maxHeight:'80%',
        padding: '1rem', // optional, to give the content some space inside
      };

    const header:string = "Contacts"; 

    const [list,setList] = useState<ListItem[]>([]);

    const testItem:ListItem = {username: "testUsername",name:"Name of the test user", last_date:"Was here 19.02.03"}
    // list содержит массив элементов {id:integer,name:string}

    return(<>
<div  style={st} className="bg-light-subtle rounded overflow-hidden">
    <div className="row">
        <div className="col">
        <h3>{header}</h3>
        </div>
        <div className="col-2">
            <button onClick={onClose} className="btn-close"></button>
        </div>
    </div>
    <hr/>
    <div className=" input-group">
        <input placeholder="Type to search..." className=" form-control" />

    </div>
    <hr/>
    <div style={{height:"40rem",overflowX: 'hidden',overflowY: 'auto',} } className=" position-relative">
        <div className=" btn-group-vertica w-100">
            <ListItem item={testItem}/> 
        </div>
    </div>
</div> 

    </>)
}

export default ContactList; 