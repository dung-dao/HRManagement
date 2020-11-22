import {EmployeeDTO} from "services/ApiClient";
import moment from "moment";

export type EmployeeInfoFormType = Omit<EmployeeDTO, 'dateOfBirth'> & {
  dateOfBirth: moment.Moment;
};
