import React, { FC, FormEvent } from 'react';
import { SelectDataType } from '../../types';

import Textbox from '../textbox';
import Select from '../select';

import './filter.scss';

interface FilterProps {
  selectColumnList?: SelectDataType[];
  queryText?: string;
  columnName?: string;
  className?: string;
  handleTextChange?: (e: FormEvent<HTMLInputElement>) => void;
  handleSelectChange?: (e: FormEvent<HTMLSelectElement>) => void;
}

const Filter: FC<FilterProps> = ({
  selectColumnList = [],
  queryText = '',
  columnName = '',
  className = '',
  handleTextChange,
  handleSelectChange
}) => {
  return (
    <div className={`filter-container ${className}`}>
      <Textbox
        name="filterByName"
        className="filter-input"
        placeholder="Search value from table here"
        value={queryText}
        onChange={handleTextChange}
      />
      <Select
        name="filterByColumnName"
        value={columnName}
        onChange={handleSelectChange}
        options={selectColumnList}
      />
    </div>
  );
};

export default Filter;
