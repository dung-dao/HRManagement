import React from 'react';
import { Table } from 'antd';
import { columns } from './columns';
import ConfirmDecisionModal from './ConfirmDecisionModal';
import RepresentativeModal from './RepresentativeModal';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import { representativeModalState, merchantsAfterFiltersSelector } from '../../states';

function Index(props) {
  const setRepresentativeModal = useSetRecoilState(representativeModalState);
  const { state, contents: merchants } = useRecoilValueLoadable(merchantsAfterFiltersSelector);

  if (state === 'loading' || state === 'hasError') {
      return null;
  }

  return (
    <>
      <Table
        columns={columns({ setRepresentativeModal })}
        dataSource={merchants}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 1600 }}
        locale={{ emptyText: 'Không tìm thấy đối tác phù hợp' }}
      />
      <ConfirmDecisionModal />
      <RepresentativeModal />
    </>
  );
}

export default React.memo(Index);
