import { Form, Input, message, Modal, Select } from 'antd';
import React from 'react';
import { JobCategoryDTO } from 'services/ApiClient';
import { apiJobCategory } from 'services/ApiClient.singleton';
import { required } from 'utils';
import { RecordType, usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'chức vụ' as const;

type FormType = Omit<RecordType, 'jobCategory'> & {
  jobCategory: string;
};

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const [jobCategories, setJobCategories] = React.useState<JobCategoryDTO[]>([]);
  const [jobCategoriesReady, setJobCategoriesReady] = React.useState<boolean>(false);

  const formTypeToRecordType = (formValues: FormType): RecordType => {
    return {
      ...formValues,
      jobCategory: jobCategories.find((it) => String(it.id) === formValues.jobCategory),
    } as RecordType;
  };

  const recordTypeToFormType = (record: RecordType): FormType => {
    return {
      ...record,
      jobCategory: String(record.jobCategory?.id),
    } as FormType;
  };

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiJobCategory.jobCategory_GetAll();
        setJobCategories(data);
      } catch (err) {
        console.error(err);
        message.error('Không thể tải dữ liệu');
      } finally {
        setJobCategoriesReady(true);
      }
    };
    fetch();
  }, []);

  const onSubmit = async (values: FormType) => {
    try {
      setIsSubmitting(true);
      const record = formTypeToRecordType(values);
      console.log('>  ~ file: CreateUpdateModal.tsx ~ line 68 ~ record', record);
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
    () =>
      modalVisibleType === 'update'
        ? selectedRecord && recordTypeToFormType(selectedRecord)
        : undefined,
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
        <Form.Item
          name="name"
          label="Tên chức vụ"
          rules={[required('Tên chức vụ')]}
          initialValue=""
        >
          <Input placeholder="vd: Nhân viên marketing" />
        </Form.Item>
        <Form.Item
          label="Loại hình nhân sự"
          rules={[required('Loại hình nhân sự')]}
          name="jobCategory"
          hasFeedback={!jobCategoriesReady}
        >
          <Select placeholder="Chọn">
            {jobCategories.map((it) => (
              <Select.Option value={it.id!.toString()} key={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả" initialValue="">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
