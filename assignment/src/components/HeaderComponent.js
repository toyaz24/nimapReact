import React, { Component } from 'react'
// import  { Redirect,Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";

import AuthService from '../services/authService'

const HeaderComponent = ({ history }) => {
    
    const logout = () => {
        AuthService.logout().then( res => {
            localStorage.clear();
            this.forceUpdate()  
        })
    }

    const redirectFunc = (path) =>{
        let newPath = path == 'user' ? path + '/view' : path;
        history.push(`/${newPath}`);
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
                <div className= "row">
                    {localStorage.getItem("token")!= null ? 
                    <div className = "container">
                        <button style={{marginRight: "56px"}} onClick={() => redirectFunc('home')} className="navbar-brand pl-5 myBtn bg-secondary">LOGO</button>

                        <button style={{marginRight: "56px"}} onClick={() => redirectFunc('home')} className="navbar-brand pl-5 myBtn bg-secondary">Home</button>
                        <button style={{marginRight: "56px"}} onClick={() => redirectFunc('task')} className="navbar-brand pl-3 myBtn bg-secondary">Task</button>
                            <button onClick={() => redirectFunc('user')} className="navbar-brand pl-3 myBtn bg-secondary">User</button>
                    </div>
                    : null}
                </div>
                </nav>
            </header>
        </div>
    )
}

export default withRouter(HeaderComponent)
