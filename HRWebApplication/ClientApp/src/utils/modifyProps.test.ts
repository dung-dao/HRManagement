import { dateToMoment } from './modifyProps.type';
import moment from 'moment';

describe('dateToMoment', () => {
  const dateValue = new Date();
  const momentValue = moment(dateValue);

  it('should work normally', () => {
    expect(dateToMoment(dateValue)).toEqual(momentValue);
  });

  it('should work with nested object', () => {
    const dateObject = {
      foo: 'bar',
      nested: { key: dateValue },
    };
    const momentObject = {
      foo: 'bar',
      nested: { key: momentValue },
    };
    expect(dateToMoment(dateObject)).toEqual(momentObject);
  });

  it('should work with nested array', () => {
    const dateObject = {
      foo: 'bar',
      nested: { key: [dateValue, dateValue] },
    };
    const momentObject = {
      foo: 'bar',
      nested: { key: [momentValue, momentValue] },
    };
    expect(dateToMoment(dateObject)).toEqual(momentObject);
  });

  it('should work with nested array and object', () => {
    const dateObject = {
      foo: 'bar',
      nested: { key: [{ dummy: dateValue }, dateValue] },
    };
    const momentObject = {
      foo: 'bar',
      nested: { key: [{ dummy: momentValue }, momentValue] },
    };
    expect(dateToMoment(dateObject)).toEqual(momentObject);
  });

  it('should fail', () => {
    const dateObject = {
      foo: 'bar',
      nested: { key: [{ dummy: dateValue }, dateValue] },
    };
    const momentObject = {
      foo: 'bar',
      nested: { key: [{ dummy: dateValue }, momentValue] },
    };
    expect(dateToMoment(dateObject)).not.toEqual(momentObject);
  });
});
