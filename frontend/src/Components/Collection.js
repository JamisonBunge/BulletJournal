import React, { Component } from 'react'
import ReactDataGrid from 'react-data-grid';

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

let buildRow = (rowId) => {

    let cells = []
    cells.push(<td className={`rowNum-${rowId % 2}`}>{rowId}</td>)

    for (let col = 1; col < 13; col++) {
        cells.push(<td id={`row-${rowId}-col-${col}`} className={`rowNum-${rowId % 2}`}></td>)
    }
    return cells;
}

let buildHeader = () => {

    let header = [];
    header.push(<th>Day #</th>)

    for (let month of months) {
        header.push(<th id={`month-${month.id}`}>{month.name}</th>)
    }
    return header;
}

class Collection extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="collection">
                <table id="grid">
                    <tr id="Months">{buildHeader()}</tr>
                    <tr id="1">{buildRow(1)}</tr>
                    <tr id="1">{buildRow(2)}</tr>
                    <tr id="2">{buildRow(3)}</tr>
                    <tr id="3">{buildRow(4)}</tr>
                    <tr id="4">{buildRow(5)}</tr>
                    <tr id="5">{buildRow(6)}</tr>
                    <tr id="6">{buildRow(7)}</tr>
                    <tr id="7">{buildRow(8)}</tr>
                    <tr id="8">{buildRow(9)}</tr>
                    <tr id="9">{buildRow(10)}</tr>
                    <tr id="10">{buildRow(11)}</tr>
                    <tr id="11">{buildRow(12)}</tr>
                    <tr id="12">{buildRow(13)}</tr>
                    <tr id="12">{buildRow(14)}</tr>
                    <tr id="12">{buildRow(15)}</tr>
                    <tr id="12">{buildRow(16)}</tr>
                    <tr id="12">{buildRow(17)}</tr>
                    <tr id="12">{buildRow(18)}</tr>
                    <tr id="12">{buildRow(19)}</tr>
                    <tr id="12">{buildRow(20)}</tr>
                    <tr id="12">{buildRow(21)}</tr>
                    <tr id="12">{buildRow(22)}</tr>
                    <tr id="12">{buildRow(23)}</tr>
                    <tr id="12">{buildRow(24)}</tr>
                    <tr id="12">{buildRow(25)}</tr>
                    <tr id="12">{buildRow(26)}</tr>
                    <tr id="12">{buildRow(27)}</tr>
                    <tr id="12">{buildRow(28)}</tr>
                    <tr id="12">{buildRow(29)}</tr>
                    <tr id="12">{buildRow(30)}</tr>
                    <tr id="12">{buildRow(31)}</tr>
                </table>
            </div>
        );
    }
}

export default Collection;