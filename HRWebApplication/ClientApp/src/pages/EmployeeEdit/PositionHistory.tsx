import React from 'react';
import {Timeline} from "antd";
import {PositionDTO} from "services/ApiClient";

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
                <div>{v.jobTitle?.name}</div>
                <div>{v.workType?.name}</div>
                <div>{v.startDate?.toDateString()}</div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </fieldset>
    </div>
  )
}
