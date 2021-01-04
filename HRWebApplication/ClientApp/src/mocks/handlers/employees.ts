import { rest } from "msw"
import { baseUrl, delay } from "../common"
import { employees } from "mocks/fixtures/employees";
import { positions } from "mocks/fixtures/positions";
import {EmployeeDTO, PositionDTO} from "../../services/ApiClient";
import {randomBetween} from "../../utils";

const handlers = [
  rest.get(baseUrl + "/api/Employees", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(employees)
    )
  }),
  rest.get(baseUrl + "/api/Employees/:id", (req, res, ctx) => {
    const id = Number(req.params.id)
    const employee = employees.find(e => e.id === id)

    return res(
      ctx.delay(delay),
      ctx.json(employee)
    )
  }),
  rest.get(baseUrl + "/api/Employees/:id/positions", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(positions)
    )
  }),
  rest.post(baseUrl + "/api/Employees", (req, res, ctx) => {
    const newEmployee = req.body as EmployeeDTO
    newEmployee.id = randomBetween(0, 9999999999)
    employees.push(newEmployee)

    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json(newEmployee)
    )
  }),
  rest.put(baseUrl + "/api/Employees/:id", (req, res, ctx) => {
    const id = Number(req.params.id)
    const employee = req.body as EmployeeDTO
    const index = employees.findIndex(w => w.id === id)

    employees[index] = employee
    return res(
      ctx.delay(delay),
      ctx.status(204),
    )
  }),
  rest.post(baseUrl + "/api/Employees/:id/positions", (req, res, ctx) => {
    const newPosition = req.body as PositionDTO
    positions.push(newPosition)

    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json(newPosition)
    )
  }),
]

export default handlers
