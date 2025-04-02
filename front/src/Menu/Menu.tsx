import React, { CSSProperties, use, useState } from "react";
import ContactList from "./ModalComponent/ContactList";
import Settings from "./ModalComponent/Settings";

interface Folder {
    id: number;
    name: string;
}

const Menu = () =>{
    const [modalContact,setModalContact] = useState<boolean>(false);
    const [modalSetting,setModalSetting] = useState<boolean>(false);
    
    const [folders, setFolders] = useState<Folder[]>([
        {id:0,name:"General"},
        {id:2,name:"Private"},
        {id:3, name: "Work"},
        {id:4, name: "Work"},
        {id:5, name: "Work"},
        {id:6,name:"Private"},
        {id:7,name:"Privateeqweqeq3eq"},
        {id:8,name:"Private31232121"},
        {id:9,name:"Private"},
        {id:10,name:"Private"},
    ]); 
    
    const [currentFolder, setCurrentFolder ] = useState<number>(0);

    const handleChangeFolder = (id: number) =>{
        setCurrentFolder(id);
    };


    const [openDm,setOpenDm] = useState<boolean>(false);

    const handleContactModal = () =>{
        const temp:boolean = modalContact;
        setModalContact(!temp);
    }

    const handleSettingModal = () =>{
        const temp:boolean = modalSetting;
        setModalSetting(!temp);
    }

    const handleDropdownToggle = () =>{
        const temp:boolean = openDm;
        setOpenDm(!openDm);
    } 

    const DropdownMenu = () =>{
        const st:CSSProperties = {zIndex:1000};
        return (
        <div style={st} className="position-absolute top-0 start-100 ms-2 bg-secondary-subtle rounded border-1 border">
            <div className=" btn-group-vertical w-100 ">
                <button onClick={handleContactModal} className="btn btn-outline-secondary px-3 py-2 text-start border-0 rounded-0">Contacts</button>
                {/* <button className="btn btn-outline-secondary ps-3 text-start border-0 rounded-0">Theme</button> */}
            </div>
            <div className=" btn-group-vertical w-100  ">
                <button onClick={handleSettingModal} className="btn btn-outline-secondary px-3 py-2 text-start border-0 rounded-0">Settings</button>
                <button className="btn btn-outline-danger px-3 py-2  text-start border-0 rounded-0">Sign Out</button>
            </div>
        </div>
        )
    }

    return(
<div>
<div className=" p-3  bg-secondary-subtle">
    <div className="">
        <div className=" input-group">
            <button onClick={handleDropdownToggle} className="btn btn-outline-light border-0 position-relative">
                <span className=" navbar-toggler-icon"></span>
                {/* <img className="rounded" src="/default/avatar.jpeg" alt={"avatar.jpeg"} height={15}/> */}
                {openDm ? <DropdownMenu/> : null}
            </button>
            <input className=" form-control" type="text"/>  
        </div>
        
        
        <div  className="nav nav-underline overflow-auto" id="folderlist" style={{display:"flex",whiteSpace:"nowrap",flexWrap:"nowrap"}} >
            { folders.map((folder,index)=>(
            <>
                <button 
                    key={index} 
                    onClick={ () => handleChangeFolder(folder.id)} 
                    className={`nav-item px-2 nav-link ${currentFolder == folder.id ? 'active': null }`} 
                    data-bs-toggle="tab">
                        {folder.name}
                </button>        
            </>))
            }
        </div>
    </div>
</div>
{modalContact ? <ContactList onClose={handleContactModal}/> : null}
{modalSetting ? <Settings onClose={handleSettingModal}/>: null}
</div>

)};

export default Menu;