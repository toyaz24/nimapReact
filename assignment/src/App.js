import logo from './logo.svg';
import './App.css';
import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import AddStoreComponent from './components/addStore';
import TaskComponent from './components/task';
import LoginComponent from './components/login';
import UserPage from './components/user';
import AddMedicine from './components/AddMedicine'
import Home from './components/home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {LoginComponent}></Route>
                          <Route path = "/home" component = {Home}></Route>
                          <Route path = "/task" exact component = {TaskComponent}></Route>
                          {/* <Route path = "/add-store/:id" component = {AddStoreComponent}></Route>
                          <Route path = "/add-medicine/:id" component = {AddMedicine}></Route> */}
                          <Route path = "/user/:id" component = {UserPage}></Route>
                    </Switch>
                </div>
              {/* <FooterComponent /> */}
        </Router>
        <ToastContainer />

    </div>
  );
}

export default App;
