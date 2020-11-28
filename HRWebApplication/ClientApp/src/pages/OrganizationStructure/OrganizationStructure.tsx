import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import React from 'react';
import { OrganizationUnitDTO, OrganizationUnitsClient } from 'services/ApiClient';
// import { datasets, Entity as OrganizationUnitDTO } from './mock-data';
import { calculateAllExpandedRowKeys } from './util';

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
                  console.log(err, 'errrrr delete');
                  message.error(JSON.stringify(err));
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
      </Space>
    ),
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
  const api = React.useRef(new OrganizationUnitsClient());
  const [data, setData] = React.useState<OrganizationUnitDTO[]>();
  const [selectedId, setSelectedId] = React.useState<string | number>(); // selected organizationId

  const [expandedRowKeys, setExpandedRowKeys] = React.useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  type ModalType = 'add' | 'edit';
  const [modalType, setModalType] = React.useState<ModalType>('edit');

  // const [autoCompleteOptions, setAutoCompleteOptions] = React.useState<any>([]); // list of employees to suggest

  const [form] = Form.useForm<OrganizationUnitDTO>();

  // initially get data from backend
  React.useEffect(() => {
    api.current.organizationUnits_GetAll().then((data) => setData(data));
  }, []);

  // recalculate expandedRowKeys
  const onTableTreeExpand = React.useCallback((expanded: boolean, record: OrganizationUnitDTO) => {
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

    if (modalType === 'edit') {
      if (!data) return;

      form.setFieldsValue({
        name: data.find((it) => it.id === selectedId)?.name,
        // manager: data.find((it) => it.id === selectedId)?.manager,
        description: data.find((it) => it.id === selectedId)?.description,
      });
    }
  }, [form, data, selectedId, modalType]);

  const onEditFinish = () => {
    console.log('> : form.getFieldsValue()', Number(selectedId), form.getFieldsValue());
    api.current
      .organizationUnits_Update(Number(selectedId), {
        ...getSelectedRecord(),
        ...form.getFieldsValue(),
      } as OrganizationUnitDTO)
      .then(() => {
        setData((prev) =>
          prev?.map((it) =>
            it.id === selectedId
              ? ({ ...it, ...form.getFieldsValue() } as OrganizationUnitDTO)
              : it,
          ),
        );
        message.info(`Chỉnh sửa bộ phận ${getSelectedRecord()?.name} thành công`);
      })
      .catch((err) => {
        message.error(JSON.stringify(err));
      });
  };

  return (
    <AppBody title="Tổ chức">
      <Table
        // @ts-ignore
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
        locale={{ emptyText: 'Không tìm thấy bộ phận nào' }}
        // defaultExpandAllRows={true} // doesn't work for async data
      />

      <Modal
        title={mapTypeTo[modalType].title}
        visible={isModalVisible}
        centered
        onOk={() => {
          if (modalType === 'add') {
            const isNameFilled = form.isFieldsValidating(['name']);
            if (isNameFilled) {
              // TODO: WHY
            } else {
              form
                .validateFields()
                .then((validatedData) => {
                  const parentId = Number(selectedId);
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
            <Input />
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
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </AppBody>
  );
}
