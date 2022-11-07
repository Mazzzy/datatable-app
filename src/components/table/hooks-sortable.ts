import { useState, useMemo } from 'react';
import { PhotoType } from '../../types';

export const useSortableData = (items: PhotoType[] | any[], config = null) => {
  interface configType {
    key: string;
    direction: string;
  }

  const [sortConfig, setSortConfig] = useState<configType | null>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        const aItem = a[sortConfig.key];
        const bItem = b[sortConfig.key];
        if (aItem < bItem) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aItem > bItem) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
