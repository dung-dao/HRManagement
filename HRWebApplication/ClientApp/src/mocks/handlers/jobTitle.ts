import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {jobTitles} from "mocks/fixtures/jobTitles";

const handlers = [
  rest.get(baseUrl + "/api/JobTitle", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(jobTitles)
    )
  }),
]

export default handlers
