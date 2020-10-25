import React from 'react';
import { Collapse, Timeline, Spin, message } from 'antd';
import format from 'date-fns/format';
import './styles.css';
import { useMerchantDetailData } from '../hooks';

function Index({ merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();
  //
  // if (!isDetail) {
  //   // There must be something wrong if this component can be rendered on ADD page, not DETAIL page
  //   message.config({ maxCount: 1 }); // multiple renders will cause ugliness
  //   message.error('Không tìm thấy chi tiết đối tác');
  //   return <Spin size="large" />
  //   // throw Error(`This component can't be rendered on ADD-DETAIL page`);
  // }

  return (
    <Collapse style={{ marginBottom: 20 }}>
      <Collapse.Panel header="Lịch sử hoạt động">
        <Timeline mode="left" className="HistorySection-time-line">
          {[...merchantData.history].reverse().map((each, index) => (
            <Timeline.Item
              color={index ? 'gray' : undefined}
              label={format(new Date(each.time), 'dd-MM-yyyy HH:mm:SS')}
            >
              {each.type}
            </Timeline.Item>
          ))}
        </Timeline>
      </Collapse.Panel>
    </Collapse>
  );
}

export default Index;
