import React from 'react';
import AuthService from '../services/authService'
import { toast } from 'react-toastify';


class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = { username:'',password:'', errors: {}};
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      // Form submitting logic, prevent default page refresh 
      handleSubmit(event){
        // const { username, password, errors} = this.state
        event.preventDefault();
        if(!this.handleValidation()){
            console.log('Form has error')
        }else{
          const userData =  JSON.parse(localStorage.getItem("user"));
          // const userDetail = userData.find(item => item.user == this.state.username);
          if (userData.username != this.state.username) {
            let errors = {};
            errors["username"] = "User Not Found";
            console.log('User Not Found');
            this.setState({errors: errors})
            return;
          }
          if (userData.password != this.state.password) {
            let errors = {};
            errors["password"] = "Invalid Credential";
            console.log('Invalid Credential');
            this.setState({errors: errors})
            return;
          }
          localStorage.setItem('token', 'res.data.token');
          window.open('http://localhost:3000/home', '_self')
        }

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

      componentDidMount() {
        let defUser = {
          username: "toyaz",
          password: "12345"
        }
        localStorage.setItem("user", JSON.stringify(defUser));

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
            
            <div className="w-75 ml-4 pl-5 pb-4">
              <button type='submit'>Login</button>
            </div>
          </form>
        )}
    }

    export default LoginForm;