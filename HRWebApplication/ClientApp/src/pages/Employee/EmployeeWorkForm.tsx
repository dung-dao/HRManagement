import { Col, DatePicker, Form, Input, Select } from 'antd';
import { useTry } from 'hooks';
import moment from 'moment';
import React from 'react';
import {
  EmployeeDTO,
  JobTitleClient,
  JobTitleDTO,
  OrganizationUnitDTO,
  OrganizationUnitsClient,
  PositionDTO,
  WorkTypeClient,
  WorkTypeDTO,
} from 'services/ApiClient';
import { formatSalary, formItemLayoutWide, required, toNumber } from './EmployeeDetail/utils';
import { message } from 'antd';

type EmployeeFormProps = {
  action?: any;
  style?: object;
  onSubmit?: (value: EmployeeDTO) => Promise<any>;
  value?: PositionDTO;
};

export function EmployeeWorkForm(props: EmployeeFormProps) {
  const { action: FormAction, style = {}, onSubmit, value } = props;
  const [form] = Form.useForm();
  const apiWorkType = React.useRef(new WorkTypeClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const workTypesRef = React.useRef<WorkTypeDTO[]>([]);
  const jobTitlesRef = React.useRef<JobTitleDTO[]>([]);
  const organizationsRef = React.useRef<OrganizationUnitDTO[]>([]);
  const [, forceRender] = React.useReducer((x) => ++x, 0);
  const initialValues = React.useMemo(
    () => ({
      ...value,
      salary: formatSalary(value?.salary || '0'),
      startDate: moment(value?.startDate),
      endDate: value?.endDate ? moment(value.endDate) : undefined,
      workType: value?.workType?.id?.toString(),
      jobTitle: value?.jobTitle?.id?.toString(),
      unit: value?.unit?.id?.toString(),
    }),
    [],
  );

  const onFormSubmit = async (data) => {
    const allRefTableLoaded =
      workTypesRef.current && jobTitlesRef.current && organizationsRef.current;
    if (!allRefTableLoaded) {
      console.error('Not all ref table loaded');
      return;
    }

    const submitData = {
      ...data,
      workType: workTypesRef.current.find((i) => i.id === Number(data.workType)),
      jobTitle: jobTitlesRef.current.find((i) => i.id === Number(data.jobTitle)),
      unit: organizationsRef.current.find((i) => i.id === Number(data.unit)),
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      salary: toNumber(String(data.salary)),
    } as PositionDTO;

    const refToNullError = !submitData.workType || !submitData.jobTitle || !submitData.unit;
    if (refToNullError) {
      message.error('Một số trường thông tin không sử dụng được!');
      return;
    }

    await onSubmit?.(submitData);
  };
  const { $try: trySubmitting, isPending } = useTry(onFormSubmit);

  React.useEffect(() => {
    // LOG: console.log('affect get ref tables');
    (async () => {
      const one = apiWorkType.current
        .workType_GetAll()
        .then((data) => (workTypesRef.current = data))
        .catch((err) => console.error(err));
      const two = apiJobTitle.current
        .jobTitle_GetAll()
        .then((data) => (jobTitlesRef.current = data))
        .catch((err) => console.error(err));
      const three = apiOrganization.current
        .organizationUnits_GetAll()
        .then((data) => (organizationsRef.current = data))
        .catch((err) => console.error(err));
      await Promise.all([one, two, three]);
      forceRender();
    })();
  }, [form]);

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form
      name="work"
      form={form}
      onFinish={trySubmitting}
      style={style}
      initialValues={initialValues}
    >
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
                  salary: formatSalary(e.target.value),
                });
              }}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayoutWide}
            label="Vị trí công việc"
            name="jobTitle"
            rules={[required('Vị trí công việc')]}
          >
            <Select placeholder="Vị trí công việc" style={{ marginRight: '10px' }}>
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
            <Select placeholder="Loại hình làm việc" style={{ marginRight: '10px' }}>
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
            <Select placeholder="Tổ chức" style={{ marginRight: '10px' }}>
              {organizationsRef.current.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </fieldset>
      </Col>
      {FormAction && <FormAction form={form} loading={isPending} />}
    </Form>
  );
}
