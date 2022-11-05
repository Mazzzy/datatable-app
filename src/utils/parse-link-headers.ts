/**
 * 
 * @param linkHeader 
 * @returns 
 * for eg: specified in API_URL pageSize of 10
 * {
    first: '<API_URL>?page=1&pageSize=10>',
    prev: '<API_URL>?page=3&pageSize=10',
    next: '<API_URL>page=4&pageSize=10>',
    last: '<API_URL>?page=214&pageSize=10'
  }
 */
export const parseLinkHeader = (linkHeader: string) => {
  const linkHeadersArray = linkHeader.split(', ').map((header) => header.split('; '));
  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
    const thisHeaderUrl = header[0].slice(1, -1);
    return [thisHeaderRel, thisHeaderUrl];
  });
  return Object.fromEntries(linkHeadersMap);
};
