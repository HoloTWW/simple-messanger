import React, { CSSProperties, useEffect, useRef, useState } from "react";
import General from "./General";
import Folders from "./Folders";

interface SettingsProps{
    onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({onClose}) =>{

    const tabs = ["General","Folders"];
    const [activeTab,setActiveTab] = useState<string>(tabs[0]);

    const [contentHeight, setContentHeight] = useState<number>(0);
    const contentRef = useRef<HTMLDivElement>(null);

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

    const containerStyle: React.CSSProperties = {
        height: contentHeight,
        overflow: 'hidden',
        transition: 'height 0.3s ease-in-out',
        position: 'relative',
      };
    

    const contentSlideStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transition: 'transform 0.3s ease-in-out',
    };

    const contentInnerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
    };

    

    useEffect(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.offsetHeight);
        }
      }, [activeTab]);

    

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
        <div
        className="mt-2"
        style={containerStyle}
      >
        <div
          ref={contentRef}
          style={{
            ...contentSlideStyle,
            transform:
              activeTab === tabs[0] ? 'translateX(0%)' : 'translateX(-100%)',
          }}
        >
          <div style={contentInnerStyle}>
              <General />
          </div>
        </div>

        <div
          style={{
            ...contentSlideStyle,
            left: '100%',
            transform:
              activeTab === tabs[1] ? 'translateX(-100%)' : 'translateX(0%)',
          }}
        >
          <div style={contentInnerStyle}>
              <Folders />
          </div>
        </div>
      </div>
    </div>
</div> 
)}

export default Settings;