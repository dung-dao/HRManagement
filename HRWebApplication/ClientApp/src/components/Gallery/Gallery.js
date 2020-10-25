import React, { Component } from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import {
    LeftCircleOutlined, RightCircleOutlined
} from '@ant-design/icons';
import { Button } from 'antd';

const GalleryStyle = styled.div`
    .original-img img {
        max-height: 60vh !important;
    }
`;

class Gallery extends Component {

    state = {
        showFullscreenButton: false
    }

    renderLeftNav(onClick, disabled) {
        return (
            <Button
                type="link"
                disabled={disabled}
                style={{
                    left: 0,
                    padding: '50px 10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 4,
                    position: 'absolute'
                }}
                onClick={onClick}
                icon={<LeftCircleOutlined
                    style={{
                        position: 'relative',
                        top: -10,
                        left: -5,
                        fontSize: 20
                    }}
                />}
            />
        )
    }

    renderRightNav(onClick, disabled) {
        return (
            <Button
                type="link"
                disabled={disabled}
                style={{
                    right: 0,
                    padding: '50px 10px',
                    top: '50%',
                    position: 'absolute',
                    zIndex: 4,
                    transform: 'translateY(-50%)'
                }}
                onClick={onClick}
                icon={<RightCircleOutlined
                    style={{
                        position: 'relative',
                        top: -10,
                        left: -5,
                        fontSize: 20
                    }}
                />}
            />
        )
    }

    onBeforeSlide = (nextIndex) => {
        const { items } = this.props;
        if (!items[nextIndex].isVideo) {
            this.stopVideo();
            // this.setState({ 
            //     showFullscreenButton: true
            // })
        } else {
            // this.setState({ 
            //     showFullscreenButton: false
            // })
        }
    }

    stopVideo = () => {
        var video = document.getElementById("video-player");
        if (video && !video.paused) {
            video.pause();
        }
    }

    renderVideo = (item) => {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <video
                    width="100%"
                    controls
                    id="video-player"
                >
                    <source src={item.videoUrl} type="video/mp4" />
                </video>
            </div>
        )
    }

    render() {
        const { showFullscreenButton } = this.state;
        const { items } = this.props;
        items.forEach(i => {
            if (i.isVideo) {
                i.renderItem = () => this.renderVideo(i)
            }
        });
        return (
            <GalleryStyle>
                <ImageGallery
                    // ref={i => this._imageGallery = i}
                    showPlayButton={false}
                    thumbnailPosition="left"
                    disableKeyDown={true}
                    renderLeftNav={this.renderLeftNav}
                    renderRightNav={this.renderRightNav}
                    onBeforeSlide={this.onBeforeSlide}
                    onErrorImageURL="image src error"
                    showFullscreenButton={showFullscreenButton}
                    items={items}
                />
            </GalleryStyle>
        );
    }
}

export default Gallery;