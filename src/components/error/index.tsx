import React, { FC } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import './error.scss';

interface ErrorProps {
  text?: string;
  msg?: string;
  code?: number;
}

const errorIcon = <BiErrorAlt size={68} color="red" />;
const Error: FC<ErrorProps> = ({ text = '', msg = '', code }) => {
  return (
    <div className="error-container">
      <span className="error">{errorIcon}</span>
      {code && <p>{code}</p>}
      {text && <p>{text}</p>}
      {code && <p>{msg}</p>}
    </div>
  );
};

export default Error;
