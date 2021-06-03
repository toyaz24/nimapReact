import React, { Component } from 'react';
import AuthService from '../services/authService'
import { toast } from 'react-toastify';
import { Route, Router, withRouter } from 'react-router-dom'

class UserComponent extends Component {
    constructor(props){
        super(props)
        this.state = { 
            id: this.props.match.params.id,
             username:'',
             password:'',
             showSaveButton: false,
              errors: {}};
        this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      // Form submitting logic, prevent default page refresh 
      login(event){
        // const { username, password, errors} = this.state
        event.preventDefault();
        if(!this.handleValidation()){
            console.log('Form has error')
        }else{
          const userData =  JSON.parse(localStorage.getItem("user"));
        //   const userDetail = userData.find(item => item.user == this.state.username);
          if (userData.username != this.state.username) {
            console.log('User Not Found')
          }
          if (userData.password != this.state.password) {
            console.log('Invalid Credential');
          }
          localStorage.setItem('token', 'res.data.token');
          window.open('http://localhost:3000/home', '_self')
        }

      }

      logOut() {
          localStorage.removeItem("token");
        //   window.open('http://localhost:3000/', '_self')
        // AuthService.logout();
        console.log(this)
        this.props.history.push('/');
      }

      handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["username"]){
          formIsValid = false;
          errors["username"] = "Cannot be empty";
        }

        if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "Cannot be empty";
        }
        console.log(fields["username"] , fields["password"], formIsValid)
        this.setState({errors: errors});
        return formIsValid;
      }
      
      // Method causes to store all the values of the 
      // input field in react state single method handle 
      // input changes of all the input field using ES6 
      // javascript feature computed property names
      handleChange(event){
        this.setState({
          [event.target.name] : event.target.value
        })
      }

      componentDidMount(){ 
        console.log(this.props.match.params, this.state.id)
          const userData = JSON.parse(localStorage.getItem('user'));
          // console.log(typeof userData, ' ', userData,  ' ',userData.username)
          // console.log('dffffffff','username')
          this.setState({username: userData.username, password: userData.password})
      }

      changePassword(event) {
          event.preventDefault();
          this.setState({password: "", showSaveButton: true});
      }

      savePassword(event) {
        event.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        localStorage.setItem('user', JSON.stringify(userData));
        this.setState({password: "", showSaveButton: false});
      }

      render(){
        return(
          <form className="mt-5 pt-5 text-center form-border" onSubmit={this.handleSubmit}>
            <div className="row pb-3">
              <div className ="col-4">
              <label htmlFor='username'>Username</label>
              </div>
              <div className="col-auto">
              <input 
                name='username'
                placeholder='Username' 
                value = {this.state.username}
                onChange={this.handleChange}
              />
              {console.log(this.state.username)}
              <span style={{color: "red"}}>{this.state.errors["username"]}</span>
              </div>

            </div>
            
            <div className="row pb-3">
              <div className ="col-4">
                <label htmlFor='password'>Password</label>

              </div>
              <div className="col-auto">
                <input
                type ='password'
                name='password' 
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                </div>
              </div>
            { this.state.id != 'view' ? (
                <div className="w-75 ml-4 pl-5 pb-4">
                <button onClick= {this.login}>Login</button>
                </div>
            ) : <div className="row">
                <div className="col-auto pb-4 offset-4">
                    {
                        this.state.showSaveButton ? (
                            <button onClick= {(event) =>this.savePassword(event)}>Save Password</button>
                        ) : <button onClick= {(event) => this.changePassword(event)}>Change Password</button>
                    }
                    </div>

                    <div className="col-1 pb-4">

                    
                    <button onClick={() =>this.logOut()}>Logout</button>
                    </div>
                </div>}
            
          </form>
        )}
    }

    export default  withRouter(UserComponent);