import { rest } from "msw"
import { baseUrl, delay } from "../common"
import { employees } from "mocks/fixtures/employees";
import { jobTitles } from "mocks/fixtures/jobTitles";
import {workTypes} from "mocks/fixtures/workType";
import {jobCategories} from "mocks/fixtures/jobCategory";
import { organizationUnits } from "mocks/fixtures/organizationUnit";

const handlers = [
  rest.get(baseUrl + "/api/Employees", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(employees)
    )
  }),
  rest.get(baseUrl + "/api/Employees/:id", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(employees[0])
    )
  }),
  rest.get(baseUrl + "/api/Employees/:id/positions", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json({
        startDate: new Date(),
        endDate: new Date(),
        salery: 10_000_000,
        jobTitle: jobTitles[0],
        employmentStatus: workTypes[0],
        jobCategory: jobCategories[0],
        unit: organizationUnits[0],
      })
    )
  }),
]

export default handlers
