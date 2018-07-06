import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';

import { connect } from 'react-redux';

import { 
    edit_h1, edit_h1_data, delete_item, edit_layout, duplicate_item
} from '../../actions/edit_actions';

import StyleEditor from '../styles_component/styles_text';

class Edit_h1 extends Component 
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

        const data = selectedItem.data;

        this.state={
            data
        }
    }

    deleteElement = () =>
    {
        const { id, layout_id, position } = this.props.data;
        
        this.props.delete_item(id,layout_id,position);
        this.props.update();
        this.props.edit_h1();
    }

    onInputChange = (event) => 
    {
        const { id, layout_id, position } = this.props.data;

        this.setState({
            data: event.target.value
        },
        () => {
            this.props.edit_h1_data(
                id,
                this.state.data,
                layout_id,
                position
            );
            this.props.update();
        }
        );
    }

    onItemDuplicate = () =>
    {
        this.props.duplicate_item(
            this.props.data.id,
            this.props.data.layout_id,
            this.props.data.position
        );
        this.props.update();
    }

    render() 
    {
        return (
            <div>

                <div className="col-md-12 mt-3 btnSection">
                   <div className="row">
                     <div className="col-sm-4">
                        <Button color="primary" 
                            onClick={ () => this.onItemDuplicate() } className="btn-sm btn-block"
                        >DUPLICATE</Button>
                     </div>
                      <div className="col-sm-4">
                        <Button color="success" 
                            onClick={ () => this.props.edit_h1() } className="btn-sm btn-block"
                        >DONE</Button>
                      </div>
                      <div className="col-sm-4">
                        <Button color="danger" 
                            onClick={ () => this.deleteElement() } className="btn-sm btn-block"
                        >DELETE</Button>
                      </div>
                    </div>
                </div>

                <div className="editor" >
                    <Input type="textarea" 
                        value={this.state.data} 
                        onChange = { (event) => this.onInputChange(event) }
                    />
                </div>

                <div>
                    <StyleEditor 
                        id={this.props.data.id} 
                        layout_id={this.props.data.layout_id}
                        position={this.props.data.position}
                        update={this.props.update}
                    />
                </div>

                <br />
                <br />

            </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        data: state.h1_edit,
        items: state.items,
        is_layout_edit: state.layout_edit.val
    }
}

export default connect(mapStateToProps, {
    edit_h1,
    edit_h1_data,
    delete_item,
    edit_layout,
    duplicate_item
})(Edit_h1);
