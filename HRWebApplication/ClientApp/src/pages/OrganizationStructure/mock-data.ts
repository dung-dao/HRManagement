export interface OrganizationUnit {
  id: string;
  organizationName: string;
  // status: 'active' | 'inactive'; 
  leader: string;
  numberOfPeople: number;
  children?: OrganizationUnit[];
}

export const organizationUnits: OrganizationUnit[] = [
  {
    id: 'organization_unit_1',
    organizationName: 'BOD',
    leader: 'Nguyễn Văn A',
    numberOfPeople: 1,
    children: [
      {
        id: 'organization_unit_11',
        organizationName: 'Phòng ban kinh doanh',
        leader: 'Nguyễn Văn A',
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_111',
            organizationName: 'Team kinh doanh 1',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
            children: [
              {
                id: 'organization_unit_1111',
                organizationName: 'Team kinh doanh 1.1',
                leader: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
              {
                id: 'organization_unit_1112',
                organizationName: 'Team kinh doanh 1.2',
                leader: 'Nguyễn Văn A',
                numberOfPeople: 1,
              },
            ],
          },
          {
            id: 'organization_unit_112',
            organizationName: 'Team kinh doanh 2',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
          },
        ],
      },
      {
        id: 'organization_unit_12',
        organizationName: 'Phòng ban marketing',
        leader: 'Nguyễn Văn A',
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_121',
            organizationName: 'Team marketing 1',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
          },
        ],
      },
      {
        id: 'organization_unit_13',
        organizationName: 'Phòng ban sales',
        leader: 'Nguyễn Văn A',
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_131',
            organizationName: 'Team sales 1',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
          },
        ],
      },
      {
        id: 'organization_unit_14',
        organizationName: 'Phòng ban IT',
        leader: 'Nguyễn Văn A',
        numberOfPeople: 1,
        children: [
          {
            id: 'organization_unit_141',
            organizationName: 'Team IT 1',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
          },
          {
            id: 'organization_unit_142',
            organizationName: 'Team IT 2',
            leader: 'Nguyễn Văn A',
            numberOfPeople: 1,
          },
        ],
      },
    ],
  },
];
