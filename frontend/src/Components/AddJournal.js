import React, { Component } from 'react';


class AddJournal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            custom: false,
            defaultKeys: ["Wasn't Tracked", "Doesn't Apply", "Missed", "Did Something",
                "Significant Day", "Great Day"],
            defaultColors: ["#a09fa1", "#e8d8f0", "#ff9694", "#ffb969", "#a4ff63", "#a000eb"],
            customKeys: ["Wasn't Tracked", "Doesn't Apply"],
            customColors: ["#a09fa1", "#e8d8f0"]

        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleAddKey = this.handleAddKey.bind(this);
    }

    handleClick() {
        this.setState({ custom: !this.state.custom })
    }
    handleAddKey(e) {
        e.preventDefault();
        let keys = this.state.customKeys;
        let colors = this.state.customColors;
        let newKey = e.target.form[0].value
        let newColor = e.target.form[1].value
        keys.push(newKey)
        colors.push(newColor)
        this.setState({ customKeys: keys, customColors: colors })
    }

    listKeys() {



        let keys = [];
        for (let key in this.state.defaultKeys) {
            let color = { background: this.state.defaultColors[key] }

            keys.push(<li className="keyitem">
                <div class="legend" style={color}></div>
                <div className="legend-text">{this.state.defaultKeys[key]}</div>
            </li>)
        }
        return keys
    }

    listCustomKeys() {


        let keys = [];
        for (let key in this.state.customKeys) {
            let color = { background: this.state.customColors[key] }

            keys.push(<li className="keyitem">
                <div class="legend" style={color}></div>
                <div className="legend-text">{this.state.customKeys[key]}</div>
            </li>)
        }
        return keys

    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>New Journal</h1>
                    <form>
                        <label>NAME: </label>
                        <input type="text" name="name" /><br />
                        <label>KEYS: </label>
                        <input type="radio" name="keyType" value="default" onClick={this.handleClick} checked={!this.state.custom} />Default Keys
                        <input type="radio" name="keyType" value="custom" onClick={this.handleClick} /> Custom Keys
                    </form>
                    <hr />

                    {this.state.custom ?
                        //custom input html
                        <div>
                            <form>
                                <p className="addjournal"> New Key</p>
                                <label>Key Name: </label>
                                <input type="text" name="name" /><br />
                                <label>Key Color: </label><input type="color" name="legend" /><br />
                                <button type="submit" onClick={this.handleAddKey}>ADD</button>
                            </form>
                            <hr />
                            <ul className="keylist"> {this.listCustomKeys()}</ul>
                        </div>
                        : <ul className="keylist"> {this.listKeys()}</ul>
                    }
                    <button onClick={this.props.closePopup}>Create</button>
                    <button onClick={this.props.closePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}


export default AddJournal