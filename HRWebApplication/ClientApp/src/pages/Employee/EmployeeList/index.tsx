import React from 'react';
import AppBody from 'components/Layouts/AppBody';
import Table from './Table';
import { Button, Col, Row, Input } from 'antd';
import { SyncOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <AppBody>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search size="middle" placeholder="Tìm kiếm nhân viên" enterButton allowClear />
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Link to="employee/new" style={{ marginLeft: 10 }}>
            <Button type="primary" icon={<UserAddOutlined />} size="middle">
              Thêm mới nhân viên
            </Button>
          </Link>
        </Col>
      </Row>
      <Table />
    </AppBody>
  );
}

export default React.memo(Index);
