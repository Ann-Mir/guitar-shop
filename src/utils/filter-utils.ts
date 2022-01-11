import { STRINGS_BY_TYPE } from '../const';


export const getAvailableStringsByTypes = (types: string[]): number[] => {
  const stringsByType = types.map(
    (type) => STRINGS_BY_TYPE[type] ? STRINGS_BY_TYPE[type] : []);
  const availableStrings = stringsByType.reduce((acc, elem) => [...acc, ...elem], []);

  return Array.from(new Set(availableStrings));
};
