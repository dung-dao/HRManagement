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
  const workTypesRef = React.useRef<WorkTypeDTO[]>([]);
  const jobCategoriesRef = React.useRef<JobCategoryDTO[]>([]);
  const jobTitlesRef = React.useRef<JobTitleDTO[]>([]);
  const organizationsRef = React.useRef<OrganizationUnitDTO[]>([]);
  const [,forceRender] = React.useReducer((x) => ++x, 0)

  React.useEffect(() => {
    (async () => {
      const one = apiWorkType.current
        .workType_GetAll()
        .then((data) => workTypesRef.current = data)
        .catch((err) => console.error(err));
      const two = apiJobCategory.current
        .jobCategory_GetAll()
        .then((data) => jobCategoriesRef.current = data)
        .catch((err) => console.error(err));
      const three = apiJobTitle.current
        .jobTitle_GetAll()
        .then((data) => jobTitlesRef.current = data)
        .catch((err) => console.error(err));
      const four = apiOrganization.current
        .organizationUnits_GetAll()
        .then((data) => organizationsRef.current = data)
        .catch((err) => console.error(err));
      await Promise.all([one,two,three,four])
      forceRender()
    })()
  }, [form, employeeId]);

  const onFormSubmit = async (data) => {
    const submitData = {
      ...data,
      workType: workTypesRef.current.find(i => i.id === Number(data.workType)),
      jobTitle: jobTitlesRef.current.find(i => i.id === Number(data.jobTitle)),
      unit: organizationsRef.current.find(i => i.id === Number(data.unit)),
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      salary: toNumber(data.salary),
    } as PositionDTO
    await onSubmit(submitData)
  };
  const { $try: trySubmitting, isPending } = useTry(onFormSubmit)

  React.useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

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
            >
              {jobTitlesRef.current.map((it) => (
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
            >
              {workTypesRef.current.map((it) => (
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
            >
              {organizationsRef.current.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </fieldset>
      </Col>
      <FormAction form={form} loading={isPending} />
    </Form>
  );
}
