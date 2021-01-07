import { CarryOutOutlined, CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, EmployeeStatus } from 'services/ApiClient';
import { mapSex, mapStatusToTagProps, BeautifyEmployeeStatus } from './utils';

export const columns = ({ onDeleteEmployee }) => [
  // { title: 'STT', key: 'index', render: (value, item, index) => index + 1 },
  // { title: 'Mã nhân viên', dataIndex: 'code' },
  {
    title: 'Trạng thái',
    fixed: 'left',
    key: 'status',
    dataIndex: 'status',
    render: (status: EmployeeStatus, _, index) => (
      <Tag {...mapStatusToTagProps[status]} key={index} />
    ),
    filters: [
      { text: 'Đang làm việc', value: BeautifyEmployeeStatus.Working },
      { text: 'Chưa làm việc', value: BeautifyEmployeeStatus.Pending },
      { text: 'Ngừng làm việc', value: BeautifyEmployeeStatus.Left },
    ],
    onFilter: (value: EmployeeStatus, record: EmployeeDTO) => record.status === value,
    sorter: (a: EmployeeDTO, b: EmployeeDTO) => {
      const mapPriority = {
        // the higher value should appear first
        [BeautifyEmployeeStatus.Working]: 2,
        [BeautifyEmployeeStatus.Pending]: 1,
        [BeautifyEmployeeStatus.Left]: 0,
      };
      return mapPriority[a.status!] - mapPriority[b.status!];
    },
    sortDirections: ['descend'],
    defaultSortOrder: 'descend',
  },
  { title: 'Họ', key: 'firstName', dataIndex: 'firstName' },
  { title: 'Tên', key: 'lastName', dataIndex: 'lastName' },

  { title: 'Email cá nhân', key: 'personalEmail', dataIndex: 'personalEmail' },
  { title: 'Email công việc', key: 'workEmail', dataIndex: 'workEmail' },
  { title: 'Sđt', key: 'phone', dataIndex: 'phone' },
  {
    title: 'Ngày sinh',
    key: 'dateOfBirth',
    dataIndex: 'dateOfBirth',
    render: (date) => moment(date).format('DD/MM/YYYY'),
  },
  { title: 'Giới tính', key: 'sex', dataIndex: 'sex', render: (sex) => mapSex[sex] },
  // { title: 'Bộ phận', dataIndex: 'department' },
  // { title: 'Loại hình nhân sự', dataIndex: 'employeeType' },
  // { title: 'Vị trí', dataIndex: 'jobTitle' },
  // { title: 'Lương', dataIndex: 'Salery' },
  // { title: 'Ngày bắt đầu', dataIndex: 'dateStarted' },
  // { title: 'Loại hình làm việc', dataIndex: 'workType' },
  // { title: 'Chi nhánh', dataIndex: 'branch' },
  { title: 'Địa chỉ hiện tại', key: 'currentAddress', dataIndex: 'currentAddress' },
  { title: 'Địa chỉ thường trú', key: 'address', dataIndex: 'address' },
  // { title: 'Số CMND', dataIndex: 'nationalId' },
  // { title: 'Ngày cấp', dataIndex: 'licenseDate' },
  // { title: 'Nơi cấp', dataIndex: 'licensePlace' },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    render: (_, record: EmployeeDTO) => (
      <Space size="small">
        <Tooltip title="Nghỉ phép">
          <Button
            size="small"
            disabled={record.status !== BeautifyEmployeeStatus.Working}
            type="dashed"
            onClick={() => console.log('open popup nghi phep')}
          >
            <CarryOutOutlined />
          </Button>
        </Tooltip>
        <Link to={`${ROUTES.employee}/${record?.id}`}>
          <Tooltip title="Chỉnh sửa">
            <Button size="small" type="primary">
              <EditOutlined />
            </Button>
          </Tooltip>
        </Link>
        <Popconfirm
          placement="right"
          title={'Bạn có chắc muốn xoá nhân viên này?'}
          onConfirm={() => onDeleteEmployee(record?.id)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Tooltip title="Xoá">
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  },
  // {
  //   title: 'Tên thương hiệu',
  //   dataIndex: ['shop', 'brand'],
  //   // Look at render property of Column: https://ant.design/components/table/#Column
  //   render: (brandName, wholeRecord) => {
  //     const website = wholeRecord.social.find((it) => it.type === 'website')?.url;
  //     return website ? (
  //       <a href={website} target="_blank" rel="noopener noreferrer" title={website}>
  //         {brandName}
  //       </a>
  //     ) : (
  //       <p title={'Thương hiệu ' + brandName + ' không có website'}>{brandName}</p>
  //     );
  //   },
  // },
  // {
  //   title: 'Ngày thành lập',
  //   dataIndex: ['shop', 'estDate'],
  //   render: (estDate) => <p>{estDate}</p>,
  //   sorter: (a, b) => {
  //     const [aMonth, aYear] = a.shop.estDate.split('/').map(Number);
  //     const [bMonth, bYear] = b.shop.estDate.split('/').map(Number);

  //     return aYear - bYear || aMonth - bMonth;
  //   },
  // },
  // {
  //   title: 'Chủ thương hiệu',
  //   dataIndex: ['representative', 'fullName'],
  //   render: (representativeName, wholeRecord) => (
  //     <Link
  //       onClick={() => {
  //         // setRepresentativeModal({
  //         //   isShow: true,
  //         //   merchantToShow: wholeRecord,
  //         // });
  //       }}
  //     >
  //       {representativeName}
  //     </Link>
  //   ),
  // },
  // {
  //   title: () => <Tooltip title="Số lượng chi nhánh">SL chi nhánh</Tooltip>,
  //   dataIndex: ['shop', 'branch'],
  //   width: 140,
  //   sorter: sortByField('shop.branch'),
  // },
  // {
  //   title: 'Giới tính',
  //   dataIndex: ['shop', 'gender'],
  //   filters: [
  //     { text: 'Nam', value: 'Nam' },
  //     { text: 'Nữ', value: 'Nữ' },
  //     { text: 'Cả hai', value: 'Cả hai' },
  //   ],
  //   width: 120,
  //   onFilter: (filterValue, record) => genderCodeToGender[record.shop.gender] === filterValue,
  //   render: (genderCode) => <p>{genderCodeToGender[genderCode]}</p>,
  // },
  // {
  //   title: 'Độ tuổi',
  //   dataIndex: 'ageRange',
  //   key: 'ageRange',
  //   width: 80,
  //   render: (value, record) => (
  //     <p>
  //       {record.shop.ageFrom} - {record.shop.ageTo}
  //     </p>
  //   ),
  // },
  // {
  //   title: 'Danh mục',
  //   dataIndex: ['shop', 'categories'],
  //   width: 230,
  //   filters: [
  //     { text: 'Áo', value: 'Áo' },
  //     { text: 'Quần', value: 'Quần' },
  //     { text: 'Giày dép', value: 'Giày dép' },
  //     { text: 'Phụ kiện', value: 'Phụ kiện' },
  //   ],
  //   onFilter: (filterValue, record) =>
  //     record.shop.categories.map((it) => it.name).includes(filterValue),
  //   render: (categories) => (
  //     <>
  //       {categories.map((each) => (
  //         <Tag>{each.name}</Tag>
  //       ))}
  //     </>
  //   ),
  // },
  // {
  //   title: () => <Tooltip title="Giấy phép kinh doanh">Giấy phép KD</Tooltip>,
  //   dataIndex: ['shop', 'businessLicense'],
  //   filters: [
  //     { text: 'Đã đăng ký', value: true },
  //     { text: 'Chưa đăng ký', value: false },
  //   ],
  //   onFilter: (filterValue, record) => record.shop.businessLicense === filterValue,
  //   render: (license, _, index) => <Tag {...licenseToTagProps(license)} key={index} />,
  // },
  // {
  //   title: 'Trạng thái duyệt',
  //   key: 'acceptStatus',
  //   dataIndex: 'acceptStatus',
  //   render: (acceptStatus) => <Tag {...acceptStatusToTagProps(acceptStatus)} key={acceptStatus} />,
  // },
];