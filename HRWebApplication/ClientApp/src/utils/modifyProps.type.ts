import isObject from 'lodash/isObject';
import moment from 'moment';

export type ModifyProp<T extends {}, TFrom, TTo> = {
  [K in keyof T]: Exclude<T[K], undefined> extends TFrom
    ? TTo
    : Exclude<T[K], undefined> extends {}
    ? ModifyProp<T[K], TFrom, TTo>
    : T[K];
};

export const dateToMoment = <T extends {}>(object: T): ModifyProp<T, Date, moment.Moment> => {
  const cloned = JSON.parse(JSON.stringify(object));
  for (const key in cloned) {
    if (cloned[key] instanceof Date) {
      cloned[key] = moment(cloned[key]);
    }
    if (isObject(cloned[key])) {
      cloned[key] = dateToMoment(cloned[key]);
    }
  }
  return cloned;
};

export const momentToDate = <T extends {}>(object: T): ModifyProp<T, moment.Moment, Date> => {
  const cloned = JSON.parse(JSON.stringify(object));
  for (const key in cloned) {
    if (moment.isMoment(cloned[key])) {
      cloned[key] = cloned[key].toDate();
    }
    if (isObject(cloned[key])) {
      cloned[key] = momentToDate(cloned[key]);
    }
  }
  return cloned;
};
