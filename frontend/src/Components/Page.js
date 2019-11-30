import React, { Component } from 'react';
import Collection from '../Components/Collection'
import YearCollection from '../Components/YearCollection'

class Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("page-rerendered")
        return (
            <div>
                {/* <Collection journalID={this.props.journalID} /> */}
                <YearCollection journalID={this.props.journalID} keys={6} />
            </div>
        )
    }
}
export default Page