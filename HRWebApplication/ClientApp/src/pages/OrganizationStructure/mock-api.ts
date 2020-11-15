// mock api interfaces
import { KeyOrId, Branch, Employee, OrganizationUnit } from './__type';
import { organizationUnits } from './mock-data';


export class Api {
  async waitABit() {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000)); // sleep function: https://stackoverflow.com/a/39914235/9787887
  }

  // api: "/organization-units-preview" to get only barely enought information to draw the tree like table
  // might be different than "/all-organization-units" which will get all the information 
  async getOrganizationUnits() {
    await this.waitABit();
    return Promise.resolve(organizationUnits);
  }

  async getBranchById(id: KeyOrId): Promise<Branch> {
    await this.waitABit();
    return Promise.resolve({
      id: id || 'branch_1',
      name: 'Chi nhánh Hồ Chí Minh',
      address: '37 Tôn Đức Thắng phường Bến Nghé, quận 1, tp Hồ Chí Minh',
      status: 'active',
    });
  }

  async getEmployeeById(id: KeyOrId): Promise<Employee> {
    await this.waitABit();
    return Promise.resolve({
      id: id || 'employee_1',
      code: 'NV_1',
      name: 'Anh Giám Đốc',
      organizationUnit: 'organization_unit_1',
      position: 'position_1',
      branch: 'branch_1',
      contracts: ['contract_1', 'contract_2'],
    });
  }

  async getEmployeesByIds(ids: KeyOrId[]): Promise<Employee[]> {
    await this.waitABit();
    return Promise.resolve(
      ids.map((id) => ({
        id: id || 'employee_1',
        code: 'NV_1',
        name: 'Anh Giám Đốc',
        organizationUnit: 'organization_unit_1',
        position: 'position_1',
        branch: 'branch_1',
        contracts: ['contract_1', 'contract_2'],
      })),
    );
  }

  async getGlimpseOrganizationUnit() {
    return Promise.resolve([
      {
        id: 'organization_unit_1',
        name: 'BOD',
        status: 'active',
        leaderName: 'Nguyễn Văn A',
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_11',
            name: 'Phòng ban kinh doanh',
            status: 'active',
            leaderName: 'Nguyễn Văn A',
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_111',
                name: 'Team kinh doanh 1',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
              {
                id: 'organization_unit_112',
                name: 'Team kinh doanh 2',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_12',
            name: 'Phòng ban marketing',
            status: 'active',
            leaderName: 'Nguyễn Văn A',
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_121',
                name: 'Team marketing 1',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_13',
            name: 'Phòng ban sales',
            status: 'active',
            leaderName: 'Nguyễn Văn A',
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_131',
                name: 'Team sales 1',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_14',
            name: 'Phòng ban IT',
            status: 'active',
            leaderName: 'Nguyễn Văn A',
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_141',
                name: 'Team IT 1',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
              {
                id: 'organization_unit_142',
                name: 'Team IT 2',
                status: 'active',
                leaderName: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
            ],
          },
        ],
      },
    ]);
  }

  async getAllOrganizationUnit(): Promise<OrganizationUnit[]> {
    await this.waitABit();
    return Promise.resolve([
      {
        id: 'organization_unit_1',
        name: 'BOD',
        description: 'Board of Directors, ban giám đốc',
        status: 'active',
        branch: 'branch_1',
        leader: 'employee_1',
        leaderName: 'Nguyễn Văn A',
        people: ['employee_1'],
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_11',
            name: 'Phòng ban kinh doanh',
            description: '',
            status: 'active',
            branch: 'branch_1',
            leader: 'employee_11',
            leaderName: 'Nguyễn Văn A',
            people: ['employee_11'],
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_111',
                name: 'Team kinh doanh 1',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_111',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_111'],
                numberOfPeople: 1,
              },
              {
                id: 'organization_unit_112',
                name: 'Team kinh doanh 2',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_112',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_112'],
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_12',
            name: 'Phòng ban marketing',
            description: '',
            status: 'active',
            branch: 'branch_1',
            leader: 'employee_12',
            leaderName: 'Nguyễn Văn A',
            people: ['employee_12'],
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_121',
                name: 'Team marketing 1',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_121',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_121'],
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_13',
            name: 'Phòng ban sales',
            description: '',
            status: 'active',
            branch: 'branch_1',
            leader: 'employee_13',
            leaderName: 'Nguyễn Văn A',
            people: ['employee_13'],
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_131',
                name: 'Team sales 1',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_131',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_131'],
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_14',
            name: 'Phòng ban IT',
            description: '',
            status: 'active',
            branch: 'branch_1',
            leader: 'employee_14',
            leaderName: 'Nguyễn Văn A',
            people: ['employee_14'],
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_141',
                name: 'Team IT 1',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_141',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_141'],
                numberOfPeople: 1,
              },
              {
                id: 'organization_unit_142',
                name: 'Team IT 2',
                description: '',
                status: 'active',
                branch: 'branch_1',
                leader: 'employee_142',
                leaderName: 'Nguyễn Văn A',
                people: ['employee_142'],
                numberOfPeople: 1,
              },
            ],
          },
        ],
      },
    ]);
  }
}
