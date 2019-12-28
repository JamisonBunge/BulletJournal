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


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this.handleClick)
    }
    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="signup-main">
                <form>
                    <h1>Untitled Tracker</h1>
                    <label>First Name</label><br />
                    <input type="text" name="firstName" /><br />
                    <label>Last Name</label><br />
                    <input type="text" name="lastName" /><br />
                    <label>Email</label><br />
                    <input type="text" name="email" /><br />
                    <label>Password</label><br />
                    <input type="password" name="password" /><br />
                    <button type="submit" onClick={this.handleClick}>SIGNUP</button>
                    <a href="/login" ><p>Have an account? Log in!</p></a>
                </form>
            </div>
        )
    }
}
export default SignUp