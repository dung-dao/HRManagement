// @ts-nocheck
import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Upload,
  Collapse,
  Timeline,
  DatePicker,
  Select,
  message,
} from 'antd';
import AppBody from 'components/Layouts/AppBody';
import ImgCrop from 'antd-img-crop';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import './EmployeeDetail.css';
import {
  EmployeesClient,
  WorkTypeClient,
  JobCategoryClient,
  JobTitleClient,
  OrganizationUnitsClient,
  PositionDTO,
} from 'services/ApiClient';
// import DatePicker from 'components/DatePicker'
import moment from 'moment';

export const removeSlug = (url) => {
  return url.substring(0, /:|\/:/.exec(url)?.index);
  // The regex "/:|\/:/" means ": or /:"
  // Eg: /staff/merchant-detail/:id will become /staff/merchant-detail
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  labelAlign: 'left',
  validateTrigger: 'onBlur',
};

const formItemLayoutWide = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  labelAlign: 'left',
  validateTrigger: 'onBlur',
};

const required = (label) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

const phoneRegex = /^(\+84|0|84)\d{9}$/;

type Selection = {
  id: number;
  name: string;
  selected: boolean;
};

function Index() {
  const [form] = Form.useForm();
  const apiEmployee = React.useRef(new EmployeesClient());
  const apiWorkType = React.useRef(new WorkTypeClient());
  const apiJobCategory = React.useRef(new JobCategoryClient());
  const apiJobTitle = React.useRef(new JobTitleClient());
  const apiOrganization = React.useRef(new OrganizationUnitsClient());
  const [workType, setWorkType] = React.useState<Selection[]>();
  const [jobCategory, setJobCategory] = React.useState<Selection[]>();
  const [jobTitle, setJobTitle] = React.useState<Selection[]>();
  const [organization, setOrganization] = React.useState<Selection[]>();
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const history = useHistory();
  // const [merchantData, setMerchantData] = React.useState(apiAllMerchants[0]);

  // const [fileList, setFileList] = React.useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]);

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  //
  // const handleSearch = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     form.validateFields((err, values) => {
  //       console.log('Received values of form: ', values);
  //     });
  //   },
  //   [form],
  // );
  //
  // const handleReset = useCallback(() => {
  //   form.resetFields();
  // }, [form]);
  //
  // const toggle = useCallback(() => {
  //   setExpand(!expand);
  // }, [expand]);
  //
  // // To generate mock Form.Item
  // const getFields = () => {
  //   const formItemLayout = {
  //     labelCol: { span: 5 },
  //     wrapperCol: { span: 19 },
  //   };
  //
  //   return [...data, ...data, ...data].map((merchant, i) => {
  //     return (
  //       <Col span={10} key={i}>
  //         <Form.Item {...formItemLayout} label={`Field ${i}`}>
  //           <Input placeholder="placeholder" />
  //         </Form.Item>
  //       </Col>
  //     );
  //   });
  // };
  const { pathname } = useLocation();
  const { employeeId } = useParams();

  type DetailPageType = 'detail' | 'add' | 'edit' | 'unknown';
  const mapPageTypeToTitle: Record<DetailPageType, string> = {
    detail: 'Chi tiết nhân viên',
    add: 'Thêm mới nhân viên',
    edit: 'Chỉnh sửa nhân viên',
    unknown: 'Lỗi xảy ra',
  };
  const mapPageTypeToButton: Record<DetailPageType, string> = {
    detail: 'Quay lại',
    add: 'Hoàn thành',
    edit: 'Hoàn thành',
    unknown: 'Lỗi xảy ra',
  };

  const detailPageType: DetailPageType = pathname.includes('detail')
    ? 'detail'
    : pathname.includes('add')
    ? 'add'
    : pathname.includes('edit')
    ? 'edit'
    : 'unknown';

  React.useEffect(() => {
    function fetchEmployee() {
      return apiEmployee.current
        .getEmployeeById(employeeId)
        .then(
          (data) => form.setFieldsValue({ ...data, dateOfBirth: moment(data.dateOfBirth) }) && data,
        )
        .catch();
    }

    // Detail / Edit nhan vien
    if (detailPageType === 'detail' || detailPageType === 'edit') {
      // === Chi tiet nhan vien / Chinh sua nhan vien
      // -> Fetch nhanVienById
      // -> Fetch Position of Nhan Vien, -> Update selected of JobTitle, WorkType, JobCategory, OrganizationUnit
      // -> Fetch danh sach JobTitle
      // -> Fetch danh sach WorkType
      // -> Fetch danh sach JobCategory
      // -> Fetch danh sach OrganizationUnit

      apiEmployee.current
        .getEmployeeById(employeeId)
        .then((data) => form.setFieldsValue({ ...data, dateOfBirth: moment(data.dateOfBirth) }))
        .catch();

      apiEmployee.current
        .employees_GetPosition(employeeId)
        .then((data) => console.log('positions', data) || setPositions(data))
        .catch();

      apiWorkType.current
        .workType_GetAll()
        .then((data) => setWorkType(data))
        .catch((err) => console.log(err));
      apiJobCategory.current
        .jobCategory_GetAll()
        .then((data) => setJobCategory(data))
        .catch((err) => console.log(err));
      apiJobTitle.current
        .jobTitle_GetAll()
        .then((data) => setJobTitle(data))
        .catch((err) => console.log(err));
      apiOrganization.current
        .organizationUnits_GetAll()
        .then((data) => setOrganization(data))
        .catch((err) => console.log(err));
      console.log(form.getFieldValue('id'), 'idd');
      // apiEmployee.current.employees_GetPosition(form.getFieldValue('id')).then((data) => {
      //   console.log(data);
      // });
      // apiWorkType.current
      //   .workType_GetAll()
      //   .then((data) => {
      //     setWorkType(data.map(it =>  {
      //       ...it.
      //     }))
      //   });
      // apiJobCategory.current.
      // apiJobTitle.current.
    }
  }, [form, detailPageType, employeeId]);

  const onFinish = () => {
    if (detailPageType === 'add') {
      apiEmployee.current
        .createEmployee(form.getFieldsValue())
        .then(() => {
          message.info('Thêm mới nhân viên thành công');
          form.resetFields();
        })
        .catch();
    }
  };

  const onSubmitClick = () => {
    if (detailPageType === 'detail') {
      history.push('/employees');
    }
  };

  return (
    <AppBody
      title={mapPageTypeToTitle[detailPageType]}
      selectedMenu="/employees"
      openMenu="/employees"
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={40}>
          {/* <Col span={8}>
            <fieldset>
              <legend>Avatar:</legend>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ file, fileList }) => {
                    if (file.status !== 'uploading') {
                      setFileList(fileList.splice(-1));
                      console.log(file);
                    }
                  }}
                  onPreview={onPreview}
                >
                  +Upload
                </Upload>
              </ImgCrop>
            </fieldset>
          </Col> */}

          <Col span={12}>
            <fieldset>
              <legend>Thông tin cá nhân:</legend>
              {/* <Form.Item
                {...formItemLayout}
                label="Mã nhân viên"
                name="employee-id"
                rules={[required('Mã nhân viên')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="NV-001"
                  defaultValue={'NV-001'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item> */}
              <Form.Item
                {...formItemLayout}
                label="Họ"
                name="firstName"
                rules={[required('Họ')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input placeholder="Nguyễn" readOnly={detailPageType === 'detail'} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Tên" name="lastName" rules={[required('Tên')]}>
                <Input placeholder="Văn A" readOnly={detailPageType === 'detail'} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[required('Ngày sinh')]}
              >
                {detailPageType === 'detail' ? (
                  // <Input  readOnly />
                  <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} disabled />
                ) : (
                  <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Giới tính"
                name="sex"
                rules={[required('Giới tính')]}
              >
                {detailPageType === 'detail' ? (
                  <Input placeholder="Nam" readOnly />
                ) : (
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                    <Select.Option value="Other">Khác</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="CMND"
                name="nationalId"
                rules={[
                  required('CMND'),
                  {
                    validator: (_, value: string) =>
                      value === '' ||
                      value === undefined || // "required" rule is already handled by above rule, so we will ignore this case to avoid 2 annoying messages
                      (value && /^\d+$/.test(value) && (value.length === 9 || value.length === 12))
                        ? Promise.resolve()
                        : Promise.reject('CMND phải có 9 hoặc 12 chữ số'),
                    validateTrigger: 'onBlur',
                  },
                ]}
              >
                <Input placeholder="123456789" readOnly={detailPageType === 'detail'} />
              </Form.Item>
              {/* <Form.Item
                {...formItemLayout}
                label="Ngày cấp"
                name="license-date"
                rules={[required('Ngày cấp')]}
              >
                <Input
                  placeholder="01/01/2000"
                  defaultValue={'01/01/2000'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item> */}
              {/* <Form.Item
                {...formItemLayout}
                label="Nơi cấp"
                name="license-place"
                rules={[required('Nơi cấp')]}
              >
                <Input
                  placeholder="CA Tp Hồ Chí Minh"
                  defaultValue={'CA Tp Hồ Chí Minh'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item> */}
            </fieldset>
          </Col>
          <Col span={12}>
            <fieldset>
              <legend>Thông tin liên lạc:</legend>
              <Form.Item
                {...formItemLayout}
                label="Email cá nhân"
                name="personalEmail"
                rules={[
                  required('Email cá nhân'),
                  { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                ]}
              >
                <Input
                  placeholder="nguyenvana@gmail.com"
                  type="email"
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Email công việc"
                name="workEmail"
                rules={[
                  required('Email công việc'),
                  { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                ]}
              >
                <Input
                  placeholder="nguyenvana@gmail.com"
                  type="email"
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ hiện tại"
                name="currentAddress"
                rules={[required('Địa chỉ')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ thường trú"
                name="address"
                rules={[required('Địa chỉ')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Số điện thoại"
                name="phone"
                rules={[
                  required('Số điện thoại'),
                  {
                    pattern: phoneRegex,
                    min: 9,
                    max: 12,
                    message: 'Số điện thoại phải bắt dầu bằng (0|84|+84) và theo sau 9 chữ số`',
                  },
                ]}
              >
                <Input placeholder="0123456789" readOnly={detailPageType === 'detail'} />
              </Form.Item>
              {/* <Form.Item {...formItemLayout} label="Facebook" name="facebook">
                <Input
                  placeholder="fb.com/hrm"
                  defaultValue={'fb.com/hrm'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item> */}
            </fieldset>
          </Col>
          {/* <Col span={8}>
            <fieldset>
              <legend>Thông tin nhân sự</legend>
              <Form.Item
                {...formItemLayout}
                label="Bộ phận"
                name="department"
                rules={[required('Bộ phận')]}
              >
                <Input
                  placeholder="Sales"
                  defaultValue={'Sales'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Loại hình nhân sự"
                name="employee-type"
                rules={[required('Loại hình nhân sự')]}
              >
                <Input
                  placeholder="Nhân viên"
                  defaultValue={'Nhân viên'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Chức vụ"
                name="job-title"
                rules={[required('Chức vụ')]}
              >
                <Input
                  placeholder="Chuyên viên sales"
                  defaultValue={'Chuyên viên sales'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Lương"
                name="Salery"
                rules={[required('Lương')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="9000000"
                  defaultValue={'9000000'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày bắt đầu"
                name="date-started"
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="01/01/2020"
                  defaultValue={'01/01/2020'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Loại hình làm việc" name="work-type">
                <Input
                  placeholder="Full-time"
                  defaultValue={'Full-time'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Chi nhánh" name="branch">
                <Input
                  placeholder="Cơ sở Nguyễn Tuân"
                  defaultValue={'Cơ sở Nguyễn Tuân'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
            </fieldset>
          </Col> */}
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
                name="Salery"
                rules={[required('Lương')]}
              >
                {/* TODO: trailing VNĐ, format xx,xxx,xxx */}
                <Input placeholder="1,000,000" readOnly={detailPageType === 'detail'} />
              </Form.Item>
              <Form.Item
                {...formItemLayoutWide}
                label="Vị trí công việc"
                name="jobTitle"
                rules={[required('Vị trí công việc')]}
              >
                <Select placeholder="Vị trí công việc">
                  {jobTitle?.map((it) => (
                    <Select.Option value={it.name} key={it.id}>
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
                readOnly={detailPageType === 'detail'}
              >
                <Select placeholder="Loại hình làm việc">
                  {workType?.map((it) => (
                    <Select.Option value={it.name} key={it.id}>
                      {it.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutWide}
                label="Loại hình nhân sự"
                name="jobCategory"
                rules={[required('Loại hình nhân sự')]}
                readOnly={detailPageType === 'detail'}
              >
                <Select placeholder="Loại hình nhân sự">
                  {jobCategory?.map((it) => (
                    <Select.Option value={it.name} key={it.id}>
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
                readOnly={detailPageType === 'detail'}
              >
                <Select placeholder="Tổ chức">
                  {organization?.map((it) => (
                    <Select.Option value={it.name} key={it.id}>
                      {it.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </fieldset>
          </Col>
          {detailPageType !== 'add' ? (
            <Col span={24}>
              <fieldset>
                <legend>Lịch sử công tác:</legend>
                <Collapse style={{ marginBottom: 20 }}>
                  <Collapse.Panel header="Lịch sử">
                    <Timeline mode="left" className="EmployeeDetail-history-section">
                      {/* {[...merchantData.history].reverse().map((each, index) => (
                        <Timeline.Item
                          color={index ? 'gray' : undefined}
                          label={format(new Date(each.time), 'dd-MM-yyyy HH:mm:SS')}
                        >
                          {each.type}
                        </Timeline.Item>
                      ))} */}
                    </Timeline>
                  </Collapse.Panel>
                </Collapse>
              </fieldset>
            </Col>
          ) : null}
        </Row>

        {
          <Row>
            <Col span={8} />
            <Col span={8}>
              <Button type="primary" htmlType="submit" onClick={onSubmitClick}>
                {mapPageTypeToButton[detailPageType]}
              </Button>
            </Col>
          </Row>
        }
      </Form>
    </AppBody>
  );
}

export default React.memo(Index);
