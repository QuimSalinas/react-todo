import React, {Component} from 'react';
import './BoxList.css';
import { v4 as uuidv4 } from 'uuid';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

class BoxList extends Component{
    constructor(props){
        super(props);
        this.state={
            Boxes: [{value: "React is awsome", id: uuidv4(), editting: false, done: false},
                    {value: "Me too", id: uuidv4(), editting: false, done: false}
            ],
        }
        this.createBox=this.createBox.bind(this);
        this.modifyBox=this.modifyBox.bind(this);
        this.cancelEditting=this.cancelEditting.bind(this);
        this.editBox=this.editBox.bind(this);
        this.deleteBox=this.deleteBox.bind(this);
        this.boxClicked=this.boxClicked.bind(this);
    }
    createBox(value){
        if(value!==""){
            this.setState({
                Boxes : [...this.state.Boxes, {value: value, id: uuidv4(), editting: false, done: false}]
            })
        }
    }
    cancelEditting(){
        this.setState({
            Boxes: this.state.Boxes.map(box => {
                box.editting=false;
                return box;
            })
        })
    }
    editBox(id){
        this.setState({
            Boxes: this.state.Boxes.map(box =>{
                if(box.id===id){
                    box.editting=true;
                } else box.editting=false;
                return box;
            })
        })
    }
    deleteBox(id){
        this.setState({
            Boxes: this.state.Boxes.filter(box => box.id!==id)
        })
    }
    modifyBox(newValue){
        if(newValue.value==="") this.deleteBox(newValue.id);
        else{
            this.setState({
            Boxes: this.state.Boxes.map(box =>{
                box.editting=false;
                if(box.id===newValue.id){
                    box.value=newValue.value;
                }
                return box;
            })
        })
        }
    }
    boxClicked(id){
        this.setState({
            Boxes: this.state.Boxes.map(box => {
                if(box.id===id){
                    box.done = !box.done;
                }
                return box;
            })
        })
    }
    componentDidMount(){
        let localStorageData = JSON.parse(localStorage.getItem('State'));
        if(localStorageData){
            this.setState(()=> JSON.parse(localStorage.getItem('State')))
        }
    }
    componentDidUpdate(){
        localStorage.setItem('State', JSON.stringify(this.state));
    }
    render(){
        return(
            <div className="BoxList">
                <h1>Todo List!</h1>
                <p>A simple React todo list app</p>
                <hr></hr>
                <div className = "BoxList-List scrollbar scrollbar-primary" >
                    {this.state.Boxes.map(box => <Box   key={box.id}
                                                        value={box.value}
                                                        editting={box.editting} 
                                                        id={box.id} 
                                                        modifyBox={this.modifyBox} 
                                                        cancelEditting={this.cancelEditting} 
                                                        editBox={this.editBox}
                                                        boxClicked={this.boxClicked} 
                                                        done={box.done}
                                                        deleteBox={this.deleteBox}/>)
                    }                   
                </div>
                <NewBoxForm createBox={this.createBox}/>
            </div>
        )
    }
}

export default BoxList;