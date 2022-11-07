import React, { FC, FormEvent } from 'react';
import './checkbox.scss';
interface CheckboxProps {
  name?: string;
  value?: string;
  checked?: boolean;
  className?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ name, value, checked, className = '', onChange }) => {
  return (
    <input
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
