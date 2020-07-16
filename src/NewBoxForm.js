import React, {Component} from 'react';
import './NewBoxForm.css';

class NewBoxForm extends Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.createBox(this.state.value);
        this.setState({value: ""})
    }
    render(){
        return(
            <div className="NewBoxForm">               
                <form onSubmit={this.handleSubmit}>
                    <p className="NewBoxForm-title">New Todo</p>
                    <div className="NewBoxForm-form">
                        <input
                            value={this.state.value}
                            placeholder="  New Todo"
                            name="value"
                            type="text"
                            onChange={this.handleChange}
                        ></input>
                        <button onClick={this.handleSubmit} type="button" className="btn btn-outline-light">ADD TODO</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewBoxForm;