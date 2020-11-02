import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { MinusSquareOutlined } from '@ant-design/icons';

const optionalInputValidation = {
  validateTrigger: ['onChange', 'onBlur'],
  rules: [{ required: true, message: 'Vui lòng nhập hoặc xóa đi.' }],
};

function CategoryDynamic({ field, add, remove }) {
  return (
    <Input.Group key={field.key}>
      <Row gutter={20} style={{ marginBottom: 20 }}>
        {/* Col: Tên danh mục */}
        <Col span={9}>
          <Form.Item
            style={{ marginBottom: 0 }}
            {...optionalInputValidation}
            {...field}
            name={[field.name, 'category']}
            fieldKey={[field.fieldKey, 'category']}
            label="Tên danh mục"
          >
            <Input placeholder="Nhập đề xuất" />
          </Form.Item>
        </Col>

        {/* Col: Giá từ */}
        <Col span={7}>
          <Form.Item
            style={{ marginBottom: 0 }}
            {...optionalInputValidation}
            {...field}
            name={[field.name, 'price-from']}
            fieldKey={[field.fieldKey, 'price-from']}
            label="Giá từ"
          >
            <Input
              type="number"
              min={0}
              step={10}
              style={{ width: '100% ' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(value) => console.log(value)}
              suffix="000đ"
            />
          </Form.Item>
        </Col>

        {/* Col: Giá đến */}
        <Col span={7}>
          <Form.Item
            style={{ marginBottom: 0 }}
            {...optionalInputValidation}
            {...field}
            name={[field.name, 'price-to']}
            fieldKey={[field.fieldKey, 'price-to']}
            label="đến"
          >
            <Input
              type="number"
              min={0}
              step={10}
              style={{ width: '100% ' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(value) => console.log(value)}
              suffix="000đ"
            />
          </Form.Item>
        </Col>

        {/* Col: Remove button */}
        <MinusSquareOutlined
          className="dynamic-delete-button"
          style={{ padding: 8, marginLeft: -8 }}
          onClick={() => remove(field.name)}
          title="Xóa danh mục"
        />
      </Row>
    </Input.Group>
  );
}

export default CategoryDynamic;
