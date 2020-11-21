import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {workTypes} from "mocks/fixtures/workType";
import {WorkType} from "../../services/ApiClient";

const handlers = [
  rest.get(baseUrl + "/api/WorkType", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(workTypes)
    )
  }),
  rest.post(baseUrl + "/api/WorkType", (req, res, ctx) => {
    const newWorkType = req.body as WorkType
    workTypes.push(newWorkType)
    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json(newWorkType)
    )
  }),
  rest.put(baseUrl + "/api/WorkType/:id", (req, res, ctx) => {
    const id = Number(req.params.id)
    const workType = req.body as WorkType
    const index = workTypes.findIndex(w => w.id === id)

    workTypes[index] = workType
    return res(
      ctx.delay(delay),
      ctx.status(204),
    )
  }),
  rest.delete(baseUrl + "/api/WorkType/:id", (req, res, ctx) => {
    const id = Number(req.params.id)

    workTypes.splice(id - 1, 1)
    return res(
      ctx.delay(delay),
    )
  }),
]

export default handlers
