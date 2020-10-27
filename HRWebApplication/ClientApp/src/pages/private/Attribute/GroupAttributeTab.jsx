import React, { Component } from 'react';
import { Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { externalNodeType, ExternalNodeComponent } from '../../../components/SortableTree/ExternalNodeComponent';

class GroupAttributeTab extends Component {
    render() {
        const { attributes } = this.props;
        let attrArr = attributes.map(i => <ExternalNodeComponent node={i} />)
        return (
            <Row gutter={16}>
                <Col span={24} className="mb-1">
                    <div className="text-right">
                        <Button
                            htmlType="button"
                            icon={<PlusOutlined />}
                        />
                        <Button type="primary" className="ml-4">Lưu</Button>
                    </div>
                </Col>
                <Col lg={12}>
                    {/* <div style={{ height: 62 * countNodes }}>
                        <SortableTree
                            // treeData={categoryTree}
                            // onChange={this.onTreeChange}
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
                    </div> */}
                </Col>
                <Col lg={12}>
                    {attrArr}
                </Col>
            </Row>
        );
    }
}

export default GroupAttributeTab;