import React, { Component } from 'react';
import Collection from '../Components/Collection'
import Page from '../Components/Page'
import { fetchJournalsByUser } from '../Queries/query'
import { graphql } from 'react-apollo';

class Wrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            journalID: 1
        }
        this.chooseJournal = this.chooseJournal.bind(this);
    }

    chooseJournal(e) {

        console.log(e.target.id)
        this.setState({ journalID: e.target.id })

        // if (this.state.journalID == undefined) {

        // } else {

        // }
    }

    createJournalList() {
        let data = this.props.data;
        let journals = []

        for (let journal of data.journalsFor) {
            journals.push(<li id={journal.journalID} onClick={this.chooseJournal}> {journal.name}  </li>)
        }
        return journals

    }
    render() {
        let data = this.props.data;

        console.log(data)
        if (!data.journalsFor) {
            return (<div>loading..</div>)

        } else {


            console.log("i hate mself")
            return (
                <div>
                    <div className="sidebar">
                        <div className="userCircle">Jami</div>
                        <div className="addJournal" onClick={alert}>+</div>
                        <div className="listJournals"><ul>{this.createJournalList()}</ul></div>
                    </div>
                    <div className="page">
                        <Page journalID={this.state.journalID} />
                    </div>
                </div>
            )
        }
    }
}
//export default Wrapper
export default graphql(fetchJournalsByUser, {
    options: (props) => {
        console.log(props);
        return {
            variables: {
                userID: "1"
            }
        }
    }
})(Wrapper);