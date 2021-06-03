import React, { Component } from 'react'
// import StoreService from '../services/storeService'
// import { toast } from 'react-toastify';

class homeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                dropDownArray: [{
                    id: 1,
                    name: 'Dropdown',
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }, {
                    id: 2,
                    name: 'Content 2',
                    content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
                }, {
                    id: 3,
                    name: 'Content 3',
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                }],
                dropdown:1,
                content: ""
        }
        // this.addStore = this.addStore.bind(this);
        // this.editStore = this.editStore.bind(this);
        // this.deleteStore = this.deleteStore.bind(this);
    }

    changeHandler= (event) => {
        const content = this.state.dropDownArray.find(item => item.id == event.target.value)
        this.setState({content: content.content})
        this.setState({dropdown: content.name})
    }

    render(){
        return(
            <>
            <div className="row">
                <div className="col-5" className = "form-group">
                    
                    { <select className="form-control w-25" name="dropdown" onChange={this.changeHandler} value={this.state.dropdown}>{this.state.dropdown}
                        {
                            this.state.dropDownArray.map(
                                (i, key) => {
                                    return <option key={key} value={i.id}>{i.name}</option>
                                }
                            )
                        }
                        </select> }
                </div>
                <div className="pt-4">
                    <span>
                       {this.state.content}
                    </span>
                </div>
            </div>                                        
            </>
        )
    }
}

export default homeComponent;