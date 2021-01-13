import { DatePicker, Form, Input, Modal } from 'antd';
import omit from 'lodash/omit';
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

const noun = 'ngày lễ' as const;

type FormType = ModifyProp<
  Omit<RecordType, 'from' | 'to'> & {
    fromTo: [RecordType['from'], RecordType['to']];
  },
  Date,
  moment.Moment
>;

const formTypeToRecordType = (formValues: FormType): RecordType => {
  return momentToDate({
    ...omit(formValues, 'fromTo'),
    from: formValues.fromTo[0],
    to: formValues.fromTo[1],
  }) as RecordType;
};

const recordTypeToFormType = (record: RecordType): FormType => {
  return dateToMoment({
    ...omit(record, 'from', 'to'),
    fromTo: [record.from, record.to],
  });
};

export const CreateUpdateModal: React.FC<{}> = () => {
  const {
    modalVisibleType,
    setModalVisibleType,
    selectedRecord,
    onUpdate,
    onCreate,
    selectedYear,
  } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

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
      >
        <Form.Item name="name" label="Tên ngày lễ" rules={[required('Tên ngày lễ')]}>
          <Input placeholder="vd: Tết dương lịch" />
        </Form.Item>
        <Form.Item name="fromTo" label="Thời gian" rules={[required('Thời gian')]}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            disabledDate={(date) => date.year() !== selectedYear}
            defaultPickerValue={[
              moment().set('year', selectedYear),
              moment().set('year', selectedYear),
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
