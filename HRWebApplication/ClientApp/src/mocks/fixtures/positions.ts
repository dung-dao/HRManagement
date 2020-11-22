import {IPositionDTO} from "../../services/ApiClient";
import {employees} from './employees'
import { jobTitles } from "./jobTitles";
import {workTypes} from "./workType";
import { organizationUnits } from "./organizationUnit";
import { leaveDetails } from './leaveDetails'

// ([Id], [EmployeeId], [JobTitleId], [JobCategoryId], [WorkTypeId], [UnitId], [StartDate], [Salary], [EndDate], [LeaveDetailId], [RecordStatus]) VALUES (7, 2, 1, 1, 1, 1, CAST(N'2020-11-15T00:00:00.0000000' AS DateTime2), CAST(5000000.000000 AS Decimal(18, 6)), CAST(N'2020-11-20T00:00:00.0000000' AS DateTime2), NULL, 1)
export const positions = [
{ employee: employees[0], jobTitle: jobTitles[0], workType: workTypes[0], unit: organizationUnits[0], startDate: new Date('2020-11-15T07:20:31.1570000'), salary: 5000000, endDate: new Date('2020-11-16T07:20:31.1570000'), leaveDetail: leaveDetails[0], },
{ employee: employees[1], jobTitle: jobTitles[0], workType: workTypes[0], unit: organizationUnits[0], startDate: new Date('2020-11-15T00:00:00.0000000'), salary: 5000000, endDate: new Date('2020-11-20T00:00:00.0000000'), leaveDetail: leaveDetails[1], },
] as IPositionDTO[]
