import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const FooterButtons: React.FC<{}> = () => {
  const history = useHistory();

  return (
    <Col span={12}>
      <Row justify="end">
        <Button type="primary" onClick={() => history.push('/employees')}>
          <LeftOutlined />
          Trở về
        </Button>
        <Button type="primary" htmlType="submit" style={{ marginLeft: 20, marginRight: 20 }}>
          <CheckOutlined /> Hoàn thành
        </Button>
      </Row>
    </Col>
  );
};
