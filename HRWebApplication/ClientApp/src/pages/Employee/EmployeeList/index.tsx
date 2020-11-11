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
          <Button type="primary" icon={<SyncOutlined />} size="middle">
            Làm mới
          </Button>
          <Link to="employee-add" style={{ marginLeft: 10 }}>
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