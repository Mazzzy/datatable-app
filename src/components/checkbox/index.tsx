import React, { FC, FormEvent } from 'react';
import './checkbox.scss';
interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  className?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ id, name, value, checked, className = '', onChange }) => {
  return (
    <input
      id={id}
      type="checkbox"
      className={`checkbox ${className || ''}`}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
