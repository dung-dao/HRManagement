import React from 'react';
import { Col, Form, Radio, Row, Select, Slider, Tag } from 'antd';
import Categories from './Categories';
import { subCategoris } from './data';
import { formItemLayout, required } from '../utils';
import './styles.css';
// import { useMerchantDetailData } from '../hooks';
import { genderCodeToTagProps } from './utils';
import AddressSection from "../AddressSection";

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <fieldset>
      <legend>Thông tin sản phẩm:</legend>
      <Row gutter={40}>
        {/*Giới tính*/}
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            label="Giới tính"
            name="gender"
            rules={[required('Giới tính')]}
          >
            {isDetail ? (
              <Tag {...genderCodeToTagProps[merchantData.shop.gender]} />
            ) : (
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="both">Cả hai</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
        {/*Độ tuổi*/}
        <Col span={12}>
          <Form.Item label="Độ tuổi" name="age">
            <Slider
              range
              tooltipVisible
              disabled={isDetail}
              defaultValue={
                isDetail ? [merchantData.shop.ageFrom, merchantData.shop.ageTo] : [12, 60]
              }
            />
          </Form.Item>
        </Col>
        {/*Danh mục*/}
        <Categories isDetail={isDetail} merchantData={merchantData} />

        {/*Sản phẩm*/}
        <Col span={24}>
          {isDetail ? (
            <Form.Item label="Sản phẩm dự định kinh doanh" name="products" required>
              {merchantData.shop.products.map((each) => (
                <Tag style={{ marginBottom: 5 }}>{each}</Tag>
              ))}
            </Form.Item>
          ) : (
            <Form.Item
              label="Sản phẩm dự định kinh doanh"
              name="products"
              extra={
                <>
                  <strong>
                    Bạn có thể dùng chức năng search và thêm mới sản phẩm chúng tôi không có.
                  </strong>
                  <br />
                  <em>
                    Sự chi tiết của các bạn sẽ giúp sự hợp tác của chúng ta trở nên dễ dàng hơn!
                  </em>
                </>
              }
              required
            >
              <Select mode="tags" placeholder="Chọn hoặc tự thêm sản phẩm dự định sẽ kinh doanh">
                {subCategoris.map((each) => (
                  <Select.Option value={each} children={each} />
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
      </Row>
    </fieldset>
  );
}

export default Index;
