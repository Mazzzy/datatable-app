import React, { FC, ReactNode, MouseEvent } from 'react';
import { ImCross } from 'react-icons/im';

import './sidebar.scss';

interface SidebarProps {
  showSidebar?: boolean;
  children?: ReactNode;
  className?: string;
  closeSidebar?: (flag: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ showSidebar, children, className = '', closeSidebar }) => {
  const crossIcon = <ImCross size={18} />;

  const closeClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (closeSidebar) {
      closeSidebar(false);
    }
  };
  return (
    <div className={`sidebar-container ${className} ${showSidebar && 'show'}`}>
      <div className="sidebar-content">{children}</div>
      <span className="close" onClick={closeClick}>
        {crossIcon}
      </span>
    </div>
  );
};

export default Sidebar;
