import { Col, DatePicker, Form, Input, Select, Skeleton } from 'antd';
import React from 'react';
import { JobTitleDTO, OrganizationUnitDTO, PositionDTO, WorkTypeDTO } from 'services/ApiClient';
import { apiJobTitle, apiOrganization, apiWorkType } from 'services/ApiClient.singleton';
import { dateToMoment, formatSalary, formItemLayoutWide, required, toNumber } from 'utils';

type Props = {
  position: PositionDTO | undefined;
  positionReady: boolean;
  onSubmitData: (data: PositionDTO) => Promise<void>;
};

export const WorkForm: React.FC<Props> = (props) => {
  const { position, positionReady, onSubmitData } = props;
  const [, forceRender] = React.useReducer((x) => ++x, 0);

  const [form] = Form.useForm();
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

  if (positionReady && !position) return <h2>Không có dữ liệu về nhân viên</h2>;
  if (!positionReady) return <Skeleton />;

  const initialValues = {
    ...dateToMoment(position!),
    salary: formatSalary(position?.salary || '0'),
    workType: position?.workType?.id?.toString(),
    jobTitle: position?.jobTitle?.id?.toString(),
    unit: position?.unit?.id?.toString(),
  };

  const onSubmit = async (data) => {
    const submitData = {
      ...data,
      workType: workTypesRef.current.find((i) => i.id === Number(data.workType)),
      jobTitle: jobTitlesRef.current.find((i) => i.id === Number(data.jobTitle)),
      unit: organizationsRef.current.find((i) => i.id === Number(data.unit)),
      startDate: data.startDate?.toDate(),
      endDate: data.endDate?.toDate(),
      salary: toNumber(String(data.salary)),
    } as PositionDTO;
    onSubmitData(submitData);
  };

  return (
    <Form<PositionDTO>
      name="work"
      form={form}
      onFinish={onSubmit}
      id="employee-work-form"
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
            hasFeedback={!jobTitlesRef.current}
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
            hasFeedback={!workTypesRef.current}
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
            hasFeedback={!organizationsRef.current}
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
    </Form>
  );
};
