import { TableColumnType } from '../../types';
const TableColumnsData: TableColumnType[] = [
  { id: 'albumId', label: 'Album Id', numeric: true, width: '20', sortable: false },
  { id: 'id', label: 'Photo Id', numeric: true, width: '20', sortable: true },
  { id: 'title', label: 'Photo Title', numeric: false, width: '20', sortable: true },
  { id: 'url', label: 'Photo URL', numeric: false, width: '20', sortable: true },
  { id: 'thumbnailUrl', label: 'Thumbnail URL', numeric: false, width: '20', sortable: true }
];
export default TableColumnsData;
