import { setupWorker } from "msw"
import { getAllHandlers } from "./handlers"

// @ts-ignore
export const browser = setupWorker(...getAllHandlers())
