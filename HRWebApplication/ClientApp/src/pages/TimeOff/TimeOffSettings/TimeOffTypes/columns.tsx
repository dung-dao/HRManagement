import { ActionRenderer } from './ActionRenderer';

export const columns = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
    render: ActionRenderer,
  },
];
