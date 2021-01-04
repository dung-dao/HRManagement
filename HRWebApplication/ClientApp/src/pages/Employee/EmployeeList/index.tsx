import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import Table from './Table';

export const EmployeeList = React.memo(function () {
  const searchInputRef = React.useRef<any>();
  const [searchKeyword, setSearchKeyword] = React.useState('');

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm nhân viên"
            enterButton
            allowClear
            ref={searchInputRef}
            onSearch={setSearchKeyword}
          />
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Link to={ROUTES.employeeNew} style={{ marginLeft: 10 }}>
            <Button type="primary" icon={<UserAddOutlined />} size="middle">
              Thêm mới nhân viên
            </Button>
          </Link>
        </Col>
      </Row>
      <Table searchKeyword={searchKeyword} />
    </div>
  );
});
