import { rest } from "msw"
import { baseUrl, delay } from "../common"
import {organizationUnits} from "mocks/fixtures/organizationUnit";

const handlers = [
  rest.get(baseUrl + "/api/OrganizationUnits", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json(organizationUnits)
    )
  }),
]

export default handlers
