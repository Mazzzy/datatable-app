import React, { FC } from 'react';
import { ImHourGlass } from 'react-icons/im';
import './loading.scss';

interface LoadingProps {
  text?: string;
}

const hourIcon = <ImHourGlass size={68} color="#8C0014" />;
const Loading: FC<LoadingProps> = ({ text = '' }) => {
  return (
    <div className="loader">
      <span className="loading">{hourIcon}</span>
      <p>Please Wait while loading {text}, this should take a second.</p>
    </div>
  );
};

export default Loading;
