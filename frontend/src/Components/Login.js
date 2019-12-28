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
    }
    render() {
        return (
            <div className="login-main">
                <label>Email</label>
                <input type="text" name="email" value="email@email.mail" />

            </div>
        )
    }
}
export default Login