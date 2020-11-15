import React from 'react';
import { Table, Modal, Button, Space, Popconfirm, message, Form, Input, AutoComplete } from 'antd';
import AppBody from 'components/Layouts/AppBody';
// import { datasets, Entity as OrganizationUnitDTO } from './mock-data';
import { calculateAllExpandedRowKeys } from './util';
import { OrganizationUnitsClient, OrganizationUnitDTO } from 'services/ApiClient';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { maxBy } from 'lodash';
import { setDate } from 'date-fns/esm';

const columns = ({
  api,
  setIsModalVisible,
  setSelectedId,
  setModalType,
  setData,
}: {
  api: React.MutableRefObject<OrganizationUnitsClient>;
  setIsModalVisible: Function;
  setSelectedId: Function;
  setModalType: Function;
  setData: Function;
}) => [
  {
    title: 'Tên bộ phận',
    dataIndex: 'name',
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
    title: 'Số thành viên',
    dataIndex: 'employeeNo',
    align: 'center',
    width: '20%',
    // {
    //   title: 'Người đứng đầu',
    //   dataIndex: 'manager',
    //   width: '30%',
    //   // render: (text, record, index) => {
    //   //   console.log(record);
    //   //   return (
    //   //     <Button
    //   //       type="link"
    //   //       children={text}
    //   //       onClick={() => {
    //   //         setModalVisible(true);
    //   //         setSelectedRecord(record);
    //   //       }}
    //   //     />
    //   //   );
    //   // },
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
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
            if (record.children?.length) {
              message.error('Không thể xoá bộ phận không phải là node lá');
            } else {
              api.current
                .organizationUnits_Delete(record.id)
                .then(() => {
                  message.info('Xoá bộ phận thành công ' + record.name);
                  setData((prev) => prev.filter((it) => it.id !== record.id));
                })
                .catch((err) => {
                  message.error(err);
                });
            }
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

// const emps = [
//   {
//     id: '1',
//     code: 'MNV-001',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000001',
//     dateOfBirth: '01/01/1996',
//     sex: 'Nam',
//     department: 'BOD',
//     employeeType: 'BOD',
//     jobTitle: 'Giám đốc',
//     Salery: '9000000',
//     dateStarted: '01/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '01/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '2',
//     code: 'MNV-002',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000002',
//     dateOfBirth: '02/01/1996',
//     sex: 'Nam',
//     department: 'Back Office',
//     employeeType: 'Nhân viên',
//     jobTitle: 'Thư ký giám đốc',
//     Salery: '9000000',
//     dateStarted: '02/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '02/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '3',
//     code: 'MNV-003',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000003',
//     dateOfBirth: '03/01/1996',
//     sex: 'Nam',
//     department: 'Back Office',
//     employeeType: 'Quản lý',
//     jobTitle: 'Trưởng phòng hành chính - nhân sự',
//     Salery: '9000000',
//     dateStarted: '03/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '03/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '4',
//     code: 'MNV-004',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000004',
//     dateOfBirth: '04/01/1996',
//     sex: 'Nam',
//     department: 'BOD',
//     employeeType: 'BOD',
//     jobTitle: 'Phó giám đốc khối nghiệp vụ',
//     Salery: '9000000',
//     dateStarted: '04/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '04/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '5',
//     code: 'MNV-005',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000005',
//     dateOfBirth: '05/01/1996',
//     sex: 'Nam',
//     department: 'BOD',
//     employeeType: 'BOD',
//     jobTitle: 'Phó giám đốc khối trường học',
//     Salery: '9000000',
//     dateStarted: '05/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '05/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '6',
//     code: 'MNV-006',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000006',
//     dateOfBirth: '06/01/1996',
//     sex: 'Nam',
//     department: 'Back Office',
//     employeeType: 'Nhân viên',
//     jobTitle: 'Chuyên viên tuyển dụng',
//     Salery: '9000000',
//     dateStarted: '06/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '06/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '7',
//     code: 'MNV-007',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000007',
//     dateOfBirth: '07/01/1996',
//     sex: 'Nam',
//     department: 'Back Office',
//     employeeType: 'Nhân viên',
//     jobTitle: 'Chuyên viên C&B',
//     Salery: '9000000',
//     dateStarted: '07/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '07/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
//   {
//     id: '8',
//     code: 'MNV-008',
//     firstName: 'Nguyễn Văn',
//     lastName: 'A',
//     personalEmail: 'nguyenvana01@gmail.com',
//     workEmail: 'a.nguyen@base.vn',
//     phone: '0984000008',
//     dateOfBirth: '08/01/1996',
//     sex: 'Nam',
//     department: 'Back Office',
//     employeeType: 'Nhân viên',
//     jobTitle: 'Admin',
//     Salery: '9000000',
//     dateStarted: '08/01/2018',
//     workType: 'Full-Time',
//     branch: 'Cơ sở Nguyễn Tuân',
//     currentAddress: 'Số 47, Quan Nhân, Thanh Xuân, Hà Nội',
//     permanentAddress: 'Thanh Thuỷ, Thanh Hà, Hải Dương',
//     nationalId: '142700000',
//     licenseDate: '08/01/2016',
//     licensePlace: 'CA Hải Dương',
//   },
// ];

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
  const api = React.useRef(new OrganizationUnitsClient());
  const [data, setData] = React.useState<OrganizationUnitDTO[]>();
  const [selectedId, setSelectedId] = React.useState<string | number>(); // selected organizationId

  const [expandedRowKeys, setExpandedRowKeys] = React.useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  type ModalType = 'detail' | 'add' | 'edit';
  const [modalType, setModalType] = React.useState<ModalType>('detail');

  // const [autoCompleteOptions, setAutoCompleteOptions] = React.useState<any>([]); // list of employees to suggest

  const [form] = Form.useForm<OrganizationUnitDTO>();

  // initially get data from backend
  React.useEffect(() => {
    api.current.organizationUnits_GetAll().then((data) => setData(data));
  }, []);

  // recalculate expandedRowKeys
  const onTableTreeExpand = React.useCallback((expanded: boolean, record: OrganizationUnitDTO) => {
    console.log('> : record', record);
    if (expanded) {
      setExpandedRowKeys((old) => old.concat(String(record.id)));
    } else {
      setExpandedRowKeys((old) => old.filter((it) => it !== String(record.id)));
    }
  }, []);

  const getSelectedRecord = () => data?.find((it) => it.id === selectedId);

  // map modal type to ...
  const mapTypeTo: Record<ModalType, { title: string }> = {
    add: { title: 'Thêm mới bộ phận con của ' + getSelectedRecord()?.name },
    detail: { title: 'Chi tiết bộ phận  ' + getSelectedRecord()?.name },
    edit: { title: 'Chỉnh sửa bộ phận ' + getSelectedRecord()?.name },
  };

  // tree-like dataSource derived from flat-array data from backend
  const dataSource = React.useMemo<OrganizationUnitDTO[] | undefined>(() => {
    // How to convert flat array to tree array: https://stackoverflow.com/a/40732240/9787887
    // No need to worry about the algorithm detail
    const createDataTree = (dataset: OrganizationUnitDTO[]) => {
      const hashTable = {};
      dataset.forEach((dataItem) => (hashTable[String(dataItem.id)] = { ...dataItem }));
      const dataTree: OrganizationUnitDTO[] = [];
      dataset.forEach((dataItem) => {
        if (dataItem.parentId) {
          const parentExist = hashTable[dataItem.parentId];
          if (parentExist) {
            if (parentExist?.children) {
              parentExist.children.push(hashTable[String(dataItem.id)]);
            } else {
              parentExist.children = [hashTable[String(dataItem.id)]];
            }
          }
        } else {
          dataTree.push(hashTable[String(dataItem.id)]);
        }
      });
      return dataTree;
    };

    return data && createDataTree(data);
  }, [data]);

  // whenever datasource is changed, we recalculate the row keys,
  // and it's expanded by default
  React.useEffect(() => {
    setExpandedRowKeys(
      calculateAllExpandedRowKeys(dataSource, { level: -1, key: 'id' }).map((it) => String(it)),
    );
  }, [dataSource]);

  React.useEffect(() => {
    if (modalType === 'add') {
      form.setFieldsValue({
        name: '',
        // employee: '',
        description: '',
      });
    }

    if (modalType === 'edit' || modalType === 'detail') {
      if (!data) return;

      form.setFieldsValue({
        name: data.find((it) => it.id === selectedId)?.name,
        // manager: data.find((it) => it.id === selectedId)?.manager,
        description: data.find((it) => it.id === selectedId)?.description,
      });
    }
  }, [form, data, selectedId, modalType]);

  const onEditFinish = () => {
    api.current // TODO:  Chinh sua chua chay duoc
      .organizationUnits_Update(Number(selectedId), form.getFieldsValue() as OrganizationUnitDTO)
      .then(() => {
        setData((prev) =>
          prev?.map((it) => (it.id === selectedId ? { ...it, ...form.getFieldsValue() } : it)),
        );
        // setModalType('detail');
        message.info(`Chỉnh sửa bộ phận ${getSelectedRecord()?.name} thành công`);
      })
      .catch((err: Error) => {
        message.error(err.message);
      });
  };

  return (
    <AppBody>
      <Table
        columns={columns({
          api,
          setIsModalVisible,
          setSelectedId,
          setModalType,
          setData,
        })}
        dataSource={dataSource}
        loading={!dataSource}
        onExpand={onTableTreeExpand}
        rowKey={(record) => String(record.id)}
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
            const isNameFilled = form.isFieldsValidating(['name']);
            if (isNameFilled) { // TODO: WHY 
            } else {
              form
                .validateFields()
                .then((validatedData) => {
                  const parentId = Number(selectedId)
                  api.current // TODO: Them chua duoc
                    .organizationUnits_CreateUnit(parentId, validatedData as OrganizationUnitDTO) // newId: 14 (trong khi database max la 13), newEntity la object ok ma
                    .then((newEntity) => {
                      setData((prev) => (prev ? prev.concat(newEntity) : prev));
                      message.info(`Thêm mới bộ phận ${validatedData.name} thành công`);
                      setIsModalVisible(false);
                    })
                    .catch((err) => console.log(err));
                })
                .catch();
            }
          } else if (modalType === 'edit') {
            // TODO: CHinh sua: Them PopConfirm: Ban co muon luu lai chinh sua? Co, Khong, Dung lai
            onEditFinish();
          } else {
            setIsModalVisible(false);
          }
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
          <Form.Item
            name="name"
            label="Tên bộ phận"
            rules={[{ required: true, message: 'Tên bộ phận không được bỏ trống' }]}
          >
            <Input readOnly={modalType === 'detail'} />
          </Form.Item>
          {/* <Form.Item name="manager" label="Người đứng đầu" rules={[{ required: true }]}>
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
          </Form.Item> */}
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
              <Button type="primary" htmlType="submit" children={'Xong'} onClick={onEditFinish} />
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </AppBody>
  );
}
