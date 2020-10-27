import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import * as Constant from '../../common/Constant';

const externalNodeSpec = {
    beginDrag: componentProps => ({ node: { ...componentProps.node } }),
};
const externalNodeCollect = (connect) => ({
    connectDragSource: connect.dragSource(),
});
class ExternalNodeBaseComponent extends Component {
    render() {
        const { connectDragSource, node } = this.props;

        return connectDragSource(
            <div
                style={{
                    display: 'inline-block',
                    padding: '3px 5px',
                    marginLeft: 1.5,
                    marginRight: 1.5,
                    background: Constant.THEME_COLOR,
                    borderRadius: 5,
                    color: 'white',
                }}
            >
                {node.name}
            </div>,
            { dropEffect: 'copy' }
        );
    }
}

ExternalNodeBaseComponent.propTypes = {
    node: PropTypes.shape({ title: PropTypes.string }).isRequired,
    connectDragSource: PropTypes.func.isRequired,
};

export const externalNodeType = 'yourNodeType';
export const ExternalNodeComponent = DragSource(
    externalNodeType,
    externalNodeSpec,
    externalNodeCollect
)(ExternalNodeBaseComponent);