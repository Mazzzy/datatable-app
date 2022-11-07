import React, { FC } from 'react';
import { TableColumnType } from '../../types';

import Button from '../button';
import Checkbox from '../checkbox';

interface configType {
  key: string;
  direction: string;
}

interface TableHeadProps {
  heading?: string;
  columns?: TableColumnType[];
  className?: string;
  showCheck?: boolean;
  sortConfig?: configType | null;
  isCheckedAll?: boolean;
  handleSort?: (item: any) => void;
  handleCheckedAll?: () => void;
}

const TableHead: FC<TableHeadProps> = ({
  heading = '',
  columns = [],
  className = '',
  showCheck = false,
  sortConfig,
  isCheckedAll = false,
  handleSort,
  handleCheckedAll
}) => {
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const TableHeadItem = ({ item }: { item: TableColumnType }) => {
    const { id, label, sortable } = item;
    return (
      <th title={id}>
        {sortable ? (
          <Button
            text={label}
            onClick={() => handleSort && handleSort(id)}
            className={getClassNamesFor(id)}
          />
        ) : (
          <span>{label}</span>
        )}
      </th>
    );
  };

  return (
    <>
      {heading && <caption>{heading}</caption>}
      <thead className={`table-head ${className || ''}`}>
        {columns.length > 0 && (
          <tr>
            {showCheck && (
              <th>
                <Checkbox
                  name="select-all-rows"
                  onChange={handleCheckedAll}
                  checked={isCheckedAll}
                />
              </th>
            )}
            {columns.map((headItem, index) => {
              return <TableHeadItem key={`table-th-${index}`} item={headItem} />;
            })}
          </tr>
        )}
      </thead>
    </>
  );
};

export default TableHead;
