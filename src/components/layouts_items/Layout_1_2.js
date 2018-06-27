import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragSource } from 'react-dnd';

import { addLayout } from '../../actions/index';

const spec = {
    beginDrag(props) 
    {
        console.log("BD");
        return {};
    },
    endDrag(props, monitor, component) 
    {
        if(monitor.didDrop())
        {
            console.log("ED");
            //console.log(monitor.getDropResult());

            //call a action 
            if(!monitor.getDropResult().layout_id)
            {
                props.addLayout(1);
            }
        }
        else
        {
            return;
        }
    }
}

function collect(connect, monitor)
{
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class Layout_1_2 extends Component {
    render() {
        const { connectDragSource, connectDragPreview, isDragging } = this.props;

        return connectDragSource(
            <div className="layout_items" >
                <div className="layout_inside_blocks_2" ></div>
                <div className="layout_inside_blocks_2" ></div>
            </div>
        );
    }
}

export default connect(null, { 
    addLayout 
})(DragSource('layout', spec, collect)(Layout_1_2));