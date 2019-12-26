import React, { Component } from 'react';
import Collection from '../Components/Collection'
import YearCollection from '../Components/YearCollection'

class Page extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    buildLegend() {

        let keys = [];
        for (let key in this.props.keys) {
            let color = { background: this.props.colors[key] }

            keys.push(<li className="keyitem">
                <div class="legend" style={color}></div>
                <div className="legend-text">{this.props.keys[key]}</div>
            </li>)
        }
        return keys
    }

    render() {
        console.log("page-rerendered")

        console.log(this.props)
        return (
            <div className='page-main'>


                <div className='page-stats'>
                    <h1>{this.props.name}</h1>
                    <ul className="keylist">{this.buildLegend()}</ul>
                </div>
                <YearCollection keys={this.props.keys} colors={this.props.colors}
                    journalID={this.props.journalID} keys={6} />
            </div >
        )
    }
}
export default Page