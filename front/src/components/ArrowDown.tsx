import React from 'react';

interface Props {
    color: string;
    size: string; // или number, если хотите явно задавать пиксели
    curClass?: string; 
  }

  const ArrowDown: React.FC<Props> = ({ color, size,curClass }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill={color}
        width={size}
        height={size}
        style={{ display: 'block' }} // Важно для адаптивности
        className={curClass}
      >
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
      </svg>
    );
  };

export default ArrowDown;