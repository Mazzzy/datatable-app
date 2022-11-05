import React, { FC, FormEvent } from 'react';

import './select.scss';

interface OptionType {
  name: string;
  value: string;
}
interface SelectProps {
  name?: string;
  ariaLabel?: string;
  value?: string;
  className?: string;
  options: OptionType[];
  onChange?: (e: FormEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({ name, ariaLabel, value, className, options, onChange }) => {
  return (
    <div className="select-wrapper">
      <select
        className={`${className || ''}`}
        name={name}
        aria-label={ariaLabel}
        onChange={onChange}
        value={value}>
        {options.map(({ name, value }: OptionType) => (
          <option key={`region-${name}`} value={value}>
            {name}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </div>
  );
};

export default Select;
