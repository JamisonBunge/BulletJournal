import React, { Component } from 'react'



class Cell extends Component {
    constructor(props) {
        super(props);

        let status = this.props.info.status

        let color = "red";
        switch (status) {
            case "0":
                color = "red"
                break;
            case "1":
                color = "purple"
                break;
            case "2":
                color = "green"
                break;
        }

        this.state = {
            style: { background: color, width: "100%", height: "100%", padding: "none", margin: "none" }
        }

    }

    testClick(e) {
        console.log(e)

    }

    render() {




        return (<div style={this.state.style} onClick={this.testClick} >_</div>)
    }
}

export default Cell;