import React, { FC } from 'react';

interface TableFootProps {
  footerText?: string;
  footerItems?: any[];
  className?: string;
}

const TableFoot: FC<TableFootProps> = ({ footerText = '', footerItems = [], className = '' }) => {
  return (
    <tfoot className={`${className}`}>
      <tr>
        <td>{footerText}</td>
        <td>{footerItems.sort((a, b) => a - b).join(', ')}</td>
      </tr>
    </tfoot>
  );
};

export default TableFoot;
