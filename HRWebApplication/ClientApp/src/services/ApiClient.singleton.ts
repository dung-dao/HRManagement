import {
  EmployeesClient,
  TimeOffClient,
  TimeOffTypeClient,
  AttendanceClient,
  HolidayClient,
  JobCategoryClient,
  JobTitleClient,
  WorkTypeClient,
} from './ApiClient';

export const apiEmployees = new EmployeesClient();
export const apiTimeOff = new TimeOffClient();
export const apiTimeOffType = new TimeOffTypeClient();
export const apiAttendance = new AttendanceClient();
export const apiHoliday = new HolidayClient();
export const apiJobCategory = new JobCategoryClient();
export const apiJobTitle = new JobTitleClient();
export const apiWorkType = new WorkTypeClient();
