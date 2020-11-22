import React from 'react';
import {Button, Col, Collapse, DatePicker, Form, Input, message, Row, Select, Timeline, Tooltip} from "antd";
import {
  formatCurrency,
  formItemLayoutWide,
  required,
  toNumber
} from "./EmployeeDetail/utils";
import {
  EmployeeDTO,
  JobCategoryClient, JobCategoryDTO,
  JobTitleClient, JobTitleDTO, OrganizationUnitDTO,
  OrganizationUnitsClient, PositionDTO,
  WorkTypeClient, WorkTypeDTO
} from "services/ApiClient";
import moment from "moment";
import {useTry} from "hooks";

type EmployeeFormProps = {
  action: any;
  style?: object;
  employeeId: number
  onSubmit: (value: EmployeeDTO) => Promise<any>
  value?: PositionDTO
}

export function EmployeeWorkForm(props: EmployeeFormProps) {
  const { action: FormAction, style = {}, onSubmit, value, employeeId } = props
  const initialValues = { ...value, startDate: moment(value?.startDate), endDate: moment(value?.endDate) }
  const [form] = Form.useForm();
  const apiWorkType = React.useRef(new WorkTypeClient());
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const [workTypes, setWorkTypes] = React.useState<WorkTypeDTO[]>([]);
  const [jobCategories, setJobCategories] = React.useState<JobCategoryDTO[]>([]);
  const [jobTitles, setJobTitles] = React.useState<JobTitleDTO[]>([]);
  const [organizations, setOrganizations] = React.useState<OrganizationUnitDTO[]>([]);
  const [positions, setPositions] = React.useState<PositionDTO[]>([]);
  const [selectedWorkType, setSelectedWorkType] = React.useState<WorkTypeDTO>();
  const [selectedJobCategory, setSelectedJobCategory] = React.useState<JobCategoryDTO>();
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<JobTitleDTO>();
  const [selectedOrganization, setSelectedOrganization] = React.useState<OrganizationUnitDTO>();

  const onFormSubmit = async (data) => {
    const submitData = {
      ...data,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      salary: toNumber(data.salary),
    }
    await onSubmit(submitData)
  };
  const { $try: trySubmitting, isPending } = useTry(onFormSubmit)

  React.useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  React.useEffect(() => {
    // Fetch collections for Select.Option s
    apiWorkType.current
      .workType_GetAll()
      .then((data) => setWorkTypes(data))
      .catch((err) => console.error(err));
    apiJobCategory.current
      .jobCategory_GetAll()
      .then((data) => setJobCategories(data))
      .catch((err) => console.error(err));
    apiJobTitle.current
      .jobTitle_GetAll()
      .then((data) => setJobTitles(data))
      .catch((err) => console.error(err));
    apiOrganization.current
      .organizationUnits_GetAll()
      .then((data) => setOrganizations(data))
      .catch((err) => console.error(err));
  }, [form, employeeId]);

  return (
    <Form name='work' form={form} onFinish={trySubmitting} style={style} initialValues={initialValues}>
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
            name="salary"
            rules={[required('Lương')]}
          >
            <Input
              placeholder="1,000,000"
              suffix="VNĐ"
              onChange={(e) => {
                form.setFieldsValue({
                  salary: formatCurrency(toNumber(e.target.value).toString())
                })
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
              style={{ marginRight: '10px' }}
              value={selectedJobTitle?.id}
              onChange={(data) => setSelectedJobTitle(jobTitles?.find((it) => it.id === data))}
            >
              {jobTitles?.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Loại hình làm việc"
            name="workType"
            rules={[required('Loại hình làm việc')]}
          >
            <Select
              placeholder="Loại hình làm việc"
              style={{ marginRight: '10px' }}
              value={selectedWorkType?.id}
              onChange={(data) => setSelectedWorkType(workTypes?.find((it) => it.id === data))}
            >
              {workTypes?.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Loại hình nhân sự"
            name="jobCategory"
            rules={[required('Loại hình nhân sự')]}
          >
            <Select
              placeholder="Loại hình nhân sự"
              style={{ marginRight: '10px' }}
              value={selectedJobCategory?.id}
              onChange={(data) =>
                setSelectedJobCategory(jobCategories?.find((it) => it.id === data))
              }
            >
              {jobCategories?.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Tổ chức"
            name="unit"
            rules={[required('Tổ chức')]}
          >
            <Select
              placeholder="Tổ chức"
              style={{ marginRight: '10px' }}
              value={selectedOrganization?.id}
              onChange={(data) =>
                setSelectedOrganization(organizations?.find((it) => it.id === data))
              }
            >
              {organizations?.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </fieldset>
      </Col>
      {/*{type !== 'add' ? (*/}
      {/*  <Col span={24}>*/}
      {/*    <fieldset>*/}
      {/*      <legend>Lịch sử công tác:</legend>*/}
      {/*      <Collapse style={{ marginBottom: 20 }}>*/}
      {/*        <Collapse.Panel header="Lịch sử">*/}
      {/*          <Timeline mode="left" className="EmployeeDetail-history-section">*/}
      {/*            /!* {[...merchantData.history].reverse().map((each, index) => (*/}
      {/*                    <Timeline.Item*/}
      {/*                      color={index ? 'gray' : undefined}*/}
      {/*                      label={format(new Date(each.time), 'dd-MM-yyyy HH:mm:SS')}*/}
      {/*                    >*/}
      {/*                      {each.type}*/}
      {/*                    </Timeline.Item>*/}
      {/*                  ))} *!/*/}
      {/*          </Timeline>*/}
      {/*        </Collapse.Panel>*/}
      {/*      </Collapse>*/}
      {/*    </fieldset>*/}
      {/*  </Col>*/}
      {/*) : null}*/}
      <FormAction form={form} loading={isPending} />
    </Form>
  );
}
