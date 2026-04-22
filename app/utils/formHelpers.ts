export const getDirtyValues = <T extends Record<string, any>>(
  original: T,
  current: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(current).filter(([k, v]) => {
      return v !== original[k];
    }),
  ) as Partial<T>;
};

export const formatPayload = <T extends Record<string, any>>(
  dirtyFields: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(dirtyFields).map(([k, v]) => {
      const value = v === "" ? null : v;
      return [k, value];
    }),
  ) as Partial<T>;
};
