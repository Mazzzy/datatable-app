import React, { FC } from 'react';
import Button from '../button';
import './pagination.scss';

interface PaginationProps {
  className?: string;
  onPaginate: (btnText: string) => void;
}

const Pagination: FC<PaginationProps> = ({ className = '', onPaginate }) => {
  const paginationButtons = ['first', 'prev', 'next', 'last'];

  return (
    <div className={`pagination ${className}`}>
      {paginationButtons.map((btnText, index) => (
        <Button
          key={`pagination-button-${index}`}
          text={btnText}
          onClick={(e) => {
            e.preventDefault();
            onPaginate(btnText);
          }}
        />
      ))}
    </div>
  );
};

export default Pagination;
