import React, { FC, useState, useEffect } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import Button from '../../components/button';
import { getItemFromLS, saveItemToLS } from '../../utils';
import logo from '../../assets/logo.svg';

import './header.scss';

const moonIcon = <HiOutlineMoon size={18} />;
const sunIcon = <HiOutlineSun size={18} />;
const iconAndText = {
  dark: { icon: moonIcon, text: 'Dark Mode' },
  light: { icon: sunIcon, text: 'Light Mode' }
};

const Header: FC = () => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const themeName = getItemFromLS('data-theme');
    if (themeName) {
      const activeVal = themeName === 'dark' ? true : false;
      document.documentElement.setAttribute('data-theme', themeName);
      setActive(activeVal);
    }
  }, []);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const getIconAndText = () => {
    const themeName = !isActive ? 'dark' : 'light';
    return iconAndText[themeName];
  };
  const handleClick = () => {
    const themeName = !isActive ? 'dark' : 'light';
    saveItemToLS('data-theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    toggleClass();
  };

  const { icon, text } = getIconAndText();
  return (
    <header className="header">
      <div className="wrapper flex f-center-y f-btw">
        <div className="logo-container">
          <img src={logo} className="logo-img" alt="gm-brand-logo" />
          <span className="logo-text">Photos list application datatable</span>
        </div>
        <Button
          icon={icon}
          text={text}
          className={`header-btn ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
