/* eslint-env node, browser */

import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactDOM from 'react-dom';

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
import {
  Form,
  Input,
  File,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Textarea,
} from 'formsy-react-components';
/* eslint-enable */

class App extends React.Component {
  public frcFormRef = React.createRef<Form>();
  public inputRef;
  public fileRef;
  public radiosRef;
  public checkboxRef;
  public checkboxesRef;
  public selectRef;
  public textareaRef;

  public componentDidMount(): void {
    this.inputRef.element.current.focus();

    /* eslint-disable no-console */
    console.info(this.frcFormRef);
    if (this.frcFormRef.current !== null) {
      console.info(this.frcFormRef.current.formsyForm);
    }
    console.info(this.inputRef.element);
    console.info(this.fileRef.element);
    console.info(this.radiosRef.elements);
    console.info(this.checkboxRef.element);
    console.info(this.checkboxesRef.elements);
    console.info(this.selectRef.element);
    console.info(this.textareaRef.element);
    /* eslint-enable no-console */
  }

  public render(): JSX.Element {
    const multiOptions = [
      {label: 'Option 1', value: 'one'},
      {label: 'Option 2', value: 'two'},
      {label: 'Option 3', value: 'three'},
    ];

    return (
      <div>
        <h1>
          <code>refs</code> Example
        </h1>
        <p>
          The first input is initially focussed by accessing the form control
          via <code>refs</code>.
        </p>
        <p>
          Check the browser console for the form control elements that are
          exposed as refs.
        </p>
        <Form ref={this.frcFormRef}>
          <Input
            label="Text"
            name="input"
            componentRef={(component): void => {
              this.inputRef = component;
            }}
          />
          <File
            label="File picker"
            name="file"
            componentRef={(component): void => {
              this.fileRef = component;
            }}
          />
          <RadioGroup
            label="Radio buttons"
            name="radios"
            options={multiOptions}
            componentRef={(component): void => {
              this.radiosRef = component;
            }}
          />
          <Checkbox
            label="Single checkbox"
            valueLabel="One option"
            name="checkbox"
            componentRef={(component): void => {
              this.checkboxRef = component;
            }}
          />
          <CheckboxGroup
            label="Checkbox group"
            name="checkboxes"
            options={multiOptions}
            componentRef={(component): void => {
              this.checkboxesRef = component;
            }}
          />
          <Select
            label="Select"
            name="select"
            options={multiOptions}
            componentRef={(component): void => {
              this.selectRef = component;
            }}
          />
          <Textarea
            label="Textarea"
            name="textarea"
            componentRef={(component): void => {
              this.textareaRef = component;
            }}
          />
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
