import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import React from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';

function Index() {
  const searchInputRef = React.useRef<any>();
  const [searchKeyword, setSearchKeyword] = React.useState('');

  return (
    <AppBody title="Nhân viên">
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
          <Link to="employee/new" style={{ marginLeft: 10 }}>
            <Button type="primary" icon={<UserAddOutlined />} size="middle">
              Thêm mới nhân viên
            </Button>
          </Link>
        </Col>
      </Row>
      <Table searchKeyword={searchKeyword} />
    </AppBody>
  );
}

export default React.memo(Index);
