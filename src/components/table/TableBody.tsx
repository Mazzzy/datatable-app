import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import { TableColumnType } from '../../types';
import { isEmptyObject } from '../../utils';

import Checkbox from '../checkbox';

interface TableBodyProps {
  columns?: TableColumnType[];
  data?: any[];
  className?: string;
  showCheck?: boolean;
  selectedRow?: number;
  checkedDataItems?: any[];
  handleRowClick?: (item: any) => void;
  setSelectedRow?: (index: number) => void;
  handleSingleChecked?: (e: any) => void;
}

const TableBody: FC<TableBodyProps> = ({
  columns = [],
  data = [],
  className = '',
  showCheck = false,
  selectedRow = -1,
  checkedDataItems = [],
  handleRowClick,
  setSelectedRow,
  handleSingleChecked
}) => {
  // const numericIds = columns.filter((item) => item.numeric).map(({ id }) => id);
  const numericIds: any = [];
  const widthHashmap: any = {};
  columns.map(({ id, numeric, width }) => {
    if (numeric) {
      numericIds.push(id);
    }
    widthHashmap[id] = width;
  });

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
          <td
            key={key}
            className={numericIds.includes(key) ? 'numeric' : ''}
            style={{ width: `${widthHashmap[key]}px` }}>
            {dataItem[key]}
          </td>
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
