import React, { Component } from 'react';
import * as Constant from '../../../common/Constant';
import AppBody from '../../../components/Layouts/AppBody';
import { Table, Row, Button, Col, Divider, Dropdown, Badge, Menu, Modal, Input, Typography, message } from 'antd';
import ApprovalProcessService from '../../../services/ApprovalProcessService';
import {
    CaretDownOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

class ConfirmProductsPage extends Component {

    approvalProcessService = new ApprovalProcessService();

    state = {
        data: [],
        selectedIds: [],
        statusRequest: 0,
        loading: false,
        rejectionReason: null,
        idInput: "",
        openRejectedModal: false,
        rowsPerPage: 15,
    }

    componentDidMount() {
        this.loadData(this.state.statusRequest, 1);
    }

    componentWillUnmount() {
        this.approvalProcessService.cancel();
        this.approvalProcessService = undefined;
    }

    loadData = (statusRequest, currentPage) => {
        this.setState({
            loading: true
        })
        const { rowsPerPage } = this.state;
        const oldStatusRequest = this.state.statusRequest;
        let offset = (currentPage - 1) * rowsPerPage;
        let limit = Constant.MAX_PAGE * rowsPerPage;
        this.approvalProcessService.getRequestProductHistories(statusRequest, offset, limit)
            .then(response => {
                if (statusRequest === oldStatusRequest) {
                    let arr = this.state.data.length > 0 ? this.state.data.slice() : [];
                    for (let i of response.data.data) {
                        arr.push(i);
                    }
                    this.setState({
                        data: arr,
                        selectedIds: [],
                        loading: false
                    });
                } else {
                    this.setState({
                        data: response.data.data,
                        selectedIds: [],
                        loading: false
                    });
                }

            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loading: false,
                    selectedIds: []
                })
            });
    }


    onSelectChange = selectedIds => {
        this.setState({ selectedIds: selectedIds });
    };

    onTableChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    }

    onChangePage = (page, pageSize) => {
        const { rowsPerPage, data } = this.state;
        if (page % Constant.MAX_PAGE === 0 && data.length % rowsPerPage === 0) {
            this.loadData(this.state.statusRequest, page + 1);
        }
    }

    changeStatusRequest = (key) => {
        if (key === this.state.statusRequest) {
            return;
        }
        this.setState({
            statusRequest: key
        });
        this.loadData(key, 1, 1);
    }

    onMultipleUpdate = (status) => {
        const { selectedIds, rejectionReason, data } = this.state;
        if (selectedIds.length === 0) {
            message.warn('Bạn chưa chọn dòng nào trên bảng!', 1.75);
            return;
        }
        let body = {
            ids: selectedIds,
            status: status,
            rejectionReason: rejectionReason
        }
        if (status === Constant.STATUS_REQUEST.REJECTED && !rejectionReason) {
            message.warn('Bạn chưa nhập lý do từ chối!', 1.75);
            return;
        }
        this.setState({
            loading: true
        })
        this.approvalProcessService.confirmMultipleRequets(body, true)
            .then(response => {
                if (response.data.code === Constant.AT_RESPONSE_CODE.S101) {
                    let newData = data.filter(i => {
                        let notRemoved = true;
                        for (let j of selectedIds) {
                            if (j === i.id) {
                                notRemoved = false;
                                break;
                            }
                        }
                        return notRemoved;
                    })
                    this.setState({
                        data: newData,
                        loading: false,
                        selectedIds: [],
                    }, message.success(response.data.message, 1.75));
                } else {
                    this.setState({
                        loading: false,
                        selectedIds: [],
                    });
                    message.error(response.data.message, 1.75);
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    selectedIds: [],
                });
                console.error(error);
                message.error(Constant.FAILED_MESSAGE, 1.75);
            })
    }

    badgeStatusRequest = (isActived, status, label) => {
        const { data, loading } = this.state;
        let total = data.length;
        if (isActived && !loading) {
            return <Badge count={total} style={{ backgroundColor: Constant.THEME_COLOR }} showZero>
                <Button
                    className="font-bold"
                    onClick={() => this.changeStatusRequest(status)}
                    type="link"
                    style={{
                        color: isActived ? Constant.THEME_COLOR : 'black'
                    }}>
                    {label}
                </Button>
            </Badge>
        }
        return <Button
            className="font-bold"
            onClick={() => this.changeStatusRequest(status)}
            type="link"
            style={{
                color: isActived ? Constant.THEME_COLOR : 'black'
            }}>
            {label}
        </Button>
    }

    onClickMenuStatus = ({ key }) => {
        if (key === "1" || key === "2") {
            Modal.confirm({
                title: 'Xác nhận',
                icon: <CheckCircleOutlined />,
                content: 'Bạn có chắc muốn cập nhật?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                okType: 'primary',
                onOk: () => this.onMultipleUpdate(parseInt(key, 10))
            });
        } else {
            this.setState({
                openRejectedModal: true
            })
        }
    }

    onViewData = (record) => {
        if (record.statusId === Constant.STATUS_REQUEST.NEW) {
            this.approvalProcessService.confirmRequest(record.id, { status: Constant.STATUS_REQUEST.PENDING })
                .then(response => {

                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onReject = () => {
        this.onMultipleUpdate(Constant.STATUS_REQUEST.REJECTED);
        this.setState({
            openRejectedModal: false
        })
    }

    filter = (id, data) => {
        if (id) {
            let arr = [], n = data.length;
            for (var i = 0; i < n; i++) {
                if (id == data[i].id) {
                    arr.push(data[i]);
                    return arr;
                }
            }
        } else {
            return data;
        }
    }

    onSearchId = (value, dataTable) => {
        if (dataTable && dataTable.length > 0) {
            return;
        }
        let pathname = window.location.pathname;
        window.open(Constant.URL.concat(`${pathname}/${value}`));
    }

    render() {
        const { data, selectedIds, loading, statusRequest, openRejectedModal, rejectionReason, idInput, rowsPerPage } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedIds,
            onChange: this.onSelectChange,
        };
        const menu = (
            <Menu onClick={this.onClickMenuStatus}>
                <Menu.Item key={Constant.STATUS_REQUEST.PENDING}>Đang xử lý</Menu.Item>
                <Menu.Item key={Constant.STATUS_REQUEST.APPROVED}>Chấp nhận</Menu.Item>
                <Menu.Item key={Constant.STATUS_REQUEST.REJECTED}>Từ chối</Menu.Item>
            </Menu>
        );
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: text => <span className="font-bold">{text}</span>
            },
            {
                title: 'Thương hiệu',
                dataIndex: 'brand',
                key: 'brand',
                render: text => <a>{text}</a>
            },
            {
                title: 'Hành động',
                dataIndex: 'eventType',
                key: 'eventType',
                width: '20%'
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: '15%'
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                width: '12%',
                render: (text, record) => {
                    return <Typography.Text code>{text}</Typography.Text>
                },
            },
            {
                title: '',
                key: 'action',
                width: '5%',
                render: (text, record) => {
                    if (record.eventType === Constant.EVENT_TYPE.DELETE_PRODUCTS) {
                        return <></>;
                    }
                    return <a onClick={() => this.onViewData(record)}
                        target="_blank"
                        href={`${Constant.ROUTER_URL.CONFIRM_PRODUCTS_PAGE}/${record.id}`}
                    >
                        Xem
                    </a>
                },
            },
        ];
        const dataTable = this.filter(idInput, data);
        return (
            <AppBody selectedMenu={Constant.MENU.CONFIRM_PRODUCTS_PAGE} title="Quản lý sản phẩm">
                <Row gutter={8}>
                    <Col lg={24} className="mb-2">
                        {this.badgeStatusRequest(statusRequest === Constant.STATUS_REQUEST.NEW,
                            Constant.STATUS_REQUEST.NEW,
                            'Mới')}
                        <Divider type="vertical" />
                        {this.badgeStatusRequest(statusRequest === Constant.STATUS_REQUEST.PENDING,
                            Constant.STATUS_REQUEST.PENDING,
                            'Đang xử lý')}
                        <Divider type="vertical" />
                        {this.badgeStatusRequest(statusRequest === Constant.STATUS_REQUEST.APPROVED,
                            Constant.STATUS_REQUEST.APPROVED,
                            'Chấp nhận')}
                        <Divider type="vertical" />
                        {this.badgeStatusRequest(statusRequest === Constant.STATUS_REQUEST.REJECTED,
                            Constant.STATUS_REQUEST.REJECTED,
                            'Từ chối')}
                        <Divider type="vertical" />
                        {this.badgeStatusRequest(statusRequest === Constant.STATUS_REQUEST.CANCELED,
                            Constant.STATUS_REQUEST.CANCELED,
                            'Hủy bỏ')}
                    </Col>
                    <Col lg={6} className="text-right">
                        <Input.Search
                            placeholder="Nhập ID"
                            onSearch={(value) => this.onSearchId(value, dataTable)}
                            name="idInput"
                            onChange={this.onInputChange}
                            value={idInput}
                        />
                    </Col>
                    <Col lg={18} className="text-right">
                        <Dropdown overlay={menu}>
                            <Button type="default" htmlType="button">
                                Cập nhật <CaretDownOutlined />
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={24} className="mt-2">
                        <Table
                            size="small"
                            pagination={{
                                pageSize: rowsPerPage,
                                showSizeChanger: false,
                                onChange: this.onChangePage,
                                hideOnSinglePage: true,
                                position: 'top'
                                // total: 10
                            }}
                            rowSelection={rowSelection}
                            rowKey="id"
                            dataSource={dataTable}
                            columns={columns}
                            loading={loading}
                            onChange={this.onTableChange}
                        />
                    </Col>
                </Row>
                <Modal
                    title="Lý do từ chối"
                    style={{ top: 20 }}
                    visible={openRejectedModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                    onOk={this.onReject}
                    onCancel={() => this.setState({ openRejectedModal: false })}
                >
                    <Input.TextArea
                        value={rejectionReason}
                        maxLength={250}
                        name="rejectionReason"
                        onChange={this.onInputChange}
                        placeholder="Nhập lý do từ chối"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Modal>
            </AppBody>
        );
    }
}

export default ConfirmProductsPage;