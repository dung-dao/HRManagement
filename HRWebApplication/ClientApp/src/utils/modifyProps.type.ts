import cloneDeepWith from 'lodash/cloneDeepWith';
import moment from 'moment';

export type ModifyProp<T extends {}, TFrom, TTo> = T extends TFrom
  ? TTo
  : {
      [K in keyof T]: Exclude<T[K], undefined> extends TFrom
        ? TTo
        : Exclude<T[K], undefined> extends {}
        ? ModifyProp<T[K], TFrom, TTo>
        : T[K];
    };

export const dateToMoment = <T extends {}>(object: T): ModifyProp<T, Date, moment.Moment> => {
  return cloneDeepWith(object, (value) => {
    if (moment.isDate(value)) return moment(value);
  });
};

export const momentToDate = <T extends {}>(object: T): ModifyProp<T, moment.Moment, Date> => {
  return cloneDeepWith(object, (value) => {
    if (moment.isMoment(value)) return value.toDate();
  });
};
