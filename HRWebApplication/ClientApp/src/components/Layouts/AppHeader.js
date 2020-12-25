import { Affix, Col, Layout, Row, Space } from 'antd';
import React, { Component } from 'react';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    return (
      <Affix offsetTop={0}>
        <Header style={{ background: '#fff', boxShadow: '0 0 10px gray' }}>
          <Row>
            <Col span={12}>
              <h2>{this.props.title}</h2>
            </Col>
            <Col span={12} align="right">
              <Space size="middle"></Space>
            </Col>
          </Row>
        </Header>
      </Affix>
    );
  }
}

export default AppHeader;
