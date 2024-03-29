import { Col, Form, Row, Skeleton, Tag } from 'antd';
import { LeaveForm, StandardFormProps } from 'components';
import { PositionHistory } from 'components/EmployeeWork/PositionHistory';
import React from 'react';
import { EmployeeStatus, PositionDTO } from 'services/ApiClient';
import { mapWorkingStatusToTag } from 'utils';
import { WorkForm } from './WorkForm';

type FormDataType = PositionDTO;
type Props = StandardFormProps<FormDataType> & {
  positions: PositionDTO[] | undefined;
  positionsReady: boolean;
};

export const EmployeeWork: React.FC<Props> = (props) => {
  const { data, dataReady, type, positions, positionsReady, onSubmit, actionButtons } = props;

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if ((type !== 'create' && !dataReady) || !positionsReady) return <Skeleton />;

  return (
    <div>
      {data?.employee?.status ? (
        <Form>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item name="status">
                <Tag
                  {...mapWorkingStatusToTag[data?.employee?.status]}
                  style={{ fontSize: 15, margin: '10px 0 0 10px' }}
                  onClick={() => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : undefined}
      {data?.employee?.status === EmployeeStatus.Leaved ? (
        <Row gutter={40}>
          <Col span={12}>
            <LeaveForm data={data} dataReady type="read-only" labelAlign="left" />
          </Col>
        </Row>
      ) : (
        <WorkForm
          data={data}
          dataReady={dataReady}
          type={type}
          onSubmit={onSubmit}
          actionButtons={actionButtons}
          displayLegend
        />
      )}
      {positions?.length ? <PositionHistory values={positions} /> : null}
    </div>
  );
};
