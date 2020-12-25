import React, { Component } from 'react';
import { Result, Button } from 'antd';

class NotFoundPage extends Component {
    render() {
        console.log(this.props);
        return (
            <Result
                status="404"
                title="404"
                subTitle="Không tìm thấy trang"
                extra={<Button type="primary" onClick={() => this.props.history.goBack()}>Quay lại</Button>}
            />
        );
    }
}

export default NotFoundPage;