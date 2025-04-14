import React from 'react';

interface Props {
    color: string;
    size: string; // или number, если хотите явно задавать пиксели
    curClass?: string; 
  }

  const ArrowUp: React.FC<Props> = ({ color, size,curClass }) => {
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
          <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
      </svg>
    );
  };

export default ArrowUp;