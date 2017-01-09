/* eslint-env node, browser */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Playground from './playground';
import Options from './options';

class App extends Component {

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            layout: 'horizontal',
            validatePristine: false,
            disabled: false
        };
    }

    handleChangeOption = (name, value) => {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>Form Playground</h1>
                </div>
                <h3>Options…</h3>
                <Options
                    layoutChoice={this.state.layout}
                    validatePristineChoice={this.state.validatePristine}
                    disabledChoice={this.state.disabled}
                    onChangeOption={this.handleChangeOption}
                />
                <div className="page-header">
                    <h2>Layout: <code>{this.state.layout}</code></h2>
                </div>
                <Playground
                    layoutChoice={this.state.layout}
                    validatePristineChoice={this.state.validatePristine}
                    disabledChoice={this.state.disabled}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
