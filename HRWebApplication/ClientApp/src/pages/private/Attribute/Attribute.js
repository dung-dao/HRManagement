import React, { Component } from 'react';
import AppBody from './../../../components/Layouts/AppBody';
import * as Constant from '../../../common/Constant';
import { Tabs } from 'antd';
import AttributeTab from './AttributeTab';
import GroupAttributeTab from './GroupAttributeTab';
const { TabPane } = Tabs;
class AttributePage extends Component {

    state = {
        attributes: []
    }

    componentDidMount() {

    }

    setAttributes = (attributes) => {
        this.setState({
            attributes
        })
    }

    render() {
        const { attributes } = this.state;
        return (
            <AppBody
                selectedMenu={Constant.MENU.ATTRIBUTE_MENU}
                title="Quản lý thuộc tính"
                openMenu={Constant.MENU.PARENT_CATEGORY_MENU}
            >
                <Tabs type="card">
                    <TabPane tab="Thuộc tính" key="1">
                        <AttributeTab
                            attributes={attributes}
                            setAttributes={this.setAttributes}
                        />
                    </TabPane>
                    <TabPane tab="Gom nhóm" key="2">
                        <GroupAttributeTab
                            attributes={attributes}
                            setAttributes={this.setAttributes}
                        />
                    </TabPane>
                </Tabs>
            </AppBody>
        );
    }
}

export default AttributePage;