import { Col, DatePicker, Form, Input, Select, Skeleton } from 'antd';
import { StandardFormProps } from 'components';
import React from 'react';
import { JobTitleDTO, OrganizationUnitDTO, PositionDTO, WorkTypeDTO } from 'services/ApiClient';
import { apiJobTitle, apiOrganization, apiWorkType } from 'services/ApiClient.singleton';
import { dateToMoment, formatSalary, formItemLayoutWide, required, toNumber } from 'utils';

type FormDataType = PositionDTO;
type Props = StandardFormProps<FormDataType>;

export const WorkForm: React.FC<Props> = (props) => {
  const { data, dataReady, onSubmit, type, actionButtons } = props;
  const [, forceRender] = React.useReducer((x) => ++x, 0);
  const [form] = Form.useForm<FormDataType>();
  const workTypesRef = React.useRef<WorkTypeDTO[]>([]);
  const jobTitlesRef = React.useRef<JobTitleDTO[]>([]);
  const organizationsRef = React.useRef<OrganizationUnitDTO[]>([]);

  React.useEffect(() => {
    (async () => {
      const one = apiWorkType
        .workType_GetAll()
        .then((data) => (workTypesRef.current = data))
        .catch((err) => console.error(err));
      const two = apiJobTitle
        .jobTitle_GetAll()
        .then((data) => (jobTitlesRef.current = data))
        .catch((err) => console.error(err));
      const three = apiOrganization
        .organizationUnits_GetAll()
        .then((data) => (organizationsRef.current = data))
        .catch((err) => console.error(err));
      await Promise.all([one, two, three]);
      forceRender();
    })();
  }, [form]);

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu về nhân viên</h2>;
  if (type !== 'create' && !dataReady) return <Skeleton />;

  const initialValues =
    type === 'create'
      ? undefined
      : {
          ...dateToMoment(data!),
          salary: formatSalary(data?.salary || '0'),
          workType: data?.workType?.id?.toString(),
          jobTitle: data?.jobTitle?.id?.toString(),
          unit: data?.unit?.id?.toString(),
        };

  const onFinish = async (data) => {
    const submitData = {
      ...data,
      workType: workTypesRef.current.find((i) => i.id === Number(data.workType)),
      jobTitle: jobTitlesRef.current.find((i) => i.id === Number(data.jobTitle)),
      unit: organizationsRef.current.find((i) => i.id === Number(data.unit)),
      startDate: data.startDate?.toDate(),
      endDate: data.endDate?.toDate(),
      salary: toNumber(String(data.salary)),
    } as FormDataType;
    onSubmit?.(submitData);
  };

  return (
    <Form<FormDataType>
      form={form}
      onFinish={onFinish}
      id="employee-work-form"
      name="employee-work-form"
      initialValues={initialValues}
      {...formItemLayoutWide}
    >
      <Col span={24}>
        <fieldset>
          <legend>Vị trí công việc</legend>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={type === 'create' ? [required('Ngày bắt đầu')] : undefined}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              open={type === 'read-only' ? false : undefined}
              allowClear={type === 'read-only' ? false : undefined}
              inputReadOnly={type === 'read-only'}
            />
          </Form.Item>
          <Form.Item label="Ngày kết thúc" name="endDate">
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              open={type === 'read-only' ? false : undefined}
              allowClear={type === 'read-only' ? false : undefined}
              inputReadOnly={type === 'read-only'}
            />
          </Form.Item>
          <Form.Item
            label="Lương"
            name="salary"
            rules={type === 'create' ? [required('Lương')] : undefined}
          >
            <Input
              placeholder="1,000,000"
              suffix="VNĐ"
              onChange={(e) => {
                form.setFieldsValue({
                  salary: +formatSalary(e.target.value),
                });
              }}
              readOnly={type === 'read-only'}
            />
          </Form.Item>
          <Form.Item
            label="Vị trí công việc"
            name="jobTitle"
            rules={type === 'create' ? [required('Vị trí công việc')] : undefined}
            hasFeedback={!jobTitlesRef.current}
          >
            <Select
              placeholder="Vị trí công việc"
              style={{ marginRight: '10px' }}
              open={type === 'read-only' ? false : undefined}
            >
              {jobTitlesRef.current.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại hình làm việc"
            name="workType"
            rules={type === 'create' ? [required('Loại hình làm việc')] : undefined}
            hasFeedback={!workTypesRef.current}
          >
            <Select
              placeholder="Loại hình làm việc"
              style={{ marginRight: '10px' }}
              open={type === 'read-only' ? false : undefined}
            >
              {workTypesRef.current.map((it) => (
                <Select.Option value={it.id!.toString()} key={it.id}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Tổ chức"
            name="unit"
            rules={type === 'create' ? [required('Tổ chức')] : undefined}
            hasFeedback={!organizationsRef.current}
          >
            <Select
              placeholder="Tổ chức"
              style={{ marginRight: '10px' }}
              open={type === 'read-only' ? false : undefined}
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
      {actionButtons}
    </Form>
  );
};
