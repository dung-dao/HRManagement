import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout, required } from '../utils';
import { getProvinces, getDistricts, getWards } from './utils';
// import { useMerchantDetailData } from '../hooks';

function Index({ form, isDetail, merchantData }) {
  const [province, setProvince] = useState(null); // null | string
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <fieldset>
      <legend>Địa chỉ kinh doanh:</legend>
      <Form.Item
        {...formItemLayout}
        label="Tình / thành phố"
        name="province"
        rules={[required('Tỉnh / thành phố')]}
        readOnly={true}
      >
        {isDetail ? (
          <Input defaultValue={merchantData?.address.province} readOnly />
        ) : (
          <Select
            showSearch
            placeholder="Chọn tỉnh / thành phố"
            options={getProvinces()}
            value={province}
            onChange={(value) => {
              setProvince(value);
              setDistrict(null); // reset district and ward when the selected province changes
              setWard(null);
              form.setFieldsValue({
                district: undefined,
                ward: undefined,
              });
            }}
          />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Quận / huyện"
        name="district"
        rules={[required('Quận / huyện')]}
      >
        {isDetail ? (
          <Input defaultValue={merchantData?.address.district} readOnly />
        ) : (
          <Select
            showSearch
            placeholder="Chọn quận / huyện"
            notFoundContent="Bạn chưa chọn tỉnh / thành phố"
            options={getDistricts(province)}
            value={district}
            onChange={(value) => {
              setDistrict(value);
              setWard(null);
              form.setFieldsValue({
                ward: undefined,
              });
            }}
          />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Xã / phường"
        name="ward"
        rules={[required('Xã / phường')]}
      >
        {isDetail ? (
          <Input defaultValue={merchantData?.address.ward} readOnly />
        ) : (
          <Select
            showSearch
            placeholder="Chọn xã / phường"
            notFoundContent="Bạn chưa chọn quận / huyện"
            options={getWards(province, district)}
            value={ward}
            onChange={(value) => {
              setWard(value);
            }}
          />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Tên đường" name="street">
        <Input
          placeholder="54 Đường số 6, KDC Cityland Park Hills, P. 10"
          readOnly={isDetail}
          defaultValue={merchantData?.address.street}
        />
      </Form.Item>
    </fieldset>
  );
}

export default Index;
