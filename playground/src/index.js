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
            showingOptions: true,
            validateOnSubmit: false,
            validatePristine: false,
            disabled: false
        };
    }

    handleChangeOption = (name, value) => {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    }

    handleToggleOptions = () => {
        this.setState({showingOptions: !this.state.showingOptions});
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>Form Playground</h1>
                </div>
                <Options
                    layoutChoice={this.state.layout}
                    validateOnSubmitChoice={this.state.validateOnSubmit}
                    validatePristineChoice={this.state.validatePristine}
                    showing={this.state.showingOptions}
                    disabledChoice={this.state.disabled}
                    onChangeOption={this.handleChangeOption}
                    onToggle={this.handleToggleOptions}
                />
                <div className="page-header">
                    <h2>Layout: <code>{this.state.layout}</code></h2>
                </div>
                <Playground
                    layoutChoice={this.state.layout}
                    validateOnSubmitChoice={this.state.validateOnSubmit}
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
