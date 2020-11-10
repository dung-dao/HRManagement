// @ts-nocheck
import React from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import {
  acceptStatusToTagProps,
  licenseToTagProps,
  genderCodeToGender,
  sortByField,
} from './utils';
import DecisionContextMenu from './DecisionContextMenu';

// columns of <Table />

export const columns = [
  // { title: 'STT', key: 'index', render: (value, item, index) => index + 1 },
  { title: 'Mã nhân viên', dataIndex: 'code' },
  { title: 'Họ', dataIndex: 'firstName' },
  { title: 'Tên', dataIndex: 'lastName' },
  { title: 'Email cá nhân', dataIndex: 'personalEmail' },
  { title: 'Email công việc', dataIndex: 'workEmail' },
  { title: 'Sđt', dataIndex: 'phone' },
  { title: 'Ngày sinh', dataIndex: 'dateOfBirth' },
  { title: 'Giới tính', dataIndex: 'sex' },
  // { title: 'Bộ phận', dataIndex: 'department' },
  // { title: 'Loại hình nhân sự', dataIndex: 'employeeType' },
  // { title: 'Vị trí', dataIndex: 'jobTitle' },
  // { title: 'Lương', dataIndex: 'salary' },
  // { title: 'Ngày bắt đầu', dataIndex: 'dateStarted' },
  // { title: 'Loại hình làm việc', dataIndex: 'workType' },
  // { title: 'Chi nhánh', dataIndex: 'branch' },
  { title: 'Địa chỉ hiện tại', dataIndex: 'currentAddress' },
  { title: 'Địa chỉ thường trú', dataIndex: 'permanentAddress' },
  { title: 'Số CMND', dataIndex: 'nationalId' },
  { title: 'Ngày cấp', dataIndex: 'licenseDate' },
  { title: 'Nơi cấp', dataIndex: 'licensePlace' },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    render: (_, record) => (
      <Space size="small">
        <Link to={'employee-detail/' + record?.id} title="Xem chi tiết">
          <Button size="small" type="dashed">
            <EyeOutlined />
          </Button>
        </Link>
        <Link to={'employee-edit/' + record?.id} title="Chỉnh sửa trực tiếp">
          <Button size="small" type="primary">
            <EditOutlined />
          </Button>
        </Link>
        <Link to={'employee-add/' + record?.id} title="Xoá">
          <Button size="small" danger>
            <DeleteOutlined />
          </Button>
        </Link>
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
