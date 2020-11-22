import {LeaveTypeDTO} from "../../services/ApiClient";

export const leaveTypes = [
  {
    id: 1,
    reason: 'Fired',
    description: "You're fired",
  },
  {
    id: 2,
    name: 'Internal',
    description: 'Move to a new team internally',
  },
  {
    id: 3,
    name: 'Kill in action',
    description: 'RIP',
  },
] as LeaveTypeDTO[]
