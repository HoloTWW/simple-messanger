import React, { useCallback, useEffect } from "react";
import { useRef } from "react";

interface Folder {
    id: string;
    name: string;
}

interface Props {
    folders: Folder[];
    currentFolder: string | null;
    handleChangeFolder: (folderId: string) => void;
}


const FolderList: React.FC<Props> = ({ folders, currentFolder, handleChangeFolder }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<HTMLButtonElement[]>([]);

    // Initialize buttonRefs array with the correct length
    useEffect(() => {
        buttonRefs.current = new Array(folders.length).fill(null);
    }, [folders.length]);


    const setButtonRef = useCallback(
        (index: number) => (element: HTMLButtonElement | null) => {
            if (element) {
                buttonRefs.current[index] = element;
            }
        },
        [],
    );

    const handleButtonClick = useCallback(
        (folderId: string, index: number) => {
            handleChangeFolder(folderId); // Call the parent's handler first

            if (containerRef.current && buttonRefs.current[index]) {
                const container = containerRef.current;
                const button = buttonRefs.current[index];

                const containerWidth = container.offsetWidth;
                const buttonWidth = button.offsetWidth;
                const buttonLeft = button.offsetLeft;

                // Calculate the scroll position to center the button
                const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth',
                });
            }
        },
        [handleChangeFolder],
    );


    return (
        <div
            className="nav nav-underline overflow-hidden"
            id="folderlist"
            style={{ display: "flex", whiteSpace: "nowrap", flexWrap: "nowrap" }}
            ref={containerRef}
        >
            {folders.map((folder, index) => (
                <React.Fragment key={folder.id}>
                    <button
                        ref={setButtonRef(index)}
                        onClick={() => handleButtonClick(folder.id, index)}
                        className={`nav-item px-2 nav-link ${currentFolder === folder.id ? 'active' : ''}`}
                        data-bs-toggle="tab"
                    >
                        {folder.name}
                    </button>
                </React.Fragment>
            ))}
        </div>
    );
};

export default FolderList;