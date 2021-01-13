import moment from 'moment';

export function calculateBusinessDays(firstDate: moment.Moment, secondDate: moment.Moment) {
  // EDIT : use of startOf
  let day1 = moment(firstDate).startOf('day');
  let day2 = moment(secondDate).startOf('day');
  // EDIT : start at 1
  let adjust = 1;

  if (day1.dayOfYear() === day2.dayOfYear() && day1.year() === day2.year()) {
    return 0;
  }

  if (day2.isBefore(day1)) {
    const temp = day1;
    day1 = day2;
    day2 = temp;
  }

  //Check if first date starts on weekends
  if (day1.day() === 6) {
    //Saturday
    //Move date to next week monday
    day1.day(8);
  } else if (day1.day() === 0) {
    //Sunday
    //Move date to current week monday
    day1.day(1);
  }

  //Check if second date starts on weekends
  if (day2.day() === 6) {
    //Saturday
    //Move date to current week friday
    day2.day(5);
  } else if (day2.day() === 0) {
    //Sunday
    //Move date to previous week friday
    day2.day(-2);
  }

  const day1Week = day1.week();
  let day2Week = day2.week();

  //Check if two dates are in different week of the year
  if (day1Week !== day2Week) {
    //Check if second date's year is different from first date's year
    if (day2Week < day1Week) {
      day2Week += day1Week;
    }
    //Calculate adjust value to be substracted from difference between two dates
    // EDIT: add rather than assign (+= rather than =)
    adjust += -2 * (day2Week - day1Week);
  }

  return day2.diff(day1, 'days') + adjust;
}

export function addBusinessDays(originalDate: moment.Moment, numDaysToAdd: number) {
  const Sunday = 0;
  const Saturday = 6;
  let daysRemaining = numDaysToAdd;

  const newDate = originalDate.clone();

  while (daysRemaining > 0) {
    newDate.add(1, 'days');
    if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
      daysRemaining--;
    }
  }

  return newDate;
}
