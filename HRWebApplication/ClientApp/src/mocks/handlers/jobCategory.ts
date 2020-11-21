import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {jobCategories} from "mocks/fixtures/jobCategory";

const handlers = [
  rest.get(baseUrl + "/api/JobCategory", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(jobCategories)
    )
  }),
]

export default handlers
