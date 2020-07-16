import React, {Component} from 'react';
import './Box.css';

class Box extends Component{
    constructor(props){
        super(props);
        this.state={
            newValue:this.props.value,
            deleting: false
        }
        this.box = React.createRef();
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.cancelEditting=this.cancelEditting.bind(this);
        this.editBox=this.editBox.bind(this);
        this.deleteBox=this.deleteBox.bind(this);
        this.boxClicked=this.boxClicked.bind(this);
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.modifyBox({id: this.props.id, value: this.state.newValue});
    }
    cancelEditting(){
        this.props.cancelEditting();
    }
    editBox(){
        this.props.editBox(this.props.id);
    }
    deleteBox(){
       this.setState({
           deleting: true
       });
        setTimeout(function(){this.props.deleteBox(this.props.id)}.bind(this),450);
    }
    boxClicked(){
        this.props.boxClicked(this.props.id);
    }
    render(){
        return(
            <div ref={this.box} className={this.state.deleting ?"Box Box-delete":"Box"}>
                {this.props.editting
                    ?   <div className="Box-editting">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text-area"
                                    name="newValue"
                                    value={this.state.newValue}
                                    onChange={this.handleChange}
                                >
                                </input>
                                <i onClick={this.handleSubmit} className="fas fa-check"></i>
                                <i onClick={this.cancelEditting} className="fas fa-times"></i>
                            </form>
                        </div>
                    :   <div className="Box-notEditting">
                            <div onClick={this.boxClicked} className="Box-notEditting-text">
                                <p className={this.props.done?"Box-done":""}>{this.props.value}</p>
                            </div>
                            <div>
                                <i onClick={this.editBox} className="fas fa-pencil-alt"></i>
                                <i onClick={this.deleteBox} className="fas fa-trash"></i>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Box;