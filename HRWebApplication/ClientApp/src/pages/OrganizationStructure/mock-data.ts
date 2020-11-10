export interface Entity {
  id: string;
  name: string;
  // manager: string;
  description: string;
  parentId: string | null;
}

export const datasets: Entity[] = [
  {
    id: 'organization_unit_1',
    name: 'BOD',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: null,
  },
  {
    id: 'organization_unit_11',
    name: 'Phòng ban kinh doanh',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_111',
    name: 'Team kinh doanh 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_11',
  },

  {
    id: 'organization_unit_1111',
    name: 'Team kinh doanh 1.1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_111',
  },
  {
    id: 'organization_unit_1112',
    name: 'Team kinh doanh 1.2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_111',
  },
  {
    id: 'organization_unit_112',
    name: 'Team kinh doanh 2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_11',
  },
  {
    id: 'organization_unit_12',
    name: 'Phòng ban marketing',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_121',
    name: 'Team marketing 1',
    // manager: 'Nguyễn Văn A',
    description: 'organization_unit_12',
    parentId: 'organization_unit_12',
  },
  {
    id: 'organization_unit_13',
    name: 'Phòng ban sales',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_131',
    name: 'Team sales 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_3',
  },
  {
    id: 'organization_unit_14',
    name: 'Phòng ban IT',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_141',
    name: 'Team IT 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_14',
  },
  {
    id: 'organization_unit_142',
    name: 'Team IT 2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_14',
  },
];

export interface OrganizationUnit {
  id: string;
  name: string;
  // status: 'active' | 'inactive';
  // manager: string;
  numberOfPeople: number;
  description: string;
  children?: OrganizationUnit[];
}

export const organizationUnits: OrganizationUnit[] = [
  {
    id: 'organization_unit_1',
    name: 'BOD',
    // manager: 'Nguyễn Văn A',
    numberOfPeople: 1,
    description: '',
    children: [
      {
        id: 'organization_unit_11',
        name: 'Phòng ban kinh doanh',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_111',
            name: 'Team kinh doanh 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
            children: [
              {
                id: 'organization_unit_1111',
                name: 'Team kinh doanh 1.1',
                // manager: 'Nguyễn Văn A',
                numberOfPeople: 1,
                description: '',
              },
              {
                id: 'organization_unit_1112',
                name: 'Team kinh doanh 1.2',
                // manager: 'Nguyễn Văn A',
                numberOfPeople: 1,
                description: '',
              },
            ],
          },
          {
            id: 'organization_unit_112',
            name: 'Team kinh doanh 2',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_12',
        name: 'Phòng ban marketing',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_121',
            name: 'Team marketing 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_13',
        name: 'Phòng ban sales',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_131',
            name: 'Team sales 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_14',
        name: 'Phòng ban IT',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_141',
            name: 'Team IT 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
          {
            id: 'organization_unit_142',
            name: 'Team IT 2',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
    ],
  },
];
