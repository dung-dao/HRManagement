import React from 'react';
import AppBody from "../../components/Layouts/AppBody";
import {Table} from "antd";
import {JobCategoryDTO, JobCategoryClient} from "../../services/ApiClient";
import {useTry} from "../../hooks";
import {JobCategoryModal} from "pages/JobCategory/JobCategoryModal";
import {ModalType, PageProvider} from "./PageProvider";
import {ActionRenderer} from "./ActionRenderer";

const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
    render: ActionRenderer,
  },
];

export function JobCategoryPage(props) {
  const api = React.useRef(new JobCategoryClient());
  const { isPending, $try: tryGetAll, data, setData } = useTry(() => api.current.jobCategory_GetAll())
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalType, setModalType] = React.useState<ModalType>('add')
  const [record, setRecord] = React.useState<JobCategoryDTO>()
  const pageContext = {
    modalVisible,
    setModalVisible,
    modalType,
    setModalType,
    record,
    setRecord,
    data: data ?? [],
    setData,
    api: api.current, // won't change
  }

  React.useEffect(() => {
    tryGetAll()
  }, [])

  return (
    <AppBody>
      <PageProvider value={pageContext}>
        <Table
          dataSource={data}
          // model doesn't have action field
          // @ts-ignore
          columns={columns}
          loading={isPending}
          pagination={false}
        />
        <JobCategoryModal />
      </PageProvider>
    </AppBody>
  )
}
