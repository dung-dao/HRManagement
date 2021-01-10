import { EmployeesClient, TimeOffClient, AttendanceClient } from './ApiClient';

export const apiEmployees = new EmployeesClient();
export const apiTimeOff = new TimeOffClient();
export const apiAttendance = new AttendanceClient();

