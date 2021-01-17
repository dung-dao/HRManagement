import React from 'react';
import { Button, Modal, Timeline, Typography } from 'antd';
import { PositionDTO } from 'services/ApiClient';
import moment from 'moment';
import { WorkForm } from './WorkForm';

type PositionHistoryProps = {
  values: PositionDTO[];
};

export function PositionHistory(props: PositionHistoryProps) {
  const { values } = props;
  const [detail, setDetail] = React.useState<PositionDTO>();

  return (
    <div>
      <fieldset>
        <legend>Lịch sử công tác:</legend>
        <Timeline
          style={{ display: 'inline-block' }}
          mode="left"
          className="EmployeeDetail-history-section"
        >
          {[...values].reverse().map((v, i) => {
            return (
              <Timeline.Item color={i === 0 ? 'green' : 'red'} key={i}>
                <Button type="link" onClick={() => setDetail(v)} style={{ padding: 0 }}>
                  <Typography.Title level={5}>{v.jobTitle?.name}</Typography.Title>
                </Button>
                <div>{v.workType?.name}</div>
                <div>
                  {moment(v.startDate).format('DD-MM-yyyy')} →{' '}
                  {moment(v.endDate).format('DD-MM-yyyy')}
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </fieldset>
      <Modal
        visible={!!detail}
        centered
        onCancel={() => setDetail(undefined)}
        width={1000}
        destroyOnClose
      >
        <div style={{ marginTop: 15 }}>
          <WorkForm data={detail} dataReady={true} type="read-only" />
        </div>
      </Modal>
    </div>
  );
}
