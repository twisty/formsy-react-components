/* eslint-env node, browser */

import React, {Component} from 'react';
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
      disabled: false,
    };
  }

  handleChangeOption = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  };

  handleToggleOptions = () => {
    const {showingOptions} = this.state;
    this.setState({showingOptions: !showingOptions});
  };

  render() {
    const {
      layout,
      validateOnSubmit,
      validatePristine,
      showingOptions,
      disabled,
    } = this.state;
    return (
      <div>
        <div className="page-header">
          <h1>Form Playground</h1>
        </div>
        <Options
          layoutChoice={layout}
          validateOnSubmitChoice={validateOnSubmit}
          validatePristineChoice={validatePristine}
          showing={showingOptions}
          disabledChoice={disabled}
          onChangeOption={this.handleChangeOption}
          onToggle={this.handleToggleOptions}
        />
        <div className="page-header">
          <h2>
            Layout: <code>{layout}</code>
          </h2>
        </div>
        <Playground
          layoutChoice={layout}
          validateOnSubmitChoice={validateOnSubmit}
          validatePristineChoice={validatePristine}
          disabledChoice={disabled}
        />
      </div>
    );
  }
}

export default App;
