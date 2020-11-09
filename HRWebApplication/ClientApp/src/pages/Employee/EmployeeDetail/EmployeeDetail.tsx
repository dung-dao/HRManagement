// @ts-nocheck
import React from 'react';
import { Form, Row, Col, Button, Input, Upload, Collapse, Timeline } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import HistorySection from './HistorySection';
import RepresentiveSection from './RepresentiveSection';
import AddressSection from './AddressSection';
import LoginInfoSection from './LoginInfoSection';
import BrandInfoSection from './BrandInfoSection';
import SocialSection from './SocialSection';
import ProductsInfoSection from './ProductsInfoSection';
import { getAllMerchants, apiAllMerchants } from './data';
import ImgCrop from 'antd-img-crop';
import { useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import './EmployeeDetail.css'

export const removeSlug = (url) => {
  return url.substring(0, /:|\/:/.exec(url)?.index);
  // The regex "/:|\/:/" means ": or /:"
  // Eg: /staff/merchant-detail/:id will become /staff/merchant-detail
};

const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
  labelAlign: 'left',
};

const required = (label) => ({
  required: true,
  message: label + ' không được bỏ trống!',
});

const phoneRegex = /^(\+84|0|84)\d{9}$/;

function Index() {
  const [form] = Form.useForm();
  const [merchantData, setMerchantData] = React.useState(apiAllMerchants[0]);

  React.useEffect(() => {
    getAllMerchants().then((data) => setMerchantData(data[0]));
  }, []);

  const [fileList, setFileList] = React.useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

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

  type DetailPageType = 'detail' | 'add' | 'edit' | 'unknown';
  const mapPageTypeToTitle: Record<DetailPageType, string> = {
    detail: 'Chi tiết nhân viên',
    add: 'Thêm mới nhân viên',
    edit: 'Chỉnh sửa nhân viên',
  };

  const detailPageType: DetailPageType = pathname.includes('detail')
    ? 'detail'
    : pathname.includes('add')
    ? 'add'
    : pathname.includes('edit')
    ? 'edit'
    : 'unknown';

  return (
    <AppBody title={mapPageTypeToTitle[detailPageType]}>
      <Form form={form}>
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

          <Col span={8}>
            <fieldset>
              <legend>Thông tin cá nhân:</legend>
              <Form.Item
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
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Họ và tên lót"
                name="first-name"
                rules={[required('Họ và tên lót')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="Nguyễn Văn"
                  defaultValue={'Nguyễn Văn'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Tên" name="last-name" rules={[required('Tên')]}>
                <Input placeholder="A" defaultValue={'A'} readOnly={detailPageType === 'detail'} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày sinh"
                name="date-of-birth"
                rules={[required('Ngày sinh')]}
              >
                <Input
                  placeholder="01/01/2000"
                  defaultValue={'01/01/2000'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Giới tính"
                name="sex"
                rules={[required('Giới tính')]}
              >
                <Input
                  placeholder="Nam"
                  defaultValue={'Nam'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="CMND" name="cmnd" rules={[required('CMND')]}>
                <Input
                  placeholder="123456789"
                  defaultValue={'123456789'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
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
              </Form.Item>
              <Form.Item
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
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày sinh"
                name="date-of-birth"
                rules={[required('Ngày sinh')]}
              >
                <Input
                  placeholder="01/01/2000"
                  defaultValue={'01/01/2000'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
            </fieldset>
          </Col>
          <Col span={8}>
            <fieldset>
              <legend>Thông tin liên lạc:</legend>
              <Form.Item
                {...formItemLayout}
                label="Email cá nhân"
                name="personal-email"
                rules={[
                  required('Email cá nhân'),
                  { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                ]}
              >
                <Input
                  placeholder="nguyenvana@gmail.com"
                  type="email"
                  defaultValue={'nguyenvana@gmail.com'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Email công việc"
                name="email"
                rules={[
                  required('Email công việc'),
                  { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                ]}
              >
                <Input
                  placeholder="nguyenvana@gmail.com"
                  type="email"
                  defaultValue={'nguyenvana@gmail.com'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ hiện tại"
                name="current-address"
                rules={[required('Địa chỉ')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  defaultValue={'147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ thường trú"
                name="permanent-address"
                rules={[required('Địa chỉ')]}
                readOnly={detailPageType === 'detail'}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  defaultValue={'147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM'}
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
                <Input
                  placeholder="0123456789"
                  defaultValue={'0123456789'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Facebook" name="facebook">
                <Input
                  placeholder="fb.com/hrm"
                  defaultValue={'fb.com/hrm'}
                  readOnly={detailPageType === 'detail'}
                />
              </Form.Item>
            </fieldset>
          </Col>
          <Col span={8}>
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
                name="salary"
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
          </Col>
          <Col span={24}>
            <fieldset>
              <legend>Lịch sử công tác:</legend>
              <Collapse style={{ marginBottom: 20 }}>
                <Collapse.Panel header="Lịch sử">
                  <Timeline mode="left" className="EmployeeDetail-history-section">
                    {[...merchantData.history].reverse().map((each, index) => (
                      <Timeline.Item
                        color={index ? 'gray' : undefined}
                        label={format(new Date(each.time), 'dd-MM-yyyy HH:mm:SS')}
                      >
                        {each.type}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Collapse.Panel>
              </Collapse>
            </fieldset>
          </Col>
        </Row>

        {
          <Row>
            <Col span={8}>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 'auto', marginRight: 25 }}
                >
                  Xác nhận
                </Button>
              </Row>
            </Col>
          </Row>
        }
      </Form>
    </AppBody>
  );
}

export default React.memo(Index);
