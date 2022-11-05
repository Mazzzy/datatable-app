import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import { PhotoType } from '../../types';
import { useSortableData } from './hooks-sortable';

import Button from '../button';

import './table.scss';

interface TableProps {
  heading?: string;
  theadItems?: any[];
  data?: PhotoType[] | any[];
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}

const Table: FC<TableProps> = ({
  heading = '',
  theadItems = [],
  data = [],
  className = '',
  onClick
}) => {
  const { items, requestSort, sortConfig } = useSortableData(data);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const TableHeadItem = ({ item }: { item: any }) => {
    return (
      <th title={item}>
        <Button text={item} onClick={() => requestSort(item)} className={getClassNamesFor(item)} />
      </th>
    );
  };

  const TableRow = ({ dataItem }: { dataItem: any }) => {
    return (
      <tr>
        {Object.keys(dataItem).map((key) => (
          <td key={key}>{dataItem[key]}</td>
        ))}
      </tr>
    );
  };

  return (
    <table className={`table ${className}`}>
      {heading && <caption>{heading}</caption>}
      <thead>
        {theadItems.length > 0 && (
          <tr>
            {theadItems.map((headItem, index) => {
              return <TableHeadItem key={`table-th-${index}`} item={headItem} />;
            })}
          </tr>
        )}
      </thead>
      <tbody>
        {items.map((dataRowItem, index) => {
          return <TableRow key={`table-tbody-${index}`} dataItem={dataRowItem} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
