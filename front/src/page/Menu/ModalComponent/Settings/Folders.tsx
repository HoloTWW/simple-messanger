import { ChangeEvent, useEffect, useRef, useState } from "react";
import ArrowUp from "../../../../components/ArrowUp";
import ArrowDown from "../../../../components/ArrowDown";
import Trashcan from "../../../../components/Trashcan";
import './Folders.css'; // Import the CSS file

interface FolderItem {
    id: number;
    name: string;
}

const Folders = () => {
    const [folders, setFolders] = useState<FolderItem[]>([
        { id: 1, name: "Personal" },
        { id: 2, name: "Work" },
        { id: 3, name: "Fools" },
        { id: 4, name: "Dudes" },
        { id: 5, name: "Dudes ^_^" },
        { id: 6, name: "Duds ^_^" }
    ]);

    const [isMoving, setIsMoving] = useState<boolean>(false);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        console.log("useEffect - isMoving changed:", isMoving);  // ADDED
        if (isMoving) {
            const timeoutId = setTimeout(() => {
                setIsMoving(false);
                console.log("useEffect - setTimeout: isMoving set to false");  // ADDED
            }, 300);

            return () => {
                clearTimeout(timeoutId);
                console.log("useEffect - cleanup: clearTimeout"); // ADDED
            };
        }
    }, [isMoving]);

    const listStyle: React.CSSProperties = {
        transition: 'transform 0.3s ease-in-out',
        position: 'relative', // Important for the moving effect
    };

    const movingStyle: React.CSSProperties = {
        pointerEvents: 'none' as 'none', // Explicitly cast to 'none'
    };

    const updateFolder = (id: number, updateName: string) => {
        setFolders(
            folders.map((item) => item.id === id ? { ...item, name: updateName } : item)
        );
    };

    const moveItemUp = (id: number) => {
        console.log("moveItemUp called for id:", id); // ADDED
        if (isMoving) {
            console.log("moveItemUp - isMoving is true, returning"); // ADDED
            return;
        }
        setIsMoving(true);
        console.log("moveItemUp - isMoving set to true"); // ADDED
        setFolders(prevFolders => {
            console.log("moveItemUp - setFolders called"); // ADDED
            const index = prevFolders.findIndex(folder => folder.id === id);
            console.log("moveItemUp - index of item to move:", index); // ADDED
            if (index <= 0) {
                console.log("moveItemUp - already at the top, returning"); // ADDED
                setIsMoving(false); // Reset it if you can't move!
                return prevFolders;
            }

            const newFolders = [...prevFolders];
            const itemToMove = newFolders.splice(index, 1)[0];
            newFolders.splice(index - 1, 0, itemToMove);
            console.log("moveItemUp - new folder order:", newFolders.map(f => f.name)); // ADDED
            return newFolders;
        });

    };

    const moveItemDown = (id: number) => {
        console.log("moveItemDown called for id:", id); // ADDED
        if (isMoving) {
            console.log("moveItemDown - isMoving is true, returning"); // ADDED
            return;
        }
        setIsMoving(true);
        console.log("moveItemDown - isMoving set to true"); // ADDED
        setFolders(prevFolders => {
            console.log("moveItemDown - setFolders called"); // ADDED
            const index = prevFolders.findIndex(folder => folder.id === id);
            console.log("moveItemDown - index of item to move:", index); // ADDED
            if (index === -1 || index >= prevFolders.length - 1) {
                console.log("moveItemDown - already at the bottom, returning");  // ADDED
                setIsMoving(false); // Reset it if you can't move
                return prevFolders;
            }

            const newFolders = [...prevFolders];
            const itemToMove = newFolders.splice(index, 1)[0];
            newFolders.splice(index + 1, 0, itemToMove);
            console.log("moveItemDown - new folder order:", newFolders.map(f => f.name)); // ADDED
            return newFolders;
        });

    };

    const appendFolder = () => {
        const newItem: FolderItem = { // Correct type annotation
            id: folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1, // Generate a unique ID
            name: "New folder"
        };
        setFolders([...folders, newItem]);
    }

    const removeFolder = (id: number) => {
        setFolders(folders.filter((item) => item.id !== id));
    };

    const handleOnChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        updateFolder(id, value);
    };

    return (
        <>
            <div>
                <ul style={{ ...listStyle, ...(isMoving ? movingStyle : {}) }} ref={listRef} className="folder-list">
                    {folders.map((item) => (
                        <li key={item.id} className="input-group mb-2 folder-item">
                            <input onChange={(e) => handleOnChange(item.id, e)} type="text" value={item.name} className="form-control" />
                            <button onClick={() => moveItemUp(item.id)} className="btn btn-outline-secondary border-start-0" disabled={isMoving}>
                                <ArrowUp color="currentColor" size="16px" />
                            </button>
                            <button onClick={() => moveItemDown(item.id)} className="btn btn-outline-secondary" disabled={isMoving}>
                                <ArrowDown color="currentColor" size="16px" />
                            </button>
                            <button onClick={() => removeFolder(item.id)} className="btn btn-outline-danger">
                                <Trashcan color="currentColor" size="16px" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="d-grid">
                <button onClick={appendFolder} className="btn btn-primary">Create New Folder</button>
            </div>
        </>
    );
};

export default Folders;