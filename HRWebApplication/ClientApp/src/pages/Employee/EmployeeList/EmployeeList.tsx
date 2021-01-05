import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Row, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { columns } from './columns';

export const EmployeeList = React.memo(function () {
  const { searchRegex, inputSearchProps } = useSearchKeywork();
  const [employees, setEmployees] = React.useState<EmployeeDTO[]>();

  React.useEffect(() => {
    apiEmployees
      .employees_GetAll()
      .then((data) => setEmployees(data))
      .catch((err: Error) => message.error(err.message));
  }, []);

  const onDeleteEmployee = React.useCallback((employeeId) => {
    apiEmployees
      .deleteEmployeeById(employeeId)
      .then(() => {
        setEmployees((employees) => employees?.filter((it) => it.id != employeeId));
        message.info('Xoá nhân viên thành công');
      })
      .catch((err) => message.error('Xoá nhân viên không thành công'));
  }, []);

  const finalEmployees = employees?.filter(
    (it) =>
      `${it.firstName} ${it.lastName}`.match(searchRegex) || JSON.stringify(it).match(searchRegex),
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm nhân viên"
            enterButton
            allowClear
            {...inputSearchProps}
          />
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Link to={ROUTES.employeeNew} style={{ marginLeft: 10 }}>
            <Button type="primary" icon={<UserAddOutlined />} size="middle">
              Thêm mới nhân viên
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        // @ts-ignore
        columns={columns({ onDeleteEmployee })}
        dataSource={finalEmployees}
        loading={!finalEmployees}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
        rowKey={(record) => String(record.id)}
      />
    </div>
  );
});
