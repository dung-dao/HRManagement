import { DatePicker, Form, Input, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { dateToMoment, ModifyProp, momentToDate, required } from 'utils';
import { RecordType, usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'chấm công' as const;

type FormType = ModifyProp<RecordType, Date, moment.Moment>;

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const formTypeToRecordType = (formValues: FormType): RecordType => {
    return momentToDate(formValues) as RecordType;
  };

  const recordTypeToFormType = (record: RecordType): FormType => {
    return dateToMoment(record);
  };

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

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    initialValues && form.setFieldsValue(initialValues);
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
      >
        <Form.Item name="date" label="Ngày" rules={[required('Ngày')]} initialValue={moment()}>
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            disabledDate={(date) => date.day() === 0 || date.day() === 6}
          />
        </Form.Item>
        <Form.Item label="Số công" name={['duration']} rules={[required('Ngày')]}>
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name={['note']}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
