import React, { Component } from 'react'

let months = [
    { id: 1, "name": "January" },
    { id: 2, "name": "Febuary" },
    { id: 3, "name": "March" },
    { id: 4, "name": "Apirl" },
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
        this.state = {
            cells: getStateContainer()
        }
    }

    componentDidMount(cellState) {

    }


    logEvent(e) {

        let cell = (document.getElementById(e.target.id))
        cell.classList.add("green")


        // let decomposedId = id.splice('-');
        // let cell = this.state.cells[1][1];
        console.log("hello")

    }


    buildRow(rowId) {

        let cells = []
        cells.push(<td className={`rowNum-${rowId % 2}`}>{rowId}</td>)

        for (let col = 1; col < 13; col++) {
            cells.push(<td id={`row-${rowId}-col-${col}`}
                className={`rowNum-${rowId % 2}`}
                onClick={this.logEvent} ></td>)
        }
        return cells;
    }


    //logEvent(this.state.cells[col][rowId])

    //ThIS IS
    buildHeader() {

        console.log(Date())
        let header = [];
        header.push(<th>Day #</th>)

        for (let month of months) {
            header.push(<th id={`month-${month.id}`} >{month.name}</th>)
        }
        return header;
    }

    render() {

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

export default Collection;