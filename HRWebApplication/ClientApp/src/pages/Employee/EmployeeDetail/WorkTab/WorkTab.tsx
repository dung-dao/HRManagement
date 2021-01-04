// @ts-nocheck
import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Upload,
  Collapse,
  Timeline,
  DatePicker,
  Select,
  message,
} from 'antd';

import ImgCrop from 'antd-img-crop';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import {
  EmployeesClient,
  WorkTypeClient,
  JobCategoryClient,
  JobTitleClient,
  OrganizationUnitsClient,
  PositionDTO,
  OrganizationUnitDTO,
  JobTitleDTO,
  JobCategoryDTO,
  WorkTypeDTO,
} from 'services/ApiClient';
// import DatePicker from 'components/DatePicker'
import moment from 'moment';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { organizationUnits } from 'pages/Employee/EmployeeOrganization/mock-data';
import { Tabs } from 'antd';
import {
  formItemLayout,
  formItemLayoutWide,
  required,
  formatCurrency,
  toNumber,
} from 'pages/Employee/EmployeeDetail/utils';
import { FooterButtons } from '../FooterButtons/FooterButtons';

export const WorkTab: React.FC<{
  detailPageType: DetailPageType;
  employeeId: number;
  apiEmployee: React.MutableRefObject<EmployeesClient>;
}> = ({ detailPageType, employeeId, apiEmployee }) => {
  const [form] = Form.useForm();

  const apiWorkType = React.useRef(new WorkTypeClient());
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const [workTypes, setWorkTypes] = React.useState<WorkTypeDTO[]>();
  const [jobCategories, setJobCategories] = React.useState<JobCategoryDTO[]>();
  const [jobTitles, setJobTitles] = React.useState<JobTitleDTO[]>();
  const [organizations, setOrganizations] = React.useState<OrganizationUnitDTO[]>();
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const [selectedWorkType, setSelectedWorkType] = React.useState<WorkTypeDTO>();
  const [selectedJobCategory, setSelectedJobCategory] = React.useState<JobCategoryDTO>();
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<JobTitleDTO>();
  const [selectedOrganization, setSelectedOrganization] = React.useState<OrganizationUnitDTO>();
  const [salary, setSalary] = React.useState<number>(0);
  const history = useHistory();

  const onFinish = () => {
    if (detailPageType === 'add') {
      apiEmployee.current
        .createEmployee(form.getFieldsValue())
        .then(() => {
          message.info('Thêm mới nhân viên thành công');
          form.resetFields();
        })
        .catch();
    }
  };

  React.useEffect(() => {
    // Fetch collections for Select.Option s
    apiWorkType.current
      .workType_GetAll()
      .then((data) => console.log('WorkType', data) || setWorkTypes(data))
      .catch((err) => console.log(err));
    apiJobCategory.current
      .jobCategory_GetAll()
      .then((data) => console.log('JobCategory', data) || setJobCategories(data))
      .catch((err) => console.log(err));
    apiJobTitle.current
      .jobTitle_GetAll()
      .then((data) => console.log('JobTitle', data) || setJobTitles(data))
      .catch((err) => console.log(err));
    apiOrganization.current
      .organizationUnits_GetAll()
      .then((data) => console.log('Organization', data) || setOrganizations(data))
      .catch((err) => console.log(err));

    if (detailPageType === 'edit') {
      apiEmployee.current
        .employees_GetPosition(employeeId)
        .then((data) => console.log('positions', data) || setPositions(data))
        .catch((err) => console.log(err));

      apiEmployee.current
        .employees_GetCurrentPosition(employeeId)
        .then((data) => {
          console.log('current position', data);
          form.setFieldsValue({
            ...form.getFieldsValue(),
            startDate: moment(data.startDate),
            endDate: moment(data.endDate),
          });
          setSalary(data.salery);
          setSelectedJobCategory(data.jobCategory);
          setSelectedJobTitle(data.jobTitle);
          setSelectedWorkType(data.workType);
          setSelectedOrganization(data.unit);
        })
        .catch((err) => console.log(err));
    }
  }, [form, detailPageType, employeeId]);

  const onSubmitClick = () => {
    if (detailPageType === 'edit') {
      history.push('/employees');
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Col span={24}>
        <fieldset>
          <legend>Vị trí công việc</legend>
          <Form.Item
            {...formItemLayoutWide}
            label="Ngày bắt đầu"
            name="startDate"
            rules={[required('Ngày bắt đầu')]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item {...formItemLayoutWide} label="Ngày kết thúc" name="endDate">
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Lương"
            // name="salary"
            rules={[required('Lương')]}
          >
            {/* TODO: trailing VNĐ, format xx,xxx,xxx */}
            <Input
              placeholder="1,000,000"
              suffix="VNĐ"
              value={formatCurrency(salary)}
              onChange={(e) => {
                setSalary(toNumber(e.target.value));
              }}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Vị trí công việc"
            name="jobTitle"
            rules={[required('Vị trí công việc')]}
          >
            <Select
              placeholder="Vị trí công việc"
              style={{ width: 'calc(100% -  45px)', marginRight: '10px' }}
              value={selectedJobTitle?.id}
              onChange={(data) => setSelectedJobTitle(jobTitles?.find((it) => it.id === data))}
            >
              {jobTitles?.map((it) => (
                <Select.Option value={it.id} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
            <Tooltip title="Xem toàn bộ vị trí công việc">
              <Button icon={<DoubleRightOutlined />} />
            </Tooltip>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Loại hình làm việc"
            name="workType"
            rules={[required('Loại hình làm việc')]}
          >
            <Select
              placeholder="Loại hình làm việc"
              style={{ width: 'calc(100% -  45px)', marginRight: '10px' }}
              value={selectedWorkType?.id}
              onChange={(data) => setSelectedWorkType(workTypes?.find((it) => it.id === data))}
            >
              {workTypes?.map((it) => (
                <Select.Option value={it.id} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
            <Tooltip title="Xem toàn bộ loại hình làm việc">
              <Button icon={<DoubleRightOutlined />} />
            </Tooltip>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Loại hình nhân sự"
            name="jobCategory"
            rules={[required('Loại hình nhân sự')]}
          >
            <Select
              placeholder="Loại hình nhân sự"
              style={{ width: 'calc(100% -  45px)', marginRight: '10px' }}
              value={selectedJobCategory?.id}
              onChange={(data) =>
                setSelectedJobCategory(jobCategories?.find((it) => it.id === data))
              }
            >
              {jobCategories?.map((it) => (
                <Select.Option value={it.id} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
            <Tooltip title="Xem toàn bộ loại hình nhân sự">
              <Button icon={<DoubleRightOutlined />} />
            </Tooltip>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Tổ chức"
            name="unit"
            rules={[required('Tổ chức')]}
          >
            <Select
              placeholder="Tổ chức"
              style={{ width: 'calc(100% -  45px)', marginRight: '10px' }}
              value={selectedOrganization?.id}
              onChange={(data) =>
                setSelectedOrganization(organizations?.find((it) => it.id === data))
              }
            >
              {organizations?.map((it) => (
                <Select.Option value={it.id} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
            <Tooltip title="Xem toàn bộ cơ cấu tổ chức">
              <Button
                icon={<DoubleRightOutlined />}
                onClick={() => history.push('/organization')}
              />
            </Tooltip>
          </Form.Item>
        </fieldset>
      </Col>
      {detailPageType !== 'add' ? (
        <Col span={24}>
          <fieldset>
            <legend>Lịch sử công tác:</legend>
            <Collapse style={{ marginBottom: 20 }}>
              <Collapse.Panel header="Lịch sử">
                <Timeline mode="left" className="EmployeeDetail-history-section">
                  {/* {[...merchantData.history].reverse().map((each, index) => (
                          <Timeline.Item
                            color={index ? 'gray' : undefined}
                            label={format(new Date(each.time), 'dd-MM-yyyy HH:mm:SS')}
                          >
                            {each.type}
                          </Timeline.Item>
                        ))} */}
                </Timeline>
              </Collapse.Panel>
            </Collapse>
          </fieldset>
        </Col>
      ) : null}
      <FooterButtons />
    </Form>
  );
};
