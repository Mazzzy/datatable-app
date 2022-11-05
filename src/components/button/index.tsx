import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import './button.scss';
interface ButtonProps {
  icon?: JSX.Element;
  text?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ icon, text = '', className = '', onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {icon || ''} <span>{text}</span>
    </button>
  );
};

export default Button;