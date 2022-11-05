import React, { FC, FormEvent } from 'react';
import './textbox.scss';
interface TextboxProps {
  name?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const Textbox: FC<TextboxProps> = ({ name, value, className = '', placeholder, onChange }) => {
  return (
    <input
      type="text"
      className={`input ${className || ''}`}
      placeholder={placeholder || ''}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textbox;
