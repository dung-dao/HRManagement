import React from 'react';
import { Col, Input } from 'antd';
import { useSetRecoilState } from 'recoil';
import { searchKeywordState } from '../../states';

export default function Search() {
  const setSearchKeyword = useSetRecoilState(searchKeywordState);

  return (
    <Col span={6}>
      <Input.Search
        size="middle"
        placeholder="Tên thương hiệu, danh mục"
        enterButton
        allowClear
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
    </Col>
  );
}
