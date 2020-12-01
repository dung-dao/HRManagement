import React from 'react';
import { DatePicker, Form, Input, message, Modal, Select } from 'antd';
import {
  JobCategoryDTO,
  LeaveTypeClient,
  LeaveTypeDTO,
  LeaveDetailDTO,
  EmployeeDTO,
} from 'services/ApiClient';
import { usePage } from './PageProvider';
import moment from 'moment';
import { BeautifyEmployeeStatus } from 'pages/Employee/EmployeeList/Table/utils';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type LeaveDetailFormType = Omit<LeaveDetailDTO, 'date'> & {
  date: moment.Moment;
};

export function LeaveDetailModal() {
  const [form] = Form.useForm<LeaveDetailFormType>();
  const [loading, setLoading] = React.useState(false);
  const apiLeaveType = React.useRef(new LeaveTypeClient());
  const [leaveTypes, setLeaveTypes] = React.useState<LeaveTypeDTO[]>([]);
  const { api, employee, setEmployee, modalVisible, setModalVisible } = usePage();

  React.useEffect(() => {
    apiLeaveType.current
      .leaveType_GetAll()
      .then((data) => setLeaveTypes(data))
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    modalVisible &&
      form.setFieldsValue({
        date: moment(),
      });
  }, [form, modalVisible]);

  const onSubmit = async () => {
    try {
      const leaveType = leaveTypes.find((it) => it.id == form.getFieldValue('type'));
      if (!employee || !leaveType) return;

      const submitData = {
        ...form.getFieldsValue(),
        date: (form.getFieldValue('date') as moment.Moment).toDate(),
        type: leaveType,
      } as LeaveDetailDTO;

      api.employees_Leave(employee.id!, submitData).then(() => {
        message.info(
          `Kết thúc hợp đồng với nhân viên ${
            employee.firstName + ' ' + employee.lastName
          }  thành công`,
        );
        setModalVisible(false);
        setEmployee({ ...employee, status: BeautifyEmployeeStatus.Left } as EmployeeDTO);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={'Kết thúc hợp đồng'}
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
      <Form
        {...formLayout}
        form={form}
        preserve={false}
        onFinish={(values) => console.log(values)}
        labelAlign="left"
      >
        <Form.Item
          name="date"
          label="Ngày kết thúc"
          rules={[{ required: true, message: 'Ngày kết thúc không được bỏ trống' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Loại lý do"
          rules={[{ required: true, message: 'Loại lý do không được bỏ trống' }]}
        >
          <Select placeholder="Loại lý do" style={{ marginRight: '10px' }}>
            {leaveTypes.map((it) => (
              <Select.Option value={it.id!.toString()} key={it.id}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="reason"
          label="Mô tả"
          rules={[{ required: true, message: 'Mô tả không được bỏ trống' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
