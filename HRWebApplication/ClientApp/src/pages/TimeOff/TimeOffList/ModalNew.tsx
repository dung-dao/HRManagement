import { Form, Input, Modal, message, Select, Radio, DatePicker } from 'antd';
import { useRerender } from 'hooks/useRerender';
import { pick } from 'lodash';
import moment from 'moment';
import React from 'react';
import { LeaveTypeDTO } from 'services/ApiClient';
import { apiLeaveType } from 'services/ApiClient.singleton';
import { momentToDate, required } from 'utils';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export function ModalNew() {
  const { isModalNewVisible, setIsModalNewVisible } = usePage();
  const forceRerender = useRerender();
  const [form] = Form.useForm();
  const [leaveTypes, setLeaveTypes] = React.useState<LeaveTypeDTO[]>([]);
  const [leaveTypesReady, setLeaveTypesReady] = React.useState<boolean>(false);

  const onSubmit = async (values) => {
    try {
      const toSubmit = pick(values, 'time', 'note', 'duration') as any;
      toSubmit.type = leaveTypes.find((it) => it.id == values.type);
      console.log(momentToDate(toSubmit));
      message.info('Tạo nghỉ phép thành công');
      setIsModalNewVisible(false);
    } catch (err) {
      if (err.isApiException) {
        message.error('Tạo nghỉ phép không thành công');
      }
    }
  };

  const initialValues = {
    type: undefined,
    // timeType: 'many-days',
    // time: [moment(), moment()],
    // initialValues must be 'one-day' and moment(), if 'many-days' and [moment(), moment()] it will crash, I haven't had the time to investigate the reason though.
    timeType: 'one-day',
    time: moment(),
    duration: 1,
    note: '',
  } as const;

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    // when modal is closed, reset the fields value of the form
    // we reset the value on CLOSED instead of OPEN
    // we MUST USE setTimeout-0 along with the reseting code, to avoid flashing value changes in the UI
    if (!isModalNewVisible) {
      setTimeout(() => {
        form.setFieldsValue(initialValues);
      }, 0);
    }
  }, [isModalNewVisible]);

  React.useEffect(() => {
    const fetctLeaveTypes = async () => {
      try {
        setLeaveTypesReady(false);
        const data = await apiLeaveType.leaveType_GetAll();
        setLeaveTypes(data);
      } catch (err) {
        console.error(err);
        message.error('Không thể tải dữ liệu');
      } finally {
        setLeaveTypesReady(true);
      }
    };
    fetctLeaveTypes();
  }, []);

  return (
    <Modal
      title={'Tạo nghỉ phép'}
      visible={isModalNewVisible}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'new-form',
      }}
      onCancel={() => setIsModalNewVisible(false)}
      width={600}
    >
      <Form
        {...formLayout}
        id="new-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
        // initialValues={initialValues}
        onValuesChange={(changedValues, values) => {
          if (changedValues.timeType === 'half-days') {
            form.setFieldsValue({
              time: moment(),
              duration: 0.5,
            });
          } else if (changedValues.timeType === 'one-day') {
            form.setFieldsValue({
              time: moment(),
              duration: 1,
            });
          } else if (changedValues.timeType === 'many-days') {
            form.setFieldsValue({
              time: [moment(), moment()],
              duration: 1,
            });
          }

          if (changedValues.time && values.timeType === 'many-days') {
            const [from, to] = changedValues.time;
            if (from && to) form.setFieldsValue({ duration: to.diff(from, 'days') + 1 });
          }

          forceRerender();
        }}
      >
        <Form.Item
          label="Loại nghỉ phép"
          rules={[required('Loại nghỉ phép')]}
          name={['type']}
          hasFeedback={!leaveTypesReady}
          validateStatus="validating"
        >
          <Select placeholder="Chọn">
            {leaveTypes.map((it) => (
              <Select.Option value={String(it.id)} key={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại thời gian" rules={[required('Loại thời gian')]} name={['timeType']}>
          <Radio.Group>
            <Radio value={'half-days'}>Nửa ngày</Radio>
            <Radio value={'one-day'}>Một ngày</Radio>
            <Radio value={'many-days'}>Nhiều ngày</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Thời gian" rules={[required('Thời gian')]} name={['time']}>
          {form.getFieldValue('timeType') === 'many-days' ? (
            <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          ) : (
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          )}
        </Form.Item>

        <Form.Item label="Số công" name={['duration']}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Ghi chú" name={['note']}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
