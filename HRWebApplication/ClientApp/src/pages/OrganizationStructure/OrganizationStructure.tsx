import React from 'react';
import { Table, Modal, Button, Space, Popconfirm, message, Form, Input, AutoComplete } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import { datasets, Entity } from './mock-data';
import { calculateAllExpandedRowKeys } from './util';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const columns = ({ setIsModalVisible, setSelectedId, setModalType }) => [
  {
    title: 'Tên bộ phận',
    dataIndex: 'organizationName',
    render: (text, record, index) => {
      return (
        <Button
          type="link"
          children={text}
          onClick={() => {
            setIsModalVisible(true);
            setSelectedId(record.id);
            setModalType('detail');
          }}
        />
      );
    },
  },
  {
    title: 'Người đứng đầu',
    dataIndex: 'manager',
    width: '30%',
    // render: (text, record, index) => {
    //   console.log(record);
    //   return (
    //     <Button
    //       type="link"
    //       children={text}
    //       onClick={() => {
    //         setModalVisible(true);
    //         setSelectedRecord(record);
    //       }}
    //     />
    //   );
    // },
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'right',
    width: 'max-content',
    render: (text, record, index) => (
      <Space size="small">
        <Button
          title="Xem chi tiết"
          size="small"
          type="dashed"
          onClick={() => {
            setIsModalVisible(true);
            setSelectedId(record.id);
            setModalType('detail');
          }}
        >
          <EyeOutlined />
        </Button>
        <Button
          title="Chỉnh sửa trực tiếp"
          size="small"
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setSelectedId(record.id);
            setModalType('edit');
          }}
        >
          <EditOutlined />
        </Button>
        <Popconfirm
          placement="right"
          title={'Bạn có chắc muốn xoá bộ phận này và các bộ phận con của nó?'}
          onConfirm={() => {
            message.info('Xoá bộ phận thành công ' + record.id);
          }}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button title="Xoá" size="small" danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
        <Button
          title="Thêm mới bộ phận con"
          size="small"
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setSelectedId(record.id);
            setModalType('add');
          }}
        >
          <PlusOutlined />
        </Button>
      </Space>
    ),
  },
];

const emps = [
  {
    id: '1',
    code: 'MNV-001',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000001',
    dateOfBirth: '01/01/1996',
    sex: 'Nam',
    department: 'BOD',
    employeeType: 'BOD',
    jobTitle: 'Giám đốc',
    salary: '9000000',
    dateStarted: '01/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '01/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '2',
    code: 'MNV-002',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000002',
    dateOfBirth: '02/01/1996',
    sex: 'Nam',
    department: 'Back Office',
    employeeType: 'Nhân viên',
    jobTitle: 'Thư ký giám đốc',
    salary: '9000000',
    dateStarted: '02/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '02/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '3',
    code: 'MNV-003',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000003',
    dateOfBirth: '03/01/1996',
    sex: 'Nam',
    department: 'Back Office',
    employeeType: 'Quản lý',
    jobTitle: 'Trưởng phòng hành chính - nhân sự',
    salary: '9000000',
    dateStarted: '03/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '03/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '4',
    code: 'MNV-004',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000004',
    dateOfBirth: '04/01/1996',
    sex: 'Nam',
    department: 'BOD',
    employeeType: 'BOD',
    jobTitle: 'Phó giám đốc khối nghiệp vụ',
    salary: '9000000',
    dateStarted: '04/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '04/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '5',
    code: 'MNV-005',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000005',
    dateOfBirth: '05/01/1996',
    sex: 'Nam',
    department: 'BOD',
    employeeType: 'BOD',
    jobTitle: 'Phó giám đốc khối trường học',
    salary: '9000000',
    dateStarted: '05/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '05/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '6',
    code: 'MNV-006',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000006',
    dateOfBirth: '06/01/1996',
    sex: 'Nam',
    department: 'Back Office',
    employeeType: 'Nhân viên',
    jobTitle: 'Chuyên viên tuyển dụng',
    salary: '9000000',
    dateStarted: '06/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '06/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '7',
    code: 'MNV-007',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000007',
    dateOfBirth: '07/01/1996',
    sex: 'Nam',
    department: 'Back Office',
    employeeType: 'Nhân viên',
    jobTitle: 'Chuyên viên C&B',
    salary: '9000000',
    dateStarted: '07/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '07/01/2016',
    licensePlace: 'CA Hải Dương',
  },
  {
    id: '8',
    code: 'MNV-008',
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    personalEmail: 'nguyenvana01@gmail.com',
    workEmail: 'a.nguyen@base.vn',
    phone: '0984000008',
    dateOfBirth: '08/01/1996',
    sex: 'Nam',
    department: 'Back Office',
    employeeType: 'Nhân viên',
    jobTitle: 'Admin',
    salary: '9000000',
    dateStarted: '08/01/2018',
    workType: 'Full-Time',
    branch: 'Cơ sở Nguyễn Tuân',
    currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
    permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
    nationalId: '142700000',
    licenseDate: '08/01/2016',
    licensePlace: 'CA Hải Dương',
  },
];

function filterSearch(dataSource, searchText: string) {
  return dataSource
    .filter((it) => it.code.toLowerCase().includes(searchText.toLowerCase()))
    .map((it) => {
      const fullName = it.firstName + ' ' + it.lastName;
      const label = `${it.code} - ${fullName}`;
      return { label, value: label };
    })
    .filter((it) => it.label.toLowerCase().includes(searchText.toLowerCase()));
}

