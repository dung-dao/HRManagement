import { local } from './data';

const arrayToSelectOptions = (array) =>
  array
    .map((el) => ({
      label: el,
      value: el,
    }))

export const getProvinces = () => {
  const array = Object.keys(local);
  return arrayToSelectOptions(array);
};

export const getDistricts = (province) => {
  if (!province) return [];
  const array = Object.keys(local[province]);
  return arrayToSelectOptions(array);
};

export const getWards = (province, district) => {
  if (!province || !district) return [];
  const array = local[province][district];
  return arrayToSelectOptions(array);
};
