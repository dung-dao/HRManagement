import React from 'react';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

// convert acceptStatus of a merchant to props of an antd <Tag/> component
export const acceptStatusToTagProps = (status) => {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return {
        color: 'warning',
        icon: <SyncOutlined spin />,
        children: 'Đang chờ duyệt',
      };
    case 'ACTIVE':
      return {
        color: 'success',
        icon: <CheckCircleOutlined />,
        children: 'Đang hoạt động',
      };
    case 'SUSPENDED':
      return {
        color: 'default',
        icon: <MinusCircleOutlined />,
        children: 'Ngừng hợp tác',
      };
    default:
      return null;
  }
};

// convert businessLicense status of a merchant to props of an antd <Tag/> component
export const licenseToTagProps = (license) => {
  if (license) {
    return {
      color: 'success',
      icon: <CheckCircleOutlined />,
      children: 'ĐĐK',
      title: 'Đã đăng ký',
    };
  } else {
    return {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      children: 'CĐK',
      title: 'Chưa đăng ký',
    };
  }
};

// sorter of columns of <Table />
export const sortByField = function (field) {
    // resolvePath to resolve nested properties: https://stackoverflow.com/a/43849204/9787887
    // it makes merchant['shop.gender'] be equivalent to merchant['shop']['gender']
    const resolvePath = (object, path, defaultValue) =>
        path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object);

    // sortByField copied from: https://github.com/manhdung99/mobile-store-client/blob/master/src/utils/sort.js
    return (a, b) => {
        const [aVal, bVal] = [resolvePath(a, field), resolvePath(b, field)];
        return typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
    };
};

export const genderCodeToGender = ['Nữ', 'Nam', 'Cả hai']; // 0->Nữ, 1->Nam, 2->Cả hai

