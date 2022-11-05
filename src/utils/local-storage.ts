export const getItemFromLS = (lsKeyName: string) => {
  if (localStorage.getItem(lsKeyName)) {
    return JSON.parse(localStorage.getItem(lsKeyName) || '{}');
  }

  return {};
};

export const saveItemToLS = (lsKeyName: string, value: string): void => {
  localStorage.setItem(lsKeyName, JSON.stringify(value));
};
