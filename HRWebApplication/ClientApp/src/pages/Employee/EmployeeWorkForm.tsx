import { Col, DatePicker, Form, Input, Select } from 'antd';
import { useTry } from 'hooks';
import moment from 'moment';
import React from 'react';
import {
  EmployeeDTO,
  JobCategoryClient,
  JobCategoryDTO,
  JobTitleClient,
  JobTitleDTO,
  OrganizationUnitDTO,
  OrganizationUnitsClient,
  PositionDTO,
  WorkTypeClient,
  WorkTypeDTO,
} from 'services/ApiClient';
import { formatCurrency, formItemLayoutWide, required, toNumber } from './EmployeeDetail/utils';

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
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const workTypesRef = React.useRef<WorkTypeDTO[]>([]);
  const jobCategoriesRef = React.useRef<JobCategoryDTO[]>([]);
  const jobTitlesRef = React.useRef<JobTitleDTO[]>([]);
  const organizationsRef = React.useRef<OrganizationUnitDTO[]>([]);
  const [, forceRender] = React.useReducer((x) => ++x, 0);
  const initialValues = React.useMemo(
    () => ({
      ...value,
      startDate: moment(value?.startDate),
      endDate: moment(value?.endDate),
      workType: value?.workType?.id?.toString(),
      jobTitle: value?.jobTitle?.id?.toString(),
      unit: value?.unit?.id?.toString(),
    }),
    [],
  );

  const onFormSubmit = async (data) => {
    const allRefTableLoaded =
      workTypesRef.current &&
      jobCategoriesRef.current &&
      jobTitlesRef.current &&
      organizationsRef.current;
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
    // LOG: console.log('> : submitData', form.getFieldsValue(), submitData, workTypesRef.current);
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
      const two = apiJobCategory.current
        .jobCategory_GetAll()
        .then((data) => (jobCategoriesRef.current = data))
        .catch((err) => console.error(err));
      const three = apiJobTitle.current
        .jobTitle_GetAll()
        .then((data) => (jobTitlesRef.current = data))
        .catch((err) => console.error(err));
      const four = apiOrganization.current
        .organizationUnits_GetAll()
        .then((data) => (organizationsRef.current = data))
        .catch((err) => console.error(err));
      await Promise.all([one, two, three, four]);
      //  LOG:
      // console.log(
      //   'all ref table loaded',
      //   workTypesRef,
      //   jobCategoriesRef,
      //   jobTitlesRef,
      //   organizationsRef,
      // );
      forceRender();
    })();
  }, [form]);

  console.log('render');

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  // LOG: console.log(form.getFieldsValue(), 'form', form.getFieldValue('jobTitle'));

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
                  salary: formatCurrency(toNumber(e.target.value).toString()),
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
