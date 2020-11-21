import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {workTypes} from "mocks/fixtures/workType";

const handlers = [
  rest.get(baseUrl + "/api/WorkType", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(workTypes)
    )
  }),
]

export default handlers
