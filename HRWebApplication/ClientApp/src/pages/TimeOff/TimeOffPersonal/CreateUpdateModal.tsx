import { DatePicker, Form, Input, message, Modal, Radio, Select } from 'antd';
import { useRerender } from 'hooks/useRerender';
import moment from 'moment';
import React from 'react';
import { TimeOffTypeDTO } from 'services/ApiClient';
import { apiTimeOffType } from 'services/ApiClient.singleton';
import { addBusinessDays, calculateBusinessDays, required } from 'utils';
import { RecordType, usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'ngày lễ' as const;

type FormType = {
  timeOffType: string;
  timeType: 'half-days' | 'one-day' | 'many-days';
  time: moment.Moment | [moment.Moment, moment.Moment];
  duration: number;
  note: string;
};

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const [timeOffTypes, setTimeOffTypes] = React.useState<TimeOffTypeDTO[]>([]);
  const [timeOffTypesReady, setTimeOffTypesReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchTimeOffTypes = async () => {
      try {
        setTimeOffTypesReady(false);
        const data = await apiTimeOffType.timeOffType_GetAll();
        setTimeOffTypes(data);
      } catch (err) {
        console.error(err);
        message.error('Không thể tải dữ liệu');
      } finally {
        setTimeOffTypesReady(true);
      }
    };
    fetchTimeOffTypes();
  }, []);

  const formTypeToRecordType = (formValues: FormType): RecordType => {
    return {
      date: formValues.timeType === 'many-days' ? formValues.time[0] : formValues.time,
      duration: formValues.duration,
      note: formValues.note,
      timeOffType: timeOffTypes.find((it) => String(it.id) === formValues.timeOffType),
    } as RecordType;
  };

  const recordTypeToFormType = (record: RecordType): FormType => {
    return {
      timeOffType: String(record.timeOffType?.id!),
      timeType:
        record.duration === 0.5 ? 'half-days' : record.duration === 1 ? 'one-day' : 'many-days',
      time:
        record.duration! <= 1
          ? moment(record.date)
          : [moment(record.date!), addBusinessDays(moment(record.date!), record.duration!)],
      duration: record.duration!,
      note: record.note || '',
    };
  };

  const forceRerender = useRerender();

  const onSubmit = async (values: FormType) => {
    try {
      setIsSubmitting(true);
      const record = formTypeToRecordType(values);
      console.log('>  ~ file: CreateUpdateModal.tsx ~ record', record);
      if (modalVisibleType === 'update') {
        await onUpdate(record);
      } else if (modalVisibleType === 'create') {
        await onCreate(record);
      }
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialValues = React.useMemo(
    () => (modalVisibleType === 'update' ? recordTypeToFormType(selectedRecord!) : undefined),
    [modalVisibleType, selectedRecord],
  );
  console.log(
    '>  ~ file: CreateUpdateModal.tsx ~ line 104 ~ initialValues',
    initialValues,
    form.getFieldValue('timeType'),
  );

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    if (modalVisibleType === 'update') {
      form.setFieldsValue(initialValues!);
    } else {
      form.resetFields();
    }
  }, [modalVisibleType, initialValues, form]);

  return (
    <Modal
      title={VerbNoun}
      visible={modalVisibleType !== 'hidden'}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'create-update-form',
      }}
      onCancel={() => setModalVisibleType('hidden')}
      width={600}
      confirmLoading={isSubmitting}
    >
      <Form<FormType>
        {...formLayout}
        id="create-update-form"
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
            if (from && to) form.setFieldsValue({ duration: calculateBusinessDays(from, to) });
          }

          forceRerender();
        }}
      >
        <Form.Item
          label="Loại nghỉ phép"
          rules={[required('Loại nghỉ phép')]}
          name="timeOffType"
          hasFeedback={!timeOffTypesReady}
          validateStatus="validating"
        >
          <Select placeholder="Chọn">
            {timeOffTypes.map((it) => (
              <Select.Option value={String(it.id)} key={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Loại thời gian"
          rules={[required('Loại thời gian')]}
          name="timeType"
          initialValue={'one-day'}
        >
          <Radio.Group>
            <Radio value={'half-days'}>Nửa ngày</Radio>
            <Radio value={'one-day'}>Một ngày</Radio>
            <Radio value={'many-days'}>Nhiều ngày</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.timeType !== currentValues.timeType
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('timeType') === 'many-days' ? (
              <Form.Item
                name="time"
                label="Thời gian"
                rules={[required('Thời gian')]}
                dependencies={['timeType']}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  disabledDate={(date) => date.day() === 0 || date.day() === 6}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="time"
                label="Thời gian"
                rules={[required('Thời gian')]}
                dependencies={['timeType']}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  disabledDate={(date) => date.day() === 0 || date.day() === 6}
                />
              </Form.Item>
            )
          }
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
};
