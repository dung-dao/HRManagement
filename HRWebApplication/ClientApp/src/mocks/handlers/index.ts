import users  from "./users"
import employees  from "./employees"
import workTypes  from "./workType"
import jobCategory  from "./jobCategory"
import jobTitle  from "./jobTitle"
import organizationUnits  from "./organizationUnits"

export function getAllHandlers() {
  return [
    ...users,
    ...employees,
    ...workTypes,
    ...jobCategory,
    ...jobTitle,
    ...organizationUnits,
  ]
}
