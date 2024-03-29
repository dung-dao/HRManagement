import { message, Steps } from 'antd';
import { pick } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'routes';
import {
  EmployeeDTO,
  EmployeesClient,
  PositionDTO,
  UserDTO,
  UsersClient,
} from 'services/ApiClient';
import { EmployeeInfoForm } from '../EmployeeInfoForm';
import { EmployeeWorkForm } from '../EmployeeWorkForm';
import { EmployeeFormAction } from './EmployeeFormAction';
import { PageProvider, usePage } from './PageProvider';

const { Step } = Steps;
export type FormType = 'add' | 'edit';

const verbs = {
  add: 'Thêm mới',
  edit: 'Cập nhật',
};

function Form1() {
  const { api, nextPage, setEmployee, employee } = usePage();
  const apiUsers = React.useRef(new UsersClient());
  const type: FormType = employee ? 'edit' : 'add';
  const verb = verbs[type];
  const onSubmit = async (data: EmployeeDTO) => {
    try {
      if (type === 'add') {
        // TODO: rework
        const newUserDTO = {
          ...pick(data, 'userName', 'password'),
          email: data.personalEmail,
          employee: { ...data },
        } as UserDTO;
        const { employee } = await apiUsers.current.signUp(newUserDTO);
        await apiUsers.current.addRoleForUser(newUserDTO.userName, (data as any).role);
        message.info(`${verb} thông tin nhân viên ${data.firstName} thành công`);
        setEmployee(employee!);
      } else if (type === 'edit') {
        await api.updateEmployeeById(data.id!, data);
        message.info(`${verb} thông tin nhân viên ${data.firstName} thành công`);
        setEmployee(data);
      }
      nextPage();
    } catch (e) {
      console.error(e);
      message.error(`Không thể ${verb.toLowerCase()} thông tin nhân viên ${data.firstName}`);
    }
  };

  return (
    <EmployeeInfoForm
      style={{ marginTop: 25 }}
      action={EmployeeFormAction}
      onSubmit={onSubmit}
      value={employee}
    />
  );
}
function Form2() {
  const { api, nextPage, employee, position } = usePage();
  const type: FormType = employee ? 'edit' : 'add';
  const verb = verbs[type];
  const history = useHistory();
  const onSubmit = async (data: PositionDTO) => {
    try {
      await api.employees_AddToPosition(employee?.id!, data);
      message.info(`${verb} nhân viên ${employee?.firstName} thành công`);
      nextPage();
      history.push(ROUTES.employeeList);
    } catch (e) {
      console.error(e);
      message.error(`Không thể ${verb.toLowerCase()} nhân viên ${employee?.firstName}`);
    }
  };

  return (
    <EmployeeWorkForm
      style={{ marginTop: 25 }}
      action={EmployeeFormAction}
      value={position}
      onSubmit={onSubmit}
      // employeeId={employee?.id!}
    />
  );
}

const steps = [
  {
    title: 'Thông tin',
    content: <Form1 />,
  },
  {
    title: 'Công việc',
    content: <Form2 />,
  },
];

type Props = {};

export const EmployeeNew: React.FC<Props> = (props) => {
  const api = React.useRef(new EmployeesClient());
  const [currentPage, setCurrent] = React.useState(0);
  const nextPage = () => {
    setCurrent(currentPage + 1 > 1 ? 1 : currentPage + 1);
  };
  const prevPage = () => {
    setCurrent(currentPage - 1);
  };
  const [employee, setEmployee] = React.useState<EmployeeDTO>();
  const [position, setPosition] = React.useState<PositionDTO>();
  const contextValue = {
    api: api.current,
    nextPage,
    prevPage,
    currentPage,
    steps,
    employee,
    setEmployee,
    position,
    setPosition,
  };

  return (
    <PageProvider value={contextValue}>
      <Steps current={currentPage}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[currentPage].content}</div>
    </PageProvider>
  );
};
