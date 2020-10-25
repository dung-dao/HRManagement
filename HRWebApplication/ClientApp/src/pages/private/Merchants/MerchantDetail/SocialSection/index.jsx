import React from 'react';
import { Button, Form, Input } from 'antd';
import { MinusSquareOutlined, PlusOutlined } from '@ant-design/icons';
import { formItemLayout } from '../utils';
import { useMerchantDetailData } from '../hooks';

const validation = {
  validateTrigger: ['onChange', 'onBlur'],
  rules: [{ required: true, message: 'Vui lòng nhập hoặc xóa đi.' }],
};

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <fieldset>
      <legend>Mạng xã hội:</legend>
      <Form.Item
        {...formItemLayout}
        label="Website"
        name="website"
        rules={[{ type: 'url', message: 'Định dạng đường dẫn không đúng' }]}
      >
        {isDetail ? (
          <Input
            defaultValue={merchantData?.social.find((it) => it.type === 'website')?.url}
            readOnly
            placeholder="Không có"
          />
        ) : (
          <Input type="url" placeholder="https://wewear.vn" />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Facebook"
        name="facebook"
        rules={[{ type: 'url', message: 'Định dạng đường dẫn không đúng' }]}
      >
        {isDetail ? (
          <Input
            defaultValue={merchantData?.social.find((it) => it.type === 'facebook')?.url}
            readOnly
            placeholder="Không có"
          />
        ) : (
          <Input placeholder="https://facebook.com/wewearvn" />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Instagram"
        name="instagram"
        rules={[{ type: 'url', message: 'Định dạng đường dẫn không đúng' }]}
      >
        {isDetail ? (
          <Input
            defaultValue={merchantData?.social.find((it) => it.type === 'instagram')?.url}
            readOnly
            placeholder="Không có"
          />
        ) : (
          <Input placeholder="https://instagram.com/wewearvn" />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Youtube"
        name="youtube"
        rules={[{ type: 'url', message: 'Định dạng đường dẫn không đúng' }]}
      >
        {isDetail ? (
          <Input
            defaultValue={merchantData?.social.find((it) => it.type === 'youtube')?.url}
            readOnly
            placeholder="Không có"
          />
        ) : (
          <Input placeholder="https://youtube.com/channel/..." />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Tiktok"
        name="tiktok"
        rules={[{ type: 'url', message: 'Định dạng đường dẫn không đúng' }]}
      >
        {isDetail ? (
          <Input
            defaultValue={merchantData?.social.find((it) => it.type === 'tiktok')?.url}
            readOnly
            placeholder="Không có"
          />
        ) : (
          <Input placeholder="https://tiktok.com/@wewearvn" />
        )}
      </Form.Item>
      {isDetail ? (
        merchantData.social
          .filter((it) => it.type === 'custom')
          .map((each, index) => (
            <Form.Item {...formItemLayout} label={'MXH khác ' + (index + 1) + ':'} key={index}>
              <Input defaultValue={each.url} readOnly />
            </Form.Item>
          ))
      ) : (
        <Form.List name="social-others">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...formItemLayout}
                  label={'MXH khác ' + (index + 1) + ':'}
                  key={field.key}
                >
                  <Form.Item {...field} {...validation} noStyle>
                    <Input placeholder="Đường dẫn khác" style={{ width: '90%' }} />
                  </Form.Item>
                  <MinusSquareOutlined
                    style={{ margin: '0 0 0 8px' }}
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                  <PlusOutlined /> Thêm mạng xã hội khác
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      )}
    </fieldset>
  );
}

export default Index;
