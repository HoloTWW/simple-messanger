import React, { CSSProperties, useState } from "react";
import General from "./General";
import Folders from "./Folders";

interface SettingsProps{
    onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({onClose}) =>{

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

    const tabs = ["General","Folders"];
    const [activeTab,setActiveTab] = useState<string>(tabs[0]);

    const header:string = "Settings";

    return(
<div  style={st} className="bg-light-subtle rounded overflow-hidden">
    <div className="row">
        <div className="col">
        <h3>{header}</h3>
        </div>
        <div className="col-2">
            <button onClick={onClose} className="btn-close"></button>
        </div>
    </div>
    <div style={{maxHeight:"40rem",overflowX: 'hidden',overflowY: 'auto',} }>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <button onClick={()=>setActiveTab(tabs[0])} className={`nav-link ${tabs[0] === activeTab ? "active": null }`}>{tabs[0]}</button>
            </li>
            <li className="nav-item">
                <button onClick={()=>setActiveTab(tabs[1])} className={`nav-link ${tabs[1] === activeTab ? "active": null }`}>{tabs[1]}</button>
            </li>
        </ul>
        <div className=" pt-2">
            {activeTab === tabs[0] ? <General/> : null}
            {activeTab === tabs[1] ? <Folders/> : null}
        </div>
    </div>
</div> 
)}

export default Settings;