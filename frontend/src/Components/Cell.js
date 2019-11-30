import React, { Component } from 'react'
import { graphql, Mutation } from 'react-apollo'
import { updateRecord } from '../Queries/query'
import { get } from 'http';

let colors = ["lightgray", "pink", "lime"]
let getColor = (val) => {
    return colors[val];
}

class Cell extends Component {
    constructor(props) {
        super(props);

        let status = this.props.info.status
        this.state = {
            info: this.props.info,
            status: this.props.info.status,
            color: { background: colors[status] },
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // console.log(e.target)
        e.preventDefault();
        //console.log((this.state.status + 1) % 3)
        let x = ((this.state.status + 1) % 3)
        this.setState({ status: x })
        this.setState({ color: { background: getColor(x) } })
        //console.log(`${this.state.status} is ${this.state.color}`)
        console.log(this.state.info)

        let info = this.state.info


        console.log(this.props)
        this.props.updateRecord({
            variables: {
                year: info.year,
                month: info.month,
                date: info.date,
                status: (x).toString(),
                journalID: info.journalID
            }
            //NOTE: after adding this we want to tell apollo to reefatch queries
            //refetchQueries: [{query: getBooksQuery}]
        })
    }

    render() {
        return (<div style={this.state.color} className="Cell" onClick={this.handleClick}>{this.state.status}</div>)
    }
}
export default graphql(updateRecord, { name: "updateRecord" })(Cell);