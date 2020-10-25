import React, { Component } from 'react';
import AppBody from './../../../components/Layouts/AppBody';
import * as Constant from '../../../common/Constant';
import SortableTree, { getVisibleNodeCount, addNodeUnderParent, removeNode } from 'react-sortable-tree';
import { Button, Row, Col } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { externalNodeType, ExternalNodeComponent } from '../../../components/SortableTree/ExternalNodeComponent';

class GroupSetAttributePage extends Component {
    state = {
        categoryTree: [
            { title: 'Chicken', children: [{ title: 'Egg' }] },
            { title: 'Fish', children: [{ title: 'fingerline' }] }
        ],
    }

    onTreeChange = (newTree) => {
        console.log(newTree);
        this.setState({
            categoryTree: newTree
        })
    }

    onAddNode = (node, path) => {
        let NEW_NODE = { title: 'new category' }
        let newTree = addNodeUnderParent({
            treeData: this.state.categoryTree,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: path[path.length - 1],
            getNodeKey: ({ node1, treeIndex }) => {
                return treeIndex;
            },
        });
        this.setState({
            categoryTree: newTree.treeData
        })
    }

    onRemoveNode = (node, path) => {
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

    onAddParentNode = () => {
        let NEW_NODE = { title: 'new category' }
        let newTree = addNodeUnderParent({
            treeData: this.state.categoryTree,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: undefined,
            getNodeKey: ({ node1, treeIndex }) => {
                return treeIndex;
            },
        });
        this.setState({
            categoryTree: newTree.treeData
        })
    }

    render() {
        const { categoryTree } = this.state;
        const countNodes = getVisibleNodeCount({ treeData: categoryTree });
        return (
            <AppBody
                selectedMenu={Constant.MENU.GROUP_SET_ATTR_MENU}
                title="Quản lý thuộc tính"
                openMenu={Constant.MENU.PARENT_CATEGORY_MENU}
            >
                <Row gutter={16}>
                    <Col span={24} className="mb-1">
                        <div className="text-right">
                            <Button
                                onClick={this.onAddParentNode}
                                htmlType="button"
                                icon={<PlusOutlined />}
                            />
                            <Button type="primary" className="ml-4">Lưu</Button>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div style={{ height: 62 * countNodes }}>
                            <SortableTree
                                treeData={categoryTree}
                                onChange={this.onTreeChange}
                                dndType={externalNodeType}
                                generateNodeProps={({ node, path }) => ({
                                    title: (
                                        <a>
                                            {node.title}
                                        </a>
                                    ),
                                    buttons: [<Button shape="circle"
                                        htmlType="button"
                                        icon={<PlusOutlined />}
                                        onClick={(e) => this.onAddNode(node, path)}
                                    />,
                                    <Button shape="circle"
                                        htmlType="button"
                                        icon={<CloseOutlined />}
                                        className="ml-1"
                                        onClick={(e) => this.onRemoveNode(node, path)}
                                    />],
                                })}
                            />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <ExternalNodeComponent node={{ title: 'Baby Rabbit' }} />
                    </Col>
                </Row>
            </AppBody>
        );
    }
}

export default GroupSetAttributePage;