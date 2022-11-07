import { PhotoType } from '../types';
/**
 *
 * @param dataList (Array of Objects: that contains Photo details)
 * @param columnName (property name of Object to be filtered)
 * @param querytext (free text value to be searched in Object[property name])
 * @returns
 * filtered dataList (Array of Objects) based on text values present
 * in respective property of objects
 */
export const filterDataByColumnNameAndText = (
  dataList: PhotoType[] | any[],
  columnName: string,
  queryText: string
) => {
  const textToFilter = queryText.toLowerCase();
  const isStrPresent = (str: string) => str.toString().toLowerCase().includes(textToFilter);

  return dataList.filter((dataObj: any) => {
    // look into only those properties, whose column-name is selected
    let textMatch = true;
    const itemToFilterByColumn = dataObj[columnName];

    // filter string values based on object type
    if (Array.isArray(itemToFilterByColumn)) {
      textMatch = itemToFilterByColumn.some((txtVal: string) => isStrPresent(txtVal));
    } else if (typeof itemToFilterByColumn === 'string') {
      textMatch = isStrPresent(itemToFilterByColumn);
    }
    return textMatch;
  });
};
