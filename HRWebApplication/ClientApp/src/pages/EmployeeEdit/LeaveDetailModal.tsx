import { DatePicker, Form, Input, message, Modal, Select } from 'antd';
import moment from 'moment';
import { BeautifyEmployeeStatus } from 'pages/Employee/EmployeeList/Table/utils';
import React from 'react';
import {
  EmployeeDTO, LeaveTypeClient,
  LeaveTypeDTO,

  PositionDTO
} from 'services/ApiClient';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


export function LeaveDetailModal() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const apiLeaveType = React.useRef(new LeaveTypeClient());
  const [leaveTypes, setLeaveTypes] = React.useState<LeaveTypeDTO[]>([]);
  const {
    api,
    employee,
    setEmployee,
    modalVisible,
    setModalVisible,
    currentPosition,
    setCurrentPosition,
  } = usePage();

  React.useEffect(() => {
    apiLeaveType.current
      .leaveType_GetAll()
      .then((data) => setLeaveTypes(data))
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    modalVisible &&
      form.setFieldsValue({
        leaveDate: moment(),
      });
  }, [form, modalVisible]);

  const onSubmit = async () => {
    try {
      const leaveType = leaveTypes.find((it) => it.id == form.getFieldValue('leaveType'));
      if (!employee || !leaveType) return;

      const leaveDetail = {
        ...form.getFieldsValue(),
        leaveDate: (form.getFieldValue('leaveDate') as moment.Moment).toDate(),
        leaveType,
      };

      const newPosition = {
        ...currentPosition,
        ...leaveDetail,
      } as PositionDTO;

      api.employees_Leave(employee.id!, newPosition).then(() => {
        message.info(
          `Kết thúc hợp đồng với nhân viên ${
            employee.firstName + ' ' + employee.lastName
          }  thành công`,
        );
        setModalVisible(false);
        setEmployee({ ...employee, status: BeautifyEmployeeStatus.Left } as EmployeeDTO);
        setCurrentPosition(newPosition);
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
          name="leaveDate"
          label="Ngày kết thúc"
          rules={[{ required: true, message: 'Ngày kết thúc không được bỏ trống' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="leaveType"
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
          name="leaveReason"
          label="Mô tả"
          rules={[{ required: true, message: 'Mô tả không được bỏ trống' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
