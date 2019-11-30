import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost';
import './index.css';
import Wrapper from './Components/Wrapper'


const client = new ApolloClient({
    uri: 'http://localhost:5001/graphql', // Endpoint that we are making request queries to.
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
                <div className="App" >
                    {/* <button type="input" onClick={setValue}>######################</button> */}
                    <Wrapper />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
