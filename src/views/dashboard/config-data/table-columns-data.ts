import { TableColumnType } from '../../../types';
export const TableColumnsData: TableColumnType[] = [
  { id: 'albumId', label: 'Album Id', numeric: true, width: '10', sortable: false },
  { id: 'id', label: 'Photo Id', numeric: true, width: '10', sortable: true },
  { id: 'title', label: 'Photo Title', numeric: false, width: '30', sortable: true },
  { id: 'url', label: 'Photo URL', numeric: false, width: '20', sortable: true },
  { id: 'thumbnailUrl', label: 'Thumbnail URL', numeric: false, width: '20', sortable: true }
];
