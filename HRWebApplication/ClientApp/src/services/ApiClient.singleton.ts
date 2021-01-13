import { EmployeesClient, TimeOffClient, TimeOffTypeClient, AttendanceClient, HolidayClient } from './ApiClient';

export const apiEmployees = new EmployeesClient();
export const apiTimeOff = new TimeOffClient();
export const apiTimeOffType = new TimeOffTypeClient();
export const apiAttendance = new AttendanceClient();
export const apiHoliday = new HolidayClient();