export default function () {
  const [data, setData] = React.useState<Entity[]>();
  const [selectedId, setSelectedId] = React.useState<string>(); // selected organizationId

  const [expandedRowKeys, setExpandedRowKeys] = React.useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  type ModalType = 'detail' | 'add' | 'edit';
  const [modalType, setModalType] = React.useState<ModalType>('detail');

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState<any>([]); // list of employees to suggest

  const [form] = Form.useForm();

  // initially get data from backend
  React.useEffect(() => {
    async function callApi() {}
    callApi().then(() => setData(datasets));
  }, []);

  // recalculate expandedRowKeys
  const onTableTreeExpand = React.useCallback((expanded: boolean, record: Entity) => {
    if (expanded) {
      setExpandedRowKeys((old) => old.concat(record.id));
    } else {
      setExpandedRowKeys((old) => old.filter((it) => it !== record.id));
    }
  }, []);

  // map modal type to ...
  const mapTypeTo: Record<ModalType, { title: string }> = {
    add: { title: 'Thêm mới bộ phận' },
    detail: { title: 'Chi tiết bộ phận' },
    edit: { title: 'Chỉnh sửa bộ phận' },
  };

  // tree-like dataSource derived from flat-array data from backend
  const dataSource = React.useMemo(() => {
    // How to convert flat array to tree array: https://stackoverflow.com/a/40732240/9787887
    // No need to worry about the algorithm detail
    const createDataTree = (dataset: Entity[]) => {
      const hashTable = {};
      dataset.forEach((dataItem) => (hashTable[dataItem.id] = { ...dataItem }));
      const dataTree: any[] = [];
      dataset.forEach((dataItem) => {
        if (dataItem.parentId) {
          const parentExist = hashTable[dataItem.parentId];
          if (parentExist) {
            if (parentExist?.children) {
              parentExist.children.push(hashTable[dataItem.id]);
            } else {
              parentExist.children = [hashTable[dataItem.id]];
            }
          }
        } else {
          dataTree.push(hashTable[dataItem.id]);
        }
      });
      return dataTree;
    };

    return data && createDataTree(data);
  }, [data]);

  // whenever datasource is changed, we recalculate the row keys,
  // and it's expanded by default
  React.useEffect(() => {
    setExpandedRowKeys(calculateAllExpandedRowKeys(dataSource, { level: -1, key: 'id' }));
  }, [dataSource]);

  React.useEffect(() => {
    if (modalType === 'add') {
      form.setFieldsValue({
        organizationName: '',
        manager: '',
        description: '',
      });
    }

    if (modalType === 'edit' || modalType === 'detail') {
      if (!data) return;

      form.setFieldsValue({
        organizationName: data.find((it) => it.id === selectedId)?.organizationName,
        manager: data.find((it) => it.id === selectedId)?.manager,
        description: data.find((it) => it.id === selectedId)?.description,
      });
    }
  }, [form, data, selectedId, modalType]);

  return (
    <AppBody>
      <Table
        columns={columns({
          setIsModalVisible,
          setSelectedId,
          setModalType,
        })}
        dataSource={dataSource}
        loading={!dataSource}
        onExpand={onTableTreeExpand}
        rowKey={(record) => record.id}
        expandedRowKeys={expandedRowKeys}
        pagination={false}
        // defaultExpandAllRows={true} // doesn't work for async data
      />

      <Modal
        title={mapTypeTo[modalType].title}
        visible={isModalVisible}
        centered
        onOk={() => {
          if (modalType === 'add') {
            const newEntity = {
              parentId: selectedId,
              ...form.getFieldsValue(),
            };
            message.info('Them moi bo phan cho' + JSON.stringify(newEntity));
          }
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}
          form={form}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item name="organizationName" label="Tên bộ phận" rules={[{ required: true }]}>
            <Input readOnly={modalType === 'detail'} />
          </Form.Item>
          <Form.Item name="manager" label="Người đứng đầu" rules={[{ required: true }]}>
            {modalType === 'detail' ? (
              <Input readOnly />
            ) : (
              <AutoComplete
                options={autoCompleteOptions}
                onSelect={(data) => {}}
                onSearch={(searchText) =>
                  setAutoCompleteOptions(!searchText ? [] : filterSearch(emps, searchText))
                }
                onChange={(data) => console.log(data)}
                notFoundContent="Tìm kiếm nhân viên"
              />
            )}
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea readOnly={modalType === 'detail'} />
          </Form.Item>
          <Form.Item {...{ wrapperCol: { offset: 8, span: 16 } }}>
            {modalType === 'detail' ? (
              <Button
                type="primary"
                htmlType="submit"
                children={'Chỉnh sửa'}
                onClick={() => setModalType('edit')}
              />
            ) : modalType === 'edit' ? (
              <Button
                type="primary"
                htmlType="submit"
                children={'Xong'}
                onClick={() => {
                  setModalType('detail');
                  setData((prev) =>
                    prev?.map((it) =>
                      it.id === selectedId ? { ...it, ...form.getFieldsValue() } : it,
                    ),
                  );
                }}
              />
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </AppBody>
  );
}
