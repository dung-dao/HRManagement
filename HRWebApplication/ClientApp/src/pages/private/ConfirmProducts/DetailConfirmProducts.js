import React, { Component } from 'react';
import AppBody from './../../../components/Layouts/AppBody';
import * as Constant from '../../../common/Constant';
import {
    Row, Col, Collapse, List, Card, Divider, Modal, Button, Tooltip,
    Dropdown, Menu, Spin, Result, Space, Typography, message, Input
} from 'antd';
import {
    CaretRightOutlined, CaretDownOutlined, CheckCircleTwoTone,
    CheckCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import * as Utils from '../../../common/Utils';
import Gallery from '../../../components/Gallery/Gallery';
import ApprovalProcessService from './../../../services/ApprovalProcessService';

const StatusText = styled.span`
    margin: 0 0.2em;
    padding: 0.2em 0.4em 0.1em;
    font-size: 100%;
    background: #b3ecff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
`;

class DetailConfirmProducts extends Component {

    approvalProcessService = new ApprovalProcessService();

    state = {
        openItemModal: false,
        openRejectedModal: false,
        requestData: {},
        productItems: [],
        error: {
            isError: false,
            message: ""
        },
        itemIndex: 0,
        loading: true,
        rejectionReason: ""
    }

    componentWillUnmount() {
        this.approvalProcessService.cancel();
        this.approvalProcessService = undefined;
    }

    convertData = (productItems) => {
        for (var i = 0; i < productItems.length; i++) {
            let images = [];
            images.push({
                original: productItems[i].thumbnail,
                thumbnail: productItems[i].thumbnail,
                description: 'main',
                originalClass: 'original-img',
                isVideo: false
            })
            productItems[i].images.forEach(j => {
                images.push({
                    original: j,
                    thumbnail: j,
                    originalClass: 'original-img',
                    isVideo: false
                })
            })
            productItems[i].videos.forEach(j => {
                images.push({
                    videoUrl: j,
                    thumbnail: 'http://localhost:3002/images/video-icon.svg',
                    originalClass: 'original-img',
                    isVideo: true
                })
            })
            productItems[i].images = images;


            productItems[i].title = <Tooltip placement="top" title={productItems[i].sellerSku}>
                <span className="float-left truncate" style={{ width: '80%' }}>{productItems[i].sellerSku}</span>
            </Tooltip>
            delete productItems[i].thumbnail;
            delete productItems[i].videos;
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.approvalProcessService.getRequest(id)
            .then(response => {
                if (response.data.code === Constant.AT_RESPONSE_CODE.S100) {
                    let productItems = JSON.parse(response.data.data.payload).products;
                    let requestData = response.data.data;
                    requestData.payload = JSON.parse(response.data.data.payload);
                    delete requestData.payload.products;
                    this.convertData(productItems);
                    this.setState({
                        productItems, requestData,
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false,
                        error: {
                            isError: true,
                            message: response.data.message
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loading: false,
                    error: {
                        isError: true,
                        message: "Không tìm thấy sản phẩm!"
                    }
                })
            })
    }

    clickItem = (index, item) => {
        this.setState({
            itemIndex: index
        });
        setTimeout(() => this.setState({
            openItemModal: true
        }), 200);
    }

    onUpdate = (id, body) => {
        this.approvalProcessService.confirmRequest(id, body)
            .then(response => {
                if (response.data.code === Constant.AT_RESPONSE_CODE.S101) {
                    message.success(response.data.message, 2.5);
                    let { requestData } = this.state;
                    if (body.status === Constant.STATUS_REQUEST.APPROVED) {
                        requestData.statusId = Constant.STATUS_REQUEST.APPROVED;
                        requestData.status = 'Chấp nhận';
                    } else if (body.status === Constant.STATUS_REQUEST.REJECTED) {
                        requestData.statusId = Constant.STATUS_REQUEST.REJECTED;
                        requestData.status = 'Từ chối';
                    }
                    this.setState({
                        requestData
                    })
                } else {
                    message.error(response.data.message, 2.5);
                }
            })
            .catch(error => {
                console.error(error);
                message.error(Constant.FAILED_MESSAGE, 2.5);
            })
    }

    onClickMenuStatus = ({ key }) => {
        let id = this.props.match.params.id;
        if (key === "2") {
            Modal.confirm({
                title: 'Xác nhận',
                icon: <CheckCircleOutlined />,
                content: 'Bạn có chắc muốn cập nhật?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                okType: 'primary',
                onOk: () => this.onUpdate(id, { status: Constant.STATUS_REQUEST.APPROVED }),
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            this.setState({
                openRejectedModal: true
            })
        }
    }

    onCheck = () => {
        const { itemIndex, productItems } = this.state;
        if (!productItems[itemIndex].confirmed) {
            productItems[itemIndex].title = <div>
                <Tooltip
                    placement="top"
                    title={productItems[itemIndex].sellerSku}
                >
                    <span className="float-left truncate" style={{ width: '80%' }}>
                        {productItems[itemIndex].sellerSku}
                    </span>
                </Tooltip>
                <span className="float-right">
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                </span>
            </div>
            productItems[itemIndex].confirmed = true;
            this.setState({
                productItems,
                openItemModal: false
            })
        } else {
            this.setState({
                openItemModal: false
            })
        }
        this._gallery.stopVideo();
    }

    onReject = () => {
        let id = this.props.match.params.id;
        const { rejectionReason } = this.state;
        this.onUpdate(id, { status: Constant.STATUS_REQUEST.REJECTED, rejectionReason: rejectionReason });
    }

    renderItem = (item, index) => {
        return <List.Item onClick={() => this.clickItem(index, item)}>
            <Card
                cover={<img alt="error" src={item.images[0].thumbnail} />}
                hoverable
                title={item.title}
            >
                <span className="font-bold mr-1">Số lượng:</span>
                <span>{item.stock}</span>
            </Card>
        </List.Item>
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
      const {
        openItemModal,
        productItems,
        itemIndex,
        openRejectedModal,
        requestData,
        loading,
        error,
        rejectionReason,
      } = this.state;
      if (loading) {
        return (
          <AppBody selectedMenu={Constant.MENU.CONFIRM_PRODUCTs_MENU} title="Sản phẩm">
            <div className="text-center" style={{ height: '80vh' }}>
              <Spin
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  marginTop: 'calc(80vh/2 - 50px)',
                }}
              />
            </div>
          </AppBody>
        );
      }
      if (error.isError) {
        return (
          <AppBody selectedMenu={Constant.MENU.CONFIRM_PRODUCTs_MENU} title="Sản phẩm">
            <div className="text-center" style={{ height: '80vh' }}>
              <Result status="404" title={error.message} />
            </div>
          </AppBody>
        );
      }
      const menu = (
        <Menu onClick={this.onClickMenuStatus}>
          <Menu.Item key={Constant.STATUS_REQUEST.APPROVED}>Chấp nhận</Menu.Item>
          <Menu.Item key={Constant.STATUS_REQUEST.REJECTED}>Từ chối</Menu.Item>
        </Menu>
      );
      const { images, sellerSku } = productItems[itemIndex];
      const { id, payload, brand } = requestData;
      const description = (payload.description); //        const description = parse(payload.description);
      const attributes = productItems[itemIndex].attributes.map((i) => (
        <Space>
          <Typography.Text
            code
            style={{ fontSize: 16 }}
          >{`${i.attributeName}: ${i.value}`}</Typography.Text>
        </Space>
      ));
      return (
        <AppBody selectedMenu={Constant.MENU.CONFIRM_PRODUCTs_MENU} title="Sản phẩm">
          <Row gutter={16} className="mb-2">
            <Col lg={12} className="mb-1">
              <span className="mr-1">{requestData.createdAt}</span>
              <Divider type="vertical" />
              <span>{requestData.eventType}</span>
              <Divider type="vertical" />
              <StatusText>{requestData.status}</StatusText>
            </Col>
            <Col lg={12}>
              {(requestData.statusId === Constant.STATUS_REQUEST.PENDING ||
                requestData.statusId === Constant.STATUS_REQUEST.NEW) && (
                <div className="text-right">
                  <Dropdown overlay={menu}>
                    <Button type="default" htmlType="button">
                      Cập nhật <CaretDownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              )}
            </Col>
            <Col span={24}>
              {requestData.rejectionReason && (
                <>
                  <span className="font-bold mr-1">Lý do từ chối:</span>
                  <span>{requestData.rejectionReason}</span>
                </>
              )}
            </Col>
          </Row>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="mb-2"
          >
            <Collapse.Panel header={`Thông tin sản phẩm | ${id}`} key="1">
              <Row gutter={16}>
                <Col lg={12}>
                  <p className="font-bold"> Tên sản phẩm</p>
                  <p>{payload.productName}</p>
                </Col>
                <Col lg={12}>
                  <p className="mr-2 font-bold">Thương hiệu:</p>
                  <p>{brand}</p>
                  <p className="font-bold">Danh mục</p>
                  <p>{payload.categoryPath}</p>
                </Col>
                <Divider />
                <Col span={24}>
                  <p className="font-bold">Mô tả</p>
                  {description}
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
            }}
            pagination={{
              pageSize: 8,
            }}
            dataSource={productItems}
            renderItem={this.renderItem}
          />
          <Modal
            title={`Chi tiết sản phẩm | ${sellerSku}`}
            style={{ top: 20 }}
            visible={openItemModal}
            width={1300}
            okText="Duyệt"
            cancelText="Hủy"
            onOk={this.onCheck}
            onCancel={() => this.setState({ openItemModal: false }, this._gallery.stopVideo())}
          >
            <Row gutter={16}>
              <Col md={14} lg={14} className="text-center">
                <Gallery items={images} ref={(i) => (this._gallery = i)} />
              </Col>
              <Col md={14} lg={10}>
                <Row gutter={8}>
                  <Col lg={12}>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Giá bán</span>
                      <span>{Utils.formatMoney(productItems[itemIndex].salePrice)}</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Giá niêm yết</span>
                      <span>{Utils.formatMoney(productItems[itemIndex].listingPrice)}</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Kích thước:</span>
                      <Tooltip placement="top" title={'Dài x Rộng x Cao'}>
                        <span>
                          {`${productItems[itemIndex].length}x${productItems[itemIndex].width}x${productItems[itemIndex].height}`}
                          cm
                        </span>
                      </Tooltip>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Khối lượng:</span>
                      <span>{productItems[itemIndex].weight} g</span>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Chính sách đổi trả:</span>
                      <span>{productItems[itemIndex].exchangePeriod} ngày</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Chính sách trả hàng:</span>
                      <span>{productItems[itemIndex].returnPeriod} ngày</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Chính sách bảo hành:</span>
                      <span>{productItems[itemIndex].warrantyPeriod} ngày</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold mr-1">Số lượng:</span>
                      <span>{productItems[itemIndex].stock}</span>
                    </div>
                  </Col>
                  <Col span={24} className="mt-2">
                    <div className="mb-1">
                      <span className="font-bold mr-1">Chính sách khác:</span>
                      <div>{productItems[itemIndex].policy}</div>
                    </div>
                  </Col>
                  <Col span={24} className="mt-2">
                    <div className="mb-1">
                      <span className="font-bold mr-1">Thuộc tính:</span>
                      <div>{attributes}</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal>
          <Modal
            title="Từ chối"
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

export default DetailConfirmProducts;