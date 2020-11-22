import {OrganizationUnitDTO} from "services/ApiClient";

export const organizationUnits = [
  { id: 1,  parentId: null, name: 'BODD', description: 'BODD', },
  { id: 2,  parentId: 1, name: 'Phòng ban kinh doanh', description: 'Phòng ban kinh doanh', },
  { id: 3,  parentId: 1, name: 'Phòng ban marketing', description: 'Phòng ban marketing', },
  { id: 4,  parentId: 1, name: 'Phòng ban sales', description: 'Phòng ban sales', },
  { id: 5,  parentId: 1, name: 'Phòng ban IT', description: 'Phòng ban IT', },
  { id: 6,  parentId: null, name: 'Team kinh doanh 12', description: 'Team kinh doanh 1', },
  { id: 7,  parentId: 2, name: 'Team kinh doanh 2', description: 'Team kinh doanh 2', },
  { id: 9,  parentId: null, name: 'Team kinh doanh 1.234', description: 'Team kinh doanh 1.2', },
  { id: 10, parentId: null, name: 'Team marketing 11', description: 'Team marketing 1', },
  { id: 11, parentId: 4, name: 'Team sales 1', description: 'Team sales 1', },
  { id: 12, parentId: 5, name: 'Team IT 12', description: 'Team IT 1', },
  { id: 13, parentId: 5, name: 'Team IT 22', description: 'Team IT 2', },
  { id: 14, parentId: 1, name: 'Phong ban alpha', description: '', },
  { id: 21, parentId: null, name: 'Nguyễn Huỳnh', description: 'Loi dep trai', },
  { id: 22, parentId: 6, name: 'Team kinhhhh doanh 1.1', description: '12', },
] as OrganizationUnitDTO[]
