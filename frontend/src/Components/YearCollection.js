import React, { Component } from 'react'
import Cell from '../Components/Cell'
import { fetchJournalData } from '../Queries/query'
import { graphql } from 'react-apollo';


let months = [
    { id: 1, "name": "Jan" },
    { id: 2, "name": "Feb" },
    { id: 3, "name": "Mar" },
    { id: 4, "name": "Apr" },
    { id: 5, "name": "May" },
    { id: 6, "name": "Jun" },
    { id: 7, "name": "Jul" },
    { id: 8, "name": "Aug" },
    { id: 9, "name": "Sep" },
    { id: 10, "name": "Oct" },
    { id: 11, "name": "Nov" },
    { id: 12, "name": "Dec" },
];

class YearCollection extends Component {

    constructor(props) {
        super(props);
        console.log("this probably only happens once tho right...")
        console.log(this.props.keys)
        let date = new Date();
        this.state = {
            "year": date.getFullYear(),
            "date": date
        }
    }

    buildTable() {

        console.log("table sees this as the journal id ")
        //console.log(this.props.journalID)
        let data = this.props.data.journalData;
        console.log("this is what i see for data!")
        // console.log(data)
        //this is a list of all the dates in this grid that will never exist,
        //we want to check if it's a leap year, if it isn't, then we need to add another date to black out
        let blackOut = ['row-31-col-4', 'row-31-col-6', 'row-31-col-9', 'row-31-col-11', 'row-30-col-2', 'row-31-col-2'];
        let year = this.state.year;
        if (!(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)) blackOut.push('row-29-col-2');

        //build regular rows
        let buildRow = (rowId) => {

            let cells = []
            cells.push(<td><h6>{rowId}</h6></td>)
            let data = this.props.data.journalData;

            for (let col = 1; col < 13; col++) {

                let frontEndID = `row-${rowId}-col-${col}`
                let dateForCell = new Date(`${col}/${rowId}/${this.state.year}`)
                let cellData = data.find((obj) => { return obj.frontEndID == frontEndID })
                // console.log(cellData)
                let tableCell;

                let info = {
                    year: (dateForCell.getFullYear()).toString(),
                    month: (dateForCell.getMonth() + 1).toString(),
                    date: (dateForCell.getDate()).toString(),
                    status: (0).toString(),
                    journalID: this.props.journalID,
                    fullDate: cellData,
                    frontEndID: frontEndID
                }

                //Make sure that this isnt a blackout day ( doesn't exist or is a leep year )
                //console.log(frontEndID)
                if (blackOut.find((obj) => { return obj == frontEndID })) {
                    tableCell = <td id={frontEndID} className="black">  </td>
                } else if (cellData) {
                    tableCell = <td id={frontEndID}>
                        <Cell colors={this.props.colors} keys={this.props.keys} info={cellData} fullDate={dateForCell} />
                    </td>
                } else {
                    tableCell = <td id={frontEndID}>
                        <Cell colors={this.props.colors} keys={this.props.keys} info={info} fullDate={dateForCell} />
                    </td>
                }

                cells.push(tableCell)
            }
            return cells;
        }

        //special build row for headers of the month
        let buildHeader = () => {
            let header = [];
            header.push(<th><h6>Day #</h6></th>)

            for (let month of months) {
                header.push(<th id={`month-${month.id}`}><h6>{month.name}</h6></th>)
            }
            return header;
        }

        let tableRows = [];
        tableRows.push(<tr id="Months">{buildHeader()}</tr>)

        for (let rowNumber = 1; rowNumber < 32; rowNumber++) {
            tableRows.push(<tr id={`${rowNumber}`}>{buildRow(rowNumber)}</tr>)
        }
        return tableRows;
    }

    render() {
        let data = this.props.data;
        if (data.loading === true) {
            return (<div><p>Loading...</p></div>)
        } else {
            console.log("===============================================")

            return (
                <div className="collection">
                    {/* <h1>{this.props.journalID}</h1> */}
                    <table id="grid">
                        <tbody>{this.buildTable()}</tbody>
                    </table>
                </div>
            )
        }
    }
    setTimeout() {
        this.props.refetch();
    }
    componentDidMount() {
        console.log("didmount")
    }
    componentDidUpdate() {
        console.log("didupdate")
    }

}

export default graphql(fetchJournalData, {
    options: (props) => {

        console.log("how often does this happen!!!!!!!!!!!!!!!!")
        return {
            variables: {
                year: ((new Date).getFullYear()).toString(),
                journalID: props.journalID.toString()
            }
        }
    }
})(YearCollection);