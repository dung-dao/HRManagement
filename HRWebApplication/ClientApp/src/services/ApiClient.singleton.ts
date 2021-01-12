import { EmployeesClient, TimeOffClient, TimeOffTypeClient, AttendanceClient } from './ApiClient';

export const apiEmployees = new EmployeesClient();
export const apiTimeOff = new TimeOffClient();
export const apiTimeOffType = new TimeOffTypeClient();
export const apiAttendance = new AttendanceClient();

