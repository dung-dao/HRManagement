// convert data from database to real data the frontend can use
import { Api } from './mock-api';

const api = new Api();

export const columns = [
  {
    title: 'Tên tổ chức',
    dataIndex: 'organizationName',
    key: 'organizationName',
  },
  {
    title: 'Số thành viên',
    dataIndex: 'numberOfMembers',
    key: 'numberOfMembers',
    width: '12%',
  },
  {
    title: 'Trưởng tổ chức',
    dataIndex: 'leader',
    key: 'leader',
    width: '30%',
  },
];

export async function getDataTable() {
  const convert = ({ id, name, status, leaderName, numberOfPeople, children }: any) =>
    status === 'active'
      ? {
          key: id,
          organizationName: name,
          leader: leaderName,
          numberOfMembers: numberOfPeople,
          children: children?.length ?? children.map((it) => convert(it)),
        }
      : undefined;

  const rawData = await api.getGlimpseOrganizationUnit();
  return convert(rawData);
}
