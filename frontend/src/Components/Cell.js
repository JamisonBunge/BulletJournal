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
        console.log('this should be happening')
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
        console.log('here')
        e.preventDefault();
        //console.log((this.state.status + 1) % 3)

        let x = ((this.state.status + 1) % 3)
        this.setState({ status: x })
        this.setState({ color: { background: getColor(x) } })
        //console.log(`${this.state.status} is ${this.state.color}`)
        console.log(this.state.info)

        let info = this.state.info
        console.log(this.props)
        let newInfo = this.props.info;
        console.log({
            year: newInfo.year,
            month: newInfo.month,
            date: newInfo.date,
            status: (x).toString(),
            journalID: newInfo.journalID
        })
        this.props.updateRecord({
            variables: {
                year: newInfo.year,
                month: newInfo.month,
                date: newInfo.date,
                status: (x).toString(),
                journalID: newInfo.journalID
            }
            //NOTE: after adding this we want to tell apollo to reefatch queries
            //refetchQueries: [{query: getBooksQuery}]
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentDidUpdate");
        // console.log(this.state)
        //console.log(nextProps)
        //console.log("componentwillrecprops")

        // console.log(this.props)

        let status = nextProps.info.status
        this.setState({ status: status, color: { background: getColor(status) } })

    }
    componentWillUnmount() {
        "unmount"
    }

    // componentDidUpdate() {
    //     if (!this.props.info) {
    //         console.log("something isnt right")
    //         this.setState({
    //             info: undefined,
    //             status: 0,
    //             color: { background: colors[0] },
    //         })
    //     } else {
    //         let status = this.props.info.status
    //         console.log('this should be happening')
    //         this.setState({
    //             info: this.props.info,
    //             status: this.props.info.status,
    //             color: { background: colors[status] },
    //         })
    //     }
    // }



    render() {

        //console.log(this.state)
        return (<div style={this.state.color} className="Cell" onClick={this.handleClick}>.</div>)
    }
}
export default graphql(updateRecord, { name: "updateRecord" })(Cell);