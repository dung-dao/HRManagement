import { Form, Input, message, Modal, Select } from 'antd';
import React from 'react';
import { JobCategoryClient, JobCategoryDTO, JobTitleDTO } from 'services/ApiClient';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const title = {
  edit: 'Chỉnh sửa chức vụ công việc',
  add: 'Thêm mới chức vụ công việc',
};

export function JobTitleModal() {
  const [form] = Form.useForm<JobTitleDTO>();
  const { modalVisible, setModalVisible, modalType, record, api, data, setData } = usePage();
  const initialValues = modalType === 'edit' ? record : undefined;
  const [loading, setLoading] = React.useState(false);
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const [categories, setCategories] = React.useState<JobCategoryDTO[]>();
  const [selectedCategory, setSelectedCategory] = React.useState<JobCategoryDTO>();

  React.useEffect(() => {
    apiJobCategory.current.jobCategory_GetAll().then((categories) => {
      setCategories(categories);
      setSelectedCategory(categories.find((it) => it.id === record?.jobCategory?.id));
    });
  }, []);

  React.useEffect(() => {
    setSelectedCategory(categories?.find((it) => it.id === record?.jobCategory?.id));
  }, [record]);

  const onSubmit = async () => {
    try {
      const values = {
        ...(await form.validateFields()),
        jobCategory: selectedCategory,
      } as JobTitleDTO;
      setLoading(true);

      if (modalType === 'add') {
        const result = await api.jobTitle_Create(values);
        message.info(`Thêm mới chức vụ công việc ${values.name} thành công`);
        setData([...data, result]);
      }
      if (modalType === 'edit') {
        values.id = record?.id!;
        await api.jobTitle_Update(values.id, values);
        const newData = await api.jobTitle_GetAll();
        message.info(`Chỉnh sửa chức vụ công việc ${values?.name} thành công`);
        setData(newData);
      }

      setModalVisible(false);
      setLoading(false);
      form.resetFields();
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (modalVisible) {
      const id = data.length + 1;
      form.setFieldsValue(initialValues ?? { id });
    }
  }, [data.length, form, initialValues, modalVisible]);

  console.log('> : selectedCategory', selectedCategory);
  return (
    <Modal
      title={title[modalType]}
      visible={modalVisible}
      centered
      okButtonProps={{
        htmlType: 'submit',
      }}
      onOk={onSubmit}
      onCancel={() => setModalVisible(false)}
      width={600}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form {...formLayout} form={form} preserve={false} onFinish={(values) => console.log(values)}>
        <Form.Item
          name="name"
          label="Tên chức vụ công việc"
          rules={[{ required: true, message: 'Tên chức vụ công việc không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại hình nhân sự "
          rules={[{ required: true, message: 'Loại hình nhân sự không được bỏ trống' }]}
        >
          <Select
            placeholder="Loại hình nhân sự"
            value={selectedCategory?.id}
            onChange={(data) => setSelectedCategory(categories?.find((it) => it.id == data))}
          >
            {categories?.map((it) => (
              // @ts-ignore
              <Select.Option value={it.id} key={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả "
          rules={[{ required: true, message: 'Mô tả chức vụ công việc không được bỏ trống' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
