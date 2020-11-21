import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {JobCategoryDTO} from "services/ApiClient";
import {jobCategories} from "../fixtures/jobCategory";

const handlers = [
  rest.get(baseUrl + "/api/JobCategory", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(jobCategories)
    )
  }),
  rest.post(baseUrl + "/api/JobCategory", (req, res, ctx) => {
    const newJobCategory = req.body as JobCategoryDTO
    jobCategories.push(newJobCategory)
    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json(newJobCategory)
    )
  }),
  rest.put(baseUrl + "/api/JobCategory/:id", (req, res, ctx) => {
    const id = Number(req.params.id)
    const jobCategory = req.body as JobCategoryDTO
    const index = jobCategories.findIndex(w => w.id === id)

    jobCategories[index] = jobCategory
    return res(
      ctx.delay(delay),
      ctx.status(204),
    )
  }),
  rest.delete(baseUrl + "/api/JobCategory/:id", (req, res, ctx) => {
    const id = Number(req.params.id)

    jobCategories.splice(id - 1, 1)
    return res(
      ctx.delay(delay),
    )
  }),
]

export default handlers
