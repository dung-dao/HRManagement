import { Tabs } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { EmployeesClient } from 'services/ApiClient';
import './EmployeeDetail.css';
import { InfoTab } from './InfoTab/InfoTab';
import { DetailPageType } from './utils';
import { WorkTab } from './WorkTab/WorkTab';

function Index() {
  const apiEmployee = React.useRef(new EmployeesClient());
  const { pathname } = useLocation();
  const { employeeId } = useParams<{ employeeId: string }>();
  const history = useHistory();

  const mapPageTypeToTitle: Record<DetailPageType, string> = {
    add: 'Thêm mới nhân viên',
    edit: 'Chỉnh sửa nhân viên',
  };

  console.log('pathname', pathname);

  const detailPageType: DetailPageType = pathname.includes('add')
    ? 'add'
    : pathname.includes('edit')
    ? 'edit'
    : 'add'; // actually not 'add', but 'never'

  const getPageType = React.useMemo(() => {
    if (pathname.includes('add')) return 'add';
    if (pathname.includes('edit-info')) return 'edit-info';
    if (pathname.includes('edit-work')) return 'edit-work';
  }, [pathname]);

  return (
    <AppBody
      title={mapPageTypeToTitle[detailPageType]}
      selectedMenu="/employees"
      openMenu="/employees"
    >
      <Tabs
        activeKey={getPageType === 'edit-info' || getPageType === 'add' ? '1' : '2'}
        onChange={(newActiveKey) => {
          if (getPageType === 'add') return;
          if (getPageType === 'edit-info' && newActiveKey === '2') {
            history.push('employee-edit-work/' +  employeeId);
          } else if (getPageType === 'edit-work' && newActiveKey === '1') {
            history.push('employee-edit-info/' + employeeId);
          }
        }}
      >
        <Tabs.TabPane tab="Thông tin" key="1">
          <InfoTab
            detailPageType={detailPageType}
            employeeId={+employeeId}
            apiEmployee={apiEmployee}
          />
        </Tabs.TabPane>
        {getPageType !== 'add' ? (
          <Tabs.TabPane tab="Công việc" key="2">
            <WorkTab
              detailPageType={detailPageType}
              employeeId={+employeeId}
              apiEmployee={apiEmployee}
            />
          </Tabs.TabPane>
        ) : null}
      </Tabs>
    </AppBody>
  );
}

export default React.memo(Index);
