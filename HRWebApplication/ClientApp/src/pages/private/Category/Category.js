import React, { Component } from 'react';
import AppBody from './../../../components/Layouts/AppBody';
import * as Constant from '../../../common/Constant';
import SortableTree, { getVisibleNodeCount, removeNode } from 'react-sortable-tree';
import { Button, Modal, Row, Col, Form, Input, message, Upload, Checkbox, Spin } from 'antd';
import { PlusOutlined, CloseOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import * as Utils from '../../../common/Utils';
import CatalogService from './../../../services/CatalogService';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const initCurrentNode = {
    name: "",
    description: "",
    slug: "",
    active: true
}

class CategoryPage extends Component {

    catalogService = new CatalogService();

    formRef = React.createRef();

    state = {
        categoryTree: [],
        openAttributedModal: false,
        currentNode: initCurrentNode, //init form for the first time and store value of category node
        currentPath: [],
        isAdded: false, // false: update, true: insert
        imageUrl: "",
        loadingImg: false,
        loadingTree: false,
        titleModal: "Tạo danh mục"
    }

    createCategoryTree(dataset) {
        let node = Object.create(null);
        dataset.forEach(data => {
            data.children = [];
            node[data.categoryId] = data;
        })
        let dataTree = [];
        dataset.forEach(data => {
            if (data.parentId) {
                node[data.parentId].children.push(node[data.categoryId])
            } else {
                dataTree.push(node[data.categoryId])
            }
        });
        //sort children of single node (by sortOrder)
        dataTree.forEach(i => {
            this.sortChildren(i);
        })
        //sort parent node (by sortOrder)
        dataTree.sort((a, b) => {
            return a.sortOrder - b.sortOrder;
        });
        return dataTree;
    };

    sortChildren(node) {
        node.children.sort((a, b) => {
            return a.sortOrder - b.sortOrder;
        });
        node.children.forEach(i => {
            this.sortChildren(i);
        })
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        this.setState({
            loadingTree: true
        })
        this.catalogService.getAllCategories()
            .then(response => {
                let data = response.data.data;
                let categoryTree = this.createCategoryTree(data);
                this.setState({
                    categoryTree,
                    loadingTree: false
                })
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loadingTree: false
                })
            })
    }

    componentWillUnmount() {
        this.catalogService.cancel();
        this.catalogService = undefined;
    }

    createLevel(node) {
        node.children.forEach((j, idx) => {
            j.parentId = node.categoryId;
            j.path = node.path.concat(`/${j.categoryId}`);
            j.sortOrder = idx;
            j.level = node.level + 1;
            this.createLevel(j);
        });
    }

    recreateTreeWithLevel(tree) {
        tree.forEach((i, idx1) => {
            i.path = `/${i.categoryId}`;
            i.level = 1;
            i.sortOrder = idx1;
            i.children.forEach((j, idx2) => {
                j.level = i.level + 1;
                j.parentId = i.categoryId;
                j.path = i.path.concat(`/${j.categoryId}`);
                j.sortOrder = idx2;
                this.createLevel(j);
            });
        })
        return tree;
    }

    onTreeChange = (newTree) => {
        this.setState({
            categoryTree: newTree
        })
    }

    // onAddNode = (node, path) => {
    //     this.setState({
    //         openAttributedModal: true
    //     });
    //     let NEW_NODE = { title: 'new category' }
    //     let newTree = addNodeUnderParent({
    //         treeData: this.state.categoryTree,
    //         newNode: NEW_NODE,
    //         expandParent: true,
    //         parentKey: path[path.length - 1],
    //         getNodeKey: ({ node1, treeIndex }) => {
    //             return treeIndex;
    //         },
    //     });
    //     this.setState({
    //         categoryTree: newTree.treeData
    //     })
    // }

    // onAddParentNode = (newNode) => {
    //     let newTree = addNodeUnderParent({
    //         treeData: this.state.categoryTree,
    //         newNode: newNode,
    //         expandParent: true,
    //         parentKey: undefined,
    //         getNodeKey: ({ node1, treeIndex }) => {
    //             return treeIndex;
    //         },
    //     });
    //     this.setState({
    //         categoryTree: newTree.treeData
    //     })
    // }

    onRemoveNode = (node, path) => {
        Modal.confirm({
            title: 'Bạn có chắc muốn xóa không ?',
            icon: <ExclamationCircleOutlined />,
            content: 'Xóa danh mục',
            cancelText: "Hủy",
            okText: "Đồng ý",
            onOk: () => {
                let queue = [];
                let requestData = {
                    categoryIds: []
                };
                queue.push(node);
                while (queue.length > 0) {
                    let firstElement = queue.shift();
                    requestData.categoryIds.push(firstElement.categoryId);
                    if (firstElement.children.length > 0) {
                        firstElement.children.forEach(j => {
                            queue.push(j);
                        });
                    }
                }
                if (requestData.categoryIds.length > 0) {
                    this.catalogService.deleteCategory(requestData)
                        .then(response => {
                            if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                                message.success(response.data.message, 1.75);
                                let newTree = removeNode({
                                    treeData: this.state.categoryTree,
                                    path: path,
                                    getNodeKey: ({ node1, treeIndex }) => {
                                        return treeIndex;
                                    },
                                });
                                this.setState({
                                    categoryTree: newTree.treeData
                                })
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            message.error(Constant.FAILED_MESSAGE, 1.75);
                        })
                } else {
                    console.error("category Ids array size is zero!")
                }
            },
            onCancel() { },
        });
    }

    onFinishForm = values => {
        const { imageUrl, isAdded, currentNode, categoryTree } = this.state;
        let form = values;
        form.image = imageUrl;
       
        if (isAdded) { // create category
            form.sortOrder = categoryTree[categoryTree.length - 1].sortOrder + 1;
            console.log(form);
            this.catalogService.createCategory(form)
                .then(response => {
                    if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                        message.success(response.data.message, 1.75);
                        this.loadCategories();
                    } else if (response.data.code === Constant.AR_RESPONSE_CODE.E101) {
                        message.error(response.data.message, 1.75);
                    }
                })
                .catch(error => {
                    console.error(error);
                    message.error(Constant.FAILED_MESSAGE, 2);
                })
        } else { // update category
            this.catalogService.updateCategory(form, currentNode.categoryId)
                .then(response => {
                    if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                        message.success(response.data.message, 1.75);
                        this.loadCategories();
                    } else if (response.data.code === Constant.AR_RESPONSE_CODE.E101) {
                        message.error(response.data.message, 1.75);
                    }
                })
                .catch(error => {
                    console.error(error);
                    message.error(Constant.FAILED_MESSAGE, 2);
                })
        }

    };

    onFinishFailedForm = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    handleChange = info => {
        console.log(info.file);
    };

    validateImg = (file) => {
        let validExt = Utils.checkExtensionImg(file), validSize = Utils.checkSizeImg(file);
        if (!validExt) {
            message.error('Extension không hợp lệ!', 1.75);
        }
        if (!validSize) {
            message.error('Size file tối đa 2MB!', 1.75);
        }
        if (!validSize || !validExt) {
            this.setState({
                loadingImg: false,
            })
        }
        return validExt && validSize;
    }

    resetForm = (node) => { // use for reset form because setState currentNode re-render for once
        if (this.formRef.current) {
            this.setState({
                imageUrl: ""
            })
            this.formRef.current.setFieldsValue({
                name: node.name,
                description: node.description,
                slug: node.slug,
                active: node.active
            });
        }
    }

    clickNode = (node, path) => {
        this.resetForm(node);
        this.setState({
            openAttributedModal: true,
            currentNode: node,
            imageUrl: node.image,
            currentPath: path,
            isAdded: false,
            titleModal: `Cập nhật danh mục | ${node.name}`
        });
    }

    insertRootNode = () => {
        this.resetForm(initCurrentNode);
        this.setState({
            openAttributedModal: true,
            currentNode: initCurrentNode,
            imageUrl: "",
            currentPath: [],
            isAdded: true,
            titleModal: "Tạo danh mục"
        });
    }

    saveCategoryTree = () => {
        const { categoryTree } = this.state;
        let tree = this.recreateTreeWithLevel(categoryTree);
        let queue = [];
        let requestData = [];
        tree.forEach(i => {
            queue.push(i);
        })
        while (queue.length > 0) {
            let firstElement = queue.shift();
            requestData.push(firstElement);
            firstElement.children.forEach(j => {
                queue.push(j);
            });
        }
        requestData = requestData.map(i => {
            return {
                categoryId: i.categoryId,
                path: i.path,
                parentId: i.parentId,
                level: i.level,
                sortOrder: i.sortOrder
            }
        });
        this.setState({
            loadingTree: true
        })
        this.catalogService.updateCategoryTree({ nodeTrees: requestData })
            .then(response => {
                if (response.data.code === Constant.AR_RESPONSE_CODE.S101) {
                    message.success(response.data.message, 1.75);
                }
                this.setState({
                    loadingTree: false
                })
            })
            .catch(error => {
                message.error(Constant.FAILED_MESSAGE, 1.75);
                console.error(error);
                this.setState({
                    loadingTree: false
                })
            })
    }

    render() {
        const { categoryTree, openAttributedModal, imageUrl, loadingImg, loadingTree, currentNode, titleModal } = this.state;
        let countNodes = getVisibleNodeCount({ treeData: categoryTree });
        if (countNodes === 0) {
            countNodes = 3;
        }
        const uploadButton = (
            <div>
                {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Đăng ảnh</div>
            </div>
        );
        return (
            <AppBody
                selectedMenu={Constant.MENU.CATEGORY_MENU}
                title="Quản lý danh mục"
                openMenu={Constant.MENU.PARENT_CATEGORY_MENU}
            >
                <Row>
                    <Col span={24}>
                        <div className="text-right">
                            <Button
                                onClick={(e) => this.insertRootNode()}
                                htmlType="button"
                                icon={<PlusOutlined />}
                            />
                            <Button type="primary" htmlType="button" className="ml-4" onClick={this.saveCategoryTree}>Lưu</Button>
                        </div>
                    </Col>
                </Row>
                <Spin spinning={loadingTree}>
                    <div style={{ height: 62 * countNodes }} className="mt-1">
                        <SortableTree
                            treeData={categoryTree}
                            onChange={this.onTreeChange}
                            generateNodeProps={({ node, path }) => ({
                                title: (
                                    <a onClick={() => this.clickNode(node, path)} style={{ color: !node.active ? 'red' : null }}>
                                        {node.name}
                                    </a>
                                ),
                                buttons: [
                                    <Button shape="circle"
                                        htmlType="button"
                                        icon={<CloseOutlined />}
                                        className="ml-1"
                                        danger
                                        onClick={(e) => this.onRemoveNode(node, path)}
                                    />],
                            })}
                        />

                    </div>
                </Spin>
                <Modal
                    title={titleModal}
                    style={{ top: 20 }}
                    visible={openAttributedModal}
                    footer={null}
                    // onOk={this.onReject}
                    onCancel={() => this.setState({ openAttributedModal: false })}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={currentNode}
                        ref={this.formRef}
                        onFinish={this.onFinishForm}
                        onFinishFailed={this.onFinishFailedForm}
                    >
                        <Row>
                            <Col span={6}>
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={this.validateImg}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Col>
                            <Col span={18}>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Tên danh mục không được trống' }]}
                                >
                                    <Input placeholder="Tên danh mục" />
                                </Form.Item>
                                <Form.Item
                                    name="slug"
                                    rules={[{ required: true, message: 'Slug không được trống!' }]}
                                >
                                    <Input placeholder="slug" />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                >
                                    <Input.TextArea
                                        placeholder="Mô tả"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="active"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Hoạt động</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="text-right">
                            <Button type="primary" htmlType="submit" loadingImg={loadingImg}>
                                Lưu
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </AppBody>
        );
    }
}

export default CategoryPage;