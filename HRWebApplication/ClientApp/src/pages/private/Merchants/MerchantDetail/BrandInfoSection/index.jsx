import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Radio, Row, Tag } from 'antd';
import { formItemLayout, required } from '../utils';
import './styles.css';
import { useMerchantDetailData } from '../hooks';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();
  const [hasBusinessLicense, setHasBusinessLicense] = useState(merchantData?.shop.businessLicense);

  return (
    <fieldset>
      <legend>Thông tin nhãn hiệu / cửa hàng:</legend>
      <Form.Item
        {...formItemLayout}
        className="MerchantDetail-brand-name"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        label="Tên thương hiệu"
        name="brand"
        rules={[required('Tên thương hiệu')]}
        extra={
          !isDetail && (
            <i>
              Vui lòng nhập chính xác các ký tự cần được viết hoa/viết thường theo cách mà bạn muốn
              khách hàng nhận diện. Tên thương hiệu này sẽ được sử dụng để hiển thị đến khách hàng
              và không thể thay đổi.
            </i>
          )
        }
      >
        <Input placeholder="WEWEAR" readOnly={isDetail} defaultValue={merchantData?.shop.brand} />
      </Form.Item>
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            label="Ngày thành lập"
            name="est-date"
            rules={[required('Ngày thành lập')]}
          >
            {isDetail ? (
              <Input readOnly defaultValue={merchantData?.shop.estDate} />
            ) : (
              <DatePicker
                style={{ display: 'block' }}
                format={['MM/YYYY', 'MM/YY']}
                picker="month"
                placeholder="Chọn ngày thành lập"
                // onChange={(value) => console.log(value)}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            label="SL chi nhánh"
            name="branch"
            rules={[required('Số lượng chi nhánh')]}
          >
            {isDetail ? (
              <Input readOnly defaultValue={merchantData?.shop.branch} />
            ) : (
              <InputNumber min={1} style={{ width: '100%' }} placeholder="Số lượng chi nhánh" />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            label="GP kinh doanh"
            name="gpkd"
            rules={[required('Trường này')]}
          >
            <Radio.Group
              defaultValue={hasBusinessLicense}
              onChange={(e) => {
                setHasBusinessLicense(e.target.value);
              }}
            >
              {isDetail ? (
                hasBusinessLicense ? (
                  <Tag icon={<CheckOutlined />}>Đã có</Tag>
                ) : (
                  <Tag icon={<ExclamationOutlined />}>Chưa có</Tag>
                )
              ) : (
                <>
                  <Radio value={true}>Đã có</Radio>
                  <Radio value={false}>Chưa có</Radio>
                </>
              )}
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            label="Mã số thuế"
            name="tax"
            rules={
              hasBusinessLicense && [
                required('Mã số thuế'),
                { pattern: /^\d{10}$/, message: 'Mã số thuế phải gồm 10 kí tự số' },
              ]
            }
          >
            <Input
              placeholder={hasBusinessLicense ? '0123456789' : 'Không có GPKD'}
              disabled={!hasBusinessLicense}
              readOnly={isDetail}
              defaultValue={merchantData?.shop.taxNo}
            />
          </Form.Item>
        </Col>
      </Row>
    </fieldset>
  );
}

export default Index;
