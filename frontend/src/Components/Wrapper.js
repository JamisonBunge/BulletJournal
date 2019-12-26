import React, { Component } from 'react';
import Collection from '../Components/Collection'
import AddJournal from '../Components/AddJournal'
import Page from '../Components/Page'
import { fetchJournalsByUser } from '../Queries/query'
import { graphql } from 'react-apollo';

class Wrapper extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            _id: "",
            journal: {},
            name: "",
            keys: [],
            colors: [],
            showPopUp: false

        }
        this.chooseJournal = this.chooseJournal.bind(this);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
        this.props.data.refetch();
    }


    chooseJournal(e) {
        e.preventDefault();
        console.log(e.target.id)

        if (this.state._id != e.target.id) {
            this.setState({
                _id: e.target.id,
                journal: this.props.data.journalsFor.find(obj => obj._id == e.target.id)
            })
        }

        console.log(this.state.journal)


        // if (this.state.journalID == undefined) {

        // } else {

        // }
    }

    createJournalList() {
        let data = this.props.data;
        let journals = []

        for (let journal of data.journalsFor) {
            journals.push(<li id={journal._id} onClick={this.chooseJournal}> {journal.name}  </li>)
        }

        return journals

    }

    //we back baby
    handleClickAdd(e) {
        e.preventDefault();



    }

    render() {
        let data = this.props.data;
        console.log(this.props)

        console.log(data)
        if (!data.journalsFor) {
            return (<div>loading..</div>)

        } else {


            console.log("wrapper re-rendered")
            return (
                <div className="page-root">
                    <div className="sidebar">
                        <div className="userCircle">Jami</div>
                        <div className="addJournal" onClick={this.togglePopup.bind(this)}>+</div>
                        <div className="listJournals"><ul>{this.createJournalList()}</ul></div>
                    </div>
                    <div className="page">
                        {
                            this.state._id == "" ?
                                <h1>Click a jounral </h1>
                                : <Page journalID={this.state._id}
                                    name={this.state.journal.name}
                                    keys={this.state.journal.keys}
                                    colors={this.state.journal.colors} />
                        }
                    </div>

                    {this.state.showPopup ?
                        <AddJournal
                            text='if i want to pass something down later'
                            userID="1"
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            )
        }
    }
}
//export default Wrapper
export default graphql(fetchJournalsByUser, {
    options: (props) => {
        //console.log(props);
        return {
            variables: {
                userID: "1"
            }
        }
    }
})(Wrapper);