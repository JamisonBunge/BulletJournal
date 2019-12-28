import React, { Component } from 'react'
import { graphql, Mutation } from 'react-apollo'
import { updateRecord } from '../Queries/query'
import { get } from 'http';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this.handleClick)
    }
    handleClick(e) {
        // e.preventDefault();
    }

    render() {
        return (
            <div className="login-main">
                <form>
                    <h1>Untitled Tracker</h1>
                    <label>Email</label><br />
                    <input type="text" name="email" /><br />
                    <label>Password</label><br />
                    <input type="password" name="password" /><br />
                    <button type="submit" onClick={this.handleClick}>LOGIN</button>
                    <a href="/signup" ><p>New user? Sign Up</p></a>
                    {/* <Router><Link to="/signup"><p>New user? Sign Up</p></Link>
                        <Switch><Route path="/signup"></Route></Switch>
                    </Router> */}
                    {/* <a href="/signup" >asf</a> */}

                </form>
            </div>
        )
    }
}
export default Login