import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { categories } from '../data';
import CategoryCheckbox from './CategoryCheckbox';
import CategoryDynamic from './CategoryDynamic';
import { PlusOutlined } from '@ant-design/icons';
import { useMerchantDetailData } from '../../hooks';

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <Col span={24}>
      {isDetail ? (
        <>
          {merchantData?.shop.categories.map((each, index) => (
            <CategoryCheckbox key={index} index={index} category={each} />
          ))}
        </>
      ) : (
        <Form.List name="categories">
          {(fields, { add, remove }) => (
            <div>
              {/* Fixed inputs */}
              {categories.map((each, index) => (
                <CategoryCheckbox key={index} index={index} category={each} />
              ))}

              {/* Dynamic inputs */}
              {fields.map((field) => (
                <CategoryDynamic key={field.key} field={field} add={add} remove={remove} />
              ))}

              {/* button add, help inputs dynamic */}
              <Form.Item name="add-category">
                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                  <PlusOutlined /> Thêm danh mục
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      )}
    </Col>
  );
}

export default Index;
