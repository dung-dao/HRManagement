import { rest } from "msw"
import { baseUrl, delay } from "../common"

const handlers = [
  rest.get(baseUrl + "/users/:userId", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json({ id: 0 , name: 'near' })
    )
  }),
  rest.get(baseUrl + "/users", (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json([
        { id: 0 , name: 'near' },
        { id: 1 , name: 'loi' }
      ])
    )
  })
]

export default handlers
