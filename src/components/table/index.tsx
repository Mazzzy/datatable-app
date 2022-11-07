import React, { FC, useState } from 'react';
import { PhotoType, TableColumnType } from '../../types';
import { useSortableData } from './hooks-sortable';

import TableHead from './TableHead';
import TableBody from './TableBody';

import './table.scss';

interface TableProps {
  heading?: string;
  columns?: TableColumnType[];
  data?: PhotoType[] | any[];
  className?: string;
  showCheck?: boolean;
  handleRowClick?: (item: PhotoType) => void;
}

const Table: FC<TableProps> = ({
  heading = '',
  columns = [],
  data = [],
  className = '',
  showCheck = false,
  handleRowClick
}) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checkedDataItems, setCheckedDataItems] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const { items, requestSort, sortConfig } = useSortableData(data);

  const handleCheckedAll = () => {
    setIsCheckedAll(!isCheckedAll);
    setCheckedDataItems(items.map((item) => String(item.id)));
    if (isCheckedAll) {
      setCheckedDataItems([]);
    }
  };

  const handleSingleChecked = (e: any) => {
    const { id, checked } = e.target;
    const updatedCheckedDataItems = [...checkedDataItems, id];
    setCheckedDataItems(updatedCheckedDataItems);
    if (!checked) {
      setCheckedDataItems(checkedDataItems.filter((item: any) => item !== id));
      if (isCheckedAll) {
        setIsCheckedAll(checked);
      }
    } else if (updatedCheckedDataItems.length === items.length) {
      setIsCheckedAll(checked);
    }
  };

  return (
    <table className={`table ${className}`}>
      <TableHead
        heading={heading}
        columns={columns}
        showCheck={showCheck}
        sortConfig={sortConfig}
        handleSort={requestSort}
        handleCheckedAll={handleCheckedAll}
        isCheckedAll={isCheckedAll}
      />
      <TableBody
        columns={columns}
        data={items}
        showCheck={showCheck}
        handleRowClick={handleRowClick}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        checkedDataItems={checkedDataItems}
        handleSingleChecked={handleSingleChecked}
      />
    </table>
  );
};

export default Table;
