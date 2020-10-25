import React from 'react';
import { Button, Col, Row } from 'antd';
import Tabs from './Tabs';
import Search from './Search';
import { SyncOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as Constant from '../../../../../common/Constant';
import { useSetRecoilState } from 'recoil';
import { forceUpdateAllMerchantsFetchingState } from '../../states';

function Index(props) {
  const forceUpdate = useSetRecoilState(forceUpdateAllMerchantsFetchingState);
  const reFetchMerchants = () => forceUpdate((n) => n + 1);
  // How to refresh an asynchronous selector: https://github.com/facebookexperimental/Recoil/issues/85

  return (
    <Row gutter={[16, 16]}>
      <Tabs />
      <Search />
      <Col style={{ marginLeft: 'auto' }}>
        <Button type="primary" icon={<SyncOutlined />} size="middle" onClick={reFetchMerchants}>
          Làm mới
        </Button>
        <Link to={Constant.ROUTER_URL.MERCHANT_ADD_PAGE} style={{ marginLeft: 10 }}>
          <Button type="primary" icon={<UserAddOutlined />} size="middle">
            Thêm mới đối tác
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

export default Index;
