import React, { Component } from 'react';
import {
    Layout, Row, Col, Menu, Space, Avatar, Dropdown, Button, Tooltip,
    List, Typography, Popover, Affix
} from 'antd';
import {
    // ShopOutlined,
    // DownOutlined,
    // BellOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const questions = [
    { content: 'Hướng dẫn xem báo cáo thống kê', url: 'https://google.com' },
    { content: 'Tạo phiếu gửi hàng cho số lượng sản phẩm ít', url: 'https://google.com' },
    { content: 'Tạo phiếu rút hàng', url: 'https://google.com' },
    { content: 'Đăng Bán Sản Phẩm Mới', url: 'https://google.com' },
    { content: 'Hướng Dẫn Tạo Coupon Và Tham Gia Các CTKM', url: 'https://google.com' },
    { content: 'Theo Dõi Thông Tin Sản Phẩm Đổi - Trả - Bảo Hành', url: 'https://google.com' },
    { content: 'Cập Nhật Danh Sách Sản Phẩm Hàng Loạt', url: 'https://google.com' },
    { content: 'Tổng Quan Hệ Thống Seller Center', url: 'https://google.com' },
]
const menu = (
    <Menu>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Thông tin cửa hàng</a>
        </Menu.Item>
        <Menu.Item key="2">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Cài đặt</a>
        </Menu.Item>
        <Menu.Item key="3">
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Đăng xuất</a>
        </Menu.Item>
    </Menu>
);

class AppHeader extends Component {

    render() {
        const supportTab = <List
            header={null}
            footer={<Typography.Text strong>Hotline hỗ trợ trực tuyến <a className='float-right' href="tel:+19001234">
                <PhoneOutlined />19001234</a>
            </Typography.Text>
            }
            dataSource={questions}
            renderItem={item => (
                <List.Item key={item.content}>
                    <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.content}</a>
                </List.Item>
            )}
        />
        return (
            <Affix offsetTop={0}>
                <Header style={{ background: '#fff', boxShadow: '0 0 10px gray' }}>
                    <Row>
                        <Col span={12}><h2>{this.props.title}</h2></Col>
                        <Col span={12} align='right'>
                            <Space size="middle">
                                {/* <Popover placement="bottom" content={supportTab} title="Câu hỏi thường gặp" trigger="click">
                                    <Button>Hỗ trợ</Button>
                                </Popover> */}
                                {/* <Tooltip title="Thông báo" placement='left'>
                                    <Button shape="circle" />
                                </Tooltip> */}
                                {/* <Dropdown overlay={menu}>
                                    <Space size="middle">
                                        <Avatar /> cac1
                                    </Space>
                                </Dropdown> */}
                            </Space>
                        </Col>
                    </Row>
                </Header>
            </Affix>
        );
    }
}

export default AppHeader;