import React, { CSSProperties, use, useState } from "react";
import ContactList from "./ModalComponent/ContactList";
import Settings from "./ModalComponent/Settings/Settings";
import { useAuth } from "../../components/AuthContext";
import FolderList from "./ScrollFolder";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCurrentFolder } from "../../store";

interface Folder {
    id: string;
    name: string;
}

const Menu = () =>{
    const {user,logout} = useAuth();
    const [modalContact,setModalContact] = useState<boolean>(false);
    const [modalSetting,setModalSetting] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const folders = useSelector((state:RootState) => state.app.folders );
    const currentFolder = useSelector((state:RootState) => state.app.currentFolderId);

    const handleChangeFolder = (chatId: string) =>{
        dispatch(setCurrentFolder(chatId));
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
    
    const handleLogout = () =>{
        logout();
    }

    const DropdownMenu = () =>{
        const st:CSSProperties = {zIndex:1000};
        return (
        <div style={st} className="position-absolute top-0 start-100 ms-2 bg-secondary-subtle rounded border-1 border">
            <button className="btn btn-outline-secondary border-0 rounded-0 d-flex align-items-center px-3 py-2" >
                <img  height={"25px"} className="rounded" src="/default/avatar.jpeg" alt={"avatar.jpg"}/>
                <span className="ps-2">{user?.username}</span>
            </button>
            <div className=" btn-group-vertical w-100 ">
                <button onClick={handleContactModal} className="btn btn-outline-secondary px-3 py-2 text-start border-0 rounded-0">Contacts</button>
                {/* <button className="btn btn-outline-secondary ps-3 text-start border-0 rounded-0">Theme</button> */}
            </div>
            <div className=" btn-group-vertical w-100  ">
                <button onClick={handleSettingModal} className="btn btn-outline-secondary px-3 py-2 text-start border-0 rounded-0">Settings</button>
                <button onClick={handleLogout} className="btn btn-outline-danger px-3 py-2  text-start border-0 rounded-0">Sign Out</button>
            </div>
        </div>
        )
    }

    return(
<div>
<div className=" p-3  bg-secondary-subtle">
    <div className="">
        <div className=" input-group">
            <button onClick={handleDropdownToggle} className="btn btn-outline-secondary border-0 position-relative">
                <span className=" navbar-toggler-icon"></span>
                {openDm ? <DropdownMenu/> : null}
            </button>
            <input className=" form-control" type="text"/>  
        </div>
        
        
        <FolderList
            folders={folders}
            currentFolder={currentFolder}
            handleChangeFolder={handleChangeFolder}
        />
    </div>
</div>
{modalContact ? <ContactList onClose={handleContactModal}/> : null}
{modalSetting ? <Settings onClose={handleSettingModal}/>: null}
</div>

)};

export default Menu;