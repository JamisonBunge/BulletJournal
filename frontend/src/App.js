import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './index.css';
import Wrapper from './Components/Wrapper'
import Login from './Components/Login'
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const link = new HttpLink({
    uri: 'http://localhost:5001/graphql',
});

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});


function setValue() {
    let cell = document.getElementById('row-3-col-1');
    console.log(cell)
    cell.classList.add("black")
}

class App extends Component {

    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            "year": date.getFullYear(),
            "date": date
        }
    }

    render() {

        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="App" >
                        <Link to="/dash"></Link>
                        <Link to="/login"></Link>
                        <Switch>
                            <Route path="/dash">
                                <Wrapper />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
