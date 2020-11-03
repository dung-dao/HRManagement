// @ts-nocheck
import React from 'react';
import { Form, Row, Col, Button, Input, Upload } from 'antd';
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
  const isDetail = false;
  const [merchantData, setMerchantData] = React.useState(apiAllMerchants[0]);

  React.useEffect(() => {
    getAllMerchants().then((data) => setMerchantData(data[0]));
  }, []);

  const [fileList, setFileList] = React.useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  return (
    <AppBody title={isDetail ? 'Chi tiết đối tác' : 'Thêm mới đối tác'}>
      {isDetail && <HistorySection merchantData={merchantData} />}

      <Form form={form}>
        <Row gutter={40}>
          <Col span={12}>
            <fieldset>
              <legend>Avatar:</legend>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </fieldset>
          </Col>

          <Col span={12}>
            <fieldset>
              <legend>Thông tin cá nhân:</legend>
              <Form.Item
                {...formItemLayout}
                label="Mã nhân viên"
                name="employee-id"
                rules={[required('Mã nhân viên')]}
                readOnly={isDetail}
              >
                <Input placeholder="NV-001" defaultValue={'NV-001'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Họ và tên lót"
                name="first-name"
                rules={[required('Họ và tên lót')]}
                readOnly={isDetail}
              >
                <Input placeholder="Nguyễn Văn" defaultValue={'Nguyễn Văn'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Tên" name="last-name" rules={[required('Tên')]}>
                <Input placeholder="A" defaultValue={'A'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày sinh"
                name="date-of-birth"
                rules={[required('Ngày sinh')]}
              >
                <Input placeholder="01/01/2000" defaultValue={'01/01/2000'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Giới tính"
                name="sex"
                rules={[required('Giới tính')]}
              >
                <Input placeholder="Nam" defaultValue={'Nam'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Tình trạng hôn nhân"
                name="marital-status"
                rules={[required('Tình trạng hôn nhân')]}
              >
                <Input placeholder="Độc thân" defaultValue={'Độc thân'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="CMND" name="cmnd" rules={[required('CMND')]}>
                <Input placeholder="123456789" defaultValue={'123456789'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày cấ["
                name="license-date"
                rules={[required('Ngày cấp')]}
              >
                <Input placeholder="01/01/2000" defaultValue={'01/01/2000'} readOnly={isDetail} />
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
                  readOnly={isDetail}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày sinh"
                name="date-of-birth"
                rules={[required('Ngày sinh')]}
              >
                <Input placeholder="01/01/2000" defaultValue={'01/01/2000'} readOnly={isDetail} />
              </Form.Item>
            </fieldset>
          </Col>
          <Col span={12}>
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
                  readOnly={isDetail}
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
                  readOnly={isDetail}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ hiện tại"
                name="current-address"
                rules={[required('Địa chỉ')]}
                readOnly={isDetail}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  defaultValue={'147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM'}
                  readOnly={isDetail}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Địa chỉ thường trú"
                name="permanent-address"
                rules={[required('Địa chỉ')]}
                readOnly={isDetail}
              >
                <Input
                  placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
                  defaultValue={'147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM'}
                  readOnly={isDetail}
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
                <Input placeholder="0123456789" defaultValue={'0123456789'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Facebook" name="facebook">
                <Input placeholder="fb.com/hrm" defaultValue={'fb.com/hrm'} readOnly={isDetail} />
              </Form.Item>
            </fieldset>
          </Col>
          <Col span={12}>
            <fieldset>
              <legend>Thông tin nhân sự</legend>
              <Form.Item
                {...formItemLayout}
                label="Bộ phận"
                name="department"
                rules={[required('Bộ phận')]}
              >
                <Input placeholder="Sales" defaultValue={'Sales'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Loại hình nhân sự"
                name="employee-type"
                rules={[required('Loại hình nhân sự')]}
              >
                <Input placeholder="Nhân viên" defaultValue={'Nhân viên'} readOnly={isDetail} />
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
                  readOnly={isDetail}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Lương"
                name="salary"
                rules={[required('Lương')]}
                readOnly={isDetail}
              >
                <Input placeholder="9000000" defaultValue={'9000000'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Ngày bắt đầu"
                name="date-started"
                readOnly={isDetail}
              >
                <Input placeholder="01/01/2020" defaultValue={'01/01/2020'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Loại hình làm việc" name="work-type">
                <Input placeholder="Full-time" defaultValue={'Full-time'} readOnly={isDetail} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Chi nhánh" name="branch">
                <Input
                  placeholder="Cơ sở Nguyễn Tuân"
                  defaultValue={'Cơ sở Nguyễn Tuân'}
                  readOnly={isDetail}
                />
              </Form.Item>
            </fieldset>
          </Col>
        </Row>

        {!isDetail && (
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
        )}
      </Form>
    </AppBody>
  );
}

export default React.memo(Index);
