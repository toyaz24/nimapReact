import React, { Component } from 'react'
import TaskService from '../services/taskService';
import { toast } from 'react-toastify';

class TaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            showHideTaskForm: false,
            title: "",
            completed: true,
            errors: {},
            currentId: 0
        };
        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent() {
        this.setState({ showHideTaskForm: !this.state.showHideTaskForm });
    }        

    deleteTask(id){
       const spliceId = this.state.tasks.findIndex(item => item.id = id);
       this.state.tasks.splice(spliceId,1);   
       this.setState({tasks: this.state.tasks})
    }

    componentDidMount(){
        TaskService.getTask().then((res) => {
            console.log(res);
            this.setState({ tasks: res.data});
            this.setState({currentId: res.data.length})
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["title"]){
          formIsValid = false;
          errors["title"] = "Cannot be empty";
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    saveTask = () => {
        if (!this.handleValidation()){
            console.log('Form has error')
        } else {
            const newTask = {
                userId: 1,
                id: this.state.currentId + 1,
                title: this.state.title,
                completed: this.state.completed == 'true' ||  this.state.completed == true ? true : false
            }
            this.setState({currentId: ++this.state.currentId})
            this.state.tasks.splice(0, 0, newTask);
            this.setState({tasks: this.state.tasks});
            this.hideComponent();
        }
    }

    render() {
        return (
            <div>
                 <h2 className="text-center"></h2>
                 <div className = "pb-3 w-25">
                    <button className="btn btn-primary" onClick={this.hideComponent}> Add Task</button>
                 </div>
                 {this.state.showHideTaskForm && (
                    <>
                    <div className="w-50 p-2 form-border">
                    <div>
                        <label> Title: </label>
                        <input placeholder="Title" name="title" className="form-control" 
                            value={this.state.title} onChange={this.changeHandler}/>
                            <span style={{color: "red"}}>{this.state.errors["title"]}</span>
                    </div>
                    <div className="row">
                        <div className = "form-group col-7">
                            <label> completed: </label>
                            <br />
                                <input type="radio" value="true" checked name="completed" onChange={this.changeHandler}/> True
                                <input type="radio" value="false" name="completed" onChange={this.changeHandler}/> False
                        </div>
                        <div className="col-5 pt-4 mt-2">
                        <button type="submit" className="btn btn-success" onClick={this.saveTask}>Save</button>
                        {console.log(this.state.tasks.length)}
                        </div>
                    </div> 
                    </div>      
                    </>
                    
                )}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <tbody>
                                {
                                    this.state.tasks.map(
                                        i => 
                                        <tr key = {i.id}>
                                            
                                             <td> {i.id} </td>   
                                             <td> {i.title}</td>
                                             <td> {i.completed ? 'True': 'False'}</td> 
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTask(i.id)} className="btn btn-danger">Delete </button>
                                             </td>                                           
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default TaskComponent
