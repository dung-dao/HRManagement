// @ts-nocheck
import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import HistorySection from './HistorySection';
import RepresentiveSection from './RepresentiveSection';
import AddressSection from './AddressSection';
import LoginInfoSection from './LoginInfoSection';
import BrandInfoSection from './BrandInfoSection';
import SocialSection from './SocialSection';
import ProductsInfoSection from './ProductsInfoSection';
import { getAllMerchants, apiAllMerchants } from './data'

function Index() {
  const [form] = Form.useForm();
  const isDetail = false;
  const [merchantData, setMerchantData] = React.useState(apiAllMerchants[0]);

  React.useEffect(() => {
    getAllMerchants().then(data => setMerchantData(data[0]))
  }, [])


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
        {/*Row1: Đại diện, Địa chỉ kd, Thông tin đăng nhập*/}
        <Row gutter={40}>
          {/*Block: Thông tin người đại diện*/}
          <Col span={8}>
            <RepresentiveSection isDetail={isDetail} merchantData={merchantData} />
          </Col>

          {/*Block: Địa chỉ kinh doanh*/}
          <Col span={8}>
            <AddressSection form={form} isDetail={isDetail} merchantData={merchantData} />
          </Col>

          {/*Block: Thông tin đăng nhập*/}
          <Col span={8}>
            <LoginInfoSection isDetail={isDetail} merchantData={merchantData} />
          </Col>
        </Row>

        {/*Row2: Thông tin cửa hàng, sản phẩm, MXH  */}
        <Row gutter={40}>
          {/*Col: Thông tin cửa hàng, Thông tin sản phẩm*/}
          <Col span={16}>
            {/*Block: Thông tin cửa hàng*/}
            <BrandInfoSection isDetail={isDetail} merchantData={merchantData} />

            {/*Block: Thông tin sản phẩm*/}
            <ProductsInfoSection isDetail={isDetail} merchantData={merchantData} />
          </Col>

          {/*Block: Mạng xã hội*/}
          <Col span={8}>
            <SocialSection isDetail={isDetail} merchantData={merchantData} />
          </Col>
        </Row>

        {/*Row3: Submit*/}
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
