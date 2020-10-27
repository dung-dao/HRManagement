import React, { useState } from 'react';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import { useMerchantDetailData } from '../../hooks';

const validation = {
  validateTrigger: ['onChange', 'onBlur'],
  rules: [{ required: true, message: 'Vui lòng nhập.' }],
};

function CategoryCheckbox({ index, category }) {
  const { isDetail } = useMerchantDetailData();
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Input.Group>
      <Row gutter={20} style={{ marginBottom: 20 }}>
        {/* Col: Tên danh mục */}
        <Col span={9}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={['category-name', index]} // need index to distinguish Inputs
            label="Danh mục"
          >
            {isDetail ? (
              <Input defaultValue={category.name} readOnly />
            ) : (
              <Input defaultValue={category} disabled={isDisabled} readOnly />
            )}
          </Form.Item>
        </Col>

        {/* Col: Giá từ */}
        <Col span={7}>
          <Form.Item
            style={{ marginBottom: 0 }}
            {...(!isDisabled && validation)}
            name={['category-price-from', index]}
            label="Giá từ"
          >
            <Input
              type="number"
              suffix="000đ"
              min={0}
              step={10}
              style={{ width: '100% ' }}
              disabled={isDetail ? false : isDisabled}
              readOnly={isDetail}
              defaultValue={category.priceFrom / 1000}
            />
          </Form.Item>
        </Col>

        {/* Col: Giá đến: */}
        <Col span={7}>
          <Form.Item
            style={{ marginBottom: 0 }}
            {...(!isDisabled && validation)}
            name={['category-price-to', index]}
            label="đến"
          >
            <Input
              type="number"
              suffix="000đ"
              min={0}
              step={10}
              style={{ width: '100% ' }}
              disabled={isDetail ? false : isDisabled}
              readOnly={isDetail}
              defaultValue={category.priceTo / 1000}
            />
          </Form.Item>
        </Col>

        {/* Col: Checkbox */}
        {!isDetail && (
          <Checkbox
            style={{ padding: 4, marginLeft: -4 }}
            checked={!isDisabled}
            onChange={(e) => setIsDisabled(!e.target.checked)}
            title="Chọn danh mục"
          />
        )}
      </Row>
    </Input.Group>
  );
}

export default CategoryCheckbox;
