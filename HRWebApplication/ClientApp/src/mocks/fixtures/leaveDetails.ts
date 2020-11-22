import {LeaveDetailDTO} from "services/ApiClient";
import {leaveTypes} from './leaveTypes'

export const leaveDetails = [
  {
    date: new Date(),
    reason: 'làm ngu quá bị đuổi',
    type: leaveTypes[0],
  },
  {
    date: new Date(),
    reason: 'làm dỏi quá bị chuyển team',
    type: leaveTypes[1],
  },
  {
    date: new Date(),
    reason: 'bị đánh ghen đến chết',
    type: leaveTypes[2],
  },
] as LeaveDetailDTO[]
