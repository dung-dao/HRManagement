import React from 'react';
import {Timeline, Typography} from "antd";
import {PositionDTO} from "services/ApiClient";
import moment from 'moment';

const { Title } = Typography;

type PositionHistoryProps = {
  values: PositionDTO[]
}

export function PositionHistory(props: PositionHistoryProps) {
  const { values } = props

  return (
    <div>
      <fieldset>
        <legend>Lịch sử công tác:</legend>
        <Timeline style={{ display: 'inline-block' }} mode="left" className="EmployeeDetail-history-section">
          {values.reverse().map((v, i) => {
            return (
              <Timeline.Item color={i === 0 ? 'green' : 'red'}>
                <Title level={5}>{v.jobTitle?.name}</Title>
                <div>{v.workType?.name}</div>
                <div>{moment(v.startDate).format('DD-MM-yyyy')} → {moment(v.endDate).format('DD-MM-yyyy')}</div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </fieldset>
    </div>
  )
}
