import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';

import { connect } from 'react-redux';

import { 
    edit_HTML, edit_HTML_data, delete_item, edit_layout
} from '../../actions/edit_actions';

class Edit_HTML extends Component 
{
    constructor(props)
    {
        super(props);

        if(this.props.is_layout_edit)
        {
            this.props.edit_layout();
        }

        let x;
        const selectedItemArray = this.props.items.map( item => {
            if(item.id === this.props.data.layout_id)
            {
                if(this.props.data.position === 'left')
                {
                    x = item.left.find( component => {
                        return component.id === this.props.data.id
                    });
                    return x;
                }
                else if(this.props.data.position === 'right')
                {
                    x = item.right.find( component => {
                        return component.id === this.props.data.id
                    });
                    return x;
                }
                else if(this.props.data.position === 'center')
                {
                    x = item.center.find( component => {
                        return component.id === this.props.data.id
                    });
                    return x;
                }
            }
        });

        const selectedItem = selectedItemArray.find( item => {
            return item
        });

        const data = selectedItem.html;

        this.state={
            data
        }
    }

    deleteElement = () =>
    {
        const { id, layout_id, position } = this.props.data;
        
        this.props.delete_item(id,layout_id,position);
        this.props.update();
        this.props.edit_HTML();
    }

    onInputChange = (event) => 
    {
        const { id, layout_id, position } = this.props.data;

        this.setState({
            data: event.target.value
        },
        () => {
            this.props.edit_HTML_data(
                id,
                this.state.data,
                layout_id,
                position
            );
            this.props.update();
        }
        );
    }

    render() 
    {
        return (
            <div>
                
                <div className="btn_container" >
                    <Button color="primary" 
                        onClick={ () => this.props.edit_HTML() }
                    >DONE</Button>
                    <Button color="danger" 
                        onClick={ () => this.deleteElement() }
                    >DELETE</Button>
                </div>

                <div className="editor" >
                    <Input type="textarea" 
                        style={{height: 400}}
                        value={this.state.data} 
                        onChange = { (event) => this.onInputChange(event) }
                    />
                </div>

            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        data: state.html_edit,
        items: state.items,
        is_layout_edit: state.layout_edit.val
    }
}

export default connect(mapStateToProps, {
    edit_HTML,
    edit_HTML_data,
    delete_item,
    edit_layout
})(Edit_HTML);