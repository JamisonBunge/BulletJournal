import React, { Component } from 'react';
import Collection from '../Components/Collection'

class Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Collection journalID={this.props.journalID} />
            </div>
        )
    }
}
export default Page