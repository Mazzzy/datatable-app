/**
 *
 * @param obj
 * @returns boolean true | false
 */
export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};
