import React, { Component } from 'react'
import Cell from '../Components/Cell'
import { fetchJournalData } from '../Queries/query'
import { graphql } from 'react-apollo';
import { defaultNormalizedCacheFactory } from 'apollo-boost';

let months = [
    { id: 1, "name": "January" },
    { id: 2, "name": "Febuary" },
    { id: 3, "name": "March" },
    { id: 4, "name": "April" },
    { id: 5, "name": "May" },
    { id: 6, "name": "June" },
    { id: 7, "name": "July" },
    { id: 8, "name": "August" },
    { id: 9, "name": "September" },
    { id: 10, "name": "October" },
    { id: 11, "name": "November" },
    { id: 12, "name": "December" },
];


let getStateContainer = () => {

    let months = [];
    let days = [];

    for (let month = 0; month < 13; month++) {
        for (let day = 0; day < 32; day++) {
            days.push({ "val": 0, "class": "default" });
        }
        days = [];
        months.push(days);
    }

    return months;
}


class Collection extends Component {

    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            cells: getStateContainer(),
            "year": date.getFullYear(),
            "date": date
        }

    }

    componentDidUpdate() {

        let data = this.props.data;
        if (data.loading == false) {

            let blackOut = ['row-31-col-4', 'row-31-col-6', 'row-31-col-9', 'row-31-col-11', 'row-30-col-2', 'row-31-col-2'];
            let year = this.state.year;
            if (!(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)) blackOut.push('row-29-col-2');

            //console.log(this.props)
            for (let day of blackOut) {
                let cell = document.getElementById(day);
                cell.classList.add("black");
                //console.log(cell);
                // console.log(this.state);
            }
        }
    }




    buildRow(rowId) {

        let cells = []
        cells.push(<td className={`rowNum-${rowId % 2}`}>{rowId}</td>)
        let data = this.props.data.journalData;
        //console.log(data)

        for (let col = 1; col < 13; col++) {
            let cellData = data.find((obj) => { return obj.frontEndID == `row-${rowId}-col-${col}` })


            let tableCell;

            if (!cellData) {
                console.log(`row-${rowId}-col-${col}`)
                tableCell = <td id={`row-${rowId}-col-${col}`}
                    className={`rowNum-${rowId % 2}`}></td>
            } else

                tableCell = <td id={`row-${rowId}-col-${col}`}
                    className={`rowNum-${rowId % 2}`}>
                    <Cell info={cellData} />
                </td>


            cells.push(tableCell)
        }
        return cells;
    }



    buildHeader() {
        //console.log(Date())
        let header = [];
        header.push(<th>Day #</th>)

        for (let month of months) {
            header.push(<th id={`month-${month.id}`} >{month.name}</th>)
        }
        return header;
    }

    render() {

        let data = this.props.data;
        //console.log(data);
        if (data.loading === true) {
            return (
                <div><p>Loading...</p></div>
            )
        } else {
            console.log("did we remount")

            return (
                <div className="collection">
                    <table id="grid">
                        <tbody>
                            <tr id="Months">{this.buildHeader()}</tr>
                            <tr id="1">{this.buildRow(1)}</tr>
                            <tr id="1">{this.buildRow(2)}</tr>
                            <tr id="2">{this.buildRow(3)}</tr>
                            <tr id="3">{this.buildRow(4)}</tr>
                            <tr id="4">{this.buildRow(5)}</tr>
                            <tr id="5">{this.buildRow(6)}</tr>
                            <tr id="6">{this.buildRow(7)}</tr>
                            <tr id="7">{this.buildRow(8)}</tr>
                            <tr id="8">{this.buildRow(9)}</tr>
                            <tr id="9">{this.buildRow(10)}</tr>
                            <tr id="10">{this.buildRow(11)}</tr>
                            <tr id="11">{this.buildRow(12)}</tr>
                            <tr id="12">{this.buildRow(13)}</tr>
                            <tr id="12">{this.buildRow(14)}</tr>
                            <tr id="12">{this.buildRow(15)}</tr>
                            <tr id="12">{this.buildRow(16)}</tr>
                            <tr id="12">{this.buildRow(17)}</tr>
                            <tr id="12">{this.buildRow(18)}</tr>
                            <tr id="12">{this.buildRow(19)}</tr>
                            <tr id="12">{this.buildRow(20)}</tr>
                            <tr id="12">{this.buildRow(21)}</tr>
                            <tr id="12">{this.buildRow(22)}</tr>
                            <tr id="12">{this.buildRow(23)}</tr>
                            <tr id="12">{this.buildRow(24)}</tr>
                            <tr id="12">{this.buildRow(25)}</tr>
                            <tr id="12">{this.buildRow(26)}</tr>
                            <tr id="12">{this.buildRow(27)}</tr>
                            <tr id="12">{this.buildRow(28)}</tr>
                            <tr id="12">{this.buildRow(29)}</tr>
                            <tr id="12">{this.buildRow(30)}</tr>
                            <tr id="12">{this.buildRow(31)}</tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

//export default Collection;
export default graphql(fetchJournalData, {
    options: (props) => {
        console.log(props);
        return {
            variables: {
                year: ((new Date).getFullYear()).toString(),
                journalID: "1"
            }
        }
    }
})(Collection);