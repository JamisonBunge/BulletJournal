import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost';
import './index.css';
import Collection from './Components/Collection'


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

    componentDidMount() {
        let blackOut = ['row-31-col-4', 'row-31-col-6', 'row-31-col-9', 'row-31-col-11', 'row-30-col-2', 'row-31-col-2'];
        let year = this.state.year;
        if (!(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)) blackOut.push('row-29-col-2');

        for (let day of blackOut) {
            let cell = document.getElementById(day);
            cell.classList.add("black");
            console.log(cell);
            console.log(this.state);
        }
    }

    render() {

        return (
            <ApolloProvider client={client}>
                <div className="App" >
                    <button type="input" onClick={setValue}>######################</button>
                    <Collection />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
