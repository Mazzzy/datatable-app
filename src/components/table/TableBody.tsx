import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import { PhotoType } from '../../types';

import Checkbox from '../checkbox';

interface TableBodyProps {
  data?: PhotoType[];
  className?: string;
  showCheck?: boolean;
  selectedRow?: number;
  checkedDataItems?: any[];
  handleRowClick?: (item: PhotoType) => void;
  setSelectedRow?: (index: number) => void;
  handleSingleChecked?: (e: any) => void;
}

const TableBody: FC<TableBodyProps> = ({
  data = [],
  className = '',
  showCheck = false,
  selectedRow = -1,
  checkedDataItems = [],
  handleRowClick,
  setSelectedRow,
  handleSingleChecked
}) => {
  const TableRow = ({ dataItem, keyIndex }: { dataItem: any; keyIndex: number }) => {
    const trClick = (e: MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>) => {
      e.preventDefault();
      if (handleRowClick) {
        handleRowClick(dataItem);
        if (setSelectedRow) {
          setSelectedRow(keyIndex);
        }
      }
    };
    return (
      <tr
        {...(handleRowClick && { onClick: trClick })}
        className={`${className} ${selectedRow === keyIndex ? 'selected' : ''}`}>
        {showCheck && (
          <td>
            <Checkbox
              id={dataItem?.id}
              name={`data-checkbox-${dataItem?.id}`}
              onChange={handleSingleChecked}
              checked={checkedDataItems.includes(String(dataItem?.id))}
            />
          </td>
        )}
        {Object.keys(dataItem).map((key) => (
          <td key={key}>{dataItem[key]}</td>
        ))}
      </tr>
    );
  };

  return (
    <tbody>
      {data.map((dataRowItem, index) => {
        return <TableRow key={`table-tbody-${index}`} dataItem={dataRowItem} keyIndex={index} />;
      })}
    </tbody>
  );
};

export default TableBody;
