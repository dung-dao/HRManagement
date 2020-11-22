import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {jobTitles} from "mocks/fixtures/jobTitles";
import {JobTitleDTO} from "services/ApiClient";

const handlers = [
  rest.get(baseUrl + "/api/JobTitle", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(jobTitles)
    )
  }),
  rest.post(baseUrl + "/api/JobTitle", (req, res, ctx) => {
    const newJobTitle = req.body as JobTitleDTO
    jobTitles.push(newJobTitle)
    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json(newJobTitle)
    )
  }),
  rest.put(baseUrl + "/api/JobTitle/:id", (req, res, ctx) => {
    const id = Number(req.params.id)
    const jobTitle = req.body as JobTitleDTO
    const index = jobTitles.findIndex(w => w.id === id)

    jobTitles[index] = jobTitle
    return res(
      ctx.delay(delay),
      ctx.status(204),
    )
  }),
  rest.delete(baseUrl + "/api/JobTitle/:id", (req, res, ctx) => {
    const id = Number(req.params.id)

    jobTitles.splice(id - 1, 1)
    return res(
      ctx.delay(delay),
    )
  }),
]

export default handlers
