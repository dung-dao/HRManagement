import React, { Component } from 'react';
import { Table, Button, Col, Row, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import AttributeService from './../../../services/AttributeService';
import * as Constant from '../../../common/Constant';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const dataType = ['nvarchar', 'text', 'int']

const uiControl = ['select', 'input']

const resetAttributeForm = {
    name: "",
    attributeCode: "",
    dataType: dataType[0],
    uiControl: uiControl[0]
}

class AttributeTab extends Component {

    attributeService = new AttributeService();
    formRef = React.createRef();

    state = {
        openAttributedModal: false,
        currentAttribute: resetAttributeForm,
        titleModal: "Tạo thuộc tính",
        loading: false,
        isAdded: false
    }

    componentDidMount() {
        this.loadingAttributes();
    }

    loadingAttributes = () => {
        this.setState({
            loading: true
        })
        this.attributeService.getAllAttributes()
            .then(response => {
                this.props.setAttributes(response.data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    componentWillUnmount() {
        this.attributeService.cancel();
        this.attributeService = undefined;
    }

    resetForm = (form) => { // use for reset form because setState currentNode re-render for once
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue(form);
        }
    }

    onFinishForm = values => {
        const { isAdded, currentAttribute } = this.state;
        let form = values;
        if (isAdded) {
            this.attributeService.createAttribute(form)
                .then(response => {
                    if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                        message.success(response.data.message, 1.75);
                        this.loadingAttributes();
                    } else {
                        message.error(response.data.message, 1.75);
                    }
                })
                .catch(error => {
                    message.error(Constant.FAILED_MESSAGE, 1.75);
                    console.error(error);
                })
        } else {
            this.attributeService.updateAttribute(form, currentAttribute.attributeId)
                .then(response => {
                    if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                        message.success(response.data.message, 1.75);
                        this.loadingAttributes();
                    } else {
                        message.error(response.data.message, 1.75);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    };

    onFinishFailedForm = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    filterData(data) {
        return data;
    }

    onClickRow = (record) => {
        this.resetForm(record);
        this.setState({ openAttributedModal: true, currentAttribute: record });
    }

    render() {
        const { openAttributedModal, currentAttribute, titleModal, loading } = this.state;
        const { attributes } = this.props;
        const dataTable = this.filterData(attributes);
        const dataTypeOpts = dataType.map(i => <Select.Option value={i} key={uuidv4()}>{i}</Select.Option>);
        const uiControlOpts = uiControl.map(i => <Select.Option value={i} key={uuidv4()}>{i}</Select.Option>);
        const columns = [
            {
                title: 'ID',
                dataIndex: 'attributeId',
                key: 'attributeId',
                render: text => <span className="font-bold">{text}</span>
            },
            {
                title: 'Mã thuộc tính',
                dataIndex: 'attributeCode',
                key: 'attributeCode',
                render: text => <a>{text}</a>
            },
            {
                title: 'Tên thuộc tính',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Kiểu dữ liệu',
                dataIndex: 'dataType',
                key: 'dataType'
            },
            {
                title: 'Ui control',
                dataIndex: 'uiControl',
                key: 'uiControl',
            },
            {
                title: '',
                key: 'action',
                width: '5%',
                render: (text, record) => {
                    return <a onClick={() => this.onClickRow(record)}>Sửa</a>
                },
            },
        ]

        return (
            <div>
                <Row className="mb-1" gutter={16}>
                    <Col span={12}>

                    </Col>
                    <Col span={12}>
                        <div className="text-right">
                            <Button
                                htmlType="button"
                                onClick={(e) => this.setState({ openAttributedModal: true, isAdded: true }, this.resetForm(resetAttributeForm))}
                                icon={<PlusOutlined />}
                            />
                        </div>
                    </Col>
                </Row>
                <Table
                    size="small"
                    pagination={{
                        pageSize: 15,
                        showSizeChanger: false,
                        hideOnSinglePage: true,
                        position: 'top'
                    }}
                    rowKey="attributeId"
                    dataSource={dataTable}
                    columns={columns}
                    loading={loading}
                />
                <Modal
                    title={titleModal}
                    visible={openAttributedModal}
                    footer={null}
                    // onOk={this.onReject}
                    onCancel={() => this.setState({ openAttributedModal: false })}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={currentAttribute}
                        onFinish={this.onFinishForm}
                        ref={this.formRef}
                        onFinishFailed={this.onFinishFailedForm}
                    >
                        <Form.Item
                            label="Tên thuộc tính"
                            name="name"
                            rules={[{ required: true, message: 'Xin mời nhập tên thuộc tính!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã"
                            name="attributeCode"
                            rules={[{ required: true, message: 'Xin nhập mã thuộc tính!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Kiểu dữ liệu"
                            name="dataType"
                            rules={[{ required: true, message: 'Xin chọn kiểu dữ liệu!' }]}
                        >
                            <Select>
                                {dataTypeOpts}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="UI control"
                            name="uiControl"
                            rules={[{ required: true, message: 'Xin chọn ui control!' }]}
                        >
                            <Select>
                                {uiControlOpts}
                            </Select>
                        </Form.Item>

                        <div className="text-right">
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default AttributeTab;