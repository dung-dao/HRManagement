import React from 'react';
import {Form, Input, message, Modal} from "antd";
import {JobCategoryDTO} from "services/ApiClient";
import {usePage} from "./PageProvider";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const title = {
  edit: 'Chỉnh sửa loại hình nhân sự',
  add: 'Thêm mới loại hình nhân sự'
}

export function JobCategoryModal() {
  const [form] = Form.useForm<JobCategoryDTO>();
  const { modalVisible, setModalVisible, modalType, record, api, data, setData } = usePage()
  const initialValues = modalType === 'edit' ? record : undefined
  const [loading, setLoading] = React.useState(false)
  const onSubmit = async () => {
    try {
      const values = await form.validateFields() as JobCategoryDTO
      setLoading(true)

      if (modalType === 'add') {
        const result = await api.jobCategory_Create(values)
        message.info(`Thêm mới loại hình nhân sự ${values.name} thành công`);
        setData([...data, result])
      }
      if (modalType === 'edit') {
        await api.jobCategory_Update(values.id!, values)
        const newData = await api.jobCategory_GetAll()
        message.info(`Chỉnh sửa loại hình nhân sự ${values?.name} thành công`)
        setData(newData)
      }

      setModalVisible(false)
      setLoading(false)
      form.resetFields()
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    if (modalVisible) {
      const id = data.length + 1
      form.setFieldsValue(initialValues ?? { id })
    }
  }, [data.length, form, initialValues, modalVisible])

  return (
    <Modal
      title={title[modalType]}
      visible={modalVisible}
      centered
      okButtonProps={{
        htmlType: 'submit'
      }}
      onOk={onSubmit}
      onCancel={() => setModalVisible(false)}
      width={600}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        {...formLayout}
        form={form}
        preserve={false}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item
          hidden
          name="id"
          label="ID loại hình nhân sự"
          rules={[{ required: true, message: 'ID loại hình nhân sự không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên loại hình nhân sự"
          rules={[{ required: true, message: 'Tên loại hình nhân sự không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả loại hình nhân sự"
          rules={[{ required: true, message: 'Mô tả loại hình nhân sự không được bỏ trống' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
