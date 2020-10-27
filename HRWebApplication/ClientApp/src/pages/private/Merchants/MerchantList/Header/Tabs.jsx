import React from 'react';
import { Col, Radio } from 'antd';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentTabState, merchantsByTabsSelector } from '../../states';

function Tabs(props) {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

  const { contents } = useRecoilValueLoadable(merchantsByTabsSelector);
  const { allMerchants, pendingMerchants, activeMerchants, suspendedMerchants } = contents;

  return (
    <Col>
      <Radio.Group onChange={(e) => setCurrentTab(e.target.value)} value={currentTab}>
        <Radio.Button value="ALL">{'Tất cả (' + (allMerchants?.length ?? 0) + ')'}</Radio.Button>
        <Radio.Button value="PENDING">
          {'Đang chờ duyệt (' + (pendingMerchants?.length ?? 0) + ')'}
        </Radio.Button>
        <Radio.Button value="ACTIVE">
          {'Đang hoạt động (' + (activeMerchants?.length ?? 0) + ')'}
        </Radio.Button>
        <Radio.Button value="SUSPENDED">
          {'Ngừng hợp tác (' + (suspendedMerchants?.length ?? 0) + ')'}
        </Radio.Button>
      </Radio.Group>
    </Col>
  );
}

export default React.memo(Tabs);
