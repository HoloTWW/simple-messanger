// Checkmark.tsx
import React from 'react';

interface CheckmarkProps {
    color: string;
    size: string; // или number, если хотите явно задавать пиксели
    curClass?: string; 
  }

const Checkmark: React.FC<CheckmarkProps> = ({ color, size,curClass }) => {
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
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
      </svg>
    );
  };

export default Checkmark;
