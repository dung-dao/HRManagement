export interface Entity {
  id: string;
  organizationName: string;
  // manager: string;
  description: string;
  parentId: string | null;
}

export const datasets: Entity[] = [
  {
    id: 'organization_unit_1',
    organizationName: 'BOD',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: null,
  },
  {
    id: 'organization_unit_11',
    organizationName: 'Phòng ban kinh doanh',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_111',
    organizationName: 'Team kinh doanh 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_11',
  },

  {
    id: 'organization_unit_1111',
    organizationName: 'Team kinh doanh 1.1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_111',
  },
  {
    id: 'organization_unit_1112',
    organizationName: 'Team kinh doanh 1.2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_111',
  },
  {
    id: 'organization_unit_112',
    organizationName: 'Team kinh doanh 2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_11',
  },
  {
    id: 'organization_unit_12',
    organizationName: 'Phòng ban marketing',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_121',
    organizationName: 'Team marketing 1',
    // manager: 'Nguyễn Văn A',
    description: 'organization_unit_12',
    parentId: 'organization_unit_12',
  },
  {
    id: 'organization_unit_13',
    organizationName: 'Phòng ban sales',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_131',
    organizationName: 'Team sales 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_3',
  },
  {
    id: 'organization_unit_14',
    organizationName: 'Phòng ban IT',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_1',
  },
  {
    id: 'organization_unit_141',
    organizationName: 'Team IT 1',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_14',
  },
  {
    id: 'organization_unit_142',
    organizationName: 'Team IT 2',
    // manager: 'Nguyễn Văn A',
    description: '',
    parentId: 'organization_unit_14',
  },
];

export interface OrganizationUnit {
  id: string;
  organizationName: string;
  // status: 'active' | 'inactive';
  // manager: string;
  numberOfPeople: number;
  description: string;
  children?: OrganizationUnit[];
}

export const organizationUnits: OrganizationUnit[] = [
  {
    id: 'organization_unit_1',
    organizationName: 'BOD',
    // manager: 'Nguyễn Văn A',
    numberOfPeople: 1,
    description: '',
    children: [
      {
        id: 'organization_unit_11',
        organizationName: 'Phòng ban kinh doanh',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_111',
            organizationName: 'Team kinh doanh 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
            children: [
              {
                id: 'organization_unit_1111',
                organizationName: 'Team kinh doanh 1.1',
                // manager: 'Nguyễn Văn A',
                numberOfPeople: 1,
                description: '',
              },
              {
                id: 'organization_unit_1112',
                organizationName: 'Team kinh doanh 1.2',
                // manager: 'Nguyễn Văn A',
                numberOfPeople: 1,
                description: '',
              },
            ],
          },
          {
            id: 'organization_unit_112',
            organizationName: 'Team kinh doanh 2',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_12',
        organizationName: 'Phòng ban marketing',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_121',
            organizationName: 'Team marketing 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_13',
        organizationName: 'Phòng ban sales',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_131',
            organizationName: 'Team sales 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
      {
        id: 'organization_unit_14',
        organizationName: 'Phòng ban IT',
        // manager: 'Nguyễn Văn A',
        numberOfPeople: 1,
        description: '',
        children: [
          {
            id: 'organization_unit_141',
            organizationName: 'Team IT 1',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
          {
            id: 'organization_unit_142',
            organizationName: 'Team IT 2',
            // manager: 'Nguyễn Văn A',
            numberOfPeople: 1,
            description: '',
          },
        ],
      },
    ],
  },
];
