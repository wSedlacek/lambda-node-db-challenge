export const convertBooleanToInt = (bool: boolean | number) => (bool ? 1 : 0);
export const convertIntToBoolean = (num: boolean | number) => !!num;

export const convertCompletedBooleanToInt: <T extends { completed: boolean | 1 | 0 }>(
  item: T
) => T = (item) => ({
  ...item,
  completed: convertBooleanToInt(item.completed),
});

export const convertCompletedIntToBoolean: <T extends { completed: boolean | 1 | 0 }>(
  item: T
) => T = (item) => ({
  ...item,
  completed: convertIntToBoolean(item.completed),
});

export const convertArrBooleanToInt: <T extends { completed: boolean | 1 | 0 }>(arr: T[]) => T[] = (
  arr
) => arr.map(convertCompletedBooleanToInt);

export const convertArrIntToBoolean: <T extends { completed: boolean | 1 | 0 }>(arr: T[]) => T[] = (
  arr
) => arr.map(convertCompletedIntToBoolean);
